## 這週學了一大堆以前搞不懂的東西，你有變得更懂了嗎？請寫下你的心得。

對 scope, hoisting 與 closure 的概念有變得更清楚。只是還是不是很理解 this 到底是甚麼，我認為是因為我看的相關文章、影片還不夠多，在這一塊下的功夫不夠多，畢竟已經多拖了三天。該交作業了! 目前的理解大概是所有的 function 都可以用 call 轉換，call 裡面的第一個參數就是 this。這個理解還不足!在追進度的同時再慢慢補吧!

比較有疑惑的點是，我打開一個檔案，我的 stack 會 run 這個 file 把 這個 file 推進來嗎 ? 看影片它有將 main() 推進來，節錄影片內容如下

the call stack is basically ‑‑ it's a data structure which records basically where in the program we are, if we step into a function, we put something on to the stack, if we return from a function, we pop off the top of the stack that's all the stack can do, ‑‑ so if you run this file, there's kind of a main function, right, like the file itself, so, we push that on to the stack

因為按照這樣想，我是要將我 file 裡面的 code 都執行完，main 才會被 pop out => stack 才會清空 => event loop 才會將 target queue 裡面的東西推上 stack 

另一個疑惑的點在，對於非同步的東西一開始就不會推到 stack 上去，而是交給瀏覽器相對應的 thread 去處理。既然如此我下面對於 `setTimeout(() => {console.log(i)}, 5)` 進行初始化的理解是不是就錯誤了呢 ? 但最後長這樣比較合邏輯阿 !

setTimeout. We know it doesn't run immediately, we know it's going to run in five seconds time, we can't push it on to the stack, somehow it just disappears

```js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, 5)
}
```

`setTimeout(() => {console.log(i)}, 5)` 進行初始化

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

ps：我覺得 js 怎麼運作對於 callback function 的理解很有幫助!

