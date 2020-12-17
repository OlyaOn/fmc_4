$(document).ready(function(){
    $('.carrousel__inner').slick(
        {
            speed: 1200,
            /* adaptiveHeight: true, */
            prevArrow: '<button type="button" class="slick-prev"><img src="img/icons/left.png" alt= "left"></button>',
            nextArrow: '<button type="button" class="slick-next"><img src="img/icons/right.png" alt= "right"></button>',
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false,

             responsive: [
                {
                  breakpoint: 991,
                  settings: {

                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false

                  }
                } ,

                {
                    breakpoint: 767,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      infinite: true,
                      dots: true

                    }
                  },
                  {
                    breakpoint: 576,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      infinite: true,
                      dots: true

                    }
                  }

              ] 
          }
    );

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });


      function toggleSlide(item){
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
  
            })
        });
      };
      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back');
    
      //modal

      $('[data-modal=consultation]').on ('click', function(){
          $('.overlay, #consultation').fadeIn('slow');

      });
      $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
      });
      //команда которая будет перебирать кнопки, чтобы менять название в форме
      $('.button_mini').each(function(i){
        //необходиом чтобы менялся текст, скрипт чтобы находил название с карточки
        $(this).on('click', function(){
          $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
          $('.overlay, #order').fadeIn('slow');
        })
      });

      //валидация 2
//чтобы не писать несколько раз один и тот же код - валидация форм
      function valideForms(form){
        $(form).validate({
          rules:{
            name: "required",
            phone: "required",
            email: {
              required: true,
              email: true
            }
          },
          messages: {
            name: "Пожалуйста, введите своё имя",
            phone: "Пожалуйста, введите свой номер телефона",
            email: {
              required: "Пожалуйста, введите свою почту",
              email: "Неправильно введен адрес почты"
            }
          }
  
        });

      };
      valideForms('#consultation-form');
      valideForms('#consultation form');
      valideForms('#order form');

      $('input[name=phone]').mask("+3(999) 999-99-99");

      //берем все формы//е щтменить стандарное поведение формы
      $('form').submit(function(e){
        e.preventDefault();
        $.ajax({
          type: "POST",
          url: "mailer/smart.php",
                    //данные которые хочу отправить

          data: $(this).serialize()
        }).done (function(){
          $(this).find("input").val("");//очистим все инпуты
          $('#consultation, #order').fadeOut();
          $('.overlay, #thanks').fadeIn('slow');
         $('form').trigger('reset'); 
        });
        return false;
      });

      //Smooth scroll and pageup

      $(window).scroll(function(){
        if($(this).scrollTop() > 1600) {
          $('.pageup').fadeIn();
        } else{
          $('.pageup').fadeOut();
        }
      });

      $("a[href=#up]").click(function(){
              const _href = $(this).attr("href");
              $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
              return false;
      });

      new WOW().init();
});
