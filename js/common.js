$(document).ready(function(){
  function accordion(){
    var allChekcbox = "data-allCheckbox";

    if(allChekcbox.length > 0){
      var $accTit = $('.accordion__tit');

     
    }
  }

  function accordion(){
    var uiAccordion = "data-accordion";

    if(uiAccordion.length > 0){
      var $accTit = $('.accordion__tit');

      $accTit.on('click', function(e){
        e.preventDefault();
        var $accCon = $(this).closest(".accordion__item");
        if( !$accCon.hasClass('is-active') ){
          $accCon.addClass('is-active');
          $accCon.siblings().removeClass('is-active');
        } else {
          $accCon.removeClass('is-active');
        }
      })
    }
  }

  function inputFocus(){
    var uiInputText = "data-input-text";

    if(uiInputText.length > 0){
      $(document).on("focus",".input__text",function(e){
        $(".input__text").closest('.input__box').removeClass("input__box--focus");
        $(this).closest(".input__box").addClass("input__box--focus");
      });
    }
  }

  function designSelect(){
    var uiDesignSelect = "data-designSelect";

    if(uiDesignSelect.length > 0){
      $('.select').each(function(){
        var selectbox = $(this).find('>select');
        var selOption = [];
        var selIdx;

        selectbox.find('option').each(function(idx){
          selOption.push(selectbox.find('option').eq(idx).text());         
        })
        
        //select 이벤트
        $(document).on('click', '.select__button', function(){
          if( !$(this).closest('.select').hasClass('is-active') ){
            $(this).closest('.select').addClass('is-active')
            $(this).closest('.select').find('.select__item>li').eq(selIdx).addClass('active');
            var selectList = '<div class="select__item"><ul>';
            for( var i=0; i<selOption.length; i++ ){
              if( selIdx === i ){
                selectList+= '<li class="active"><a href="javascript:;">'+selOption[selIdx]+'</a></li>';
              } else {
                selectList+= '<li><a href="javascript:;">'+selOption[i]+'</li>';
              }
            }  
            selectList+= '</ul></div>';            
            $(this).find('.select__item>ul>li').eq(selIdx).addClass('active');
            $(this).closest('.select').append(selectList);           
          } else {            
            $(this).closest('.select').removeClass('is-active');
            selectList = null;
            $(this).closest('.select').find('.select__item').remove();
          }

          var selectButton = $('.select__item>ul>li>a');
          selectButton.on('click', function(){
            $(this).closest('.select').removeClass('is-active');
            selectList = null;
            $('.select__item').remove();
            $('.select__button').text( $(this).text());
            selIdx = $(this).closest('li').index();
            selectbox.find('option').removeAttr('selected');
            selectbox.find('option:eq('+selIdx+')').attr('selected','selected');
          })
        })
        $(document).on("click",".body",function(e){
          if( !$(e.target).is('.select__button') ){
            if( !$(this).closest('.select').hasClass('active') ){
              $('.select').removeClass('active');
              selectList = null;
              $('.select__item').remove();
            }
          }
        });
      
      })
    }

    //셀렉트 테스트
    $('.des-select-wrap').each(function(){
      var selectbox = $(this).find('.des-selectbox');
      var selOption = [];
      var selIdx;

      selectbox.find('option').each(function(idx){
        selOption.push(selectbox.find('option').eq(idx).text());         
      })
     
      $(document).on('click', '.btn-sel', function(){

        if( !$(this).closest('.des-select-wrap').hasClass('active') ){
          $(this).closest('.des-select-wrap').addClass('active');
          $(this).addClass('fc-color');
          var selectList = '<div class="des-select"><ul>';
          for( var i=0; i<selOption.length; i++ ){
            if( selIdx === i ){
              selectList+= '<li class="active"><a href="javascript:;">'+selOption[selIdx]+'</a></li>';
            } else {
              selectList+= '<li><a href="javascript:;">'+selOption[i]+'</li>';
            }
          }  
          selectList+= '<ul></div>';
          
          $(this).find('.des-select>ul>li').eq(selIdx).addClass('active');
          $(this).closest('.des-select-wrap').append(selectList);


        } else {
          $(this).closest('.des-select-wrap').removeClass('active');
          selectList = null;
          $('.des-select').remove();
          $(this).removeClass('fc-color');
        }

        var mailBtn = $('.des-select>ul>li>a');
        mailBtn.on('click', function(){
          $(this).closest('.des-select-wrap').removeClass('active');
          selectList = null;
          $('.des-select').remove();
          $('.btn-sel').text( $(this).text());
          selIdx = $(this).closest('li').index();
          selectbox.find('option').removeAttr('selected');
          selectbox.find('option:eq('+selIdx+')').attr('selected','selected');
          if( $(this).text() === '직접입력' ){
            //$('#selfInput').focus();
              $('#email_domain').val("");
            $('#email_domain').prop("readonly", false);
              $('#email_domain').focus();
          }else{
            $('#email_domain').prop("readonly", true);
            $('#email_domain').val($(this).text());
          }
        });

        // $(document).on('click', 'body', function(e){
        //   if( !$(e.target).is('.btn-sel') ){
        //     if( !$(this).closest('.des-select-wrap').hasClass('active') ){
        //       $('.des-select-wrap').removeClass('active');
        //       selectList = null;
        //       $('.des-select').remove();
        //     }
        //   }
        // });
        
      })
    })
  }

  // allCheck:{
  //   init:function(){
  //     this.evt();
  //   },
  //   evt:function(){
  //     $('[data-all-check="all"]').each(function(){
  //       var allCheck = $(this);
  //       var checkList = $(this).closest('.mbl-terms').find('[data-check="al-ch"]');
  //       var allCheckList = $(this).closest('[data-all-checks]').find('[data-check="al-ch"]');
  //       var subCheckList = $(this).closest('.mbl-terms').find('.sub-input-item [data-check="al-ch"]');
        
        
  //       allCheck.change(function(){   
  //         if(!allCheck.is(':checked')){
  //           checkList.prop('checked', false);
  //           allCheckList.prop('checked', false);
  //         } else {
  //           checkList.prop('checked', true);
  //           allCheckList.prop('checked', true);
  //         }
  //       });

  //       function checked( allChkLength, checkedLength ){
  //         if( allChkLength == checkedLength ){
  //           allCheck.prop('checked', true);
  //         } else {
  //           allCheck.prop('checked', false);
  //         }
  //       }

  //       checkList.change(function(){
  //         var checkLength = $(this).closest('.mbl-terms').find('[data-check="al-ch"]').length;
  //         var checkedLength = $(this).closest('.mbl-terms').find('[data-check="al-ch"]:checked').length;

  //         checked(checkLength, checkedLength);
  //       });

  //       allCheckList.change(function(){
  //         var checkLength = $(this).closest('[data-all-checks]').find('[data-check="al-ch"]').length;
  //         var checkedLength = $(this).closest('[data-all-checks]').find('[data-check="al-ch"]:checked').length;
          
  //         checked(checkLength, checkedLength);
  //       });

  //       //선택 약관(마케팅관련)
  //       subCheckList.change(function(){
  //         var checkedLength = $(this).closest('.sub-input-item').find('[data-check="al-ch"]:checked').length;
  //         if(checkedLength>0){
  //           $(this).closest('.terms-list.other').find('[data-check-first="al-ch-first"]').prop('checked', true);
  //         } else if( checkedLength == 0 ) {
  //           $(this).closest('.terms-list.other').find('[data-check-first="al-ch-first"]').prop('checked', false);
  //         }
  //       })
  //     })
  //   }
  // },

  function init(){
    accordion();
    inputFocus();
    designSelect();
  }

  //실행
  init();

  
}); 