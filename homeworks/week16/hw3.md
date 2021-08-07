# hw3：Hoisting

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```js
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)

```
在非嚴格模式下，會依序輸出

```
undefined
5
6
20
1
10
100
```

解釋代碼運作原理

首先對 global execution context 進行初始化

```
// global EC 為 global execution context
// VO 為 variable object
globalEC: {
    VO: {
      a: undefined,
      fn: function
    }
    scopeChain: [globalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain = globalEC.VO
```

初始化完後執行代碼，var a = 1，接著執行 fn()，一樣先進行 fn execution context 的初始化
```
// global EC 為 global execution context
// VO 為 variable object
fnEC: {
    AO: {
      a: undefined,
      fn2: function
    }
    scopeChain: [fnEC.AO, fn.[[Scope]]] = [fnEC.AO, globalEC.VO] 
}
fn2.[[Scope]] = fn.scopeChain = [fnEC.AO, globalEC.VO] 
globalEC: {
    VO: {
      a: 1,
      fn: function
    }
    scopeChain: [globalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain = globalEC.VO
```

繼續執行 fn 這個函式
console.log(a) 從 fn 的 scopeChain 上依序找，`scopeChain: [fnEC.AO, fn.[[Scope]]] = [fnEC.AO, globalEC.VO] `，在 fnEC.AO 上面找到 a 為 undefined,所以印出 undefined。

接著 var a = 5，所以 fnEC 裡面 AO 的 a 現在是 5，所以下一行代碼 console.log(a) 會印出 5  

```
// global EC 為 global execution context
// VO 為 variable object
fnEC: {
    AO: {
      a: 5,
      fn2: function
    }
    scopeChain: [fnEC.AO, fn.[[Scope]]] = [fnEC.AO, globalEC.VO] 
}
fn2.[[Scope]] = fn.scopeChain = [fnEC.AO, globalEC.VO] 
globalEC: {
    VO: {
      a: 1,
      fn: function
    }
    scopeChain: [globalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain = globalEC.VO
```

接著 a ++ ，所以 fnEC 裡面 AO 的 a 現在是 6。下一行代碼是 var a 但因為已經宣告過這個變數，所以這一行沒有作用

```
// global EC 為 global execution context
// VO 為 variable object
fnEC: {
    AO: {
      a: 6,
      fn2: function
    }
    scopeChain: [fnEC.AO, fn.[[Scope]]] = [fnEC.AO, globalEC.VO] 
}
fn2.[[Scope]] = fn.scopeChain = [fnEC.AO, globalEC.VO] 
globalEC: {
    VO: {
      a: 1,
      fn: function
    }
    scopeChain: [globalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain = globalEC.VO
```

接著呼叫 fn2() 一樣先進行初始化
```
// global EC 為 global execution context
// VO 為 variable object
fn2EC: {
    AO: {
    }
    scopeChain: [fn2EC.AO, fn2.[[Scope]]] = [fn2EC.AO, fn.scopeChain] = [fn2EC.AO, fnEC.AO, globalEC.VO]
} 

fnEC: {
    AO: {
      a: 6,
      fn2: function
    }
    scopeChain: [fnEC.AO, fn.[[Scope]]] = [fnEC.AO, globalEC.VO] 
}
fn2.[[Scope]] = fn.scopeChain = [fnEC.AO, globalEC.VO] 
globalEC: {
    VO: {
      a: 1,
      fn: function
    }
    scopeChain: [globalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain = globalEC.VO
```

初始化完成後執行代碼，
console.log(a) 在 fn2EC 的 scopeChain 上 `[fn2EC.AO, fnEC.AO, globalEC.VO]` 依序找，因為 fn2EC.AO 找不到，所以往 fnEC.AO 找，找到了 a = 6，所以印出 6

a = 20 在 fn2EC 的 scopeChain 上 `[fn2EC.AO, fnEC.AO, globalEC.VO]` 依序找，終於在 fnEC.AO 找到了 a 將它賦值為 20

b = 100 在 fn2EC 的 scopeChain 上 `[fn2EC.AO, fnEC.AO, globalEC.VO]` 依序找，但因為都找不到，假設我們不在嚴格模式，global scope 就會將 b 加上去並設為 100，所以 b 現在變成了一個 global variable。如果是在嚴格模式就會出現 `ReferenceError: b is not defined` 的錯誤

