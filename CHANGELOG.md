# Changelog

本專案版本遵循 [Semantic Versioning](https://semver.org/lang/zh-TW/)。

## [2.1.0] — 2026-07-04

### 新增 — 功能大擴充
- **一鍵整組輪播**：三組完整輪播模板（知識懶人包 / 教學步驟 / 金句語錄），一鍵生成 5 頁結構，兩段式確認防誤觸。
- **背景照片**：任何頁型可上傳背景圖；自動疊加可調暗化遮罩（0–80%）與文字陰影，預覽與 Canvas 匯出完全同步。
- **行距控制**：0.8x–1.6x 滑桿，貫穿全部 8 種頁型的預覽與匯出。
- **ZIP 匯出**：`ALL` 改為打包單一 ZIP（內建零依賴 ZIP writer），內含每頁圖檔 + 專案 JSON。
- **拖曳排序**：頁面縮圖直接拖曳調整順序。
- **樣式套用到全部**：一鍵把當前頁的配色 / 字型 / 行距同步到整組。
- **安全區參考線**：IG 介面遮擋區預覽（9:16 顯示上下 UI 區域），僅預覽不匯出。
- **內建教學**：首次啟動自動顯示快速上手，`?` 按鈕隨時重看；新增完整 `TUTORIAL.md`。
- 匯出格式（PNG/JPG）偏好會被記住。

### 新增 — macOS 支援
- `package.json` 新增 `mac` 打包設定（universal dmg / zip，同時支援 Intel 與 Apple Silicon），`identity: null` + `hardenedRuntime: false`（個人開源專案，無 Apple Developer 簽章憑證）。
- 新增 1024×1024 版本的 App 圖示 `assets/icon-mac.png`（macOS `.icns` 需要遠高於 Windows `.ico` 的解析度）。
- 新增 GitHub Actions workflow（`docs/release-workflow.yml` 為參考副本，live 檔在 `.github/workflows/release.yml`）：push `v*` tag 或手動觸發，用雲端 macOS / Windows runner 分別編譯兩平台安裝檔並附加到 Release（`electron-builder` 無法在 Windows 上跨編 macOS 版）。
- `TUTORIAL.md` 含 macOS 安裝與 Gatekeeper 排除教學。

## [2.0.0] — 2026-06-15

### 新增 — 自動排版引擎
- **中文避頭尾（kinsoku）**：標點不落行首、開引號不落行尾。
- **平衡換行（text-wrap: balance）**：多行標題自動均衡行寬。
- **英文 / 數字不斷詞**：ASCII 單字與數字視為不可拆 token。
- **一鍵自動修正排版**：`✨ 排版`（單頁）與 `✨全部`（整份）— 正規化空白、自動字級填滿、對比度自動修正。
- **即時對比度檢查**：樣式面板顯示 WCAG 對比值，過低可一鍵套用最佳文字色。
- 文字量測快取（measure cache），預覽與匯出效能提升。

### 新增 — 功能擴充
- 兩種新頁型：**金句（quote）** 與 **結尾 CTA（cta，含行動按鈕膠囊）**。
- 新裝飾樣式：**四角（corners）**。
- 頁面**重新排序**（← → 按鈕 / 快捷鍵）。
- **專案匯入 / 匯出 JSON**，跨裝置續編。
- **JPG 匯出**選項（PNG / JPG 切換）。
- 快捷鍵：`Ctrl+D` 複製頁、`← / →` 切換頁。
- 更多封面 / 內文 / 金句 / CTA 模板、強調色與漸層背景。

### 修正
- 修正自動儲存時把內嵌圖片 base64 **截斷成毀損圖片**的問題（改為配額不足時保留版面、捨棄圖片）。
- 修正 `index.html` 與字型分類箭頭的無效色值 `#4040660` → `#404066`。
- 移除原始碼中誤入的 NUL 位元組（量測快取分隔符）。

### 工程 / 開源
- 新增 `npm run compile` 與 `npm run dist`（先編譯再打包）可重現建置流程。
- 移除未使用的 `vendor/babel.min.js`（瘦身安裝檔）與過時的 `ig-text-studio.jsx`。
- 新增 `README.md`、`LICENSE`(MIT)、本 `CHANGELOG.md`。

## [1.2.0] — 2026-04-16
- 多頁輪播編輯、6 種頁型、自動縮放排版、Canvas 匯出基礎版本。
