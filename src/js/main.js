$(function() {
	scrolling = false;
	lastTimeStamp = 0.0;
	currentSlide = 0;

	var slides = $(".slide");

	$('a:not(.image-link)').each(function(index) {
		var after = $('<span/>').addClass('after').width(0)
		$(this).append(after)
	})	

	$('.container').bind('mousewheel', function(event) {
		event.preventDefault();
		
		if (shouldScroll(event)) {
			var slideNum = nextSlide(event);
			if (slideNum >= 0) {
				scrollTo(nextSlide(event), resetUnderscore, animateUnderscore);
			}
		}
		lastTimeStamp = event.timeStamp;
	})

	animateUnderscore(slides.first())

	function shouldScroll(event) {
		return (Math.abs(event.timeStamp - lastTimeStamp) > 30) && !scrolling;
	}

	function nextSlide(event) {
		var direction = getDirection(event);
		var slideNum = -1;
		if (direction == DIR_LEFT || direction == DIR_UP || direction == DIR_DOWN) {
			slideNum = (currentSlide + 1) % slides.length;
		} else if (currentSlide > 0) {
			slideNum = (currentSlide - 1) % slides.length;
		}
		return slideNum;
	}

	function scrollTo(slideNum, beforeCallback, afterCallback) {
		scrolling = true
		var slide = $(slides.get(slideNum));
		var offset = slideNum * $('.slide').width()

		if (beforeCallback) {
			beforeCallback(slide)
		}
		
		$('div.container').animate({scrollLeft: offset}, 1500, function() {
			scrolling = false;
			currentSlide = slideNum;
			if (afterCallback) {
				afterCallback(slide)
			}
		});
	}

	function resetUnderscore($slide) {
		$('a:not(.image-link) .after', $slide).stop().width(0)
	}

	function animateUnderscore($slide) {
		$('a:not(.image-link) .after', $slide).stop().animate({'width': '100%'}, 800)
	}
});

DIR_LEFT = "left";
DIR_UP = "up";
DIR_RIGHT = "right";
DIR_DOWN = "down";

function getDirection(event) {
	if (Math.abs(event.originalEvent.deltaX) > Math.abs(event.originalEvent.deltaY)) {
		// horizontal
		if (event.originalEvent.wheelDeltaX >= 0) {
			return DIR_RIGHT;
		} else {
			return DIR_LEFT;
		}
	} else {
		// vertical
		if (event.originalEvent.wheelDeltaY >= 0) {
			return DIR_DOWN;
		} else {
			return DIR_UP;
		}

	}
}

function resize() {
	var width = $(window).width();
	var height = $(window).height();
	var slides = $(".slide").length;
	
	$(".slide").width(width);
	$(".slide").height(height);
	$("body").width(width * slides);
}