
/**
 * onLoad
 * functions loaded with the page
 */
function onLoad() {
			
    setVersion();
		
};

/**
 * setVersion
 * set current version under the application
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
	var steamID = document.getElementById("inputSteamID").value;
	
	if(steamID != null && steamID != "") {
		
		//if steamID is a full url
		if(steamID.indexOf("steamcommunity") > -1) {
			steamID = steamID.split('/')[4];
		}
	}
	
	window.steamID = steamID;
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

	$.getJSON(url, function(json) {
		if(json.success == true) {
			window.currentinventory = json;
			spanprofilestatus.innerHTML = "<a href='http://steamcommunity.com/id/" + window.steamID + "/inventory/#730' target='blank'>Inventory</a> loaded correctly";
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
	});
};

/**
 * selectCategory
 * search the selected category and use it
 */
function selectCategory(id) {
	
	if(id != window.LastCategory && window.currentinventory != null) {
		clearCategory();
		document.getElementById("categoryName").innerHTML = window.categories[id][0];
		document.getElementById("category_" + id).classList.add("currentcategory");
		clearCategoryContent();
		searchStickers(id);
		window.LastCategory = id;
	}
};

/**
 * clearCategory
 * reset selected categories
 */
function clearCategory() {
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
				legend.innerHTML = subcategory + " ";
				var span = document.createElement("span");
				span.className = "badge";
				span.innerHTML = "0/" + this.quantity;
				legend.appendChild(span);
				fieldset.appendChild(legend);
				
				
				for(var i = 0; i < this.quantity; i++) {					
					var cssname = id + subcategory + i;
					cssname = cssname.replace(/\s+/g, ''); //delete spaces from subcategory name
										
					var a = document.createElement("a");
					
					if(window.animatedstickers) {
						
						var style = document.createElement("style");
						style.type = "text/css";
						style.innerHTML = ".classSticker" + cssname + " .sticker-img {";
						style.innerHTML += "background-image: url(" + window.steamimages_url + this.stickers[i]["icon_url"] + window.icondimensions +");";
						style.innerHTML += "background-repeat: no-repeat;";
						style.innerHTML += "background-position: center;"; 
						style.innerHTML += "}";
						document.getElementsByTagName('head')[0].appendChild(style);						
						
						a.className = "sticker " + "classSticker" + cssname +" sticker-translucid";
					}
					else {
						var img = document.createElement("img");
						img.src = window.steamimages_url + this.stickers[i]["icon_url"] + window.icondimensions;
						a.className = "sticker-translucid";
						a.appendChild(img);
					}
					
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
	for(var i = 0; i< items.length; i++) {
		var hash = items[i].title;
		
		for(var item in descriptions) {
			var market_hash = descriptions[item]["market_hash_name"];
			if(market_hash == hash || market_hash == decodeURI(hash)) {  
				document.getElementById(items[i].id).classList.remove("sticker-translucid");
				
				break;
			}
		}
		
	}

};

/**
 * swapAnimated
 * change the way stickers are listed
 */
function swapAnimated(mode) {
	
	if(mode != window.animatedstickers) {
		window.animatedstickers = mode;
		
		if(mode) {
			document.getElementById("btnSwapOn").classList.add("active");
			document.getElementById("btnSwapOff").classList.remove("active");
		}
		else {
			document.getElementById("btnSwapOn").classList.remove("active");
			document.getElementById("btnSwapOff").classList.add("active");
		}
		
	}
	
};
