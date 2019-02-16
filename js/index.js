// 广告
$(".gg2").click(function(){
    $(".gg").parent().remove();
    $(this).remove();
})
// header选择地图
var provArr = ["辽宁","山西","河北","湖北","湖南","广东","北京","陕西","山东","福建",];
var cityArr = [
    ["沈阳","大连","铁岭"],
    ["大同","太原"],
    ["邯郸","石家庄","唐山","雄安"],
    ["武汉","宜昌","荆州"],
    ["长沙",],
    ["广州","深圳"],
    ["北京"],
    ["西安","咸阳"],
    ["济南","青岛"],
    ["泉州","福州"]
];
    for (let i = 0;i<provArr.length;i++) {
        $("#prov").append ($("<option>").val(i).html(provArr[i]));		
    }           
    $("#prov").change(function(){
        $("#city")[0].length = 1;//$("#city")[0] jq转化为dom类型。
        let index = $(this).val();
        let city = cityArr[index];
        for (let i=0;i <city.length;i++) {
            $("#city").append($("<option>").val(index +"-"+i).html(city[i]));
        }
    })
    
//限时抢购倒计时
var future = new Date("2019/1/1");
var now = new Date();
var time = (future.getTime() - now.getTime()) / 1000;
function showTime(){
    var day = Math.floor(time / 60 / 60 / 24);  //3   天 
    var hour = Math.floor(time / 60 / 60) - (day * 24);//时  
    var minu = Math.floor(time / 60) - (day * 24 * 60) - (hour * 60);//分
    var sec  =  Math.floor(time) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minu * 60);
    $(".showtime dd").eq(0).html(parseInt(hour/10));
    $(".showtime dd").eq(1).html(parseInt(hour%10));
    $(".showtime dd").eq(3).html(parseInt(minu/10));
    $(".showtime dd").eq(4).html(parseInt(minu%10));
    $(".showtime dd").eq(6).html(parseInt(sec/10));
    $(".showtime dd").eq(7).html(parseInt(sec%10));
}
var timer = setInterval(function(){
    time--;
    if(time == 0){
        clearInterval(timer);               
    }else{
        showTime();
    }       
},1000)

//优选推荐 动态
 $(function(){
    var $this = $(".ftshow");
    var scrollTimer;
    $this.hover(function(){
          clearInterval(scrollTimer);
    },function(){
       scrollTimer = setInterval(function(){
                     scrollNews( $this );
                }, 2000 );
    }).trigger("mouseout");
});
function scrollNews(obj){
   var $self = obj.find("nav");
   var lineHeight = $self.find("dl:first").height();  
   $self.animate({ 
   	"top" : -lineHeight +"px" 
   },1000 ,function(){
   	$self.css({"top":"0"}).find("dl:first").appendTo($self);
   })
}




//侧边栏
$("aside li").find("a").hover(function(){
		var index = $(this).parent().index() 
		console.log(index)
		$(this).css({'background':"#fff"});
		$("aside li").eq(index).find($(".aside_box")).stop().animate({"margin-left":"0px"},1000)		
},function(){		
		$(this).css({'background':" #ececec"});
		$(".aside_box").stop().animate({"margin-left":"222px"},1000)
})

$("aside li").find("a").eq(1).click(function(){
	window.location.href="shopcar.html"
})
//侧边栏回到顶部
$("#toTop").click(function(){
	$(html,body).scrollTop==0
})

