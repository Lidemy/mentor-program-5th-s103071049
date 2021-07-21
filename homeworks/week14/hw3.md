## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？

DNS 全名是 Domain Name System，主要功用是將域名轉成 IP 位置。可以將 DNS server 作為一個分散式資料庫。

* 域名 (Domain):　人們好記憶的網域名稱，如：www.amazon.com
* IP address : 機器讀取的地址，也是網路溝通的地址。如：192.0.2.44

## 對 google 的好處
1. 透過搜尋引擎蒐集大數據，藉以分析使用者行為
2. 可提供更符合該地區的資料，或投放更精準的廣告

## 對一般大眾的好處
1. 使用免費
2. 加速瀏覽體驗：改變快取機制，會在 TTL 到期前域抓 prefetch，所以不用等待 DNS 的查詢時間，對於需要開啟一個多次 DNS 的網頁會有明顯的差異。
3. 提升網路安全性：因為 GOOGLE PUBLIC DNS 控管比一般的 ISP 更嚴格，如此可以減少 DNS Injection 的機會。
4. 直接取得 dns 查詢結果：因為已經快取就不需查詢上層 dns 紀錄

## 什麼是資料庫的 lock？為什麼我們需要 lock？
多筆交易在資料的讀取與寫入時，彼此會相互影響。因此為了交易的並行性與獨立性，需要透過記號來標記資料狀態正在被讀取或寫入，其他交易則根據這個記號來決定是否等待該狀態結束或直接讀取該資料。這個記號就是所謂的 lock。但由於鎖定後需要等待執行，因此也需要考慮效能的耗損。

因為很多東西是非同步，考慮到有可能多個 request 同時到達 server，而 server 又同時處理這些 request, 所以我們會需要 lock。

舉例來說，當商品數量固定為了避免超賣的情況，若能在交易時加上 lock，即可以避免同時讀取與寫入同一筆資料時產生的資料衝突。

範例代碼：
select 後面加上 for update，故在 for update 就會將東西 lock 住。假設有兩個東西都在執行這個 query，先執行的就會往下跑，後執行的會停在這邊等，等第一個執行回來後才會往下跑。
```php
$conn->autocommit(FALSE); 
$conn->begin_transaction();
$conn->query('SELECT amount FROM products for update');
$conn->commit();
```
## NoSQL 跟 SQL 的差別在哪裡？
NoSQL 與 SQL 的差異在於

1. NoSQL 沒有 Schema 而是透過 Key-value 儲存資料，可以想像成存 JSON 資料進 database
2. NoSQL 不支援 JOIN
3. NoSQL 通常用來存取結構不固定的資料，如：logNoSQL 增加機器就能自動擴充資料庫容量
4. NoSQL 大多沒有 transaction 的設計，而是採取 CAP 理論。
5. NoSQL 採取 Eventually Consistency，因為分散式設計會將資料分散複製到不同的節點，每個節點也能各自異動資料，然後再彼此同步，同步過程就會有時間差，所以如果同時讀取不同節點上的資料，就會發生資料不一致的情況。

## 資料庫的 ACID 是什麼？
為了確保交易的正確性，執行資料庫事務必須符合四個特性，這四個特性合稱 ACID

1. atomicity : 要嘛全部成功或全部失敗
   如：A 轉 100 給 B，成功的話 A 少 100，B 多 100 ，失敗的話甚麼事情也不會發生  
2. consistency : 透過通過 AID 保證資料的一致性
   如：交易前後金額總數不會改變
3. isolation : 多筆交易不會互相影響，也就是不能同時變動同一個值
   如：戶頭只有 100，不能同時轉 100 給 A 和 B，會發生負值的系統錯誤
4. durability : 交易成功後，寫入的資料不會不見
