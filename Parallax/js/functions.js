$(window).scroll(function() {

	var wScroll = $(this).scrollTop();//how far it scrolled from the top
	var wHeight = $(window).height();
	var largeWindow = $('.large-window').offset().top; 

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
	if(wScroll > largeWindow - wHeight) {
		$('.large-window').css({'background-position':'center '+ wScroll - largeWindow +'px'});

		var opacity = (wScroll - largeWindow + 400) / (wScroll / 5);
		$('.window-tint').css({'opacity' : opacity});
	}

	if(wScroll > $('.blog-posts').offset().top - wHeight){

	    var offset = Math.min(0, wScroll - $('.blog-posts').offset().top + wHeight - 350);

	    $('.post-1').css({'transform': 'translate('+ offset +'px, '+ Math.abs(offset * 0.2) +'px)'});

	    $('.post-3').css({'transform': 'translate('+ Math.abs(offset) +'px, '+ Math.abs(offset * 0.2) +'px)'});

	  }
});