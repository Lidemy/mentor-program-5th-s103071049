function printStars(n) {
	if(n>30||n<=0){
		console.log("n的範圍超過設定值")
		//給定 n（1<=n<=30）
	}
	else {
		for(let i=1;i<=n;i++){
			console.log("*")

		}
	}
}


printStars(6)