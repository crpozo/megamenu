(function () {

    var initialize = function() {

      var dropdownSubmenuList = [].slice.call(document.querySelectorAll('.dropdown-submenu-toggle'));

      // Open submenu
      dropdownSubmenuList.map(function(e) {
          e.onclick = function(e){
            e.target.parentNode.querySelector('ul').classList.toggle('show');
            e.stopPropagation();
            e.preventDefault();
          }
      });

      document.addEventListener('click',function(e){

        // Close all submenus when clicking outside
        dropdownSubmenuList.map(function (e) {
          e.parentNode.querySelector('ul').classList.remove('show');
        });
        
      });
    }
  
    // in case the document is already rendered
    if (document.readyState!='loading') initialize();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', initialize);
  
  })();
  