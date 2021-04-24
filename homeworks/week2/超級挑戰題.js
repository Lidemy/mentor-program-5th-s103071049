function add(a,b){
	while(b!=0){
		//console.log('b',b)
		let carry=a&b
		//console.log('carry',carry)

		a=a^b
		//console.log('a',a)
		b=carry<<1
		//console.log('b',b)
	}return a
}

console.log(add(42,22))
