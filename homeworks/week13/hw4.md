## Webpack 是做什麼用的？可以不用它嗎？
當我完成功能，可以藉由包成檔案或模組的方式分享給其他人使用。 node.js 上可以透過 require 語法引入 module，但早期原生的瀏覽器沒有 require，所以只能透過全域變數進行輸出，因此有命名衝突的缺陷，此外也很不方便。

webpack 是一個專門用來打包模組的工具，它會將模組包在一起做一些轉換，讓我們可以直接在瀏覽器上使用，透過這樣的方式就可以寫 require 語法。

更準確地說他打包的是資源，如:圖片、css, 打包內容並不限於 js 。

可以不使用 webpack, 只是因為現在前端比較複雜，專案越大會需要用到更多的模組化、library、工具，使用 webpack 進行設定可以省去很多麻煩。依照專案的規模選擇工具進行使用，比較小的專案會用 gulp。


## gulp 跟 webpack 有什麼不一樣？
### gulp
gulp 是 task manager，它的目的是管理任務，所以額外的其他功能都要靠 plugin 幫忙，只要能寫出的 task，gulp 都做得到。

舉例來說,我有各種 task (babel, scss, rename, minify)，這些 task 要做甚麼事是我決定好的，使用 gulp 只是將這些要執行的任務用規則寫下來(如:任務執行的優先順序)。gulp 本身做不到 bundle，但可以藉由 webpack plugin 去打包或自己寫一個打包的 task。
### webpack
webpack 是 bundler，為甚麼要 bundle ? 因為瀏覽器以前原生沒有支援 require 之類的東西，bundle 後就可以支援。 事實上，webpack bundle 的不只是模組而是任何資源，它將模組的概念推得更遠(圖片、css 也可以當作模組)。

舉例來說，各種資源(img, sass, js)，webpack 可以將這些都打包在一起。在打包前會先經過 loader 將資源載入，載入前可以先做一些額外的事情，比方說先經過 sass 的 loader 再包進去 webpack。webpack 的主要功能就是打包，所以它做不到某些 task (校正時間、定時 call api)。

### 結論、兩者差異
1. gulp 主要負責是任務管理，可以藉由相關的 plugin 完成打包的功能
2. webpack 主要負責打包資源，所以它做不到某些任務(校正時間、定時call api)

## CSS Selector 權重的計算方式為何？
等級關係: !important > 行內樣式(inline style) > id 選擇器(id) > 類選擇器或屬性選擇器或偽類選擇器 > 元素選擇器(tag/element)

按照等級順序比下來，沒有進位問題誰大誰就贏。例如：使用 10 個 class 跟 1 個 id, 最後還是一個 id 設置的樣式生效。

如果兩個相同權重的選擇器作用在同一元素上，以後者出現的選擇器為最後規則。如 class 寫兩次，規則會以後者優先，也就是兩個層級相同會以後者為優先。

另外，!important 會蓋掉所有規則，不利後續維運與設定樣式，盡量避免使用。 

