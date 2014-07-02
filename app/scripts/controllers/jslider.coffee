(($, window, document)->

	pluginName = 'jSlider'

	scale = 0

	defaults =

		# Default Width
		width: 940

		# Default Height
		height: 528

		#Default Effect Settings 
		effect: 

			type : "slide"

			speed : 500


		minSize : 40

		maxSize : 80

		itemPadding : 10

		itemsToShow : 8

		#Defaults Callbacks
		callback:    
		  complete: () -> 
		
		slides : 
			["http://placehold.it/50x50", "http://placehold.it/50x50", "http://placehold.it/50x50", "http://placehold.it/50x50", "http://placehold.it/50x50"]

	class Plugin

		constructor : (@elem, options)->

			@options = $.extend {}, defaults, options
			@init()

		Plugin::init = ()->

			$elem = $(@elem)

			@data = $.data @
			@icons = []
			@iconSizes = []
			@iconNodes = []
			@isOut = false
			@isIn = false
			@isInIcon = false

			@animSize = @options.minSize + ( (@options.maxSize - @options.minSize) / 2 )

			$.data @, "animating", false
			$.data @, "total", $elem.children().length
			$.data @, "current", @options.start - 1
			
			$elem.css 'overflow': 'hidden'

			$.each(@options.slides, (i, slide)=>
				image = $("<img>")

				image.attr("src", slide)

				@iconNodes.push image
			)

			@options.itemsToShow = if @options.itemsToShow > @iconNodes.length then @iconNodes.length else @options.itemsToShow

			$elem.append @iconNodes

			$elem.$slides = $elem.children().wrapAll('<div class="jSlider-slides"></div>').parent()
			$elem.$slidesContainer = $elem.$slides.wrap('<div class="jSlide-slides-container"></div>').parent()
			$elem.$controls = $('<div class="jSlider-controls"><span class="prev">Prev</span><span class="next">Next</span></div>')

			$elem.prepend $elem.$controls

			$elem.$container = $elem.children().wrapAll('<div class="jSlider-container"></div>').parent()

			$elem.$container.css
				"position" : "relative"

			$elem.$slidesContainer.css
				"overflow" : "hidden"
				"width" : ( ( @options.minSize + @options.itemPadding ) * @options.itemsToShow ) + "px"
				"height" : @options.maxSize + "px"
				"margin" : "0 auto"
				
			$elem.$slides.css
				"overflow" : "hidden"
				"position" : "relative"
				"left" : 0
				"width" : ( ( @options.minSize + @options.itemPadding ) * @iconNodes.length ) + "px"

			$elem.$slides.children()
				.addClass("jSlider-slide")
				.css
					"position" : "relative"
					"padding-right" : @options.itemPadding + "px"
					"cursor" : "pointer"
					"margin-top" : "40px"
					"z-index" : "99"

			$elem.$controls.css
				"position" : "absolute"
				"width" : "100%"
				"top" : ( ($elem.$container.height() / 2) + ( @options.minSize / 2 ) ) + "px"

			$elem.$controls.find('.prev').css
				"position" : "absolute"
				"cursor" : "pointer"
				"z-index" : "999"
				"left" : ( ( ( $elem.$container.width() - $elem.$slidesContainer.width() ) / 2 ) - 40 ) + "px"

			$elem.$controls.find('.next').css
				"position" : "absolute"
				"cursor" : "pointer"
				"z-index" : "999"
				"right" : ( ( ( $elem.$container.width() - $elem.$slidesContainer.width() ) / 2 ) - 30 ) + "px"

			@slides = $('.jSlider-slide')

			$.each(@slides, (i, slide)=>
				$slide = $(slide)
				$slide.data('slide-index', i)
				@iconSizes[i] = @options.minSize
				@icons.push($slide)
				@updateIcon(i)
			)

			$elem.$slides.on('mousemove', '.jSlider-slide', (e) => @handleMouseMove(e, $elem))
			$elem.$slides.on('mousemove', (e) => @isOut = false)
			$elem.$slides.on('mouseout', (e) => @handleMouseOut(e))

			$elem.$controls.on("click", ".next", (e)=> @handleNext(e, $elem))
			$elem.$controls.on("click", ".prev", (e)=> @handlePrev(e, $elem))

		Plugin::updateIcon = (idx)->

			that = @

			that.icons[idx].stop().animate({width: that.iconSizes[idx], height: that.iconSizes[idx],  marginTop:( that.options.maxSize - that.iconSizes[idx] ) + 'px'}, 200, 'easeOutExpo', ()-> that.options.callback.complete() )

		Plugin::handleMouseMove = (e, $elem)->

			that = @

			that.isInIcon = true

			maxSize = that.options.maxSize
			minSize = that.options.minSize
			animSize = that.animSize

			iconIndex = $(e.target).data('slide-index')

			# if iconIndex isnt 0 
			# 	$elem.$slides.animate({
			# 		width : $elem.$slides.width() + minSize
			# 	}, 200, 'easeOutExpo')

			$.each(that.icons, (i, icon)->

				if i < iconIndex
					that.iconSizes[i] = animSize
				if i > iconIndex
					that.iconSizes[i] = animSize
				if i < iconIndex - 1
					that.iconSizes[i] = minSize
				if i > iconIndex + 1
					that.iconSizes[i] = minSize
				if i is iconIndex
					that.iconSizes[i] = maxSize
			)

			for icon of that.icons
				that.updateIcon(icon)
	

		Plugin::handleMouseOut = (e)->

			that = @
			minSize = that.options.minSize

			$.each(that.icons, (i, icon)->

				that.iconSizes[i] = minSize
			)

			for icon of that.icons
				that.updateIcon(icon)

		Plugin::handleNext = (e, $elem) ->

			that = @
			minSize = that.options.minSize

			if ( ( parseInt($elem.$slides.css("left")) * -1 ) + $elem.$slidesContainer.width() ) is $elem.$slides.width()
				return

			left = parseInt($elem.$slides.css("left")) - ( minSize + that.options.itemPadding )

			$elem.$slides.animate({
					left : left
				}, 500)
				

		Plugin::handlePrev = (e, $elem) ->

			that = @
			minSize = that.options.minSize

			if ( parseInt($elem.$slides.css("left")) * -1 ) is 0
				return

			left = parseInt($elem.$slides.css("left")) + ( minSize + that.options.itemPadding )

			$elem.$slides.animate({
					left : left
				}, 500)

	# Plugin constructor
	$.fn[pluginName] = (options) ->
		@each ->
		  if !$.data(@, "plugin_#{pluginName}")
		    $.data(@, "plugin_#{pluginName}", new Plugin(@, options))


)($, window, document)