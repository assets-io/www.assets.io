/*
* Quotes plugin
*/
(function($){

  var settings = {
    'cycleSpeed'     : 9000,
    'animationSpeed' : 1000,
    'subselector' : "div",
    'start'     : { opacity: 0 },
    'target'    : { opacity: 1 }
  };

  var items;
  var index = 0;
  var animated = false;
  var timer;

  var methods = {
    init : function( options ) {

      // local copy of this
      var $this = $(this);

      // find all elements to be looped over
      items = $this.find(settings.subselector);
      items.animate(settings.start, 1000);

    },
    play : function() {

      // set up a timer that calls the update method in the specified time interval
      // set animated state to true
      timer = setInterval( function(){ methods.update() }, settings.cycleSpeed);
      animated = true;
      methods.update();

    },
    stop : function() {

      // kill the timer, set animation to false
      // index is kept intact
      clearInterval(timer);
      animated = false;

    },
    update : function() {

      if(animated){

        // if index gets out of range, reset to zero
        if( index >= items.length ) index = 0;

        // animated current index element
        items.eq(index).animate(settings.target, settings.animationSpeed);
        items.eq(index-1).animate(settings.start, settings.animationSpeed);
        index++;
      }

    }
  };

  $.fn.quotes = function(method, options) {

    return this.each(function() {

      // merge options with default settings
      if(options) $.extend(settings, options);

      // Method calling logic
      if ( methods[method] ) {
        return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
      } else if ( typeof method === 'object' || ! method ) {
        return methods.init.apply( this, arguments );
      } else {
        $.error( 'Method ' +  method + ' does not exist on jQuery.quotes' );
      }

    });

  };

})( jQuery );