//ajax模拟数据
$.ajax({
    type:"get",
    url:"json1.json",
    async:true,
    cache:"false",
    success:function(res){
     
        //纯甄优选
        let str1="";
        let arr1=res.cls01; 
            for(let i=0;i<arr1.list.length;i++){
                let cur =arr1.list[i];
                str1+=
                `               
                <li>
						<h4>${cur.name}</h4>
						<p class="price">￥${cur.price}元</p>
                        <a href="page.html?id=${cur.id}"><img src="img/${cur.src}.jpg"/></a>
                        <p class="buy" pid=${cur.id} price=${cur.price} name=${cur.name} src=${cur.src}><a href="#">加入购物车</a></p>
				</li>`
            }
            $(".listkb_ul").html(str1)
            
                 
//存取cookie  
			var arr=[];
            $(".listkb_ul").on("click",".buy",function(){
            	obj={           		
            		id:$(this).attr("pid"),
					price:$(this).attr("price"),
					name:$(this).attr("name"),
					src:$(this).attr("src"),
					count:1
            	}
            	var flag = true;
            	var shopList = getCookie("shopList");        
            	if(shopList !=0){//cookie 里有内容
            		arr = shopList;
            		var sum=0;
            		for(var i = 0;i<arr.length;i++){
            			if(arr[i].id == obj.id){
            				flag = false;
            				arr[i].count++;           				
            			}
            			  sum += arr[i].count          			
            		}
            			
            	}

            	if(flag){
            		arr.push(obj)
            	}
  				$("aside li").find("a").eq(1).html("共"+sum+"件")
  				$("#total_num").val(sum);
            	setCookie("shopList",JSON.stringify(arr));
            })


            //限时抢购           
            let str2="";
            let arr2=res.cls02;
            for(let i=0;i<arr2.list.length;i++){
                let cur2=arr2.list[i];
                str2+=`
                <li>
							<a href="#"><img src="img/${cur2.src}.jpg"/></a>
							<p><a href="#">${cur2.name}</a></p>
							<p class="price">￥${cur2.price}元</p>
							<a href="#" id="qg">抢 购</a>
						</li>
                `
            }
            $(".limit_buy").html(str2)

            //水果区
            let str3="";
            let arr3=res.cls03;
            for(let i=0;i<arr3.list.length;i++){
                let cur3=arr3.list[i];
                str3+=`
                <li>
                    <a href="#">
                        <img src="img/${cur3.src}.jpg"/>
                        <p class="buy">加入购物车</p>
                    </a>
                    <p>${cur3.name}</p>
                    <p class="price">￥${cur3.price}元</p>
                   
				</li>`               
            }
            $(".fruit_mid_ul").html(str3)

            //为你推荐
            let str4="";
            let arr4=res.cls04;
            for(let i=0;i<arr4.list.length;i++){
                let cur4=arr4.list[i];
                str4+=`
                <li>
                    <a href="#">
                        <img src="img/${cur4.src}.jpg"/>
                        <p class="buy">加入购物车</p>
                    </a>
                    <p>${cur4.name}</p>
                    <p class="price">￥${cur4.price}元</p>                   
				</li>`               
            }
            $(".sug_box_ul").html(str4)

            //鼠标移入移出
            //通用部分
            $("li")
            .mouseover(function(){
                $(this).find("p.buy").stop().animate({"bottom": 0});
            }).mouseout(function(){
                $(this).find("p.buy").stop().animate({"bottom": -30})
            })

            //纯甄优选
            $(".listkb_ul li")
            .mouseover(function(){
                $(this).find("p.buy").stop().animate({"bottom": 10});
            }).mouseout(function(){
                $(this).find("p.buy").stop().animate({"bottom": -30})
            })
    }
}) 
// 轮播图左侧导航
$(".meta dl").hover(function(){
    $(this).css("background","#fff");
    $(this).css("color","#76ab25");
    $(".hide_box").css("display","block");
},function(){
    $(this).css("background","#76ab25");
    $(this).css("color","#fff");
    $(".hide_box").css("display","none");
})
//顶部导航
$("aside ul li").eq(0).nextAll().hover(function(){
    $(this).css("color","#76ab25")
},function(){
    $(this).css("color","#000")
})
//轮播图
var index_lun = 0;
	var timer_lun = null;
	var list_lun  = $(".wrapper ul li");
	var page_lun = $(".wrapper ol li");
	timer_lun = setInterval(autoPlay,1500)
	function autoPlay(){
		index_lun++;
		if(index_lun == page_lun.length){
			index_lun = 0;
		}
		list_lun.eq(index_lun).fadeIn(1000).siblings().fadeOut(1000);
		page_lun.eq(index_lun).addClass("current").siblings().removeClass("current");
	}
	$(".wrapper").mouseenter(function(){
		clearInterval(timer_lun);
    })
    $(".wrapper").mouseleave(function(){
        timer_lun=setInterval(autoPlay,1500)
    })
	page_lun.mouseenter(function(){
		clearInterval(timer_lun);
		index_lun = $(this).index() - 1;
		autoPlay();
	})
	page_lun.mouseleave(function(){
		timer_lun=setInterval(autoPlay,1500)
	})