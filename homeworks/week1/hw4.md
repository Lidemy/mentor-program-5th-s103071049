## 跟你朋友介紹 Git

## 一、 GIT基本概念

   GIT 是一個做版本控制的程式，他可以管理不同的版本、查看歷史紀錄、管理Branch進行多人協作。
  
   GIT只是做下列事項 : 

   (1) 需要新版本 : 開一個新的資料夾

   (2) 不想加入版本控制 : 不要加入資料夾

   (3) 避免版本衝突 : 以看似亂數絕對不重複的編碼邏輯，作為資料夾的名稱

   (4) 如何知道最新版本號 : 用一個檔案儲存

   (5) 如何知道歷史紀錄 : 用一個檔案來記錄他的順序


## 二、 基礎使用

   (1) 初始化 : git init，目的為建立.git資料夾放入預先建立好的東西

   (2) 建立不想加入版本控制的資料夾 : .gitignore

   (3) 加入版本控制 : git add .

   (4) 建立一個新版本 : git commit -am "檔案名"

   (5) 切換版本 : git checkout

   為了保持master的穩定性，我們會將要調整的部分、更改的功能放在branch上，確定branch穩定後再將兩個merge再一起。
   
   所以菜哥如果有要新增的笑話，新增的笑話在確定好笑前會不斷做一版、二版、三版......的修改，就可以放在merge上，
   
   等到笑話定稿後再將他與已經定稿在master上的那些笑話進行合併。

   RMK : 

   (1) 專案建立後有新檔案，需要git add . 再 git commit -am "檔案名" ；無新檔案但更改現有檔案，需要git commit -am "檔案名"

   (2) 基礎指令 : 
      
       * 檢視現在狀態 :　git status

       * 合併 : git merge，若合併的檔案有conflict，人工調整

       * 不要更改後的狀態 : git reset Head^

       * 查看歷史紀錄 : git log

       * 開新的branch : git branch

       * 檢視最新的commit訊息與版本號 : git branch -v

       * 刪除branch : git branch -d

       * 修改branch 名稱 : git branch -m

## 三、 GIT & GitHub
  
  蔡哥可以透過把專案上傳，透過共享同一份repository來進行多人協作。
  
  GitHub、GitLab、Bitbucket 都可以協助蔡哥在雲端共享達到他的目的。

  (1) 基礎指令、

      * 將local檔案上傳到雲端 : git push (若遠端的東西比local東西還新，需要將遠端的東西先pull下來)

      * 將雲端的檔案拉到local : git pull ( 若拉下的檔案發生衝突，請手動調整)

      * 下載respository : git clone "網址"

  



