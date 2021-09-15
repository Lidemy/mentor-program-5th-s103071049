## 為什麼我們需要 React？可以不用嗎？
React 強調模組化，如果實作靜態網頁或專案規模小或沒有模組化需求，直接使用 html, css, js 開發會更方便省時。

非上述情況不用 react 又不使用其他框架的壞處有甚麼? 首先，代碼不好維護：html, css, js 各司其職，透過 js 處理互動內容，所以結構樣式會寫到 js 部分中。 其次，效能低落：當 dom 被改變，會觸發整個 Reflow & Repaint 流程，頻繁改動觸發重複渲染。

而框架就是為了提升開發效率、降低維護難度的開發架構。嚴格來說，React 其實不算是一個框架，而是一個 JavaScript Libaray。通常使用 React 時會搭配其他 Libaray 使用，整個生態系結合起來就會和框架差不多。

使用 React 的好處包括

1. 資料與 ui 分離：資料決定畫面 (UI as function of state)
2. 模組化的　UI :頁面重複性高或性似的 element, 透過 jsx 語法將這些 element 建立成一個 component。各個 component 任務單一且能被重複使用。透過 component 可以用模組化的方式進行開發。
3. 提升效能：資料變動時，計算畫面需要變動的地方，如此一來就能避免無意義的更動，並重複利用已存在的 DOM 元素；若需要進行 DOM 更新，也會一次將所需要的局部組件更新。
4. 豐富的開發者生態圈



## React 的思考模式跟以前的思考模式有什麼不一樣？
多了 component 與 state 兩個概念。

### component
在 React 中，component 是 react 的最小單位，透過 props 設定屬性或資料。由於所有東西都是 component 組成，因此具備封裝性、共用性、擴展性。

### state
透過資料的狀態決定是否要重新渲染畫面，UI = f(state)。 藉由 React 演算法比對 virtual DOM 決定是否更新真實 DOM。

Component 透過資料狀態來決定是否更新 UI 畫面，而 Component 中有兩種資料來源：

1. 外部傳進 component 的 props
2. component 內部的 state

每當 React 偵測到 props 和 state 有改變時，就會自動重新渲染。


## state 跟 props 的差別在哪裡？

兩者的共同點在於都是 js 物件，當兩者之一有改變時，就會觸發 React 重新渲染畫面。
差異如下：
### state
1. 在 component 內部被管理，類似於 function 中的變數宣告
2. 是 component 本身的狀態，只有 component 能透過 setState 變更 state

### props
1. 從外部傳進 component，類似 function 的參數
2. 由於 React 單向資料流的特性，Props 是父層由上往下傳給子層
3. 不能接收子層的修改
4. 父層的 state 可以透過 setState 進行變更，將變更後的 state 值作為新的 props 傳給子層
