# hw2：Event Loop + Scope

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
會依序輸出 
```
i:  0
i:  1
i:  2
i:  3
i:  4
5
5
5
5
5
```

## 執行流程

對這個 for-loop 來說，它的組成分成兩部分，一個是同步的代碼 `console.log('i: ' + i)`，另一個是非同步的 web API `setTimeout(() => {console.log(i)}, i * 1000)`

當 var i = 0 的時候，`console.log('i: ' + 0)` 放到 stack 去，所以印出了 i:  0，執行完成後將 `console.log('i: ' + 0)` 從 stack 移除

因為 `setTimeout(() => {console.log(i)}, i * 1000)` 是非同步的 web API，所以當瀏覽器等待 0 毫秒後會將 `() => {console.log(i)}` 推進 target queue 裡面。

這時 event loop 去偵測 stack 內是否為空，發現 stack 內有東西，所以 `() => {console.log(i)}` 會繼續在 target queue 裡面等候。

為甚麼這個時候 stack 內還是有東西 ? 因為 setTimeout 是非同步的 web API ，所以在瀏覽器處理的同時，js runtime 仍然會繼續處理後面的代碼。

當 var i = 1 時，`console.log('i: ' + 1)` 放到 stack 去，所以印出了 i:  1，執行完成後將 `console.log('i: ' + 1)` 從 stack 移除

因為 `setTimeout(() => {console.log(i)}, i * 1000)` 是非同步的 web API，所以當瀏覽器等待 1 秒後會將 `() => {console.log(i)}` 推進 target queue 裡面。

現在 target queue 裡面等候處理的有 `() => {console.log(i)}` 和 `() => {console.log(i)}`，這時 event loop 去偵測 stack 內是否為空，發現 stack 內有東西，所以這些 callback function 會繼續在 target queue 裡面等候。

同理，所以最後會依序印出 `i:  0` 、`i:  1` 、`i:  2`、`i:  3`、`i:  4`，直到 var i = 5 不滿足迴圈的執行條件。

而這個時候 target queue 裡面有五組待執行的 callback function `() => {console.log(i)}`、`() => {console.log(i)}`、`() => {console.log(i)}`、`() => {console.log(i)}`、`() => {console.log(i)}`。

event loop 偵測發現 stack 裡面沒有東西，所以會將第一組 `() => {console.log(i)}` push 到 stack 上，runtime 執行 callback 再將 console.log(i) push 到 stack 上，現在因為 hoisting 的緣故，所以我的 i 是 5 => 印出 5 => pop out console.log(i) => pop out `() => {console.log(i)}`  

現在 stack 為空，event loop 再將第二組 `() => {console.log(i)}` push 到 stack 上，同理，重複上面的步驟最後我們會印出五個 5。

我們詳細解釋一下為甚麼 hoisting 出來的結果是 var i = 5

首先會先進行初始化，stack 裡面就只有 global EC

```
// EC 是 execution context 的縮寫
globalEC: {
  VO: {
    i : undefined,
  }
  scopeChain: [globalEC.VO]
}

```

再來開始跑迴圈，初始化 i = 0

```
// EC 是 execution context 的縮寫
globalEC: {
  VO: {
    i : 0,
  }
  scopeChain: [globalEC.VO]
}

```

`setTimeout(() => {console.log(i)}, i * 1000)` 進行初始化

```
// EC 是 execution context 的縮寫
// fn 為 setTimeout 裡面的匿名函式縮寫

globalEC: {
  VO: {
    i : 0,
  }
  scopeChain: [globalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain = globalEC.VO
fnEC: {
  AO: {
  }
  scopeChain: [fnEC.AO, fn.[[Scope]]] = [fnEC.AO, globalEC.VO]
}
```
當執行到最後一圈迴圈 var i = 4
```
// EC 是 execution context 的縮寫
// fn 為 setTimeout 裡面的匿名函式縮寫

globalEC: {
  VO: {
    i : 4,
  }
  scopeChain: [globalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain = globalEC.VO
fnEC: {
  AO: {
  }
  scopeChain: [fnEC.AO, fn.[[Scope]]] = [fnEC.AO, globalEC.VO]
}
```
當 var i = 5 迴圈結束，理論上要清空 global EC 但因為接著要執行的 fn 有指到它的 globalEC.VO，所以 JS 底層的回收機制不能將這個給清掉。

對於 fn 裡面的 i 去 fnEC 的 scopeChain 依序找，因為 fnEC.AO 找不到，所以再往 globalEC.VO 找，發現是 5。所以印出 5

```
// EC 是 execution context 的縮寫
// fn 為 setTimeout 裡面的匿名函式縮寫

globalEC: {
  VO: {
    i : 5,
  }
  scopeChain: [globalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain = globalEC.VO
fnEC: {
  AO: {
  }
  scopeChain: [fnEC.AO, fn.[[Scope]]] = [fnEC.AO, globalEC.VO]
}
```
