## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼
varchar 可變長度，可以設置最大長度；text 沒有默認值，最大長度是 2^16-1。
根據上述特性，能用 varchar的地方就盡量不用 text，varchar 可以較省空間。

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

Cookie 是瀏覽器裡面存資訊的地方，他是一個小型文字檔，會自動帶到 server 去。之所以需要 Cookie ，是因為 HTTP 的無狀態性，為了能夠克服無狀態性，讓瀏覽器記憶 before and after，我們靠 session 作為橋梁，透過其中一種叫做 cookie 的方式在記憶資訊。

瀏覽器將 cookie 帶上 server 的過程？
### step1
瀏覽器發出 request
### step2
cookie 經由 server 設定，server 回傳一個 response header Set-Cookie 叫瀏覽器設定 cookie，瀏覽器收到後就會自己設定好 cookie。所以如果沒有使用瀏覽器，一般來說是沒有設定 cookie 這件事。
### step3
之後再訪問同樣的頁面，瀏覽器會自動把符合條件的 cookie 帶上來。符合條件是指 cookie 未過期、domain 與 path要符合。因此，server 看到 cookie 就會知道對方是誰。

### 結論：可以透過 cookie 這個機制來維持狀態、實作登入機制。


## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？
### (1) 可讀性 : 
php 與 html 混著寫，不太好維護。
### (2) 除錯機制 : 
帶在 query string 上可以任意更改裡面的參數，如果可以將錯誤紀錄抓到後台、或者引入一個 errCode 的 file，自動對應所有錯誤，就像 excel 的 v-lookup，可以使產品更細膩。
### (3) 同一時間多人同時登入，server 當掉：
需要設計一個排隊機制，不管是假排隊或是真排隊。