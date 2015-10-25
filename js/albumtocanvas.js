function albumtocanvas() {
    
    var album = document.getElementById('divContentAlbum');
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    
    //set canvas dimensions
    canvas.width = album.offsetWidth;
	canvas.height = album.offsetHeight;
    
    //set background color
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    //set texts color
    ctx.fillStyle = "#000000";
    
    //Representation variables
    var maxItemsRow = 8;
    var textIndent = 50;
    var interLines = 50;
    var interCategories = 20;
    var interImages = 94;
    var imgWidth = 94;
    var currentX = 0;
    var currentY = 0;
    
    //write Album tittle
    currentY += interLines;
    writeTittle(ctx, document.getElementById("categoryName").innerHTML, textIndent, currentY);
    
    //Contents
    var categoryContent = document.getElementById("categoryContent");
    var contents = categoryContent.getElementsByTagName("fieldset");
    
    for(var i = 0; i < contents.length; i++) {
        
        //write subcategory
        currentY += interLines;        
        var legends = contents[i].getElementsByTagName("legend");
        var legend = legends[0].innerHTML;
        writeCategory(ctx, legend, textIndent, currentY);
        
        //draw line
        currentY += 5;
        drawLine(ctx,textIndent,currentY + 5, canvas.width - textIndent * 2, 2);
        currentY += 5;
        
        //draw stickers
        var stickers = contents[i].getElementsByTagName("img");
        var links = contents[i].getElementsByTagName("a");
        currentX = 0;
        currentY += interLines;
        for(var j =0  ; j < stickers.length; j++) {
            var src = stickers[j].src;
            
            var linkStyle = links[j].className;
            if(linkStyle.indexOf("sticker-translucid") > -1) {
                drawStickerLight(ctx, src, currentX, currentY - imgWidth/2 - 5);
            }
            else {
                drawSticker(ctx, src, currentX, currentY - imgWidth/2 - 5);
            }
            
            currentX += imgWidth;
            if(((j+1) % maxItemsRow == 0)  && (j+1 < stickers.length)) {
                currentX = 0;
                currentY += interImages - 10;
            }
        }
        currentY += interCategories;
    }
    
    //set final canvas dimensions
    // canvas.width = currentX + imgWidth;
	//canvas.height = currentY + interImages;
   
    //Add watermark
    watermark(ctx, textIndent, canvas.height);
    
    //Add canvas to body
    //canvas.id = "areaCanvas";
    //document.body.appendChild(canvas);
    
    //Open new window
    //var c=document.getElementById("areaCanvas");
    // setTimeout(function(){
    //     window.open(canvas.toDataURL('image/png'));
    // }, 500);
    
    //upload to imgur
    var img64 = null;
    setTimeout(function() {
        try {
            img64 = canvas.toDataURL('image/jpeg', 0.9).split(',')[1];
        } catch(e) {
            img64 = canvas.toDataURL().split(',')[1];
        }
    
        $.ajax({
            url: 'https://api.imgur.com/3/image',
            type: 'post',
            headers: {
                Authorization: "Client-ID " + window.imgurClientID
            },
            data: {
                image: img64,
                name: window.csgoalbumurl + location.hash,
                title: window.csgoalbumurl + location.hash
            },
            dataType: 'json',
            success: function(response) {
                if(response.success) {
                    var link = response.data.link;
                    var id = response.data.id;
                    var linkid = "https://imgur.com/gallery/" + id;
                    
                    var divExport = document.getElementById("divExport");
                    
                    var divlink = document.createElement("div");
                    var spanlink = document.createElement("span");
                    var brlink = document.createElement("br");
                    spanlink.innerHTML = "Direct link: ";
                    var alink = document.createElement("a");
                    alink.target = "_blank";
                    alink.href = link;
                    alink.innerHTML = link;
                    divlink.appendChild(spanlink);
                    divlink.appendChild(brlink);
                    divlink.appendChild(alink);
                    
                    var divgallery = document.createElement("div");
                    var spangallery = document.createElement("span");
                    var brgallery = document.createElement("br");
                    spangallery.innerHTML = "Gallery link: ";
                    var agallery = document.createElement("a");
                    agallery.target = "_blank";
                    agallery.href = linkid;
                    agallery.innerHTML = linkid;
                    divgallery.appendChild(spangallery);
                    divgallery.appendChild(brgallery);
                    divgallery.appendChild(agallery);
                    
                    var divbbcode = document.createElement("div");
                    var spanbbcode = document.createElement("span");
                    spanbbcode.innerHTML = "BBCode: ";
                    var txtbbcode = document.createElement("input");
                    txtbbcode.type = "text";
                    txtbbcode.className = "form-control";
                    txtbbcode.readOnly = true;
                    txtbbcode.value = "[url=" + window.csgoalbumurl + location.hash + "][img]" + link + "[/img][/url]";
                    divbbcode.appendChild(spanbbcode);
                    divbbcode.appendChild(txtbbcode);
                    
                    clearDivExport();
                    divExport.appendChild(divlink);
                    divExport.appendChild(divgallery);
                    divExport.appendChild(divbbcode);
                    
                    //complete export process
                    window.exporting = false;
                    
                }
            },
            error: function(e) {
                document.getElementById("divExport").innerHTML = "There was an error.";
            }
        });
        
    }, 500); 

}

function drawSticker(ctx, src, x, y) {
    var img = new Image();
    img.onload = function () {
        ctx.drawImage(img, x, y);
    };
    img.src = src;
}

function drawStickerLight(ctx, src, x, y) {
    var img = new Image();
    img.onload = function () {
        ctx.globalAlpha = 0.5;
        ctx.drawImage(img, x, y);
        ctx.globalAlpha = 1;
    };
    img.src = src;
}

function writeTittle(ctx, txt, x, y) {
    ctx.font="30px Georgia";
    ctx.fillText(txt, x, y);
}

function writeCategory(ctx, txt, x, y) {
    ctx.font="20px Georgia";
    ctx.fillText(txt, x, y);
}

function drawLine(ctx, x, y, w, h) {
    //set line color
    ctx.fillStyle = "#CCCCCC";
    ctx.fillRect(x, y, w, h);
    
    //set default color back
    ctx.fillStyle = "#000000";
} 

function watermark(ctx, x, y) {
    ctx.font="15px Georgia";
    ctx.fillText("csgo-album.com", x, y - 10);
}