function join(arr, concatStr) {
	let result=''
	let array=[];
	for(let i=0;i<arr.length;i++){
	 array.push(arr[i],concatStr)

	}//return  array

	for(let i=0;i<array.length-1;i++){
		result+=array[i]
	}return result
	
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
console.log(join(["aaa", "bb", "c", "dddd"], ',,'))


console.log(repeat('a', 5));
console.log(repeat('yoyo', 2));
