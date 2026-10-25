const fs = require('fs');
const babel = require('@babel/core');
const vm = require('vm');

const code = fs.readFileSync('./vendor/app.jsx', 'utf-8');

// We intercept ReactDOM.createRoot so it doesn't break the test
const scriptToRun = `
${code}
module.exports = {
  parseHLSegments,
  tokenizeToAtoms,
  packWithWidth,
  applyKinsoku,
  atomsToHLString,
  atomsToHLStringTrim,
  balanceAtoms,
  measureTextWidth
};
`;

const compiled = babel.transformSync(scriptToRun, {
  presets: ['@babel/preset-env', ['@babel/preset-react', {runtime: 'classic'}]]
});

const sandbox = {
  module: { exports: {} },
  require: require,
  console: console,
  React: require('react'),
  ReactDOM: {
    createRoot: () => ({ render: () => {} })
  },
  window: {},
  document: {
    createElement: () => ({
      getContext: () => ({
        measureText: (text) => ({ width: text.length * 10 }) // mock width = char count * 10
      })
    }),
    getElementById: () => ({})
  },
  Math: Math,
  Date: Date,
  parseInt: parseInt,
  isNaN: isNaN,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  Uint32Array: Uint32Array,
  Uint8Array: Uint8Array,
  Blob: Blob,
  TextEncoder: TextEncoder,
  Map: Map,
  Set: Set
};

vm.createContext(sandbox);
vm.runInContext(compiled.code, sandbox);

const {
  parseHLSegments,
  tokenizeToAtoms,
  packWithWidth,
  applyKinsoku,
  atomsToHLString,
  atomsToHLStringTrim,
  balanceAtoms,
  measureTextWidth
} = sandbox.module.exports;

describe('Typographic Style & Layout Parser', () => {
  describe('parseHLSegments', () => {
    it('parses basic text without hl', () => {
      const result = parseHLSegments('Hello World');
      expect(result).toEqual([{ text: 'Hello World', hl: false }]);
    });

    it('parses text with {hl} markers', () => {
      const result = parseHLSegments('Hello {hl}World{/hl}!');
      expect(result).toEqual([
        { text: 'Hello ', hl: false },
        { text: 'World', hl: true },
        { text: '!', hl: false }
      ]);
    });

    it('parses multiple {hl} markers', () => {
      const result = parseHLSegments('{hl}Hello{/hl} beautiful {hl}World{/hl}');
      expect(result).toEqual([
        { text: 'Hello', hl: true },
        { text: ' beautiful ', hl: false },
        { text: 'World', hl: true }
      ]);
    });
  });

  describe('tokenizeToAtoms', () => {
    it('tokenizes CJK characters individually', () => {
      const segs = [{ text: '測試文字', hl: false }];
      const result = tokenizeToAtoms(segs);
      expect(result).toEqual([
        { ch: '測', hl: false, ws: false },
        { ch: '試', hl: false, ws: false },
        { ch: '文', hl: false, ws: false },
        { ch: '字', hl: false, ws: false }
      ]);
    });

    it('keeps ASCII words together', () => {
      const segs = [{ text: 'Hello World', hl: true }];
      const result = tokenizeToAtoms(segs);
      expect(result).toEqual([
        { ch: 'Hello', hl: true, ws: false },
        { ch: ' ', hl: true, ws: true },
        { ch: 'World', hl: true, ws: false }
      ]);
    });

    it('mixed CJK and ASCII words', () => {
      const segs = [{ text: '測試Hello文字', hl: false }];
      const result = tokenizeToAtoms(segs);
      expect(result).toEqual([
        { ch: '測', hl: false, ws: false },
        { ch: '試', hl: false, ws: false },
        { ch: 'Hello', hl: false, ws: false },
        { ch: '文', hl: false, ws: false },
        { ch: '字', hl: false, ws: false }
      ]);
    });
  });

  describe('atomsToHLString', () => {
    it('reconstructs HL string from atoms', () => {
      const atoms = [
        { ch: 'Hello ', hl: false },
        { ch: 'World', hl: true },
        { ch: '!', hl: false }
      ];
      expect(atomsToHLString(atoms)).toBe('Hello {hl}World{/hl}!');
    });
  });

  describe('atomsToHLStringTrim', () => {
    it('trims leading and trailing whitespace atoms', () => {
      const atoms = [
        { ch: ' ', hl: false, ws: true },
        { ch: 'Hello', hl: false, ws: false },
        { ch: ' ', hl: false, ws: true },
        { ch: 'World', hl: true, ws: false },
        { ch: '  ', hl: true, ws: true }
      ];
      expect(atomsToHLStringTrim(atoms)).toBe('Hello {hl}World{/hl}');
    });
  });

  describe('Layout Calculations (packWithWidth)', () => {
    it('packs atoms into lines based on width', () => {
      const atoms = [
        { ch: 'A', hl: false, ws: false },
        { ch: 'B', hl: false, ws: false },
        { ch: 'C', hl: false, ws: false }
      ];
      // mock measureTextWidth returns char.length * 10 = 10 for each
      // max width 20 -> should fit AB in line 1, C in line 2
      const lines = packWithWidth(atoms, 25, 'sans-serif');
      expect(lines.length).toBe(2);
      expect(lines[0]).toEqual([atoms[0], atoms[1]]); // A, B
      expect(lines[1]).toEqual([atoms[2]]); // C
    });
  });

  describe('applyKinsoku (Kinsoku rules)', () => {
    it('prevents NO_LINE_START characters from starting a line', () => {
      const lines = [
        [{ ch: '這', hl: false }, { ch: '是', hl: false }],
        [{ ch: '。', hl: false }, { ch: '測', hl: false }]
      ];
      const result = applyKinsoku(lines);
      // '。' cannot start a line, so it should be pulled to previous line
      expect(result[0].length).toBe(3);
      expect(result[0][2].ch).toBe('。');
      expect(result[1].length).toBe(1);
      expect(result[1][0].ch).toBe('測');
    });

    it('prevents NO_LINE_END characters from ending a line', () => {
      const lines = [
        [{ ch: '測', hl: false }, { ch: '「', hl: false }],
        [{ ch: '試', hl: false }, { ch: '」', hl: false }]
      ];
      const result = applyKinsoku(lines);
      // '「' cannot end a line, so it should be pushed to next line
      expect(result[0].length).toBe(1);
      expect(result[0][0].ch).toBe('測');
      expect(result[1].length).toBe(3);
      expect(result[1][0].ch).toBe('「');
    });
  });

  describe('balanceAtoms', () => {
    it('balances lines minimizing longest line', () => {
      const atoms = [
        { ch: 'A', hl: false, ws: false },
        { ch: 'B', hl: false, ws: false },
        { ch: 'C', hl: false, ws: false },
        { ch: 'D', hl: false, ws: false }
      ];
      // 4 atoms, each width 10. Max width 100, target 2 lines.
      // Expected balancing should put 2 in first line, 2 in second.
      const lines = balanceAtoms(atoms, 40, 'sans-serif', 2);
      expect(lines.length).toBe(2);
      expect(lines[0].length).toBe(2);
      expect(lines[1].length).toBe(2);
    });
  });
});
