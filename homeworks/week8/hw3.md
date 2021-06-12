## 什麼是 Ajax？

Asynchronous JavaScript and XML 縮寫 Ajax，任何非同步與伺服器交換資料的 JS 方式都可以叫做 AJAX。
Ajax 的資料格式並不僅限於 XML，只是早期透過 XML 作為資料格式，所以用 Ajax 命名。

最原始，我們是透過表單與伺服器要資料，這個方法的問題點在於浪費許多資源(頻寬)，當送出表單時，就向
server 發出請求，server 收到請求處理完後回傳 respone，但因為前後兩個頁面的大部分 html 往往相同，
所以存在著優化空間，如何降低拿到資料的時間。

透過 js 發 request 到 server 然後拿到結果就可以解決上述問題。換句話說，僅需向伺服器傳送必須取回的
必要資料，並在 client 端以 js 處理 server 回應，就可以大幅減少伺服器與瀏覽器間的交換資料量，也因此
伺服器的回應就會更快了，這樣的方式就叫 Ajax。

## 用 Ajax 與我們用表單送出資料的差別在哪？

兩者都是透過瀏覽器發 request 到 server，server 回傳給瀏覽器，但使用 Ajax 瀏覽器會再將這個 response 
轉傳給 js，而使用表單送出資料，瀏覽器會直接將收到的資料渲染出來。

## JSONP 是什麼？

全名 JSON with Padding, 是 JSON 的一種使用方式，可以讓網頁跨網域的取得資料。

因為某些標籤不受同源政策的影響，例如 `<script></script>`，我們可以 load 一個 script，假設 user.js 
是他回傳的內容，回傳的內容可以是一個 function, function 內夾帶回傳的資料，回傳的資料為 js 物件資料，
會在 server 端進行填充，client 端就可以用 function 拿到資料。

## 要如何存取跨網域的 API？

1. server 端加上 `Access-Control-Allow-Origin: *`
2. 用 node.js 發 request
3. JSONP

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

因為這週我們是透過瀏覽器發 request 到 server，基於資安瀏覽器會幫我們加上限制，也因此我們就碰到了跨網域
問題，也就是同源政策的限制。
