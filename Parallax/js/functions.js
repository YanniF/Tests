$(window).scroll(function() {

	var wScroll = $(this).scrollTop();//how far it scrolled from the top
	
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
	if(wScroll > $('.clothes-pics').offset().top - ($(window).height() / 1.2)) {
		
		//for each figure execute this function
		$('.clothes-pics figure').each(function(i) {

			setTimeout(function() {
				$('.clothes-pics figure').eq(i).addClass('is-showing');
			}, 150 * (i + 1));
		});
	}
});