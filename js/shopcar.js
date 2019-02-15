var arr = getCookie("shopList");
console.log(arr)
//添加内容
var str = "";
for (var i=0;i<arr.length;i++) {
	var sum = (arr[i].price*arr[i].count).toFixed(3)
	str += `
					<div>
                		<p><input type="checkbox" name="" class="t_check" value="" /></p>
                		<p class="t_item" >${arr[i].name}</p>
                		<p class="t_price">${arr[i].price}</p>
                		<p class="t_dec"></p>
                		<p class="t_count">${arr[i].count}</p>
                		<p class="t_weight"></p>
                		<p class="t_sum">${sum}</p>
                		<p class="t_quntity"></p> 
                		<p class="t_operate"><button id="delete">删除</button></p>
                	</div>
	`
}
$("#shopcar_con").html(str);		
//合计
function addsum(){
	var count = 0;
	var money = 0;
	$(".t_check:checked").each(function(index,item){
			//console.log(index)
			//console.log(item)
		count += parseFloat($(item).parent().parent().find(".t_count").html());
		money += parseFloat($(item).parent().parent().find(".t_sum").html());
		console.log(count)
	})
	$("#toSumT").html("合计"+count+"件");
	$("#toSumP").html("合计"+money+"元")
}
//小计
$("#shopcar_con").on("click",".t_check",function(){
	addsum()
})

//删除选中项
$("#shopcar_con").on("click","#delete",function(){
	var pid = $(this).parent().parent().index();	
	arr.splice(pid,1);
	setCookie("shopList",JSON.stringify(arr));
	$(this).parent().parent().remove();
	addsum()
})
//删除全部
$("#clearAll").click(function(){
	arr.splice(0);
	setCookie("shopList",JSON.stringify(arr));
	$(this).parent().remove()
})

//全选
$("#selectAll").click(function(){
		$(".t_check").prop("checked",$(this).prop("checked"))
	addsum()
})
