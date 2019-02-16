//百度搜索
			var search = document.getElementById("search_baidu");
            var list_baidu = document.getElementById("list");

            search.addEventListener("input",_throttle(handlerSearch,500));
            var showNum = 4;
            var timer = null;
            function handlerSearch(){
                  //console.log("hahahaha");
                  var url_baidu = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${search.value}&json=1&p=3&sid=1422_21089_28131_26350_28266&req=2&csor=2`;
                  jsonp(url_baidu,"cb")
                  .then(function(res){
                        // console.log(res.s);
                        var html0 = "";
                        res.s.every((item,index)=>{

                              html0 += `<li>${item}</li>`
                              return index < showNum;
                        })
                        list_baidu.innerHTML = html0;
                  })
            }

            // 函数去抖;
            // function _debounce(callback,dealy){
            //       // 利用闭包，让 timer 私有化;
            //       var timer = null;
            //       return function(){
            //             // 去抖函数; 确保,callback在正确的时机被调用?
            //             // 事件执行的时候，真正会执行的函数是这个;
            //             if(timer !== null) return false;
            //             // 如果已经过了规定的时间可以再次执行代码了;
            //             timer = setTimeout(function(){
            //                  callback(); 
            //                  timer = null;
            //             },dealy)
            //       }
            // }
            

            // 函数去抖;
            function _throttle(callback,dealy){
                  // 利用闭包，让 timer 私有化;
                  var timer = null;
                  return function(){
                        clearTimeout(timer);
                        // 如果已经过了规定的时间可以再次执行代码了;
                        timer = setTimeout(function(){
                             callback(); 
                        },dealy)
                  }
            }

            $(".search #list li").mouseenter(function(){
            	console.log(1);
                $("#search_baidu").val() = $(this).innerHTML;
            })
            
            
 //jsonp
            function jsonp(url,data){
			return new Promise(function(success,fail){
			var randomName = "_"+Date.now();
//		console.log(randomName)
			window[randomName] = function(res){
				success(res);
			}
			
			var script_baidu = document.createElement("script");
			url = url + (/\?/.test(url) ? "&" : "?") + data + "=" + randomName;
			script_baidu.src =url;
			
			document.body.appendChild(script_baidu);
			
			script_baidu.onload = function(){
				this.remove();
				
				window[randomName] = null;
				delete window[randomName];
			}
	})
}