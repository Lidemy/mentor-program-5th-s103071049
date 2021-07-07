## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫

加密可以透過解密，還原原本的密碼，但雜湊經過解密不一定能夠還原出原本的密碼。原因是因為加密、雜湊的背後原理不同。

加密是將輸入的東西，經過一對一的函式轉換變成輸出。換句話說，我只要找到加密函式的反函式，我就可以將輸出的結果變回輸入。舉例來說: 輸入的密碼為 x 是數字，透過 x+1 這個函式產生輸出，所以我只要將輸出的結果-1 就會得到原本的輸入。

雜湊是將輸入的東西，經過多對一的函式轉換變成輸出。換句話說，不同的輸入經過相同的函數轉換可能產生相同的結果，這邊產生相同的結果我們叫他碰撞，也因為碰撞所以無法找到反函數推回原本的輸入。可以理解成無限的組合對應到有限的結果。舉例來說：任意數字經過除以 9 得到的餘數就是雜湊過的結果。 1 除以 9 餘 1，10 除以 9 也餘 1，所以無法從 1 這個密碼去推測我位雜湊前的密碼究竟是甚麼。

密碼要經過雜湊存入資料庫，是因為資安。要是有一天資料庫被駭客攻破，也能好好的保護使用者的資料，避免駭客拿著使用者的明碼到其他網站亂試。

但有可能駭客將多組雜湊後的結果、相對應的輸入存在表格中，為了避免這樣的情況，並更好的保護使用者的資訊，會將密碼再經過加鹽。加鹽就是將明碼先加一連串亂數進行處理。透過加鹽再去雜湊，安全性就會大幅提升。這也是為甚麼，忘記密碼時需要重新辦一個新的，後台無法將你原本的密碼寄回給你

## `include`、`require`、`include_once`、`require_once` 的差別

我們可以使用別人寫好的函式，或是將檔案中常用的函式獨立，並使用指令將他們拉進來，這樣的好處是程式碼會更好維護與閱讀。

兩種指令可以執行上述的動作:　include, require

### 一、 `include`
可以使用 include 來要求 PHP 抓取一個特定檔案，並載入他的所有內容。但，我每發一個 include 指令，他都會再次 include 檔案，就算這個檔案已經被插入。舉例來說: library.php 有許多好用的函式，我將它 include 到自己的檔案，但我另外也 include math.php 這個函式庫，而 math.php 也 include library.php，因為嵌套的關係，我無意間 include library.php 兩次，這會產生錯誤。

為了避免重複多次定義同樣的常數或函式，可以使用 include_once

### 二、 `include_once`
只 include php 檔案一次，後續若 include, 或 include_once 相同檔案，會被完全忽略。為了確認該檔案是否已被執行，當 php 解析所有相對路徑後，會比較絕對路徑，並在你 include 路徑中尋找那一個檔案。

### 三、 `require`
include 指令最大的問題在於: php 只會試著 include 所要求檔案。就算找不到那個檔案，程式還是會繼續執行。所以絕對需要 include 某個檔案，就使用 require 指令。同理，為了避免嵌套問題、重複多次定義同樣的常數或函式，可以使用 require_once。

### 四、 `require_once`
只 require php 檔案一次，後續若 require, 或 require_once 相同檔案，會被完全忽略。為了確認該檔案是否已被執行，當 php 解析所有相對路徑後，會比較絕對路徑，並在你 require 路徑中尋找那一個檔案。

### 五、比較差異
所以，include、require、include_once、require_once 有甚麼差別呢？

include 指令系列，就算找不到 include 的檔案，程式碼仍會執行。所以絕對需要 include 某個檔案，就要使用 require 系列。

指令有 once 可以解決碰到多次 include 或 require 同一個檔案的問題。這也是為甚麼大部分人都不使用基本 include 陳述句 或 require 陳述句。

參考資料: OREILLY PHP, MySQL 與 JavaScript 學習手冊 p101~102

## 請說明 SQL Injection 的攻擊原理以及防範方法

### 一、攻擊原理：
藉由輸入字串中夾帶惡意指令，試圖改變 sql 語法上的邏輯，得以非法破壞、入侵 server，竊取使用者的機密資料，若駭客取得系統權限，甚至可以癱瘓全系統。

舉例來說，我們有一個這樣的登入驗證
```php
  $user = $_POST['user'];
  $pass = $_POST['password'];
  $query = "select * from users where username = '$user' and password = '$pass'";
```
如果只輸入帳號，不輸入任何密碼
```php
$user = admin'#;
$query ="select * from users where username = '$user' and password = '$pass'"; 
```
這個時候 query 就變成了
```php
$query = "select * from users where username = 'admin'#' and password = ''";
```
從米字號後面，都變成註解。

