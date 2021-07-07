(function () {

    var initialize = function() {
  
     console.log("Js initialized");
  
    }
  
    // in case the document is already rendered
    if (document.readyState!='loading') initialize();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', initialize);
  
  })();
  