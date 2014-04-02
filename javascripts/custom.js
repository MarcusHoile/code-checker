function buttonPress(obj){
        var origHeight = obj.style.height;
        var origWidth = obj.style.width;
        var origMarginLeft = obj.style.left;
        var origMarginTop = obj.style.marginTop;
        obj.style.height = '161px';
        obj.style.width = '161px';
        obj.style.marginLeft = '7px';
        obj.style.marginTop = '3px';
  setTimeout(function(){
                obj.style.height = origHeight;
                obj.style.width = origWidth;
                obj.style.marginLeft = origMarginLeft;
                obj.style.marginTop = origMarginTop;
        }, 200);
}

function perfect() {
        $ken.addClass('perfect');
        setTimeout(function() { $ken.removeClass('perfect'); }, 600);
        $ken.css("background-position", "-140px -800px");
}