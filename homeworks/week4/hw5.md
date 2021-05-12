## 請以自己的話解釋 API 是什麼

API 是應用程式介面，用來接受請求然後告訴系統要做些甚麼。我們透過介面和他人進行溝通。
舉例來說 : USB 是一個介面，電腦依據這個介面去實作如何拿、存資料；製作 USB 的廠商，透
過這個介面去製作如何存取資料。所以 API 又可以分成 : 使用 API 、 提供 API。

總結 : API 的本質是溝通，在介面上進行交換資料，

## 請找出三個課程沒教的 HTTP status code 並簡單介紹

1. 422 (Unprocessable Entity) : 請求格式正確，但含有語意錯誤，無法回應

2. 408 (Request Timeout) : 請求逾時。根據 http 規範， client 沒有在 server
預備等待的時間內完成一個請求的傳送， client 可以隨時再次提交這一類請求而無需
進行任何更改。

3. 409 (Conflict) : 因為請求存在衝突，而無法處理該請求，如多個同步更新之間的編輯衝突。


## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

BASE URL : XXX

1. 回傳所有餐廳資料 : method = get 、 path = /resturants 其中參數 _limit: 限制回傳資料數量，default = 10, max = 100，範例 : /resturants?_limits=50

2. 回傳單一餐廳資料 : method = get 、 path = /resturants/:id ， 範例 : /resturants/100

3. 刪除餐廳 : method = delete 、 path = /resturants/:id

4. 新增餐廳 : method = post 、 path = /resturants 其中參數 name : 書名

5. 更改餐廳 : method = patch 、 path = /resturants/:id 其中參數 name : 書名
