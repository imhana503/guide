ui.html = {	
	set:{
		init:function () {
		},
	},
	incCom:false,
	load:function( paramCallback ){
		if( paramCallback ){
			this.loadCallback = paramCallback;
		}
	},
	include:function(){
		var _this = this;
		var $inchtml = $("include");
		var incAmt = 0;
		if ($inchtml.length) {
			$inchtml.each(function(idx){
				var inc = $(this).attr("src");
				// console.log(inc);
				var incopt = $(this).data("include-opt");				
				var incNums = $inchtml.length ;
				$(this).load( inc ,function(response, status, xhr){
					// console.log( inc, idx+1 , incNums,  status, xhr);
					if( incopt ){
						//console.log( inc ,  incopt );
					}
					if( incopt && incopt.visible == "true"){
						// console.log("show" , $(this));
						$(this).find(">*").show().data("visible",true);
					}
					if( incopt && incopt.visible == "false"){
						$(this).find(">*").hide().data("visible",false);
					}
					
					if( incopt && incopt.class ){
						var incObjEls = { //"해당클래스가 있을시" : "해당 클래스가 block" 
							".header.header--title"  :".header__title",
							".header.header--gnb"  :".button__gnb",
							".header.header--back"  :".button__back",
							".header.header--close"  :".button__close",
						};
						

						var arrcls = incopt.class.replace(/ /g,"").split(",");
						//console.log('arrls',inc , arrcls);
						for (var key in arrcls) {
							var cls = arrcls[key];
							//var rks = cls.replace("is-","");  
							
							$(this).find(">*").addClass(cls);
						}
						
						for (var skey in incObjEls){
							var els = incObjEls[skey];
							// console.log(skey,"  =   ",els  , $(this).find(">*"));
							
							$(this).find(">*").find(els).hide();

							if( $(this).find(">*").is(skey) ) {
								// console.log("Ddd",els ,$(this).find(">*"));
								$(this).find(">*").find(els).show();
							}
						}
						$("#header .header__title").html(incopt.title); // data-include-opt title 사용
					}

					$(this).find(">*").unwrap();
					incAmt ++;
					if( status == "success" ){
						
					}else if( status == "error"){
						_this.incCom = false ;
						console.log("include 실패" , inc );
						if( typeof _this.loadCallback == "function") _this.loadCallback();
					}						
					if( incAmt == incNums ) {
						_this.incCom = true ;
						// ui.html.set.tit();
						if( typeof _this.loadCallback == "function") _this.loadCallback();
					}
				
				});
			});
		}else{
			_this.incCom = true ;
			ui.html.set.tit();
			if ( typeof _this.loadCallback == "function") _this.loadCallback();
		}
		//console.log("완료" + _this.incCom);
	}
};


// $(document).ready(function(){
// 	ui.html.include();
// 	ui.html.times = setInterval(function(){ // console.log("ui.html" ,  ui.html.incCom);
// 		if (ui.html.incCom) {
// 			clearInterval(ui.html.times);
// 			ui.init();
// 		}
// 	});
// });

