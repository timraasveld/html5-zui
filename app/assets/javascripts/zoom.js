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
      percentageZoom = 100 / (0.300 ^ $(this).attr('depth'));
      $(this).children().css('zoom', percentageZoom + '%');
    }});
  }

  var mousewheel = function(event) {
    if (event.deltaY < 0) {
      if($(event.toElement).hasClass('zoomTarget') && !$(event.toElement).hasClass('active')) {
        currentElement = event.toElement;
      }
    }
    else {
      $(currentElement).removeClass('active');
      currentElement = $(currentElement).parents('.zoomTarget').first();
    }

    console.log(currentElement);
    zoom(currentElement);

    event.stopPropagation();
  }

  document.onmousewheel = mousewheel;
});
