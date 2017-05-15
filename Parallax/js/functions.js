//size of .bird-box
var bbHeight = $('.bird-box').height();

$(window).scroll(function() {

	var wScroll = $(this).scrollTop();//how far it scrolled from the top
	var wHeight = $(window).height();
	var largeWindow = $('.large-window').offset().top; 

	//there is probably a better way to do it
	if(wScroll === 0) {
		$(".scroll-top").removeClass('visible').addClass('hidden');
	}
	else {
		$(".scroll-top").removeClass('hidden').addClass('visible');
	}
	
	//the parallax effect will only happen when the bird-box is visible
	if (wScroll <= bbHeight) {
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
	}

	//when the top of clothes-pics hits the top of the window - 20% within the viewport of the browser
	if(wScroll > $('.clothes-pics').offset().top - (wHeight / 1.2)) {
		
		//for each figure execute this function
		$('.clothes-pics figure').each(function(i) {

			setTimeout(function() {
				$('.clothes-pics figure').eq(i).addClass('is-showing');
			}, (700 * (Math.exp(i * 0.14))) - 700);
		});
	}

	//large-window hits the top - the height of the window = the bottom of the window
	if(wScroll > largeWindow - wHeight) {
		$('.large-window').css({'background-position':'center '+ wScroll - largeWindow +'px'});

		var opacity = (wScroll - largeWindow + 400) / (wScroll / 5);
		$('.window-tint').css({'opacity' : opacity});
	}

	if(wScroll > $('.blog-posts').offset().top - wHeight){

	    //var offset = Math.min(0, wScroll - $('.blog-posts').offset().top + wHeight - 350).toFixed();
	    var offset = Math.min(0, wScroll - $('.blog-posts').offset().top + wHeight - 350).toFixed();

	    $('.post-1').css({'transform': 'translate('+ offset +'px, '+ Math.abs(offset * 0.2) +'px)'});

	    $('.post-3').css({'transform': 'translate('+ Math.abs(offset) +'px, '+ Math.abs(offset * 0.2) +'px)'});
	}
});

$(document).ready(function() {

	$(".scroll-top").on("click", function() {

		$("html, body").animate({ scrollTop: 0}, 1000);
	});
});