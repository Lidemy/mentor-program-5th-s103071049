## 什麼是 DOM？

Dom 的全名是 Document Object Model，簡單地說他是瀏覽器提供的橋樑，讓我們去改變
畫面上的東西。

Document 是文件，也就是 HTML 寫的那些東西， Document Object Model ，會將這些文件
轉成物件，透過這樣的轉變，JS 可以去改變 HTML 的介面。

舉例：HTML 的標記有階層關係，透過 DOM 轉換，我就可以選到某個標籤底下的東西。

雖然更動的是 JS，但瀏覽器會改動畫面實際的東西。所以準確地說，DOM 是 JS 與瀏覽器之
間的橋梁。或者更進一步說，這個橋梁連結的是 JS 與 HTML。

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

順序：先捕獲再冒泡。準確地說，事件傳遞機制有三個階段，事件捕獲階段、處於目標階段、
事件冒泡階段。

### 名詞解釋

冒泡：與捕獲相反，冒泡地順序是由內到外進行事件傳播，直到根節點。

捕獲：當鼠標點擊或者觸發 Dom 事件時，瀏覽器會從根節點由外到內進行事件傳播。也就是
點擊子元素，如果父元素通過事件捕獲方式有對應的事件話，會先觸發父元素綁定的事件。

### 結論：
Dom 標準事件流的觸發為先捕獲後冒泡，也就是當觸發 Dom 事件，會先進行事件捕獲，捕獲
到事件源通過事件傳播進行冒泡。

換句話說，Dom 事件傳播時，會先從根節點往下傳遞到 target，target 就是我在螢幕上點擊
的目標，我在 target 上加上事件，這一路下傳的過程就是 capture phase 捕獲階段。接著
事件再往上從子節點回傳到根節點，就是所謂的 bubbling phase 冒泡階段。更細緻地說，
target 身上加監聽事件的這個 phase 也就是 target phase，目標階段。

## 什麼是 event delegation，為什麼我們需要它？

event delegation 中文翻譯：事件代理，當我們需要對很多元素新增事件時，可以透過冒泡的機制。
將事件新增到他們的父節點，而將事件委託給父節點來觸發處理函式。

### 為甚麼我們需要事件代理？

1. 效率考量：不用浪費資源建立無數個類似事件的 function，只要一個事件監聽就可以管理這些事情。
2. 處理動態新增：透過冒泡機制，就算底下新增東西，我一樣可以接到他的事件。


## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

1. event.preventDefault()：表示阻止事件預設行為，一旦 call 了 preventDefault()，在後續傳遞的
事件也會有效果。

2. event.stopPropagation()：表示阻止事件傳遞。

舉例：

狀態一、

submit 的預設行為是提交，所以現在不管怎麼按，他都不會送出。

```html
<script>
    const element = document.querySelector('.login-form')
    element.addEventListener('submit', function(e) {
      e.preventDefault()
    })
</script>
```
狀態二、
window 階段就阻止事件傳遞下去，所以後續所有的東西都不會收到事件

```html
window.addEventListener('click', function(e) {
      e.stopPropagation()
    },true)

```


