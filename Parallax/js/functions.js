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
});