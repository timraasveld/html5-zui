$(document).ready(function() {
  var deepestDepth = 0;
  $('#root .zoomTarget').each(function() {
    var depth = $(this).parents('#root .zoomTarget').length;
    $(this).attr('depth', depth);
    if(depth > deepestDepth)
      deepestDepth = depth;
  });

  /*
     $('#root .zoomTarget').each(function() {
     percentageZoom = 1 / (0.300 ^ $(this).attr('depth'));
     $(this).children().css('transform', 'scale(' + percentageZoom + ')');
     });
     */

  var currentElement = document;

  var zoom = function(element) {
    $(element).zoomTo({animationendcallback: function() {
      $(this).addClass('active');
    }});
  }

  var zoomIn = function(element) {
    currentElement = event.toElement;
    zoom(currentElement);
  }

  var zoomOut = function() {
    $(currentElement).removeClass('active');
    currentElement = $(currentElement).parents('.zoomTarget').first();
    zoom(currentElement);
  }

  var mousewheel = function(event) {
    var scrolled_up = event.deltaY < 0;
    if(scrolled_up) {
      if($(event.toElement).hasClass('zoomTarget') && !$(event.toElement).hasClass('active')) {
        zoomIn(event.toElement);
      }
    }
    else
      zoomOut();

    event.stopPropagation();
  }

  document.onmousewheel = mousewheel;
});
