
function search(arr,n){
  let start=0
  let end=arr.length-1
  if(start>end){
    return -1
  }
  while(start<=end){
    let mid=Math.floor((start+end)/2)
    
    if(n>arr[mid]){

      start=mid+1

    }
    else if(n<arr[mid]){
      end=mid-1
    }
    else {
      return mid
    }
  }return -1
}

console.log(search([1, 3, 10, 14, 39], 14))
console.log(search([1, 3, 10, 14, 39], 299))




