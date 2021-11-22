## 為什麼我們需要 Redux？

當專案規模太大，就會有狀態管理的問題存在，可能 model 與 view 之間的關係會是多對多，model 的東西改變很難追蹤是誰改變他。

redux 運用單向資料流的方式：action => dispatcher => store => view ，使我們可以方便追蹤是哪個 action 讓 store 的資料改變。在 redux 裡面要改變狀態，就要 dispatch 一個 action，action 到達 store 裡面透過 reducer 就會產生新的 state，就把 state 改變。

當專案規模不大時，view 變動直接改 store 就結束，但對於大規模的專案，store 改變很難追蹤是哪個 view 改動這邊的資料。因此就會需要 redux 的幫忙。

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？

redux 是 js 軟件的狀態管理容器。

透過單向資料流，改變狀態就 dispatch 一個 action 透過 store 裡面的 reducer 回傳新的狀態。

- dispatch：可以把他想成是一個分發器，會透過 dispatch 發出 action。
- action：js 的物件，會記錄要做的事的型態(type)與內容(payload)。ex：要買十本書，`{type: buyBooks, payload:10}`
- store：dispatch 發出的 action 會進到 store。可以把 store 想成處理資料狀態的地方。
- reducer：store 裡面會有一個叫做 reducer 的地方，他會 reduce 現在的狀態、元素，結合之後返回一個新的狀態。ex：現在書本的購買數量狀態為 0，因為 store 接收到 dispatch 發出的 action 購買十本書，在 reducer 處理後回傳新的狀態，所以書本購買數量狀態就是 10

## 該怎麼把 React 跟 Redux 串起來？

可以透過 react-redux 這套件串起來。在需要共用 state 的父層，用 `<Provider store={store}>` 包起來，裡面的 component 可以使用 `useSelector()` 取得 state、用 `useDispatch()` 傳送 action。

在沒有 hooks 之前透過 coonect 將 react 的 component 與 redux 結合。connect 是一個 function，會傳兩個參數：mapStateToProps (概念類似 `useSelector()` ), mapDispatchToProps (概念類似 `useDispatch()` )。透過 HOC 的方式，將 component 與 redux 結合。

```js
const connectToStore = connect(mapStateToProps, mapDispatchToProps);
const ConnectedAddTodo = connectToStore(AddTodo);
```
