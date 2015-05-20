/*
 * Tiny Scrollbar
 * http://www.baijs.nl/tinyscrollbar/
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/gpl-2.0.php
 *
 * Date: 13 / 08 / 2012
 * @version 1.81
 * @author Maarten Baijs
 *
 */


/*
 CUSTOMIZATIONS ADDED
 1. this.arrowKeyScroll 
 2. onComplete callback 
 3. scroll to bottom function (bottom()) 
 4. Fix for AIMSB-6317 :- Allowing the dragging of the scrollbar when scrollbar panel clicked  
 5. viewportScroll 
 */
; (function ($) {
    $.tiny = $.tiny || {};

    $.tiny.scrollbar = {
        options: {
            axis: 'y'    // vertical or horizontal scrollbar? ( x || y ).
            , wheel: 40     // how many pixels must the mouswheel scroll at a time.
            , scroll: true   // enable or disable the mousewheel.
            , lockscroll: true   // return scrollwheel to browser if there is no more content.
            , size: 'auto' // set the size of the scrollbar to auto or a fixed number.
            , sizethumb: 'auto' // set the size of the thumb to auto or a fixed number.
            , invertscroll: false  // Enable mobile invert style scrolling
            , viewportscroll: true
            , onComplete: function () { }  // Callback to run after initialization
        }
    };

    $.fn.tinyscrollbar = function (params) {
        var options = $.extend({}, $.tiny.scrollbar.options, params);

        this.each(function () {
            $(this).data('tsb', new Scrollbar($(this), options));
        });

        return this;
    };

    $.fn.tinyscrollbar_update = function (sScroll) {
        return $(this).data('tsb').update(sScroll);
    };

    $.fn.tinyscrollbar_bottom = function () {
        return $(this).data('tsb').bottom();
    };

    function Scrollbar(root, options) {
        var oSelf = this
            , oWrapper = root
            , oViewport = { obj: $('.viewport', root) }
            , oContent = { obj: $('.overview', root) }
            , oScrollbar = { obj: $('.scrollbar', root) }
            , oTrack = { obj: $('.track', oScrollbar.obj) }
            , oThumb = { obj: $('.thumb', oScrollbar.obj) }
            , sAxis = options.axis == 'x'
            , sDirection = sAxis ? 'left' : 'top'
            , sSize = sAxis ? 'Width' : 'Height'
            , iScroll = 0
            , endEvtRaisedAt = 0
            , iPosition = { start: 0, now: 0 }
            , iMouse = {}
            , touchEvents = 'ontouchstart' in document.documentElement
            ;

        function initialize() {
            oSelf.update();
            setEvents();
            // AIMS.pluginHelpers.tinyscrollbar.arrowKeyScroll(oSelf, root, options);
            options.onComplete.call(oSelf, root);

            return oSelf;
        }

        this.update = function (sScroll) {
            //TODO: Temporary fix for ipad showing scrollbar even when its not needed. Find a better solution.
            var scrollFactor = 1;
            oViewport[options.axis] = oViewport.obj[0]['offset' + sSize];
            oContent[options.axis] = oContent.obj[0]['scroll' + sSize];
            oContent.ratio = oViewport[options.axis] / oContent[options.axis];

            if(oContent.ratio < scrollFactor){
                oScrollbar.obj.removeClass('disable');
            } else {
                oScrollbar.obj.addClass('disable');
            }

   
            oTrack[options.axis] = options.size === 'auto' ? oViewport[options.axis] : options.size;
            oThumb[options.axis] = Math.min(oTrack[options.axis], Math.max(0, (options.sizethumb === 'auto' ? (oTrack[options.axis] * oContent.ratio) : options.sizethumb)));

            oScrollbar.ratio = options.sizethumb === 'auto' ? (oContent[options.axis] / oTrack[options.axis]) : (oContent[options.axis] - oViewport[options.axis]) / (oTrack[options.axis] - oThumb[options.axis]);

            iScroll = (sScroll === 'relative' && oContent.ratio <= 1) ? Math.min((oContent[options.axis] - oViewport[options.axis]), Math.max(0, iScroll)) : 0;
            iScroll = (sScroll === 'bottom' && oContent.ratio <= 1) ? (oContent[options.axis] - oViewport[options.axis]) : isNaN(parseInt(sScroll, 10)) ? iScroll : parseInt(sScroll, 10);
            endEvtRaisedAt = iScroll;
            setSize();

        };

        this.bottom = function () {
            iScroll = oContent[options.axis] - oViewport[options.axis];
            oThumb.obj.css(sDirection, iScroll / oScrollbar.ratio);
            oContent.obj.css(sDirection, -iScroll);
        };

        this.arrowKeyScroll = function (event) {
            if (oContent.ratio < 1) {
                var oEvent = event || window.event,
                    iDelta;

                if (event.which == 38) {
                    iDelta = 0.3333333333333333;
                } else if (event.which == 40) {
                    iDelta = -0.3333333333333333;
                }

                if (iDelta && typeof iDelta === 'number') {
                    iScroll -= iDelta * options.wheel;
                    iScroll = Math.min((oContent[options.axis] - oViewport[options.axis]), Math.max(0, iScroll));

                    oThumb.obj.css(sDirection, iScroll / oScrollbar.ratio);
                    oContent.obj.css(sDirection, -iScroll);

                    if (options.lockscroll || (iScroll !== (oContent[options.axis] - oViewport[options.axis]) && iScroll !== 0)) {
                        oEvent = $.event.fix(oEvent);
                        oEvent.preventDefault();
                    }
                }
            }

            // Fix for Isotope :- Trigger end of Tiny Scroll event when the user has reached end of scroll
            checkEndOfScroll();
        };

        function setSize(){
            var sCssSize = sSize.toLowerCase();

            oThumb.obj.css(sDirection, iScroll / oScrollbar.ratio);
            oContent.obj.css(sDirection, -iScroll);
            iMouse.start = oThumb.obj.offset()[sDirection];

            oScrollbar.obj.css(sCssSize, oTrack[options.axis]);
            oTrack.obj.css(sCssSize, oTrack[options.axis]);
            oThumb.obj.css(sCssSize, oThumb[options.axis]);
        }

        function setEvents() {
            if (!touchEvents) {
                oThumb.obj.bind('mousedown', start);
                oTrack.obj.bind('mouseup', drag);
                // Fix for AIMSB-6317 :- Allowing the dragging of the scrollbar when scrollbar panel clicked
                oScrollbar.obj.bind('mouseup', drag);
            }
            else {
                oViewport.obj[0].ontouchstart = function (event) {
                    if (1 === event.touches.length) {
                        start(event.touches[0]);
                        event.stopPropagation();
                    }
                };
                oThumb.obj[0].ontouchstart = function(event){
                    event.preventDefault();
                    oThumb.obj.unbind('mousedown');
                    start(event.touches[0]);
                    return false;
                };
            }

            if (options.scroll && window.addEventListener) {
                oWrapper[0].addEventListener('DOMMouseScroll', wheel, false);
                oWrapper[0].addEventListener('mousewheel', wheel, false);
                oWrapper[0].addEventListener('MozMousePixelScroll', function (event) {
                    event.preventDefault();
                }, false);
            }
            else if (options.scroll) {
                oWrapper[0].onmousewheel = wheel;
            }
        }

        function start(event) {
            $("body").addClass("noSelect");

            var oThumbDir = parseInt(oThumb.obj.css(sDirection), 10);
            iMouse.start = sAxis ? event.pageX : event.pageY;
            iPosition.start = oThumbDir == 'auto' ? 0 : oThumbDir;

            if (!touchEvents) {
                $(document).bind('mousemove', drag);
                $(document).bind('mouseup', end);
                oThumb.obj.bind('mouseup', end);
            }
            else {
                document.ontouchmove = function (event) {
                    event.preventDefault();
                    drag(event.touches[0]);
                };
                document.ontouchend = end;
            }
            // for disabling selection while scrolling using tinyscrollbar
            // AIMS.common.utilities.disableSelection(('viewport'));
        }

        function wheel(event) {
            if (oContent.ratio < 1) {

                var oEvent = event || window.event
                    , iDelta = oEvent.wheelDelta ? oEvent.wheelDelta / 120 : -oEvent.detail / 3
                    ;

                iScroll -= iDelta * options.wheel;
                iScroll = Math.min((oContent[options.axis] - oViewport[options.axis]), Math.max(0, iScroll));

                oThumb.obj.css(sDirection, iScroll / oScrollbar.ratio);
                oContent.obj.css(sDirection, -iScroll);

                if (options.lockscroll || (iScroll !== (oContent[options.axis] - oViewport[options.axis]) && iScroll !== 0)) {
                    oEvent = $.event.fix(oEvent);
                    oEvent.preventDefault();
                }
            }

            // Fix for Isotope :- Trigger end of Tiny Scroll event when the user has reached end of scroll
            checkEndOfScroll();
        }

        function drag(event) {
            if (oContent.ratio < 1) {
                if (options.invertscroll && touchEvents) {
                    iPosition.now = Math.min((oTrack[options.axis] - oThumb[options.axis]), Math.max(0, (iPosition.start + (iMouse.start - (sAxis ? event.pageX : event.pageY)))));
                }
                else {
                    iPosition.now = Math.min((oTrack[options.axis] - oThumb[options.axis]), Math.max(0, (iPosition.start + ((sAxis ? event.pageX : event.pageY) - iMouse.start))));
                }
                
                root.trigger("move");
                iScroll = iPosition.now * oScrollbar.ratio;
                oContent.obj.css(sDirection, -iScroll);
                oThumb.obj.css(sDirection, iPosition.now);
            }
        }

        function end() {
            $("body").removeClass("noSelect");
            $(document).unbind('mousemove', drag);  
            $(document).unbind('mouseup', end);
            oThumb.obj.unbind('mouseup', end);
            document.ontouchmove = document.ontouchend = null;

            // Fix for Isotope :- Trigger end of Tiny Scroll event when the user has reached end of scroll
            checkEndOfScroll();
        }

        function checkEndOfScroll(){
            if((Math.round(iScroll + oTrack[options.axis])) >= (oContent[ options.axis ])-5) {
            	if (endEvtRaisedAt!=iScroll){
	                oViewport.obj.trigger("endOfTinyScroll");
                	endEvtRaisedAt = iScroll;
	            }
            }
        }

        return initialize();
    }

}(jQuery));