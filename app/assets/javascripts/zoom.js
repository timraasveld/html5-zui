$(document).ready(function() {
  var deepestDepth = 0;
  $('.zoomContainer .zoomTarget').each(function() {
    var depth = $(this).parents('.zoomContainer .zoomTarget').length;
    $(this).attr('depth', depth);
    if(depth > deepestDepth)
      deepestDepth = depth;
  });

  $('.zoomContainer .zoomTarget').each(function() {
    var depth = $(this).attr('depth');
    if(depth >= 1) {
      percentageZoom = Math.pow(0.5, depth)
      $(this).css('zoom', percentageZoom);
    }
  });

  var currentElement = document;

  var zoom = function(element) {
    $(element).addClass('active').zoomTo({root: $('.zoomContainer')});
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
    var scrolledUp = event.deltaY < 0;
    if(scrolledUp) {
      if($(event.toElement).hasClass('zoomTarget') && !$(event.toElement).hasClass('active')) {
        zoomIn(event.toElement);
      }
    }
    else
      zoomOut();

    event.stopPropagation();
  }

  $('.zoomTarget').click(function() {
    zoomIn(this);
  });

  document.onmousewheel = mousewheel;
});
