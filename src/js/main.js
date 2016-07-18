$(function() {
	$('div.container').bind('mousewheel', function(event) {
		var direction = getDirection(event)
		if (direction != DIR_RIGHT && direction != DIR_LEFT) {
			event.preventDefault()
			this.scrollLeft -= event.originalEvent.deltaY
		}
	})
	// resize()
	// $(window).resize(resize)

	// var slides = $(".slide")
	// var slideNum = 0
	// var slideNumMax = slides.length - 1

	// var slide = $(slides.get(slideNum))
	// var scrolling = false;

	// $(document).bind("mousewheel", function(event){
	// 	event.preventDefault();
	// 	event.stopPropagation();

	// 	if (!scrolling) {
	// 		scrolling = true;
	// 		direction = getDirection(event);
	// 		if (direction == DIR_DOWN || direction == DIR_RIGHT) {
	// 			if ((slideNum + 1) <= slideNumMax) {
	// 				slide = $(slides.get(++slideNum));
	// 			} else {
	// 				slide = undefined
	// 			}
	// 		} else {
	// 			if (slideNum - 1 >= 0) {
	// 				slide = $(slides.get(--slideNum));
	// 			} else {
	// 				slide = undefined
	// 			}
	// 		}
			
	// 		if (slide != undefined) {
	// 			$("body").animate({scrollLeft: slide.offset().left}, 1500, function() {
	// 				scrolling = false;
	// 			});
	// 		} else {
	// 			scrolling = false;
	// 		}
	// 	}
		
	// })
});

DIR_LEFT = "left"
DIR_UP = "up"
DIR_RIGHT = "right"
DIR_DOWN = "down"

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
	var slides = $(".slide").length
	
	$(".slide").width(width)
	$(".slide").height(height)
	$("body").width(width * slides)
}