$(window).scroll(function() {

	var wScroll = $(this).scrollTop();//how far it scrolled from the top
	var wHeight = $(window).height();

	$('.logo').css({
		'transform' : 'translate(0, ' + wScroll/2 + '%)'
	});
	//changing the values to change the speed the images disapear
	$('.back-bird').css({
		'transform' : 'translate(0, ' + wScroll/4 + '%)' 
	});

	$('.fore-bird').css({
		'transform' : 'translate(0, -' + wScroll/40 + '%)' 
	});

	//when the top of clothes-pics hits the top of the window - 20% within the viewport of the browser
	if(wScroll > $('.clothes-pics').offset().top - (wHeight / 1.2)) {
		
		//for each figure execute this function
		$('.clothes-pics figure').each(function(i) {

			setTimeout(function() {
				$('.clothes-pics figure').eq(i).addClass('is-showing');
			}, 150 * (i + 1));
		});
	}

	//large-window hits the top - the height of the window = the bottom of the window
	if(wScroll > $('.large-window').offset().top - wHeight) {
		$('.large-window').css({'background-position':'center '+ wScroll - $('.large-window').offset().top +'px'});

		var opacity = (wScroll - $('.large-window').offset().top + 400) / (wScroll / 5);
		$('.window-tint').css({'opacity' : opacity});
	}
});