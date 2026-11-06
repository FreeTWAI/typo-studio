const fs = require('fs');
const vm = require('vm');
const { performance } = require('perf_hooks');

const compiledCode = fs.readFileSync('vendor/app.compiled.js', 'utf8');

// Strip out React rendering initialization since we just want to test internal functions
// Safer regex that handles optional variable assignment
const strippedCode = compiledCode.replace(/(?:const|let|var)?\s*[a-zA-Z0-9_$]*\s*=?\s*ReactDOM\.createRoot[^;]+;/g, '');

const mockCanvas = {
  width: 1080,
  height: 1080,
  getContext: () => ({
    scale: () => {},
    measureText: (text) => ({ width: text.length * 10 }), // Mock text width
    font: '',
  }),
};

const sandbox = {
  document: {
    createElement: (tag) => (tag === 'canvas' ? mockCanvas : {}),
    getElementById: () => ({})
  },
  window: { innerWidth: 1000, innerHeight: 1000, addEventListener: () => {} },
  localStorage: { getItem: () => null, setItem: () => {} },
  React: {
    useState: () => [],
    useRef: () => ({}),
    useEffect: () => {},
    useCallback: (cb) => cb,
    useMemo: (cb) => cb(),
    createElement: () => ({})
  },
  console,
  setTimeout,
  clearTimeout,
  Math,
  Date,
  performance
};

vm.createContext(sandbox);

const benchmarkCode = `
  const startMeasure = performance.now();
  for(let i=0; i<50000; i++) {
    measureTextWidth('測試中文 ' + (i % 100), '16px sans-serif');
  }
  const endMeasure = performance.now();
  console.log('measureTextWidth (50,000 runs):', endMeasure - startMeasure, 'ms');

  const startFit = performance.now();
  for(let i=0; i<1000; i++) {
    fitFontSize('測試標題自動縮放\\n第二行很長很長很長很長', 300, 40, 'Noto Sans TC');
  }
  const endFit = performance.now();
  console.log('fitFontSize (1,000 runs):', endFit - startFit, 'ms');

  const startWrap = performance.now();
  for(let i=0; i<1000; i++) {
    wrapAllLines('這是一段需要自動換行的中文內文，測試避頭尾與斷詞邏輯是否能正確處理排版效能問題。', 200, '16px sans-serif', true);
  }
  const endWrap = performance.now();
  console.log('wrapAllLines (1,000 runs):', endWrap - startWrap, 'ms');
`;

try {
  console.log('Running performance benchmarks...');
  vm.runInContext(strippedCode + '\n' + benchmarkCode, sandbox);
  console.log('Benchmarks completed successfully.');
} catch (e) {
  console.error('Benchmark failed:', e);
  process.exit(1);
}
