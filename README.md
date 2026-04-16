# Homograph Attack Awareness Demo

一個用來向同事示範 IDN Homograph Attack 的教學頁面。中英文切換、單頁、純靜態。

## 本機預覽

直接用瀏覽器打開 `index.html` 就能看。或跑個簡單的 local server:

```bash
python3 -m http.server 8000
# 打開 http://localhost:8000
```
## For FPCUSA Coworker who wants to create the site again using this template -- by Ted 4/16/2026 
## 部署到 Vercel(最快) 

### 方法 A:Vercel CLI(最快,約 2 分鐘)

```bash
# 安裝 CLI(如果還沒裝)
npm install -g vercel

# 在專案資料夾裡
cd homograph-demo
vercel

# 第一次會問幾個問題,全部按 Enter 用預設值就好
# 部署完會給你一個 https://xxx.vercel.app 網址
```

之後要更新就跑 `vercel --prod`。

### 方法 B:從 GitHub 連動(適合之後要持續更新)

1. 把這個資料夾推到一個 GitHub repo
2. 到 https://vercel.com/new
3. Import 那個 repo
4. Framework Preset 選 **Other**(因為是純靜態)
5. Build Command 留空,Output Directory 留空
6. 按 Deploy

### 方法 C:拖拉上傳(最簡單,適合一次性)

1. 把整個 `homograph-demo/` 資料夾壓成 zip
2. 到 https://vercel.com/new
3. 直接把 zip 拖進去

## 檔案結構

```
homograph-demo/
├── index.html       ← 主頁面(中英雙語,含所有內容)
├── vercel.json      ← Vercel 設定(security headers)
└── README.md        ← 這份文件
```

## 給同事看的時候怎麼講

建議流程:

1. **打開頁面,直接問**:「下面這兩個連結,哪一個是假的?」
   → 99% 的人答不出來或猜錯
2. **請他們點第二個** → 看網址列變成 `xn--fpcus-8ve.com`
3. **解釋原理**:西里爾 а vs 拉丁 a,兩者在螢幕上完全一樣
4. **連回 Booking.com 詐騙案例** → 這就是近期新聞裡飯店住客被騙的手法
5. **收尾講防禦**:MFA、不點訊息連結、檢查網址最右邊的根網域

## 注意事項

- 點「假連結」會 404 或被瀏覽器擋下來 —— 這是**預期行為**,不是 bug
- 如果瀏覽器直接把顯示文字也變成 `xn--` 版,表示它的 Homograph 防護正在工作
  → 這本身就是一個好的教學點
- 頁面已設定 `noindex` —— 不會被搜尋引擎收錄

## 自訂

- 想換成公司真正的 Logo:替換 `index.html` 中 `.brand-mark` 區塊裡的 SVG
- 想加更多範例字:在 `.char-table` 區塊照格式加
- 想換配色:改最上面 `:root` 裡的 CSS 變數
