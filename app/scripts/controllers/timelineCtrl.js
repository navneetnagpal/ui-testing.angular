angular.module('uiTestingangularApp')
    .controller('timelineCtrl', ['$scope',
        function($scope) {
            'use strict';
            var px2num = function(str) {
                    return str.replace("px", "") * 1;
                },
                num2px = function(num) {
                    return [num, 'px'].join('');
                }

            $("#timeline").xTimeline();

            var TimeLine = function($el, options) {
                var $self = this,
                    $slideContainer = $el.find('.range-slider-container'),
                    $rangeContainer = $el.find('.range-container'),
                    $rangeHistory = $el.find('.range-history'),
                    $rangeSlider = $el.find('.range-slider'),
                    $rangeSliderWrapper = $el.find('.range-slider-wrapper'),
                    $rangeSliderLBar = $rangeSliderWrapper.find('.range-left'),
                    $rangeSliderBar = $rangeSlider.find('.range-bar'),
                    $rangeSliderRBar = $rangeSliderWrapper.find('.range-right'),
                    defaultOptions = {
                        dayWidth: 3,
                        sliderHandleWidth: 2
                    },
                    getDiff=function(width,diff){
                        var mod=width%diff,
                        dval=width-mod;
                        if (mod>(diff/2)){ 
                            return dval+diff;
                        }else {
                            return dval;
                        }
                    };


                return {
                    init: function() {
                        var move=false,Devt;
                        this.initLayout();
                       
                        
                    },
                    initLayout: function() {
                        $rangeContainer.width($rangeHistory.width());
                        $rangeSliderLBar.draggable({
                            axis: "x",
                            containment: "parent",
                            scroll: false,
                            drag: function(a, b) {
                                var width = px2num($rangeSliderRBar.css('left')) - b.position.left-2;
                                if (width >= 3) {

                                    $rangeSlider.width(getDiff(width,3));
                                    $rangeSlider.css('left', num2px(b.position.left ));

                                } else {
                                    return false;
                                }

                            }
                        });
                        $rangeSliderRBar.draggable({
                            axis: "x",
                            containment: "parent",
                            scroll: false,
                            drag: function(a, b) {
                                var width = b.position.left - px2num($rangeSlider.css('left'))-2;
                                if (width >= 3) {
                                    $rangeSlider.width(width);
                                    console.log(width);
                                } else {
                                    return false;
                                }

                            }
                        });
                        $rangeSlider.draggable({
                            axis: "x",
                            containment: "parent",
                            scroll: false,
                            drag: function(a, b) {
                                console.log(b.position.left);

                                $rangeSliderLBar.css("left", num2px(b.position.left));
                                $rangeSliderRBar.css("left", num2px(b.position.left + $(this).width() + 2));

                            },
                            stop: function(a, b) {
                                /*if (b.position.left > $rangeHistory.width() - $(this).width() - 1) {
                                    $(this).css("left", num2px($rangeHistory.width() - ($(this).width())));
                                }*/
                            }
                        });
                        $rangeSliderRBar.css("left", num2px(($rangeSliderBar.width() + px2num($rangeSliderLBar.css("left"))) + 2));
                    }
                }

            };
            var options = {};

            var tobj = new TimeLine($("#timeline"), options);
            tobj.init();

        }
    ]);