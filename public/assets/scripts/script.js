$(document).ready(function(){
  
    var mousePos = {};
  
   function getRandomInt(min, max) {
     return Math.round(Math.random() * (max - min + 1)) + min;
   }
    
   function retColor() {
     var col1 = "background: rgb("+199+","+65+","+56+");";
     var col2 = "background: rgb("+236+","+174+","+88+");";
     var col3 = "background: rgb("+38+","+39+","+48+");";
     var col4 = "background: rgb("+32+","+163+","+158+");";
     var daColors = [col1, col2, col3, col4];
     return daColors[Math.floor(Math.random()*daColors.length)];
   }
    
    $(window).mousemove(function(e) {
      mousePos.x = e.pageX;
      mousePos.y = e.pageY;
    });
    
    $(window).mouseleave(function(e) {
      mousePos.x = -1;
      mousePos.y = -1;
    });
    
    var draw = setInterval(function(){
      if(mousePos.x > 0 && mousePos.y > 0){
        
        var range = 15;
        
        //var color = "background: rgb("+199+","+65+","+56+");";
        
        var color = retColor();
        
        var sizeInt = getRandomInt(10, 30);
        size = "height: " + sizeInt + "px; width: " + sizeInt + "px;";
        
        var left = "left: " + getRandomInt(mousePos.x-range-sizeInt, mousePos.x+range) + "px;";
        
        var top = "top: " + getRandomInt(mousePos.y-range-sizeInt, mousePos.y+range) + "px;"; 
  
        var style = left+top+color+size;
        $("<div class='ball' style='" + style + "'></div>").appendTo('#wrap').one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function(){$(this).remove();}); 
      }
    }, 1);
  });