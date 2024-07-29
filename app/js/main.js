$(function () {
  if (
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i)
  ) {
    var viewportmeta = document.querySelector('meta[name="viewport"]');
    if (viewportmeta) {
      viewportmeta.content =
        "width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0";
      document.body.addEventListener(
        "gesturestart",
        function () {
          viewportmeta.content =
            "width=device-width, minimum-scale=0.25, maximum-scale=1.6";
        },
        false
      );
    }
  }
});

$(function () {
  $(".products__slider").slick({
    infinite: false,
    prevArrow:
      '<button class="slider-btn slider-btn__left"><svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.21839 1L1 9L9.21839 17" /></svg></button>',
    nextArrow:
      '<button class="slider-btn slider-btn__right"><svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.78161 17L9 9L0.78161 1"/></svg></button>',
  });

  $(document).ready(function () {
    $(".questions__item-title").on("click", function () {
      var $currentItem = $(this).parent();
      var $activeItem = $(".questions__item--active");

      if ($currentItem.is($activeItem)) {
        // Если нажимают на уже активный элемент, просто закрываем его
        $currentItem.removeClass("questions__item--active");
      } else {
        $currentItem.addClass("questions__item--active");
      }
    });
  });
  $(document).ready(function () {
    $("#fullpage").fullpage({
      //options here
      licenseKey: "gplv3-license",
      autoScrolling: true,
      scrollHorizontally: true,
      sectionSelector: ".page-section",
      touchSensitivity: 15,
      menu: "#header__nav",
      anchors: [
        "top",
        "products",
        "benefits",
        "specification",
        "questions",
        "contacts",
      ],
    });
  });

  var scrollBtns = document.querySelectorAll(".scroll__btn a");
  if (scrollBtns) {
    scrollBtns.forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        event.preventDefault();

        fullpage_api.moveSectionDown();
      });
    });
  }

  $(".menu__btn").on("click", function () {
    $(".menu__btn").toggleClass("menu__btn--active");
    $(".menu__list").toggleClass("menu__list--active");
  });

  $(".menu__list-link").on("click", function () {
    $(".menu__btn").removeClass("menu__btn--active");
    $(".menu__list").removeClass("menu__list--active");
  });
});
