# 字型處理與解析 (Font Parsing)

TYPO STUDIO 提供多種字型選擇，包括中文、襯線、無襯線及特殊字體。字型的載入與處理機制設計為在連線與離線狀態下皆能運作。

## 字型分類與來源

系統內建 22 種來自 Google Fonts 的字型，並分為以下四大類：
- **中文** (例如：Noto Sans TC, LXGW WenKai TC)
- **襯線** (例如：Playfair Display, Cormorant Garamond)
- **無襯線** (例如：Bebas Neue, Oswald)
- **特殊** (例如：Monoton, Press Start 2P)

字型透過 Google Fonts CDN 載入。

## 載入與退回機制 (Fallback Mechanism)

- **首次連網需求**：應用程式首次啟動時需要連網，以從 Google Fonts 取得並快取自訂字體。
- **離線支援**：一旦字型被快取，或在完全離線的環境下，系統會自動回退 (fallback) 至系統預設字體（例如：`sans-serif`, `serif`）。
- **無縫降級**：即使在離線狀態下無法載入特定 Web Font，排版引擎與匯出功能仍能正常運作，確保版面與內容不會損壞。
