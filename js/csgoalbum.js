
/**
 * onLoad
 * functions loaded with the page
 */
function onLoad() {
    document.getElementById("navbrand-csgoalbum").href = window.csgoalbumurl; //set url in nav
    setContenVisible("hidden"); //hide content column
    setVersion();
    getHash();
    checkSteamID(); //check if hash content a valid steamID and load its inventory
};

/**
 * setVersion
 * set current version in nav bar
 */
function setVersion() {
    document.getElementById("spanCurrentVersion").innerHTML = window.CurrentVersion;
};

/**
 * initSticker
 * launches sticker.js
 */
function initSticker() {
    Sticker.init('.sticker');
};

/**
 * checkFormSteamID
 * checks if the value is a name or an url
 */
function checkFormSteamID() {
    setContenVisible("hidden"); //hide content column
    var steamID = document.getElementById("inputSteamID").value;

    if(steamID != null && steamID != "") {
        //if steamID is a full url
        if(steamID.indexOf("steamcommunity") > -1) {
            steamID = steamID.split('/')[4];
        }
    }

    window.steamID = steamID;
    window.LastCategory = false;
    window.hashCategory = false;
    getInventory();
};

/**
 * getInventory
 * get current steamID's inventory json
 */
function getInventory() {
    var url = window.cross + "http://steamcommunity.com/id/" + window.steamID + "/inventory/json/730/2/";

    var spanprofilestatus = document.getElementById("spanprofilestatus");
    spanprofilestatus.innerHTML = "Loading...";
    window.currentinventory = null;
    window.inventoryloaded = false;

    $.getJSON(url, function(json) {
        if(json.success == true) {
            window.currentinventory = json;
            spanprofilestatus.innerHTML = "<a href='http://steamcommunity.com/id/" + window.steamID + "/inventory/#730' target='blank'>Inventory</a> loaded correctly";

            setContenVisible("visible"); //show content column
            setCustomURL(window.steamID, ""); //set hash for current user

            //if previous hash is set
            if(window.hashCategory != null) {
                selectCategory(window.hashCategory);
            }
        }
        else {
            //if json includes error message
            try {
                spanprofilestatus.innerHTML = json.Error;
            }
            //if json doesn't include error message
            catch(err) {
                spanprofilestatus.innerHTML = "There were some errors while fetching the inventory. Check if it's correct.";
            }
        }
        window.inventoryloaded = true;
    });

    //if after 5 seconds inventory isn't loaded
    setTimeout(function(){
        if(!window.inventoryloaded) {
            spanprofilestatus.innerHTML = "We are not able to fetch your inventory. Check your SteamID or try again later.";
        }
    }, 5000);

};

/**
 * selectCategory
 * search the selected category and use it
 */
function selectCategory(id) {
    if(id != window.LastCategory && window.currentinventory != null) {
        if(id in window.categories) {
            clearHeaderCSS();
            clearCategory();
            document.getElementById("categoryName").innerHTML = window.categories[id][0];
            document.getElementById("category_" + id).classList.add("currentcategory");
            clearCategoryContent();
            searchStickers(id);
            window.LastCategory = id;

            setCustomURL(window.steamID, id);
            if(!window.exporting ) {
                resetDivExport();
            }
        }
    }
};

/**
 * forceSelectCategory
 * force selectCategory function
 */
function forceSelectCategory(id) {
    window.LastCategory = null;
    selectCategory(id);
};

/**
 * clearHeaderCSS
 * clears all css files included in head by the script
 */
function clearHeaderCSS() {
    var styles = document.getElementsByTagName('style');
    var remove_list = [];

    for(var i = 0; i < styles.length; i++) {
        if (styles[i].innerHTML.indexOf('Sticker') >= 0) {
            remove_list.push(styles[i]);
        }
    }

    for (var r of remove_list) {
        r.remove();
    }
};

/**
 * clearCategory
 * reset selected categories
 */
function clearCategory() {
    document.getElementById("categoryName").innerHTML = "";
    for(var c in window.categories) {
        document.getElementById("category_" + c).classList.remove("currentcategory");
    }
};

/**
 * clearCategoryContent
 * empty category content
 */
function clearCategoryContent() {
    var content = document.getElementById("categoryContent");
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
};

/**
 * searchStickers
 * search stickers in stickers.json for selected category
 * create a new fieldset for each subcategory with its stickers
 */
