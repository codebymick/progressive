var $ = jQuery = require('jquery');
require('./bootstrap_custom.js');
var Handlebars = require('handlebars');

$(function() {
  var topoffset = 50;

  if('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then(function() {
        console.log('Service Worker Active');
      })
  }

  $.getJSON('/data/inspiration.json', function(data) {
    var slideshowTemplate = $('#slideshow-template').html();
    var slideshowScript = Handlebars.compile(slideshowTemplate);

    var dashboardTemplate = $('#dashboard-template').html();
    var dashboardScript = Handlebars.compile(dashboardTemplate);

    var projectsTemplate = $('#projects-template').html();
    var projectsScript = Handlebars.compile(projectsTemplate);

    var contactTemplate = $('#contact-template').html();
    var contactScript = Handlebars.compile(contactTemplate);

    $('.loader').fadeOut(2000);
    $('#slideshow-content').append(slideshowScript(data));
    $('#dashboard-content').append(dashboardScript(data));
    $('#projects-content').append(projectsScript(data));
    $('#contact-content').append(contactScript(data));

    //replace IMG inside carousels with a background image
    $('#slideshow .item img').each(function() {
      var imgSrc = $(this).attr('src');
      $(this).parent().css({'background-image': 'url(' + imgSrc + ')'});
      $(this).remove();
    });

    //Activate carousel
    $('.carousel').carousel({
      pause: false
    });
  });

  $('.reload').click(function() {
    window.location.reload();
  });

  $('.navbar-fixed-top').on('activate.bs.scrollspy', function() {
    var hash = $(this).find('li.active a').attr('href');
    if (hash !== '#slideshow') {
      $('header nav').addClass('inbody');
    } else {
      $('header nav').removeClass('inbody');
    }
  });

  $(document).on('click', '.openprojectmodal', function() {
    $('.modal-name').html($(this).data('name'));
    $('.modal-type').html($(this).data('type'));
    $('.modal-petowner').html($(this).data('petowner'));
    $('.modal-info').html($(this).data('info'));
    $('.modal-brief').html($(this).data('brief'));
    $('.modal-outcome').html($(this).data('outcome'));
    $('.modal-link').attr('href', $(this).data('link'));
    $('.modal-image').attr('src', 'images/inspiration/' + $(this).data('image')+ '.jpg');
    $('.modal-image').attr('alt', $(this).data('name')+ ' photo');
  });

  //Use smooth scrolling when clicking on navigation
  $('.navbar a').click(function() {
    if (location.pathname.replace(/^\//,'') ===
      this.pathname.replace(/^\//,'') &&
      location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top-topoffset+2
        }, 500);
        return false;
      } //target.length
    } //click function
  }); //smooth scrolling

  $('body').scrollspy({
    target: 'header .navbar',
    offset: topoffset
  });
}); //Page Ready
$(document).ready(function() {
  setTimeout(function() {
    $('body').addClass('loaded');
  }, 1500);

});