```
// global EC 為 global execution context
// VO 為 variable object
fn2EC: {
    AO: {
    }
    scopeChain: [fn2EC.AO, fn2.[[Scope]]] = [fn2EC.AO, fn.scopeChain] = [fn2EC.AO, fnEC.AO, globalEC.VO]
} 
fnEC: {
    AO: {
      a: 20,
      fn2: function
    }
    scopeChain: [fnEC.AO, fn.[[Scope]]] = [fnEC.AO, globalEC.VO] 
}
fn2.[[Scope]] = fn.scopeChain = [fnEC.AO, globalEC.VO] 
globalEC: {
    VO: {
      a: 1,
      fn: function,
      b: 100
    }
    scopeChain: [globalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain = globalEC.VO
```

fn2 執行完畢，將它從 stack 清除，回到 fn 繼續執行代碼 console.log(a)，在 fnEC 的 scopeChain `[fnEC.AO, globalEC.VO] ` 上找，在 fnEC.AO 就找到 a 所以不用往 globalEC.VO 找。 將 fnEC.AO 的 a 印出，所以得到 20


```
// global EC 為 global execution context
// VO 為 variable object

fnEC: {
    AO: {
      a: 20,
      fn2: function
    }
    scopeChain: [fnEC.AO, fn.[[Scope]]] = [fnEC.AO, globalEC.VO] 
}
fn2.[[Scope]] = fn.scopeChain = [fnEC.AO, globalEC.VO] 
globalEC: {
    VO: {
      a: 1,
      fn: function,
      b: 100
    }
    scopeChain: [globalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain = globalEC.VO
```

現在 fn 這個 function 已經執行完，所以將他從 stack 中清除。
繼續執行代碼 console.log(a)，a 在 globalEC.VO 中找到是 1，所以印出 1

```
// global EC 為 global execution context
// VO 為 variable object

globalEC: {
    VO: {
      a: 1,
      fn: function,
      b: 100
    }
    scopeChain: [globalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain = globalEC.VO
```
現在 a = 10 所以 globalEC.VO.a 重新賦值為 10
接著執行 console.log(a)，a 在 globalEC.VO 找到，所以印出 10
最後執行 console.log(b), b 在 globalEC.VO 找到，所以印出 100

```
// global EC 為 global execution context
// VO 為 variable object

globalEC: {
    VO: {
      a: 10,
      fn: function,
      b: 100
    }
    scopeChain: [globalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain = globalEC.VO
```

## 執行規則整理
每個 execution context 都有一個 scope chain，當進入 execution context，scope chain 被建立也被初始化，同時會依序做三件事情 : 
(一) 將參數放入 variable object 或 active object 裡並設定值，沒有值的就設為 undefined
(二) 把函式的宣告放入 variable object 或 activation object，如果有同名的就覆蓋掉
(三) 把變數宣告放到 variable object 或 activation object，有同名的就忽略

舉例、
```
// 進入一個 function 
 enter functionEC => scopeChain: [AO, [[Scope]]]

// 對於宣告的函式，要記得 函式名稱.[[Scope]]

// AO 與 VO 做的事情一樣，只有在 globalEC 裡面才有 VO
```

編譯階段會處理變數及函式的宣告並加入 scope 裡面，接著才是執行階段。

執行階段會去 scopeChain 依序逐級找變數，scope 往上找變數的過程就是一層一層 AO VO 找遍數的值。

如果找到頂都找不到，在嚴格模式下會在 globalEC.VO 宣告該變數並賦相對應的值，在非嚴格模式下會拋出錯誤訊息。

因為 runtime 是 stack，進入 function 相當於是進入新的 execution context，一旦執行結束就會將這個 execution context 給清除。

對於底層的清除機制來說，如果我的 scopeChain 有 reference 到其他 execution context 的 AO 或 VO，因為其他東西有連結到它，所以如果我的 EC 這邊執行完畢，我不會將所有東西都清除，相對地我會保留這些其他地方連結到的東西。 closure 的原理如同上述所說，它保留了 scopeChain，所以才造成明明離開 function 卻還可以存取到值的現象出現。