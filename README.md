# TYPO STUDIO

<!-- freedom-repository-guide:start -->
## 在自由工坊的位置

[自由工坊](https://freetwai.com) 讓會員先完成定位、選擇公會並領取 Repo 技能書，再以供貨、商店、開源作品、行銷與小隊共同完成成果。

行銷公會的中文輪播貼文排版與圖像輸出工具來源。 保留上游離線 editor、PWA／Electron shell、排版及匯出程式。

工坊 fork 尚未發布自己的桌面／PWA 版本，也沒有中央會員同步或代發社群貼文。

工坊 Fork：上游產品／授權來源為 [Hao0321/typo-studio](https://github.com/Hao0321/typo-studio)；本次協作的 Issue／PR 送到 **FreeTWAI-AI/typo-studio**，不是自動送往上游。

程式／內容入口：[index.html](index.html)、[vendor/app.jsx](vendor/app.jsx)、[main.js](main.js)、[preload.js](preload.js)、[sw.js](sw.js)。協作先讀 [CONTRIBUTING.md](CONTRIBUTING.md)，讓 Agent 讀 [AGENTS.md](AGENTS.md)；從[本倉 Issues](https://github.com/FreeTWAI-AI/typo-studio/issues)認領、[查看既有 PR](https://github.com/FreeTWAI-AI/typo-studio/pulls)避免重工。

貼文素材與專案留在使用者裝置；匯出圖片不等於平台已發布。修改 JSX 時同步核對既有編譯流程，保留字型／圖像授權與上游來源。 跨 repo 的協定由[中央平台](https://github.com/FreeTWAI-AI/freedom-platform)維護。
<!-- freedom-repository-guide:end -->

> 中文友善的 Instagram 輪播貼文排版工具 — 桌面版（Windows / macOS）＋ 網頁版 / 手機版（PWA）

TYPO STUDIO 是一個離線、免帳號、所見即所得的 IG 貼文產生器。專為中文內容創作者設計：一套**自動排版引擎**幫你處理字級、斷行、避頭尾與對比度，讓你專注在文字本身，匯出即是 1080px 的高解析 PNG / JPG。

🌐 **[網頁版 / 手機版 → hao0321.github.io/typo-studio](https://hao0321.github.io/typo-studio/)**（手機瀏覽器選「加入主畫面」即可當 App 用）
📖 **[完整使用教學 → TUTORIAL.md](TUTORIAL.md)**（App 內按 `?` 也有快速教學）

![cover](assets/cover.png)

---

## ✨ 功能特色

### 自動排版引擎（v2 全新）
- **自動字級填滿**：標題依內容長度自動縮放，永不溢出、也不會留下大片空白。
- **中文避頭尾（kinsoku）**：標點符號（。，、！？」』等）不會出現在行首；開引號（「『（等）不會留在行尾。
- **平衡換行（text-wrap: balance）**：多行標題自動均衡每行寬度，不再「上長下短」。
- **英文 / 數字不斷詞**：`Canva`、`2026`、`ChatGPT` 等不會被從中間拆開。
- **一鍵自動修正排版**：工具列 `✨ 排版` 一鍵修正當前頁；`✨全部` 修正整份輪播（正規化空白、自動字級、對比度）。
- **即時對比度檢查**：WCAG 對比值即時顯示，過低時一鍵套用最佳文字色。

### 多頁輪播編輯
- 8 種頁型：**封面、圖上文下、文上圖下、左圖右文、左文右圖、條列/步驟、金句、結尾 CTA**。
- **一鍵整組輪播**：知識懶人包 / 教學步驟 / 金句語錄 / **產品開箱**（v2.2）/ **常見錯誤**（v2.2），一鍵生成完整 5 頁結構。
- 頁面**新增 / 複製 / 刪除 / 拖曳排序**（縮圖直接拖、或 ← → 按鈕）。
- **樣式套用到全部頁面**（v2.1）：一鍵統一整組配色、字型與行距。
- 內建大量封面 / 內文 / 金句 / CTA 模板與配色組合。

### 設計控制
- 22 種 Google Fonts（中文 / 襯線 / 無襯線 / 特殊），即時預覽；**標題 / 內文可分開設定字型**（v2.2）。
- **文字對齊**（v2.2）：圖文頁可切換靠左 / 置中。
- **帳號標記套用到全部**（v2.2）：`@handle` 一鍵同步整組輪播。
- **背景照片**（v2.1）：任何頁型皆可上傳背景圖，自動加暗化遮罩（0–80% 可調）與文字陰影保持可讀。
- **行距控制**（v2.1）：0.8x–1.6x，預覽與匯出同步。
- 強調色、文字色、背景（純色 + 漸層）、7 種封面裝飾（線條 / 圓點 / 方框 / 外框 / 四角 / 格線 / 斜角）。
- `{hl}文字{/hl}` 語法做局部高亮。
- 三種比例：1:1 (1080×1080)、4:5 (1080×1350)、9:16 (1080×1920)。
- **安全區參考線**（v2.1）：顯示 IG 介面遮擋區（限預覽），重要文字不被頭像與工具列蓋住。

### 匯出與專案
- 匯出單頁（PNG / JPG）或 **整組打包成一個 ZIP**（v2.1，內含專案檔可再匯入續編）。
- 複製到剪貼簿（PNG）。
- **專案匯入 / 匯出 JSON**，跨裝置續編。
- 自動儲存（localStorage）、復原 / 重做（Ctrl+Z / Ctrl+Y）。

### 內建教學（v2.1)
- 首次啟動自動顯示快速上手教學，之後隨時按頂欄 `?` 重看。

### 快捷鍵
| 快捷鍵 | 功能 |
| --- | --- |
| `Ctrl/⌘ + Z` | 復原 |
| `Ctrl/⌘ + Y` / `Ctrl+Shift+Z` | 重做 |
| `Ctrl/⌘ + D` | 複製當前頁 |
| `← / →` | 切換上一頁 / 下一頁 |

---

## 🚀 安裝使用

### 網頁版 / 手機版（免安裝，v2.2）
直接開 **<https://hao0321.github.io/typo-studio/>**：
- 電腦瀏覽器：功能與桌面版相同（匯出、ZIP、專案 JSON 都在瀏覽器內完成，檔案不會上傳到任何伺服器）。
- 手機：介面自動切換為行動版（預覽在上、編輯抽屜在下）。用 Safari / Chrome 選單的「**加入主畫面**」安裝成 PWA，即可全螢幕、離線使用。

### 下載安裝檔（一般使用者）
到 [Releases](https://github.com/Hao0321/typo-studio/releases) 下載對應平台的安裝檔：

| 平台 | 檔案 |
| --- | --- |
| Windows | `TYPO STUDIO Setup x.y.z.exe`，雙擊安裝 |
| macOS（Intel / Apple Silicon 通用） | `TYPO STUDIO-x.y.z-universal.dmg`，拖進「應用程式」即可 |

> ⚠️ 兩個平台的安裝檔目前都**沒有付費簽章憑證**（個人開源專案）。
> - **Windows**：SmartScreen 可能跳「不明發行者」，按「較多資訊」→「仍要執行」。
> - **macOS**：Gatekeeper 會擋下「無法驗證開發者」。第一次開啟請在「應用程式」資料夾對 App 圖示 **右鍵 → 開啟**（而非直接雙擊），或到「系統設定 → 隱私權與安全性」點「仍要打開」。之後即可正常雙擊啟動。

### 從原始碼執行（開發者）
```bash
npm install
npm start          # 啟動桌面版（Electron，當前系統）
```

### 打包安裝檔
```bash
npm run dist       # 編譯 JSX → 依當前系統產生對應安裝檔到 dist/
npm run pack       # 只打包未壓縮資料夾（除錯用）
```
> `npm run dist` 會先執行 `npm run compile`（babel 把 `vendor/app.jsx` 編譯為 `vendor/app.compiled.js`），再由 `electron-builder` 打包。
>
> **⚠️ 跨平台限制**：`electron-builder` 只能在對應系統上打包該系統的安裝檔——macOS 版（`.app` / `.dmg`）**必須在 macOS 上編譯**（symlink + 程式碼簽章是 macOS 專屬工具），無法在 Windows／Linux 上跨編。本專案透過 [`.github/workflows/release.yml`](.github/workflows/release.yml) 用 GitHub Actions 的雲端 macOS / Windows runner 自動編譯兩個平台的安裝檔，並附加到對應的 GitHub Release：
> - Push 一個 `v*` tag 會自動觸發雙平台建置。
> - 也可以到 [Actions 頁面](https://github.com/Hao0321/typo-studio/actions/workflows/release.yml)手動 `Run workflow`，指定要附加安裝檔的 release tag。

---

## 🛠 技術架構

```
main.js              Electron 主程序（建立視窗）
preload.js           contextIsolation 安全橋接
index.html           入口；載入 React + 編譯後 App
vendor/
  app.jsx            ← 唯一的應用程式原始碼（React，全域 React、無 import）
  app.compiled.js    ← babel 編譯輸出（index.html 實際載入）
  react.min.js       React 18 UMD
  react-dom.min.js   ReactDOM 18 UMD
build-icon.js        產生 App 圖示
assets/              圖示與封面
```

- **無打包器**：刻意維持零 bundler。`vendor/app.jsx` 用 `@babel/preset-react` 編成一個檔，由 `index.html` 直接載入，方便閱讀與 hack。
- **單檔應用**：所有 UI、預覽渲染與 Canvas 匯出邏輯都在 `vendor/app.jsx`，預覽（DOM）與匯出（Canvas）共用同一套排版引擎以維持一致性。

### 修改原始碼的流程
1. 編輯 `vendor/app.jsx`
2. `npm run compile`（或 `npm run dist` 連同打包）
3. `npm start` 預覽

> ⚠️ 不要手改 `vendor/app.compiled.js`，它是編譯產物、會被覆蓋。

---

## 📝 字型說明（離線）
字型透過 Google Fonts CDN 載入，**首次需連網**以取得自訂字型；離線時會回退為系統預設字體，版面仍可正常運作與匯出。

---

## 🤝 貢獻
歡迎 issue 與 PR。請只修改 `vendor/app.jsx` 並附上 `npm run compile` 後的結果，或在 PR 說明中註明已編譯。

## 📄 授權
[MIT](LICENSE) © 2026 hao0321_studio
