!(function ($) {
  'use strict'
  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove()
      })
    }
  })
 
  // Dynamically add bootstrap classes added to div to avoid repetition
  $(document).ready(function () {
    $('.ct').addClass('col-lg-2 col-md-4 col-6 mt-4')
    $('.cb').addClass('col-lg-1 col-md-0 col-0 mt-4')
    $('div.ct h6').addClass('text-left mt-3')
  })

  // Stick the header at top on scroll
  $('#header').sticky({
    topSpacing: 0,
    zIndex: '50'
  })

  // Smooth scroll for the navigation menu and links with .scrollto classes
  const scrolltoOffset = $('#header').outerHeight() - 1
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function (e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      const target = $(this.hash)
      if (target.length) {
        e.preventDefault()

        let scrollto = target.offset().top - scrolltoOffset

        if ($(this).attr('href') == '#header') {
          scrollto = 0
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo')

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active')
          $(this).closest('li').addClass('active')
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active')
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close')
          $('.mobile-nav-overly').fadeOut()
        }
        return false
      }
    }
  })

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function () {
    if (window.location.hash) {
      const initial_nav = window.location.hash
      if ($(initial_nav).length) {
        const scrollto = $(initial_nav).offset().top - scrolltoOffset
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo')
      }
    }
  })

  // Navigation active state on scroll
  const nav_sections = $('section')
  const main_nav = $('.nav-menu, .mobile-nav')

  $(window).on('scroll', function () {
    const cur_pos = $(this).scrollTop() + 200

    nav_sections.each(function () {
      const top = $(this).offset().top
      const bottom = top + $(this).outerHeight()

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active')
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active')
      }
      if (cur_pos < 300) {
        $('.nav-menu ul:first li:first').addClass('active')
      }
    })
  })

  // Mobile Navigation
  if ($('.nav-menu').length) {
    const $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    })
    $('body').append($mobile_nav)
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>')
    $('body').append('<div class="mobile-nav-overly"></div>')

    $(document).on('click', '.mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active')
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close')
      $('.mobile-nav-overly').toggle()
    })

    $(document).on('click', '.mobile-nav .drop-down > a', function (e) {
      e.preventDefault()
      $(this).next().slideToggle(300)
      $(this).parent().toggleClass('active')
    })

    $(document).click(function (e) {
      const container = $('.mobile-nav, .mobile-nav-toggle')
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active')
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close')
          $('.mobile-nav-overly').fadeOut()
        }
      }
    })
  } else if ($('.mobile-nav, .mobile-nav-toggle').length) {
    $('.mobile-nav, .mobile-nav-toggle').hide()
  }

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow')
    } else {
      $('.back-to-top').fadeOut('slow')
    }
  })
  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo')
    return false
  })

  // Init AOS
  function aos_init () {
    AOS.init({
      duration: 1000,
      once: true
    })
  }

  $(window).on('load', function () {
    aos_init()
  })

  // Add Bootstrap Columns
})(jQuery)
