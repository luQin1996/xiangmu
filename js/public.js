function $id(id){//给我一个id名，返回一个这个id的元素
	return document.getElementById(id);
}
//求随机数
function rand(min,max){
	return Math.round(Math.random()*(max - min) + min);
}

//随机的16进制颜色
function getColor(){
	var str = "0123456789ABCDEF";//十六进制字符串
	var color = "#";
	for(var i = 0; i <= 5; i++){//取6个数
		color += str.charAt(rand(0,15));
		//rand(0,15)随机0-15之间的数，作为charAt()的下标，取出下标对应的字符
	}
	return color;
}
function zero(val){
	return val < 10 ? "0" + val : val;
}
//时间差
function diff(start,end){//2000-2018  2018 - 2000
	//console.log(start.getTime());
	return Math.abs(start.getTime() - end.getTime())/1000;
}
//碰撞函数
function pz(obj1,obj2){
	var L1 = obj1.offsetLeft;
	var R1 = obj1.offsetWidth + obj1.offsetLeft;
	var T1 = obj1.offsetTop;
	var B1 = obj1.offsetHeight + obj1.offsetTop;
	
	var L2 = obj2.offsetLeft;
	var R2 = obj2.offsetWidth + obj2.offsetLeft;
	var T2 = obj2.offsetTop;
	var B2 = obj2.offsetHeight + obj2.offsetTop;
	
	//如果碰不上   返回false  碰上了就返回true
	if( R1 < L2 || L1 > R2 || B1 < T2 || T1 > B2){
		return false;
	}else{
		return true; //碰上了
	}
}
function addres(str){
	var reg = /([^?=&]+)=([^?=&]+)/g;
	var obj = {};	
	str.replace(reg,function(){
		//console.log(arguments)		
		obj[arguments[1]] = arguments[2];
	})
	return obj
}
