function add(x,y){
	while(y!=0){
		//console.log('y',y)
		let carry=x&y
		//console.log('carry',carry)

		x=x^y
		//console.log('x',x)
		y=carry<<1
		//console.log('y',y)
	}return x
}

console.log(add(42,22))
