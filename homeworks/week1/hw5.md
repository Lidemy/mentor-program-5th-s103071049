## 請解釋後端與前端的差異。

前端是指瀏覽器有關的範疇，為我們眼睛看的到網頁渲染顯示的部分，包括了html內容、css網頁裝飾、js與頁面的互動

後端則是指server去問資料庫提取資料，回傳response給硬體，我們眼睛看不到的部分


## 假設我今天去 Google 首頁搜尋框打上：JavaScript 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。

(1) 瀏覽器請作業系統問，作業系統請硬體問，硬體依照輸入的字問DNS sdrver JavaScript怎麼走

(2) DNS server回傳對應的IP位置

(3) 瀏覽器請作業系統送request，作業系統請硬體(網路卡)送出request，硬體再對server send request 到對應的IP位置

(4) 位於對應位置IP的server收到request

(5) server再去問資料庫，查詢我要找的關鍵字

(6) 資料庫找到後，回傳資料給server

(7) server 回傳response給硬體，硬體再回傳response給作業系統，作業系統再回傳response給瀏覽器

(8) 瀏覽器解析回傳的資訊，並於頁面渲染顯示出來

## 請列舉出 3 個「課程沒有提到」的 command line 指令並且說明功用

(1) sort "檔案名" : 對數據進行排序

(2) xcopy : 資料夾複製命令

(3) mdelete : 刪除遠程電腦的檔案，如 : mdelete rmote-file
