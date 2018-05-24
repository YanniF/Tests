document.addEventListener('DOMContentLoaded', carregarImoveis);

function carregarImoveis() {

  let imoveis;

  fetch('js/release_response.json')
  .then(r => r.json())
  .then(info => {
    imoveis = info.data.content;
    
    imoveis.forEach(imovel => {
      console.log(`${imovel.title} \n ${imovel.city} - ${imovel.state} \n ${imovel.neighborhood}`);
    });

    
  })
  .catch(err => {
    console.log('Erro: ' + err);
  });
}
