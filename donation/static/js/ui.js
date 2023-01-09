var ui = {
	init:function(){
		$('.button__back').on('click', function(){
			console.log('aa');
		});
		this.responsive.init();
		this.datepick.init();
		this.wrapFixed.init();
		this.inputFocus.init();
		this.toggle.init();		
		this.inputCheck.init();
		this.tabs.init();
		this.popup.init();
		this.slides.init();
	},
	slides:{ // 스와이프 슬라이드
		init:function(){
			this.set();
		},
		set:function(){
			var _this = this;

			// $(this.dot.els).each(function(i){
			// 	var id = $(this).attr("data-slide-id");
			// 	if( !id ) {
			// 		$(this).attr("data-slide-id","id_"+i);
			// 		id = $(this).attr("data-slide-id");
			// 	}
			// 	_this.dot.using(id);
			// });
			// $(this.num.els).each(function(i){
			// 	var id = $(this).attr("data-slide-id");
			// 	if( !id ) {
			// 		$(this).attr("data-slide-id","id_"+i);
			// 		id = $(this).attr("data-slide-id");
			// 	}
			// 	_this.num.using(id);
			// });
			
			$(this.play.els).each(function(i){
				var id = $(this).attr("data-slide-id");
				if( !id ) {
					$(this).attr("data-slide-id","id_"+i);
					id = $(this).attr("data-slide-id");
				}
				_this.play.using(id);
			});
		},
		dot:{  //  
			els: ".ut-slide-dot .swiper-container:not(.swiper-container-initialized)",
			opt: {
				slidesPerView: 1,
				observer: true,
				observeParents: true,
				watchOverflow:true,
				pagination: {
					el: '.pagination',
					clickable: true
				},
				navigation: {
					nextEl: '.navigation .nav.next',
					prevEl: '.navigation .nav.prev'
				},
				zoom: {
					maxRatio: 1,
				},
				autoHeight:true,
				autoplay:false,
				preloadImages: false,
				// Enable lazy loading
				lazy: true,
				loop: false
			},
			using: function(id) {
				ui.slides[id] = new Swiper( "[data-slide-id="+id+"]", this.opt);
			}
		},
		num:{  //  
			els: ".ut-slide-num .swiper-container:not(.swiper-container-initialized)",
			opt: {
				slidesPerView: 1,
				observer: true,
				observeParents: true,
				watchOverflow:true,
				pagination: {
					el: '.pagination',
					type:"fraction"
				},
				navigation: {
					nextEl: '.navigation .nav.next',
					prevEl: '.navigation .nav.prev'
				},
				autoHeight:true,
				autoplay:false,
				preloadImages: false,
				// Enable lazy loading
				lazy: true,
				loop: false
			},
			using:function(id) {
				if( $(this.els).find(".swiper-slide").length <= 1 ) {
					this.opt.loop = false;
				}
				ui.slides[id] = new Swiper( "[data-slide-id="+id+"]", this.opt);
			}
		},
		play:{
			els:".ut-slide-play .swiper-container:not(.swiper-container-initialized)",
			opt:{
				observer: true,
				observeParents: true,
				watchOverflow:true,
				simulateTouch:false,
				freeMode: false,
				slidesPerView: 1,
				slidesPerGroup:1,
				spaceBetween:0,
				autoHeight:true,
				pagination: {
					el: '.dots',
					clickable: true
				},
				loop: false,
				autoplay: {
					delay: 4000,
					disableOnInteraction: false,
				}
			},
			slide:{},
			using:function(id){
				var _this = this;
				var sld = "[data-slide-id="+id+"]";
				if( $(sld).find(".swiper-slide").length <= 1 ) {
					_this.opt.loop = false;
					ui.slides[id] = new Swiper( "[data-slide-id="+id+"]", this.opt);
					$(sld).find(".control .plys").hide();
					$(sld).find(".control .dots").html("");
				}else{
					_this.opt.loop = true;
					$(sld).find(".control").show();
					ui.slides[id] = new Swiper( "[data-slide-id="+id+"]", this.opt);
				}

				$(document).on("click","[data-slide-id="+id+"] .plys .bt",function(e){
					if( $(this).is(".play") ){
						$(this).removeClass("play").text("재생");
						ui.slides[id].autoplay.stop();
					}else{
						$(this).addClass("play").text("정지");
						ui.slides[id].autoplay.start();
					}
				});
			}
		},
	},
	popup:{ 
		init: function() {
			var _this = this;			
			$(document).on("click", ".layer__popup .layer__close" , function() {
				var id = $(this).closest(".layer__popup").attr("id");
				_this.close(id);
				
			});
		},
		open: function(id) {
			var _this = this;
			if ( $("#" + id).length  <= 0  ) return ; 
      setTimeout(()=>{
        $("#"+id).addClass('is-active');
      },100);
		},
		close: function(id) {
			var _this = this;
      setTimeout(()=>{
				console.log($("#"+id))
        $("#"+id).removeClass('is-active');
      },100);
		},
  },
	tabs:{ // 탭 UI
		init: function() {
			var _this = this;
			this.evt();
			$(window).on("pageshow",function(){
				_this.set();
				_this.posit();
			});
		},
		set:function(speed){
			$(".ut-tabs>.menu").attr({"role":"tablist"});
			$("[data-ui-tab-btn]").each(function(){
				var tid = $(this).attr("aria-controls");
				// $(this).attr({"aria-controls":tid});
				var $li = $(this).closest("li");
				$li.find(".bt").attr({"role":"tab"});
				$li.is(".active") ? $li.find(".bt").attr({"aria-selected":"true"}) : $li.find(".bt").attr({"aria-selected":"false"});
				if( $li.is(".active") ){
					var val = $(this).attr("aria-controls");
					var ctn = $(this).data("ui-tab-btn");
					$("[data-ui-tab-ctn="+ctn+"]").removeClass("is-active");
					$("[data-ui-tab-ctn][aria-labelledby='"+val+"']").addClass("is-active");
				}
			});
			$("[data-ui-tab-ctn]").each(function(){
				var tid = $(this).attr("aria-controls");
				$(this).attr({"aria-labelledby":tid , "role":"tabpanel" });
			});
			this.posit(speed);
			//ui.ly.set();
		},
		
		posit:function(speed){
			var _this = this;
			speed = speed ? speed :  0;
			$(".ut-tabs").each(function(){
				var $tb     = $(this);
				var tbWid     = $(this).outerWidth();
				var tbScWid   = $tb.prop('scrollWidth');
				var $act    = $tb.find("li.is-active");
				var actMg    = parseInt( $tb.find("li.is-active").css("margin-left") );
				var $actWid = $act.outerWidth();
				var $actL   = $act.position() ? $act.position().left : 0;
				// var move    = ( ($actWid) - (tbScWid*0.5) + $actL );
				var move    = (  $actL  + $actWid*0.5 - tbWid*0.5 + actMg );
				// console.log(tbScWid , tbWid , $actL , $actWid , " = ",move);
				// $tb.scrollLeft(  move  );
				$tb.animate({ scrollLeft: move },speed, function() {
					
				});
			});
		},
		evt:function(){
			var _this = this;
			$(document).on("click", "[data-ui-tab-btn]", function(e){
				_this.using(this);
				_this.set(200);
			});
		},
		using:function(els){
			var val  = $(els).attr("aria-controls");
			var ctn = $(els).data("ui-tab-btn");
			// console.log(val, ctn);
			$("[data-ui-tab-btn="+ctn+"]").removeClass("is-active").closest("li").removeClass("is-active");
			
			$(els).addClass("is-active").closest("li").addClass("is-active");
			$("[data-ui-tab-ctn="+ctn+"]").removeClass("is-active");
			$("[data-ui-tab-ctn][aria-labelledby='"+val+"']").addClass("is-active");
		} 
	},
	inputCheck:{
		init:function(){  
			$("[data-element='inputCheck'], [data-element='allCheck']").each(function(){
				var $target = $(this).find('>input');
				checkConfirm($target);
				$target.change(function(){
					checkConfirm($target);
				});

				function checkConfirm(target){
					if( $target.is(':checked') ){
						$target.closest('.checkbox').attr('aria-checked','true');
						$target.closest('.radio').attr('aria-checked','true'); //radio 접근성 재수정
					} else {
						$target.closest('.checkbox').attr('aria-checked','false');
						$target.closest('.radio').attr('aria-checked','false');
					}
				}
			})

			//전체선택 //다시
			$("[data-element='allCheck']").each(function(){
				console.log('aa');
				var $allCheck = $(this).find(">input");
				var $chList = $(this).closest("[data-element='allCheckWrap']").find("[data-element='inputCheck']>input")
				

				$allCheck.change(function(){
					if( !$allCheck.is(':checked') ){
						$chList.prop("checked", false);
					} else {
						$chList.prop("checked", true);
					}
				});

				function checked( allChkLength, checkedLength ){
					console.log(allChkLength, checkedLength)
					if( allChkLength == checkedLength ){
						$allCheck.prop('checked', true);
					} else {
						$allCheck.prop('checked', false);
					}
				  }

				$chList.change(function(){
					var checkLength = $(this).closest("[data-element='inputCheck']").find('.checkbox__input').length;
					var checkedLength = $(this).closest("[data-element='inputCheck']").find('.checkbox__input:checked').length;
					
					checked(checkLength, checkedLength)
					
				})
			})
		}
	},
	toggle:{
		init:function(){
			$("[data-element='toggle']").each(function(){
				var $toggleTit = $('.toggle__tit');
				var $toggleContent = $('.toggle__content');

				$toggleTit.attr('aria-expanded', 'false');
				$toggleContent.attr({'role':'region'});

				for(var i=0; i<$toggleTit.length; i++){
					console.log(i+1, $toggleTit.eq(i).text());
					$toggleTit.eq(i).attr('id', `toggle${i+1}`);
					$toggleContent.eq(i).attr({'aria-labelledby':`toggle${i+1}`});
				}
		  
				$toggleTit.on('click', function(e){
				  e.preventDefault();
				  var $toggleCon = $(this).closest(".toggle__item");

				  if( !$toggleCon.hasClass('is-active') ){
					$toggleTit.attr('aria-expanded', 'false');
					$(this).attr('aria-expanded', 'true');
					$toggleCon.addClass('is-active').siblings().removeClass('is-active');
					
				  } else {
					$toggleTit.attr('aria-expanded', 'false');
					$toggleCon.removeClass('is-active');
				  }
				})
			})
		}		
	},
	inputFocus:{
		init:function(){
			$("[data-element='inputText']").each(function(){
				$(document).on("focus",".input__text",function(e){
					$(".input__text").closest('.input__box').removeClass("input__box--focus");
					$(this).closest(".input__box").addClass("input__box--focus");
				});
			});
		}
	},
	wrapFixed:{
		init:function(){
			var wFixed = 'wrap--fixed';
			if( $('.fixed__wrap').size() ){
				$('.wrap').addClass(wFixed)
			} else {
				$('.wrap').removeClass(wFixed);
			}
		}
	},
	responsive:{
		init:function(){
			function getResponsive() {
				if($(window).width() <= 320){
					console.log('mobile');
					$('#wrap').addClass('isMobile').removeClass('isPc', 'isTablet');
				} else if( $(window).width() <= 600 ){
					console.log('tablet');
					$('#wrap').addClass('isTablet').removeClass('isPc', 'isMobile');
				} else {
					console.log('pc');
					$('#wrap').addClass('isPc').removeClass('isTablet', 'isMobile');
				}
				$(window).on('resize', () => {
					getResponsive();
				});
			}
			getResponsive();
		}
	},
	datepick:{ // 년월일 선택 달력피커 jQuery-ui
		init:function(){
			$('.datepicker').each(function(){
				$("input.datepicker").on("focus",function(){
					// $(this).blur();
					// $(this).prop("readonly",true);
					// $(this).attr("tabindex","-1");
					// $(this).next(".ui-datepicker-trigger").focus();
				});
	
				$(document).on("click",".ui-datepicker-next",function(e){
					e.preventDefault();
					setTimeout(function(){
						$(".ui-datepicker-next").attr({"tabindex":"0"}).focus();
					});
				});
				$(document).on("click",".ui-datepicker-prev",function(e){
					e.preventDefault();
					setTimeout(function(){
						$(".ui-datepicker-prev").attr({"tabindex":"0"}).focus();
					});
				});
				$(document).on("change click",".ui-datepicker-year",function(e){
					e.preventDefault();
					setTimeout(function(){
						$(".ui-datepicker-year").attr("title","년도선택").focus();
					});
				});
				this.set();
			});
		},
		set:function(params){
			var _this = this;
			this.opts = $.extend({
				id:"",
				// minDate: '-3M',
	  			// maxDate: '+28D',
				showOn: "button",
				showButtonPanel: true,
				changeYear:true ,
				// changeMonth:true,
				buttonText: "날짜선택",
				// showMonthAfterYear: true,
				prevText: "이전 달",
				nextText: "다음 달",
				closeText: "닫기",
				dateFormat:"yy.mm.dd",
				yearRange: 'c-50:c+20',
				// yearSuffix: "년",
				showOtherMonths: true,
     			selectOtherMonths: false,
				dayNamesMin: [ "일", "월", "화", "수", "목", "금", "토" ],
				monthNames : [ "1","2","3","4","5","6","7","8","9","10","11","12"],
				monthNamesShort: [ "1","2","3","4","5","6","7","8","9","10","11","12"],
				beforeShow: function(els,id) {
					// console.log($(this).attr("id"));
					$(".ui-datepicker").wrap('<div class="ui-datepickwrap"></div>');
					setTimeout(function(){
						//ui.keytab.set( $("#ui-datepicker-div") );
						$(".ui-datepicker-header .ui-corner-all").attr({"tabindex":"0","href":"javascript:;"});
						$("#ui-datepicker-div").attr("tabindex","-1").focus();
						// $("#ui-datepicker-div").prepend('<h3 class="ptit blind" tabindex="0">날짜선택</h3>');
						$("#ui-datepicker-div").prepend('<h3 class="ptit blind">날짜선택</h3>');
						$("#ui-datepicker-div .ui-state-active").attr({"title":"선택됨"});
						$("#ui-datepicker-div .ui-state-highlight").attr({"title":"오늘날짜"});
						$("#ui-datepicker-div .ui-state-highlight.ui-state-active").attr({"title":"오늘날짜 선택됨"});
						$(".ui-datepicker-year").attr("title","년도선택");
						//_this.setYY(els,id);
						$(".ui-datepickwrap").addClass("open");
						//ui.lock.using(true);
					});

					// 2022.04.05 달력버튼 누르면 style초기화 test
					// $(".ut-range .radiobox.c").addClass("reset");
					// $(".ut-range .radiobox.c .radio").on("click",function(){
					// 	$(this).parent().removeClass("reset");
					// });
				},
				onSelect :function(date,els){
					// console.log(date,els);
					// $(this).trigger("change");
					// $(this).focus();
					$(this).removeClass("init");
				},
				onChangeMonthYear  :function(els,id){

					setTimeout(function(){
						$(".ui-datepicker-header .ui-corner-all").attr({"tabindex":"0","href":"javascript:;"});
						// $("#ui-datepicker-div").prepend('<h3 class="ptit blind" tabindex="0">날짜선택</h3>');
						$("#ui-datepicker-div").prepend('<h3 class="ptit blind">날짜선택</h3>');
						$(".ui-datepicker-year").attr("title","년도선택").focus();
						//_this.setYY(els,id);
					});
				},
				onClose:function(date,els){
					// console.log(date,els);
					// ui.lock.using(false);
					// $("#"+els.id).focus();
					$(".ui-datepickwrap").removeClass("open");
					setTimeout(function(){
						$(".ui-datepicker").unwrap(".ui-datepickwrap");
						//ui.lock.using(false);
						$("#"+els.id).next("button").focus().closest(".ut-date").addClass("coms");
					},200);
				}
			}, params);
			if( this.opts.id ) {
				$("#"+this.opts.id+":not([disabled]):not([readonly])").datepicker(this.opts).addClass("datepicker");
			}else{
				$("input:not([disabled]):not([readonly]).datepicker").datepicker(this.opts);
			}
			$("input:not([disabled]):not([readonly]).datepicker").attr("pattern","\\d*");
			// $("input:not([disabled]):not([readonly]).datepicker").prop("readonly",true);
			$("input.datepicker.st").next(".ui-datepicker-trigger").text("시작날짜선택");
			$("input.datepicker.ed").next(".ui-datepicker-trigger").text("종료날짜선택");
		},
		setYY:function(els,id){
			var dtit = $(els).attr("title") || "날짜선택";
			// console.log(dtit);
			if( !$(".ui-datepicker .dtit").length ) $(".ui-datepicker").prepend('<h4 class="dtit">'+dtit+'</h4>');
			var btsy = '<div class="btsy">'+
							'<button class="bt prev" type="button">이전</button>'+
							'<button class="bt next" type="button">다음</button>'+
						'</div>';
			if( !$(".ui-datepicker-header .btsy").length ) $(".ui-datepicker-header").prepend(btsy);
		}
	},
	
}

$(document).ready(function(){
	ui.html.include();
	ui.html.times = setInterval(function(){ // console.log("ui.html" ,  ui.html.incCom);
		if (ui.html.incCom) {
			clearInterval(ui.html.times);
			ui.init();
		}
	});
	
});	


