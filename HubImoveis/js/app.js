$(document).ready(function(){
  
  $.getJSON("js/release_response.json", function(info) {

    var texto = "";
    var imoveis = info.data.content;

    $.each(imoveis, function(i) {
      texto = `
        <img src="${this.thumbUrl}" id="img-${i}" class="img-fluid" alt="${this.title}">
        <figcaption>
          <h3>${this.title}</h3>
          <p>${this.city} - ${this.state}</p>
          <p>${this.neighborhood}</p>
          <img src="${this.logoUrl}" class="logo" alt="${this.companyName}">
        </figcaption>
      `;
      $('#figure-' + i).append(texto);
    });    
  });

  setTimeout(initSlick, 100); //aprender a esperar a resposta da requisição
  
});

function initSlick() {
  $('.slider-imagens').on('init', function(slick) {
    $("#img-0").addClass('slick-active');
  });

  $('.slider-imagens').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
  });

  $('.slider-imagens').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    $("#img-" + currentSlide).removeClass('slick-active');
    $("#img-" + nextSlide).addClass('slick-active'); 
    $('.controls span').text((nextSlide + 1) + "/6");
  });
}