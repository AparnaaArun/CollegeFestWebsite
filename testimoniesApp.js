const swiper = new Swiper('.swiper-container', {

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    autoplay:
    {
      delay: 2000,
    },
    loop: true,

    // Default parameters
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true,
    roundLengths: true,
    loop: true,
    loopAdditionalSlides: 30,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 0
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 0
      }
    }
  });
