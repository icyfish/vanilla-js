window.onload = function() {
  var interpolateMatches = ['{', '}'];

  var hasBinding = function(element) {
    return element.textContent.indexOf(interpolateMatches[0]) > -1 && element.textContent.indexOf(interpolateMatches[1]) > -1 
  }

  var interpolate = function (properties) {
    var bindings = Array.from(document.querySelector('[controller]').children);

    bindings.forEach(function(binding){
      if(hasBinding(binding)){
        var val = binding.textContent.slice(1, binding.textContent.lastIndexOf(interpolateMatches[1]));

        if(properties.hasOwnProperty(val) && val !== null){
          binding.textContent = properties[val];
        }
      }
    })
  };

  setTimeout(function(){
        interpolate({
        name: 'Joe',
        age: 22
      })
    }, 5000);
}