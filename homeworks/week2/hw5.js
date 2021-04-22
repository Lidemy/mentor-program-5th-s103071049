function join(arr, concatStr) {
	
	let result= ''
	if(concatStr===''){
		for(let i=0;i<arr.length;i++){
			result+=(arr[i]+concatStr)
				}	return result
					  }	
	else{
		for(let i=0;i<arr.length;i++){
			result+=(arr[i]+concatStr)
				}	return result.slice(0,result.length-1)
		}
	
	
}



function repeat(str, times) {
    let result=''
	for(let i=1;i<=times;i++){
		result+=str
	}return result
  
}
console.log(join([1, 2, 3], ''))
console.log(join(["a", "b", "c"], "!"))
console.log(join(["a", 1, "b", 2, "c", 3], ','))

console.log(join(['a'], '!'));
console.log(repeat('a', 5));
console.log(repeat('yoyo', 2));