function searchStickers(id) {

    $.getJSON (
        "./js/stickers.json",
        function(stickersjson) {
            $.each(stickersjson[id], function(subcategory) {

                var content = document.getElementById("categoryContent");

                var form = document.createElement("form");
                form.className = "form-horizontal ng-pristine ng-valid";
                var fieldset = document.createElement("fieldset");
                var legend = document.createElement("legend");
                legend.innerHTML = subcategory;
                fieldset.appendChild(legend);

                for(var i = 0; i < this.quantity; i++) {
                    var cssname = id + subcategory + i;
                    cssname = cssname.replace(/\s+/g, ''); //delete spaces from subcategory name
                    cssname = cssname.replace(/\./g, ''); //delete . from subcategory name

                    var a = document.createElement("a");
                    
                    //if animations are selected
                    //create content necesary for sticker.js
                    if(window.animatedstickers) {

                        var style = document.createElement("style");
                        style.type = "text/css";
                        style.innerHTML = ".classSticker" + cssname + " .sticker-img {";
                        style.innerHTML += "background-image: url(" + this.stickers[i]["icon_url"] + ");";
                        style.innerHTML += "background-repeat: no-repeat;";
                        style.innerHTML += "background-position: center;";
                        style.innerHTML += "}";
                        document.getElementsByTagName('head')[0].appendChild(style);

                        a.className = "sticker " + "classSticker" + cssname +" sticker-translucid";
                        
                        //include prices
                        if(window.showprices) {
                            var price = getStickerPrice(this.stickers[i]["market_hash_name"]);
                            var spanprice = document.createElement("span");
                            spanprice.className = "span-prices";
                            spanprice.innerHTML = price;
                            a.appendChild(spanprice);
                        }
                    }
                    //if animations are not selected
                    //create just an image
                    else {
                        var img = document.createElement("img");
                        img.src = this.stickers[i]["icon_url"];
                        a.className = "sticker-translucid";
                        a.appendChild(img);
                        
                        //include prices
                        if(window.showprices) {
                            var price = getStickerPrice(this.stickers[i]["market_hash_name"]);
                            var spanprice = document.createElement("span");
                            spanprice.className = "span-prices";
                            spanprice.innerHTML = price;
                            a.appendChild(spanprice);
                        }
                    }
                    
                    //add link-market for prices and counts
                    a.classList.add("link-market");
                    //add link values
                    a.href = window.steammarket_url + this.stickers[i]["market_hash_name"];
                    a.target = "_blank";
                    a.id = "sticker_" + cssname;
                    a.title = decodeURI(this.stickers[i]["market_hash_name"]);
                    fieldset.appendChild(a);
                }

                var divclear = document.createElement("div");
                divclear.className = "clear";
                fieldset.appendChild(divclear);

                form.appendChild(fieldset);
                content.appendChild(form);

            });

            if(window.animatedstickers) {
                initSticker(); //activates sticker.js
            }
            checkOwned();
        }
    );
};

/**
 * checkOwned
 * if one sticker is owned by the user, it will change its style
 */
function checkOwned() {

    var descriptions = window.currentinventory.rgDescriptions;
    var items = document.getElementById("categoryContent").getElementsByTagName("a");
    var countowned = 0;
    for(var i = 0; i< items.length; i++) {
        var hash = items[i].title;

        for(var item in descriptions) {
            var market_hash = descriptions[item]["market_hash_name"];
            
            //bugfix for v0.3.1
            hash = hash.replace("%40", '@'); //replace %40 by @ for players within their name
            //
            
            if(market_hash == hash || market_hash == decodeURI(hash)) {
                document.getElementById(items[i].id).classList.remove("sticker-translucid");
                countowned++;
                break;
            }
            
        }
    }
    document.getElementById("badge_"+window.LastCategory).innerHTML = countowned + "/" + items.length;

};

/**
 * swapAnimated
 * change the way stickers are listed
 */
function swapAnimated(mode) {

    if(arguments.length == 0) {
        mode = (!window.animatedstickers);
    }

    if(mode != window.animatedstickers) {
        window.animatedstickers = mode;

        if(mode) {
            document.getElementById("btnSwapAnimated").classList.add("active");
        }
        else {
            document.getElementById("btnSwapAnimated").classList.remove("active");
        }

        if(window.LastCategory != false) {
            forceSelectCategory(window.LastCategory);
        }
    }
};

/**
 * setContentVisible
 * show/hide categories list and content
 */
function setContenVisible(mode) {
    document.getElementById("column_left").style.visibility = mode;
    document.getElementById("column_content").style.visibility = mode;
    document.getElementById("divSettings").style.visibility = mode;

    if(mode == "hidden") {
        clearCategoryContent();
        clearCategory();
        clearHeaderCSS();
        clearCountOwned();
    }
};

/**
 * clearCountOwned
 * clears badges
 */
function clearCountOwned() {
    document.getElementById("badge_katowice2014").innerHTML = "";
    document.getElementById("badge_cologne2014").innerHTML = "";
    document.getElementById("badge_dhw2014").innerHTML = "";
    document.getElementById("badge_katowice2015").innerHTML = "";
    document.getElementById("badge_cologne2015").innerHTML = "";
    document.getElementById("badge_cologne2015foil").innerHTML = "";
    document.getElementById("badge_dhcluj2015").innerHTML = "";
    document.getElementById("badge_dhcluj2015foil").innerHTML = "";
};

/**
 * setCustomURL
 * set custom url for current user and category
 */
function setCustomURL(steamid, category) {
    var hash = "#" + steamid + "-" + category;
    if(history.pushState) {
        history.pushState(null, null, hash);
    }
    else {
        location.hash = hash;
    }
};

