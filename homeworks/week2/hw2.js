//ASCII : A=65 Z=90 :a=97 z=122
//console.log("a".charCodeAt(0))
function capitalize(str) {
	let first=str[0].charCodeAt(0)
	
	if(first>=97 && first<=122){
		let result =str[0].toUpperCase()
		for(let i=1;i<str.length;i++){
			result+=str[i]
		}return result

	}
	else{
		 return str
	}

}

console.log(capitalize('hello'));
console.log(capitalize('nick'));
console.log(capitalize('Nick'));
console.log(capitalize(',hello'));


