var animalContainer = document.getElementById("animal-info");
var btn = document.getElementById("btn");
var pageCounter = 1;

btn.addEventListener("click", function() {
  var ourRequest = new XMLHttpRequest();

  ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');
  ourRequest.onload = function() {

    if(ourRequest.status >= 200 && ourRequest.status < 400) {
      var ourData = JSON.parse(ourRequest.responseText);//o navegador passa a entender o texto como JSON
      renderHTML(ourData);      
    }
    else {
      console.log("Error!!!");
    }
  };
  ourRequest.onerror = function() {
    console.log("Error!");
  };

  ourRequest.send();
  pageCounter++;

  if(pageCounter > 3) {
    btn.classList.add("hide-me");
  }
});

function renderHTML(data) {
  var html = "";

  for(i = 0; i < data.length; i++) {
    html += "<p>" + data[i].name + " is a " + data[i].species + " that likes to eat ";

    for(j = 0; j < data[i].foods.likes.length; j++) {
      if(j === 0) {
        html += data[i].foods.likes[j];
      }
      else {
        html += " and " + data[i].foods.likes[j];
      }
    }

    html += " and dislikes ";

    for(j = 0; j < data[i].foods.dislikes.length; j++) {
      if(j === 0) {
        html += data[i].foods.dislikes[j];
      }
      else {
        html += " and " + data[i].foods.dislikes[j];
      }
    }
    html += ".</p>";
  }

  animalContainer.insertAdjacentHTML('beforeend', html);
}