/**
 * getHash
 * get location.hash and save its content
 */
function getHash() {
    var hash = location.hash;
    hash = hash.replace(/\#/g, '');

    var values = hash.split("-");
    window.steamID = values[0];
    window.hashCategory = values[1];
};

/**
 * checkSteamID
 * check if url contents any steamid
 * if it contents, it searches inventory
 */
function checkSteamID() {
    if(window.steamID != "") {
        document.getElementById("inputSteamID").value = window.steamID;
        getInventory();
    }
};

/**
 * exportAlbum
 * gets current album and make a canvas with it
 */
function exportAlbum() {
    
    window.exporting = true;
    //clear div
    clearDivExport();
    
    //set uploading
    document.getElementById("divExport").innerHTML = "Uploading...";
    
    if(window.animatedstickers) {
        swapAnimated(false);
      
        //wait until all img are loaded      
        setTimeout(function(){
            albumtocanvas();
            swapAnimated(true);
        }, 500);
    }
    else {
        albumtocanvas();
    }
};

/**
 * clearDivExport
 * clears content of exporting div
 */
function clearDivExport() {
    var content = document.getElementById("divExport");
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
};

/**
 * resetDivExport
 * reset exporting div
 */
function resetDivExport() {
    
    clearDivExport();    
    var div = document.getElementById("divExport");
    var a = document.createElement("a");
    a.className = "btn btn-inverse input-group-addon btn-xs cursorpointer";
    a.innerHTML= "<i class='fa fa-file-image-o'></i> Share this album</a>";
    a.addEventListener("click", exportAlbum);
    div.appendChild(a);
};

/**
 * swapShowPrices
 * shows / hides prices
 */
function swapShowPrices(mode) {

    if(arguments.length == 0) {
        mode = (!window.showprices);
    }

    if(mode != window.showprices) {
        window.showprices = mode;

        if(mode) {
            document.getElementById("btnSwapShowPrices").classList.add("active");
            if(window.pricelist == null) {
                getMarketPrices();
            }
        }
        else {
            document.getElementById("btnSwapShowPrices").classList.remove("active");
        }

        if(window.LastCategory != false) {
            forceSelectCategory(window.LastCategory);
        }
    }
};

/**
 * getMarketPrices
 * fetch all sticker prices from steam market
 * save them to a global variable for the current session
 */
function getMarketPrices(){
    
    var start = 0; //initial position
    var count = 100; //number of items by petition
    var total_count = 0; //total items
    
    var list = [];
    var fetching = true;
    
    document.getElementById("spansettingsstatus").innerHTML = "Fetching prices...";
    
    //while there still are items    
    while(fetching) {
        
        var order = "&sort_column=name&sort_dir=asc";
        var url = window.cross + "http://steamcommunity.com/market/search/render/?category_730_Type[]=tag_CSGO_Tool_Sticker&appid=730&start=" + start + "&count=" + count + order;
        start += count;
    
        $.ajax({
            url: url,
            async: false,
            dataType: 'json',
            success: function (json) {
                if(json.success == true) {
                        
                    total_count = json.total_count; //set total count = total items from market
                    document.getElementById("spansettingsstatus").innerHTML = "Fetching " + start + "/" + total_count;
                    
                    var div = document.createElement("div");
                    div.innerHTML = json.results_html;
                    
                    //get items from json
                    var items = $(div).find('.market_listing_row_link');
                    for(var i = 0; i <items.length; i++) {
                        //get price for each item                        
                        var spanprice = items[i].innerHTML.match(/<span style="color:white">.*?([0-9]+(?:\.[0-9]*)?).*?<\/span>/);
                        //get the matching string
                        var price = spanprice[1];
                        var hash_name = encodeURI(String(items[i]).replace("http://steamcommunity.com/market/listings/730/", ""));
                        //add item and price to list
                        list[hash_name] = price;
                    }
                }
                else {
                    fetching = false;
                    document.getElementById("spansettingsstatus").innerHTML = "There were an error while fetching prices.";
                }
            },
            error: function (e) {
                fetching = false;
                document.getElementById("spansettingsstatus").innerHTML = "There were an error while fetching prices. Market can't be loaded.";
            }
        });
        
        //if no remaining items
        if(total_count <= start) {
            fetching = false;
            document.getElementById("spansettingsstatus").innerHTML = "All prices loaded correctly.";
        }
    
        
        /*
            //if after 5 seconds inventory isn't loaded
    setTimeout(function(){
        if(!window.inventoryloaded) {
            spanprofilestatus.innerHTML = "We are not able to fetch your inventory. Check your SteamID or try again later.";
        }
    }, 5000);
    */
        
    } //end while
   
    window.pricelist = list;
    
};

/**
 * getStickerPrice
 * returns the price of a given hash market name
 * only works if prices are loaded previously
 */
function getStickerPrice(market_hash) {
    var hash = encodeURI(market_hash);
    var toret = "";
    if(hash in window.pricelist) {
        toret = "$" + window.pricelist[hash];
    }
    return toret;
};