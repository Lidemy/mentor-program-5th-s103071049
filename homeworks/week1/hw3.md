## 教你朋友 CLI

## 一、command Line 是什麼

command Line 是一種透過純文字操控電腦的方式，早期的作業系統無圖形化介面(GUI)，所以會透過CLI (Command Line Interface)去操控電腦。某些功能透過CLI會較為快速，另外並不是所有程式都有GUI，例如:連線到server。故，我們需要學習如何CLI操控電腦。

## 二、command Line 如何使用

command Line是透過指令的方式操控電腦，以下為常用指令，另可透過google了解更多用法

1) 基本指令
  
   - ls : 印出資料夾底下檔案；ls -al : 印出所有資料夾底下檔案
   - pwd : 印出所在位置
   - cd : 切換資料夾
   - man : 使用說明 (windows無此指令)

2) 檔案操作相關指令
   - touch : 建立檔案或更改時間
   - rm : 刪除指令， ( rm <file> ；rmdir 資料夾名稱 ；rm -r 將底下所有檔案都清除)
   - mkdir : 建立資料夾
   - mv : 移動檔案或改名
   - cp : 複製檔案
   
3) 文字編輯器 (vim or vi)
   - 說明 : i為insert模式；esc為普通模式(可複製、刪除)；:wq (存檔離開)；q (quit離開)
   - cat : 連接檔案。只有一個參數時，會印出該檔案所有的內容
   - less : 分頁印出檔案

4) 其他指令
   - grep : 抓取關鍵字
   - wget : 下載檔案/網頁原始碼
   - curl : 送出request，goal=測試api
   - date : 印出時間
   - top : table of process 印出所有process，goal=檢視電腦狀況
   - echo : 印出字串
   - > (redirection) : 透過箭頭將左邊的輸入，重新導向到右邊的地方，會蓋掉原本右邊的內容
   - >> (redirection) : 透過箭頭將左邊的輸入，重新導向到右邊的地方，會於右邊新增輸入的內容，相當於append
   - | (pipe) : 將左邊指令的輸出，變成右邊指令的輸入

## 三、h0w 哥的功能如何完成

step 0、於電腦安裝好git bush (command line interface)
step 1、git bush (command line interface)輸入 mkdir wifi 
step 2、cd wifi
step 3、touch afu.js

