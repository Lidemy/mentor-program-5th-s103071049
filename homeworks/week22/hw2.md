## 請列出 React 內建的所有 hook，並大概講解功能是什麼

1. useState：功能為做狀態，ex：`const [state, setState] = useState(初始值)`，會回傳一個 state 值，以及更新 state 的 function。初始值只有第一次 render 才會被用到，若是複雜的運算也可以傳一個 function 。要注意的是 useState 不會合併更新的 object，所以可利用解構語法達到合併更新的效果。

2. useEffect：功能為處理 side-effect。在 react render 階段，處理 side-effect 可能會導致不一致的 UI 與混亂的 BUG，所以 useEffect 會在瀏覽器畫出畫面才去執行。ex：`useEffect(() => {}, [])`，他的第一個參數是 function，第二個參數是 dependency array，除了第一次外，只有在 dependency array 裡面的元素改變時，才會重新執行這個 effect。要注意的是，如果 component render 數次，會先 cleanup 上個 effect 再執行下個 effect，確保 effect 的狀態也是最新的。

3. useContext：功能為傳值，會需要這個 hook 是為了解決 prop drilling，因為 children 要 update parent 的 state 必須在 parent 將這個東西傳下去。但使用 useContext 就不需要層層傳遞，可以將最上層的東西傳到底下的任何一層。ex：`const value = useContext(Context_obj)` useContext 接收 createContext 的回傳值(ie. context_obj)然後回傳 context 目前的值。context 目前的值由上層 component 距離最近的 `<Context.Provider>` 的 value prop。當 `<Context.Provider>` 更新時，hook 會觸發重新 render。

4. useReducer：功能為處理更多複雜的 state，可以做為狀態管理。ex: `const [state, dispatch] = useReducer(reducer, initialArg, init)`，透過接收一個由 state 與 action 產生 newState 的 reducer，回傳現在的 state 及 dispatch 方法。

5. useCallback: 功能為回傳 callback 的記憶版本，只要 dependency array 裡面的元素更新時，他就會重新執行這個 hook。

6. useMemo：功能為回傳記憶的值。只要 dependency array 裡面的元素更新時，他就會重新執行這個 hook。要特別注意：useMemo 的 function 是在 render 期間執行，所以 side-effect 不要使用 useMemo 這個 hook。

7. useRef：功能為存取 dom 裡面的元素，可以持有任何 mutable 的值。在 component re-render 時不會改變，每次 render 都會給同一個 ref object。他會是一個物件，裡面有 current 透過 .current 可以拿到 dom 元素，因為 react 會將 .current 屬性設為相應的 dom 節點。值得注意，變更 .current 屬性不會觸發重新 render。

8. useImperativeHandle：功用為使用 ref 時能和父層 component 暴露自定義的 instance 值。

9. useLayoutEffect：功用為在瀏覽器畫畫面前去做一些事情。會在所有 dom 改變後同步調用，使用他來讀取 dom 的 layout 並同步重新 render，在瀏覽器畫畫面前，useLayoutEffect 內部的更新會同步刷新。

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

## 請問 class component 與 function component 的差別是什麼？

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

差別在 component 的資料被誰控制、資料有無被 react 控制。
uncontrolled component 的資料由 dom 控制，controlled component 的資料由 react 控制。
以表單操作為例：uncontrolled component 通常會使用 className + document.querySelector().value() 的搭配或是運用 useRef() 存取 dom 裡面的元素；controlled component 通常會使用 useState 做狀態的控制，比方說我可以將 state 值放在 controlled 裡面，透過 onChange 去監聽事件變化。
