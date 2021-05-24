## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

1. <marquee></marquee> : 跑馬燈效果。

舉例來說 : 下列代碼會往右的放向不斷重複播放 北市31確診者失聯 北市警局：窮盡一切力量找人中

<marquee width="60%" direction="right" height=100%>
 北市31確診者失聯 北市警局：窮盡一切力量找人中
</marquee>

2. <video></video> : 放影片的標籤。

目前支援三種格式 : MP4, Ogg, WebM

它可以和 source 標籤搭配使用。

<video width="320" height="240" control autoplay muted>
  <source src="video.mp4" type="video/mp4">
</video>

3. <button> </button> : 表單按鈕

button 下面有這些屬性 :  name(按鈕名稱)、 type(按鈕形式)、 value 、 disabled(禁用此按鈕)

舉例 : 
<button type="button">push me</button>

type 可以是 button(無任何功能，通常與 js 使用), reset(內容重置), submit(預設值)

## 請問什麼是盒模型（box modal）

簡單地說，在 html 裡面的每一個元素，都可以看做是一個盒子。我們可以用 css 調整盒子的屬性。
盒子由幾個東西組成 : 寬/高、內邊距(padding)、框線(border)、外邊距(margin)。

## 請問 display: inline, block 跟 inline-block 的差別是什麼？

### display 要處理的問題是 : 元素與相鄰元素相對關係、元素內部怎麼排 ? 也就是同列、分列、置中對齊、垂直等排版問題。

* block : 

每個元素佔一行，不會將下方東西遞補上去；預設元素 p, div, h。

* inline : 

元素可在同一行內呈現，圖片或文字均不換行，也不會影響其版面配置，另外
不可設定長寬，元素寬高由它的內容撐開。值得一提，inline 不能設定上下 
margin/padding，但並非不能設定，只是排版部會隨設定改變，字仍在行內，
其它行不會被推開。加上背景，會發現調動上述仍會把元素的高度給撐開，只
是不會影響元素的位置。

預設元素: span, a。

* inline-block : 

以 inline 的方式呈現，也就是水平排列。並保有 block 的屬性，也就是可以
設定元素的寬/高、margin, padding。

預設元素 : button, input, select

另外要留意，inline-block 空格造成元素間的間隙問題。

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

排版是需要將元素放到正確的位置，這時就需要 position 的幫忙。

* static :

網頁預設的排版方式，按順序排下去。

* relative :

依據原本的定位點，上下左右調整，不會影響到其它元素。

* absolute : 

以某個參考點進行定位，某個參考點是由該元素，往上找，找到
第一個不是 static 的元素。使用絕對定位，元素會跳脫正常的排版流。

* fixed :

相較於 viewport 做定位。即使頁面捲動，它仍然固定在相同的位置。
