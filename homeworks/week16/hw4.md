# hw4：What is this?

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // 2
obj2.hello() // 2
hello() // undefined
```

任何函數的調用都可以轉成 call 的形式 `func.call(context, p1, p2)`，this 就是 call 裡面的 context

```js
func(p1, p2) 等價於
func.call(undefined, p1, p2)

obj.child.method(p1, p2) 等價於
obj.child.method.call(obj.child, p1, p2)
```

1. obj.inner.hello() 等價於 obj.innner.hello.call(obj.inner)，所以 this 就是 2
2. obj2.hello() 等價於 obj2.hello.call(obj2) 等價於 obj2.hello.call(obj.inner) 所以 this 是 2
3. hello() 等價於 hello.call(undefined) 所以 this 是 undefined