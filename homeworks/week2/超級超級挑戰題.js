
function multiply(a,b){
	let a1=a.split('') 
	let b1=b.split('')
	let result = (new Array(a1.length+b1.length)).fill(0)
	
	// a(i) b(j)

	for(let j=b1.length-1;j>=0;j--){
		for(let i=a1.length-1;i>=0;i--){
			//要把char convert 成 int
			let product=b1[j]*a1[i]
			//console.log('product',product)
			let temp=result[i+j+1]+product
			//console.log('result[i+j+1]',result[i+j+1])
			//console.log('temp',temp)
			result[i+j+1]=temp%10
			
		
			
			//console.log('result[i+j+1]',result[i+j+1])
			result[i+j]=(result[i+j])+Math.floor(temp/10)
			//console.log('result[i+j]',result[i+j])

		}
	} 
	//console.log(result) //[4,4,66,2]
	let str=''
	for(let i=0;i<result.length;i++){
		str+=result[i]
	}return str

}
console.log(multiply('97','46'))
//
console.log(multiply('124902814902890825902840917490127902791247902479027210970941724092174091274902749012740921759037590347438758957283947234273942304239403274093275902375902374092410937290371093719023729103790123','1239128192048129048129021830918209318239018239018239018249082490182490182903182390128390128903182309812093812093820938190380192381029380192381092380192380123802913810381203'))


