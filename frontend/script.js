const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('id', 'container');

app.appendChild(container);

var pageNb = 1;

function r_submit() {
  var http = new XMLHttpRequest();
  var url = "http://127.0.0.1:5000/ecologie";
  var srcTxt = document.getElementById("query").value;
  var params = "where={\"responses.formattedValue\":{\"$regex\":\".*"+srcTxt+".*\"}}&page="+pageNb;

  http.open("GET", url+"?"+params, true);
  http.onreadystatechange = function()
  {
      clearPage();

      if(http.readyState == 4 && http.status == 200) {

          var data = JSON.parse(http.responseText);

          printResponseInfo(data);

          for (var i = 0; i < data._items.length; i++) {
              displayResponses(data._items[i]);
          }
      }
  }
  http.send(null);
}

function displayResponses(item){
  const card = document.createElement('div');
  card.setAttribute('class', 'card');
  container.appendChild(card);
  for (var j = 0; j < item.responses.length; j++) {
    if(item.responses[j].formattedValue != null){

      displayPerResponses(item.responses[j],card);

    }
  }
}

function displayPerResponses(response,card){
  var srcTxt = document.getElementById("query").value;
  const h1 = document.createElement('h3');
  h1.textContent = response.questionTitle;
  const p = document.createElement('p');
  var value = response.formattedValue;

  var index = value.indexOf(srcTxt);
  var valueCentered = value.substring((index-150)>0?index-150:0,index+150);

  if (index >= 0) {
    p.innerHTML = value.substring(0,index) + "<span class='highlight'>" + value.substring(index,index+srcTxt.length) + "</span>" + value.substring(index + srcTxt.length);
  }
  else {
    var response = value;
    p.textContent = response;
  }

  card.appendChild(h1);
  card.appendChild(p);
}

function printResponseInfo(data){
  const card = document.createElement('div');
  card.setAttribute('class', 'card');
  container.appendChild(card);
  const h1 = document.createElement('h3');
  h1.textContent = "Nombre de réponses contenant le mot:";
  const p = document.createElement('p');
  p.innerHTML = `${data._meta.total}, vous voyez les `+ 25*(pageNb-1) + '-' + 25*pageNb +` premiers résultats. </br> <a  href="#" onclick="previousPage();"> préc. </a> - <a  href="#" onclick="nextPage(${data._meta.total});"> suiv. </a>`;
  card.appendChild(h1);
  card.appendChild(p);
}

function clearPage(){
  var myNode = document.getElementById('container');
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}

function previousPage(){
  pageNb = pageNb>1?pageNb-1:1;
  return r_submit();
}

function nextPage(size){
  pageNb = pageNb<(size/25)?pageNb+1:pageNb;
  return r_submit();
}


// document.getElementById('page').onkeypress = function(e){
//     if (!e) e = window.event;
//     var keyCode = e.keyCode || e.which;
//     if (keyCode == '13'){
//       pageNb=document.getElementById('page').value;
//       return r_submit();
//     }
//   }

document.getElementById('query').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      return r_submit();
    }
  }
