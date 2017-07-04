(function(){

var partialCache = {};
 
function fetchFile(path, callback){
  var request = new XMLHttpRequest();

  request.onload = function(){
    callback(request.responseText);
  }

  request.open('GET', path);
  request.send(null); 
}

function getContent(fragmentId, callback){

  if(partialCache[fragmentId]){
    callback(partialCache[fragmentId]);
  } else {
    fetchFile(fragmentId + '.html', function(content){
      partialCache[fragmentId] = content;

      callback(content);
    });
  }
}

// what if the about page changes, the cache is old

function setActiveLink(fragmentId){
  var navbarDiv = document.getElementById('navbar'),
      links = navbarDiv.children,
      // links = document.querySelectorAll('#navbar a'),
      // links = document.querySelectorAll('#navbar a [href=#' + fragmentId+"]"),
      i, link, pageName;
  
  for(i = 0; i < links.length; i++){
    link = links[i];
    pageName = link.getAttribute('href').substr(1);
    if(pageName === fragmentId){
      link.setAttribute('class', 'active');
    } else {
      link.removeAttribute('class');
    }
  }
}
function navigate(){
  var contentDiv = document.getElementById('content');
  fragmentId = location.hash.substr(1);

  getContent(fragmentId, function(content){
    contentDiv.innerHTML = content;
  });

  setActiveLink(fragmentId);
}

if(!location.hash){ // '' falsy
  location.hash = "#home";
}

navigate();
 
window.addEventListener('hashchange', navigate);

/*
  知识点:

1. HTML5 history API: http://diveintohtml5.info/history.html
2. 'hashchange' Event: https://developer.mozilla.org/en-US/docs/Web/API/HashChangeEvent

*/
})()
 

