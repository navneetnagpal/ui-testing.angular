/**
* DropKick
*
* Highly customizable <select> lists
* https://github.com/JamieLottering/DropKick
*
* &copy; 2011 Jamie Lottering <http://github.com/JamieLottering>
*                        <http://twitter.com/JamieLottering>
*
*/
;(function ($, window, document) {

  var msVersion = navigator.userAgent.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/),
      msie = !!msVersion,
      ie6 = msie && parseFloat(msVersion[1]) < 7;
      ie8 = msie && parseFloat(msVersion[1]) < 9;

  // Help prevent flashes of unstyled content
  if (!ie6) {
    document.documentElement.className = document.documentElement.className + ' dk_fouc';
  }

  var
    // Public methods exposed to $.fn.dropkick()
    methods = {},

    // Cache every <select> element that gets dropkicked
    lists   = [],

    // Convenience keys for keyboard navigation
    keyMap = {
      'left'  : 37,
      'up'    : 38,
      'right' : 39,
      'down'  : 40,
      'enter' : 13
    },

    // HTML template for the dropdowns
    dropdownTemplate = [
      '<div class="dk_container" id="dk_container_{{ id }}" tabindex="{{ tabindex }}">',
        '<a class="dk_toggle">',
          '<span class="dk_label">{{ label }}</span>',
        '</a>',
        '<div class="dk_options">',
          '<div id="" class="dk_scrollbar tinyscrollbar">',
            '<div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>',
            '<div class="viewport">',
              '<div class="overview">',
                '<ul class="dk_options_inner">',
                '</ul>',
              '</div>',
            '</div>',
          '</div>',
        '</div>',
      '</div>'
    ].join(''),


    // HTML template for dropdown options
    optionTemplate = '<li class="{{ current }}{{ last-option }}"><a class="{{ diff-view-analytics }}" title="{{ titleText }}" data-dk-dropdown-value="{{ value }}"> <span class="dk-text">{{ text }}</span></a></li>',

    // Some nice default values
    defaults = {
      startSpeed : 1000,  // I recommend a high value here, I feel it makes the changes less noticeable to the user
      theme  : false,
      change : false,
      onComplete : function(){}
    },

    // Make sure we only bind keydown on the document once
    keysBound = false
  ;

  // Called by using $('foo').dropkick()
  methods.init = function (settings) {
    settings = $.extend({}, defaults, settings);

    return this.each(function () {
      var
        // The current <select> element
        $select = $(this),

        // Store a reference to the originally selected <option> element
        $original = $select.find(':selected').first(),

        // Save all of the <option> elements
        $options = $select.find('option'),

        // We store lots of great stuff using jQuery data
        data = $select.data('dropkick') || {},

        // This gets applied to the 'dk_container' element
        id = $select.attr('id') || $select.attr('name'),

        // This gets updated to be equal to the longest <option> element
        width  = settings.width || $select.outerWidth(),

        // Check if we have a tabindex set or not
        tabindex  = $select.attr('tabindex') ? $select.attr('tabindex') : '',

        // The completed dk_container element
        $dk = false,

        theme
      ;

      // Dont do anything if we've already setup dropkick on this element
      if (data.id) {
        data.settings  = settings;
        return $select;
      } else {
        data.settings  = settings;
        data.tabindex  = tabindex;
        data.id        = id;
        data.$original = $original;
        data.$select   = $select;
        data.value     = _notBlank($select.val()) || _notBlank($original.attr('value'));
        data.label     = $original.text();
        data.options   = $options;
      }

      $dk = data.settings.$dk;
      if (!$dk) {
          // Build the dropdown HTML
          $dk = _build(dropdownTemplate, data);
      }

      // Make the dropdown fixed width if desired
      $dk.find('.dk_toggle').css({
        'width' : width + 'px'
      });

      // Hide the <select> list and place our new one in front of it
      $select.before($dk);

      // Update the reference to $dk
      $dk = $('#dk_container_' + id).fadeIn(settings.startSpeed, function (){
          if (ie8) {  // add blink effect for IE 8 only
              $(this).find('a')
                     .show()
                     .css({opacity:0})
                     .animate({opacity:1},settings.startSpeed);
              $('#cboxOverlay').css({opacity:.3});
          }
          settings.onComplete();
      });

      // Save the current theme
      theme = settings.theme ? settings.theme : 'default';
      $dk.addClass('dk_theme_' + theme);
      data.theme = theme;

      // Save the updated $dk reference into our data object
      data.$dk = $dk;

      // Save the dropkick data onto the <select> element
      $select.data('dropkick', data);

      // Do the same for the dropdown, but add a few helpers
      $dk.data('dropkick', data);

      lists[lists.length] = $select;

      // Focus events
      $dk.bind('focus.dropkick', function (e) {
        $dk.addClass('dk_focus');
      });

      setTimeout(function () {
        $select.hide();
      }, 0);
    });
  };

  // Allows dynamic theme changes
  methods.theme = function (newTheme) {
    var
      $select   = $(this),
      list      = $select.data('dropkick'),
      $dk       = list.$dk,
      oldtheme  = 'dk_theme_' + list.theme
    ;

    $dk.removeClass(oldtheme).addClass('dk_theme_' + newTheme);

    list.theme = newTheme;
  };

  // Reset all <selects and dropdowns in our lists array
  methods.reset = function () {
    for (var i = 0, l = lists.length; i < l; i++) {
      var
        listData  = lists[i].data('dropkick'),
        $dk       = listData.$dk,
        $current  = $dk.find('li').first()
      ;

      $dk.find('.dk_label').text(listData.label);
      $dk.find('.dk_options_inner').animate({ scrollTop: 0 }, 0);

      _setCurrent($current, $dk);
      _updateFields($current, $dk, true);
    }
  };

  // Expose the plugin
  $.fn.dropkick = function (method) {
    if (!ie6) {
      if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === 'object' || ! method) {
        return methods.init.apply(this, arguments);
      }
    }
  };

  // private
  function _handleKeyBoardNav(e, $dk) {
    var
      code     = e.keyCode,
      data     = $dk.data('dropkick'),
      options  = $dk.find('.dk_options'),
      open     = $dk.hasClass('dk_open'),
      current  = $dk.find('.dk_option_current'),
      first    = options.find('li').first(),
      last     = options.find('li').last(),
      next,
      prev
    ;

    switch (code) {
      case keyMap.enter:
        if (open) {
          _updateFields(current.find('a'), $dk);
          _closeDropdown($dk);
        } else {
          _openDropdown($dk);
        }
        e.preventDefault();
      break;

      case keyMap.up:
        prev = current.prev('li');
        if (open) {
          if (prev.length) {
            _setCurrent(prev, $dk);
          } else {
            _setCurrent(last, $dk);
          }
        } else {
          _openDropdown($dk);
        }
        e.preventDefault();
      break;

      case keyMap.down:
       if (open) {
          next = current.next('li').first();
          if (next.length) {
            _setCurrent(next, $dk);
          } else {
            _setCurrent(first, $dk);
          }
        } else {
          _openDropdown($dk);
        }
        e.preventDefault();
      break;

      default:
      break;
    }
  }

  // Update the <select> value, and the dropdown label
  function _updateFields(option, $dk, reset) {
    var value, label, data;

    value = option.attr('data-dk-dropdown-value');
    label = option.text();
    data  = $dk.data('dropkick');

    $select = data.$select;
    $select.val(value);

    $dk.find('.dk_label').text(label);

    reset = reset || false;

    if (data.settings.change && !reset) {
      data.settings.change.call($select, value, label);
    }
  }

  // Set the currently selected option
  function _setCurrent($current, $dk) {
    $dk.find('.dk_option_current').removeClass('dk_option_current');
    $current.addClass('dk_option_current');

    _setScrollPos($dk, $current);
  }

  function _setScrollPos($dk, anchor) {
    var height = anchor.prevAll('li').outerHeight() * anchor.prevAll('li').length;
    $dk.find('.dk_options_inner').animate({ scrollTop: height + 'px' }, 0);
  }

  // Close a dropdown
  function _closeDropdown($dk) {
    $dk.removeClass('dk_open');
  }

  // Open a dropdown
  function _openDropdown($dk) {
    var data = $dk.data('dropkick');
    //Adding a condition for disabling the DD click 
    if($dk.hasClass('dd-disable') || $dk.parent().hasClass('dd-disable') ){
    	return;
    }
    $dk.find('.dk_options').css({ top : $dk.find('.dk_toggle').outerHeight() + 1 });
    $dk.toggleClass('dk_open');

    var rootScope = $('[ng-app]').scope();

    rootScope.$broadcast('dropkick.openOptions', $dk);
if($dk.find('.dk-search').length==0){
	var $scroller = $dk.find(".dk_scrollbar");

    $scroller.tinyscrollbar({
            sizethumb:9,
            size:188
          });

    if($scroller.find(".scrollbar").hasClass("disable")){
      rootScope.$broadcast('dropkick.scrollbarDisabled', $dk);
      var scrollerWidth = $scroller.width();
      $scroller.find(".overview").addClass("dropdownBorder").width((scrollerWidth - 2));
      var scrollHeight = $scroller.find(".overview").outerHeight();
      $scroller.find(".viewport").height(scrollHeight);
      if($('body.ipad')){
    	  $scroller.find(".viewport").height(scrollHeight+1);
      }
      
    }else{

      $scroller.find(".scrollbar, .viewport").addClass("dropdownBorder");
      $scroller.find(".scrollbar").css("border-left","none");
      $scroller.find(".viewport").css("border-right","none");
    }	
}
    
  }

  /**
   * Turn the dropdownTemplate into a jQuery object and fill in the variables.
   */
  function _build (tpl, view) {
    var
      // Template for the dropdown
      template  = tpl,
      // Holder of the dropdowns options
      options   = [],
      $dk
    ;

    template = template.replace('{{ id }}', view.id);
    template = template.replace('{{ label }}', view.label);
    template = template.replace('{{ tabindex }}', view.tabindex);

    if (view.options && view.options.length) {
      for (var i = 0, l = view.options.length; i < l; i++) {
        var
          $option   = $(view.options[i]),
          current   = 'dk_option_current',
          oTemplate = optionTemplate
        ;

        oTemplate = oTemplate.replace('{{ value }}', $option.val());
        oTemplate = oTemplate.replace('{{ current }}', (_notBlank($option.val()) === view.value) ? current : '');

        var diffViewClass = '';
        if ($option.hasClass('red')) {
        	diffViewClass = 'red';
        } else if ($option.hasClass('yellow')) {
        	diffViewClass = 'yellow';
        } else if ($option.hasClass('green')) {
        	diffViewClass = 'green';
        } else if ($option.hasClass('fuschia')) {
        	diffViewClass = 'fuschia';
        }        
        oTemplate = oTemplate.replace('{{ diff-view-analytics }}', diffViewClass );        
        oTemplate = oTemplate.replace('{{ text }}', $option.text());
        oTemplate = oTemplate.replace('{{ titleText }}', $.trim($option.text()));
        if(i===view.options.length-1){
        	oTemplate = oTemplate.replace('{{ last-option }}', " slvzr-last-child");
        }
        else{
        	oTemplate = oTemplate.replace('{{ last-option }}', "");
        }
        options[options.length] = oTemplate;
      }
    }

    $dk = $(template);
    $dk.find('.dk_options_inner').html(options.join(''));

    return $dk;
  }

  function _notBlank(text) {
    return ($.trim(text).length > 0) ? text : false;
  }

  $(function () {

    // Handle click events on the dropdown toggler
    $(document).on('click', '.dk_toggle', function (e) {
      var $dk  = $(this).parents('.dk_container').first();
      if($dk.hasClass("dk_open")){
        $("body").find(".dk_container.dk_open").removeClass("dk_open dk_focus");
        return;
      }else{
        $("body").find(".dk_container.dk_open").removeClass("dk_open dk_focus");
      }

      _openDropdown($dk);

      if ("ontouchstart" in window) {
        $dk.addClass('dk_touch');
        $dk.find('.dk_options_inner').addClass('scrollable vertical');
      }

      e.preventDefault();
      return false;
    });

    $(document).on("mousedown", function (e) {
      if(!$(e.target).closest(".dk_container").size()){
        $("body").find(".dk_container.dk_open").removeClass("dk_open dk_focus");
      }
    });

    // Handle click events on individual dropdown options
    $(document).on((msie ? 'mousedown' : 'click'), '.dk_options a', function (e) {
      var
        $option = $(this),
        $dk     = $option.parents('.dk_container').first(),
        data    = $dk.data('dropkick')
      ;

      _closeDropdown($dk);
      
      if ($option.parent().hasClass("dk_option_current")){
                  return;
      }
      
      _updateFields($option, $dk);
      _setCurrent($option.parent(), $dk);

      e.preventDefault();
      return false;
    });

    // Setup keyboard nav
    $(document).bind('keydown.dk_nav', function (e) {
      var
        // Look for an open dropdown...
        $open    = $('.dk_container.dk_open'),

        // Look for a focused dropdown
        $focused = $('.dk_container.dk_focus'),

        // Will be either $open, $focused, or null
        $dk = null
      ;

     // If we have an open dropdown, key events should get sent to that one
      if ($open.length) {
        $dk = $open;
      } else if ($focused.length && !$open.length) {
        // But if we have no open dropdowns, use the focused dropdown instead
        $dk = $focused;
      }

      if ($dk) {
        _handleKeyBoardNav(e, $dk);
      }
    }).unbind('keydown.dk_nav');
  });
})(jQuery, window, document);
