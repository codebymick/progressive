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

    // var dashboardTemplate = $('#dashboard-template').html();
    // var dashboardScript = Handlebars.compile(dashboardTemplate);

    var projectsTemplate = $('#projects-template').html();
    var projectsScript = Handlebars.compile(projectsTemplate);

    var contactTemplate = $('#contact-template').html();
    var contactScript = Handlebars.compile(contactTemplate);

    $('.loader').fadeOut(2000);
    $('#slideshow-content').append(slideshowScript(data));
    // $('#dashboard-content').append(dashboardScript(data));
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
    // var JS = ($(this).data('pie1'))*3.6;
    // var CSS = ($(this).data('pie2'))*3.6;
    // var HTML = ($(this).data('pie3'))*3.6;
    // var SASS = ($(this).data('pie4'))*3.6;
    // var PHP = ($(this).data('pie5'))*3.6;
    // var Vue = ($(this).data('pie6'))*3.6;

    $('.modal-name').html($(this).data('name'));
    $('.modal-type').html($(this).data('type'));
    $('.modal-petowner').html($(this).data('petowner'));
    $('.modal-info').html($(this).data('info'));
    $('.modal-brief').html($(this).data('brief'));
    $('.modal-outcome').html($(this).data('outcome'));
    // $('#pieSlice1 .pie').css('transform', 'rotate(' + JS + 'deg)');
    // $('#pieSlice2 .pie').css('transform', 'rotate(' + CSS + 'deg)');
    // $('#pieSlice3 .pie').css('transform', 'rotate(' + HTML + 'deg)');
    // $('#pieSlice4 .pie').css('transform', 'rotate(' + SASS + 'deg)');
    // $('#pieSlice5 .pie').css('transform', 'rotate(' + PHP + 'deg)');
    // $('#pieSlice6 .pie').css('transform', 'rotate(' + Vue + 'deg)');
    $('.modal-link').attr('href', $(this).data('link'));
    $('.modal-image').attr('src', 'images/inspiration/' + $(this).data('image')+ '.jpg');
    $('.modal-image').attr('alt', $(this).data('name')+ ' photo');
    $('.tips').hover(function () {
      $(this).toggleClass('show-tips');
    });
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

$(document).ready(function(){

//set contributions chart

  function addDays(date, daysToAdd) {
    var _24HoursInMilliseconds = 86400000;
    return new Date(date.getTime() + daysToAdd * _24HoursInMilliseconds);
  }

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  var d = new Date();
  var month = 0;
  var currHour = d.getHours();
  var currMonth = month - 10;
  var currDay = d.getDay();
  var currDate = d.getDate();
  var currYear = d.getFullYear();
  var lastDayThisMonth = daysInMonth(currMonth, currYear);
  var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var squares = document.querySelector('.squares');
  var menuMonths = [];
  var count = 12; //position last square of grid on correct day or week

  var display_to_today = 364 + (Math.floor(currDate / 7) * 7 + currDay -7);

  if (currHour >= 10) {
    // display today's square with contributions only after 10am
    display_to_today = display_to_today + 1;
  } //chart function


  for (var i = lastDayThisMonth; i < display_to_today; i += 1) {
    var level = Math.floor(Math.random() * 25);

    if (level === 1) {
      var popupText = 'contribution on ';
    } else {
      popupText = 'contributions on ';
    }

    var now = new Date();
    var flexDate = addDays(now, i - (364 + currDay));
    var contrDate = flexDate.getDate() + ' ' + monthArray[flexDate.getMonth()] + ', ' + flexDate.getFullYear();
    var shortDate = flexDate.getDate()-7 + ' ' + monthArray[flexDate.getMonth()];
    var holidays = ['21 Dec', '22 Dec', '23 Dec', '24 Dec', '25 Dec', '26 Dec', '27 Dec', '28 Dec', '29 Dec', '30 Dec', '31 Dec', '1 Jan', '1 Jul', '2 Jul', '3 Jul', '4 Jul', '5 Jul', '6 Jul', '7 Jul', '8 Jul', '9 Jul', '10 Jul', '11 Jul', '12 Jul', '13 Jul', '14 Jul', '15 Jul', '16 Jul', '17 Jul', '18 Jul', '19 Jul', '3 Oct', '4 Oct', '5 Oct', '6 Oct', '7 Oct', '8 Oct', '9 Oct', '10 Oct', '11 Oct', '12 Oct'];
    var textInsert = "<span class=\"bubble-arrow\">" + " ".concat(level, " ") + popupText + contrDate + "</span></li>";

    if (holidays.indexOf(shortDate) > -1) {
      //sundays and holidays
      level = 0;
      squares.insertAdjacentHTML('beforeend', "<li class=\"tips\"><span class=\"bubble-arrow\">0 " + popupText + contrDate + "</span></li>");

      if (i < 84) {
        $('.tips').addClass('short');
      }
    } else {
      squares.insertAdjacentHTML('beforeend', "<li class=\"tips\" data-level=\"".concat(level, "\">") + textInsert);
    }
  } //end of function


  while (count > 0) {
    if (currMonth < 0) {
      currMonth += 13;
    }

    if (currMonth >= 12) {
      currMonth -= 12;
    }

    var month = monthArray[currMonth];
    menuMonths.push(month);
    currMonth = currMonth + 1;
    count = count - 1;
  }

  for (var j = 0; j < 12; j += 1) {
    var monthList = "<li>" + menuMonths[j] + "</li>";
    document.getElementById("months").innerHTML += monthList;
  }
});

// TODO effect of collecting page sections to top as user scrolls