所以使用者可以用 admin 的身份登入，且不輸入任何密碼。

再舉個例子，如果我們有這樣的刪除驗證
```php
  $user = $_POST['user'];
  $pass = $_POST['password'];
  $query = "delete * from users where username = '$user' and password = '$pass'";
```
如果這時對 user 輸入 anything' or 1 = 1 #，不輸入任何密碼

MySQL 會解讀成刪除 users 資料庫所有資料。
```php
$query = "delete * from users where username = 'anything' or 1 = 1 #' and password = ''";
```
### 二、防範方式：佔位符號
透過使用佔位符號，達成將送出的資料不可以解讀成 MySQL 陳述式的目的。

佔位符號是預先準備的陳述式裡面的位置，資料會從那裡直接送到資料庫。

#### 如何使用佔位符號這項技術 ?

第一步、準備在 MySQL 中執行的陳述式，在陳述式中用 `?` 表示引用資料的地方。直接做會比較麻煩，所以大家通常使用 mysqli 的現成方法 prepare 處理佔位符號
```php
  $stmt = $conn->prepare('insert into users values(?, ?, ?)');
```

第二步、將回傳的物件 stmt 裡的問號換成資料傳給 server

```php
  $username = 'test';
  $cost = '100';
  $address = 'usa';

  $stmt->bind_param('sis','insert into users values($username, $cost, $address )');
```
bind_param 的第一個參數是字串，裡面的字元依序代表各個參數的型態。 i for integer, s for string, d for double float, b for boolean(且將以封包傳送).

第三步、將資料傳給 MySQL 步驟一、二，已完成執行陳述式的準備，這時會透過 $stmt 物件的 execute() 方法將資料傳給 server

```php
  $stmt->execute();
```
第四步、確認 execute() 指令執行成功

```php
  print_r('row inserted', $stmt->affected_rows);
```
第五步、關閉 $stmt 物件 陳述式執行成功、或處理任何錯誤後，即可關閉 $stmt 物件
```php
  $stmt->close();
```
第六步、關閉 $conn 物件 (如果再也用不到)

```php 
 $conn->close();
```
##  請說明 XSS 的攻擊原理以及防範方法
### 一、攻擊原理：
將使用者輸入的東西當作程式碼，會發生在我們允許使用者輸入 html 或 js 並在網頁上顯示他們時發生。

### 二、防範方式：
將所有使用者可以調控內容的地方都用 htmlspecialchars( ) 或 htmlentities( )，這樣一來會去掉所有 html 標記碼，換成可顯示字元但不允許瀏覽器作用的東西。

## 請說明 CSRF 的攻擊原理以及防範方法
### 一、攻擊原理：
駭客藉由用戶已經登入的狀態，在用戶登入的網站操作敏感、隱私功能。駭客之所以能夠這麼做，是因為用戶登入的網站，驗證不夠。因為用戶已經登入且用戶的信息存在 cookie 中，所以駭客可以在不知道用戶的信息下跳過驗證。

詳細地說明 csrf 原理：因為瀏覽器的機制，發送 request 給某個網域，就會把相關的 cookie 一起帶上。如果使用者是登入狀態，這個 request 就一定包含它的資訊(ex:session_id)，這個 request 看起來就像本人發送的。

### 二、防範方式：
要能夠完美的防禦必須具備：(a)發出請求時，駭客不能偽造信息 (b) 這個信息不存放在 cookie 中

以下常見的防禦方式：

1) 使用 POST： 但攻擊者只要構建出 FORM 或是 iframe 還是可以被攻擊的。

2) 加入驗證碼

3) 驗證 Referer： 因為 http 協定 Referer 可以記錄當前一次請求的來源地址。又因為攻擊者要攻擊只能在自己的站點構造請求，所以他傳過來的 referer 和當前 referer 不同，後端就直接拒絕請求。嚴格一點，請求必須從某個網頁過來，若不是就直接拒絕。但這樣驗證的攔截器也有破洞，因為 referer 的值是由瀏覽器提供，在某些瀏覽器上是可以在發出請求時竄改 referer，從而跳過驗證。

4) anti csrf token：透過在 http 的 head 或 form 表單中加入一個隨機產生的 token。這個 token 儲存在 server，並透過攔截器去驗證是否有效，驗證失敗就認為這是一次 csrf 攻擊並拒絕這個請求。最後，每次 token 驗證後就要銷毀，避免駭客存取。

5) 加入自訂義的 header：本質同第四種，不同之處在於第四種有可能是透過 form 傳輸，但第五種一定是透過 header 傳輸。自訂義的 header 也可以產生隨機的 token。

使用 token 防禦，要確保 token 的保密性與隨機性，他才會產生防禦效果。