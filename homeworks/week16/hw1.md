# hw1: event loop

```js
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```
會依序輸出

```
1
3
5
2
4
```

## 輸出原因說明：

JavaScript is a single threaded programming language, single threaded Runtime, it has a single call stack．意思是 JS runtime 一次只能做一件事情，代碼是一行一行跑下來。

關於 call stack 它是一個資料結構，在這邊是用來做代碼的紀錄。如果進入 function 就放相對應的東西到 stack 上，如果 return function 就將最上層的 stack 拿掉

雖然 js runtime 一次只能做一件事情，但多虧了瀏覽器給予的 web API ，我們可以去處理非同步。但 web api 實際上並不能將處理好的東西丟給stack，如果可以哪麼這段非同步的代碼就會被隨機的放到你的 code 中間。

所以實際上，web api 處理好非同步操作後後會將 call back 丟給 task queue，這個時候 event loop 會去檢查當前的 stack 是否為空，如果為空它會把 task queue 裡面第一個 call back 放到 stack 上。

所以，以上面的代碼為例

1. 執行檔案 => put main() on the stack
2. console.log(1) 放入 stack => console 呈現 1
3. console.log(1) 移出 stack
4. call setTimeout => setTimeout call back 放入 stack，這邊要留意一點 stack 的資料結過為先入後出，也就是後面加入的資料會被放到比較上面
5. 因為 setTimeout 是 瀏覽器提供的 api，它不會活在 v8 source 中，所以我們將 setTimeout call back 從 stack 移到 web api。這邊要留意，它不是延遲零秒後執行 `console.log(2)`，他要解讀為最少延遲零秒後執行 `console.log(2)`,因為 event loop 要確定 stack 為空才會將 target queue 裡面的東西放到 stack 裡面。所以對於這個 setTimeout 來說它會立刻放到 target queue 裡面，然後持續等待直到 stack 裡面東西都被清空。 
6. console.log(3) 放入 stack => console 呈現 3
7. console.log(3) 移出 stack
8. call setTimeout，步驟同 4、5，不同點在於 queue 的特性為先進先出，所以它在 target queue 裡面會排在第一組 setTimeout 的後面
9. console.log(5) 放入 stack => console 呈現 5
10. console.log(5) 移出 stack
11. 檔案執行完畢 => pop main() out of the stack
12. event loop 在這過程不斷偵測 stack 是否為空，現在已經為空了，所以將 target queue 排第一個的 setTimeout 放到 stack
13. setTimout 放入 stack
14. console.log(2) 放入 stack => console 呈現 2
15. console.log(2) 移出 stack
16. setTimout 移出 stack
17. event loop 因為 stack 為空所以將 target queue 的 setTimeout 放到 stack
18. setTimout 放入 stack
19. console.log(4) 放入 stack => console 呈現 4
20. console.log(4) 移出 stack
21. setTimeout 移出 stack

根據這個代碼的執行流程，我們知道它印出的東西依序是 1、3、5、2、4
