
//获取数据
var url = window.location.href;
var obj = addres(url);
var pid = obj.id;
$.ajax({
	type:"get",
	url:"json1.json",
	async:false,
	success:function(res){
		var arr=res.cls01;		
		var str=""
		str+=`<div id="small" class="small">`
		for (let i=0; i<arr.list.length;i++){
			let cur = arr.list[i];
			if(cur.id==pid){
				let arr1=cur.small;
				for(var j= 0;j<arr1.length;j++){
					str+=`
					<img src="img/${arr1[j]}.jpg" id="mm" alt="" />
					`
				}				        
				    str+=`<div id="mask" style="display: block;"></div>
				    </div>
				    <div id="big">`				
				    
				var arr2=cur.big;
				for(let k= 0;k<arr2.length;k++){
					str+=`
					<img src="img/${arr2[k]}.jpg" class="bigImage",alt="" />	
					`
				}				    	
				
				str+=`</div>
					<ul id="bottom"> `
				
				var arr3=cur.slt;
				for(let m= 0;m<arr3.length;m++){
					str+=`
					<li><img src="img/${arr3[m]}.jpg" alt="" /></li>	
					`
				}
				str+=` </ul>`
				
				var str1=""
				str1+=`
				<h1 class="title">${cur.name}<span>限量抢购</span></h1>
				`
				var str2=""
				str2+=`
				<p class="price_n"><strong>￥</strong>${cur.price}</p>
				`
			}			
		}
		$("#box").html(str)	
		$(".title").html(str1)
		$(".price_n").html(str2)
		//获取cookie里已经存在的值
		var cookie1 = getCookie("shopList");
		$(this).parent().find("input").val(cookie1.count);
		$(".updatecount").click(function(){
			var sign = parseInt($(this).data("number"));
			var count=$(this).parent().find("input").val()
				if(sign==-1&&count==1){
					return
				}
				for(var i=0;i<cookie1.length;i++){
				if(pid==cookie1[i].id){
					cookie1[i].count+=sign;
					console.log(cookie1[i].count)
					setCookie("shopList",JSON.stringify(cookie1));
					$(this).parent().find("input").val(cookie1[i].count)				
				}
			}
			
		})
		
		// //增数量
		// $(".add_count").click(function(){
		// 	var res=parseInt($("#count1").val())+1
		// 	$("#count1").val(res)
			
		// })
		// //减数量
		// $(".dec_count").click(function(){
		// 	if($("#count1").val()==1){//边界处理，先判断后点击
		// 		return	
		// 	}
		// 	var res=parseInt($("#count1").val())-1
		// 	$("#count1").val(res);
		// })
		
		
		
		$(".add_shopcar").click(function(){
			console.log(1);
			if(!confirm("点击确认继续购物,取消结算")){
				window.location.href="shopcar.html"
			}else{
				window.location.href="index.html"
			}
		})
/*		
		var cookie1 = getCookie("shopList");
		console.log(cookie1)
		for(let i=0;i<cookie1.length;i++){
			if(pid==cookie1[i].id){
				cookie1[1].count
				console.log(cookie1[i].count)
			}
		}*/
		
	}
});
	//多张图片放大镜
	
	$("#bottom li").mouseenter(function(){
		var index = $(this).index();
		$("#small img").eq(index).show().siblings("img").hide();
		$("#big img").eq(index).show().siblings().hide();
	})
 	$("#small").on({
 		"mouseenter":function(){
 			$("#big").show()
 		},
 		"mouseleave":function(){
 			$("#big").hide()
 		},
 		"mousemove":function(e){
 			var e = e || event;
 			//改变mask的left和top
 			var x = e.pageX - $("#mask").width()/2-$("#box").offset().left;
 			var y = e.pageY - $("#mask").height()/2-$("#box").offset().top;
 			var maxL = $("#box").width()-$("#mask").width();
 			var maxT = $("#box").height()-$("#mask").height();
 			x = Math.min( maxL , Math.max(0,x) );
 			y = Math.min( maxT , Math.max(0,y) );
 			$("#mask").css({
 				left : x,
 				top : y
 			})
 			
 			//右侧图片动起来
 			var x1 = x* $(".bigImage").width()/$("#box").width();
 			var y1 = y* $(".bigImage").height()/$("#box").height();
 			
 			$(".bigImage").css({
 				left : -x1,
 				top : -y1
 			})
 		}
 	})


