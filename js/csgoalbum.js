
/**
 * onLoad
 * functions loaded with the page
 */
function onLoad() {
	
		//
		fieldtest();
		//
		
    	setVersion();
		initSticker();
		
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
 * 
 */
function checkFormSteamID() {
	var steamID = document.getElementById("inputSteamID").value;
	
	if(steamID != null && steamID != "") {
		
		//if steamID is a full url
		if(steamID.indexOf("steamcommunity") > -1) {
			steamID = steamID.split('/')[4];
		}
	}
};


function fieldtest() {
	
	/*
                                
	<form class="form-horizontal ng-pristine ng-valid">
		<fieldset>
			<legend>
				ESL
				<span class="badge">0/2</span>
			</legend>
			<img src="http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYobWpLThz2ObEfQJH_9CJko-Cm8j4MqnWkyVTu5An2ryQpdyijgzmqBBuYTvxIYbAc1RrN1CD_FPrwezpgpO56ZjM1zI97VCLs1zd/95fx95f" class="translucid">
			<img src="http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYobWpLThlwP_3dzJL4OO6lZKMkrmgar-GkjkJ7pNw2LGX8Y3x3QWyqkFqZW6icIOWIQE-MgzW-lC3ybq7m9bi661nEL9o/95fx95f" class="translucid"> 
			<img src="http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQkrFeOesx9zGX1g7MApetbW3JTho3P_HP2lDvonuxIGJlq-nYurSxTtQ6sYp3b-Y8Nn32ADkrhA5Ym-iLdCSI1QgIQaH4MkIbGw/95fx95f" class="translucid">     
			<div class="sticker example-1"></div>  
			<a class="sticker example-1" href="http://google.es" target="_blank"></a>   
			
                                        <div class="clear"></div>
		</fieldset>
	</form>
	*/
	
	var field = document.getElementById("fieldtest");
	
	var img1 = document.createElement("img");
	var img2 = document.createElement("img");
	var img3 = document.createElement("img");
	var img4 = document.createElement("img");
	var img5 = document.createElement("img");
	var img6 = document.createElement("img");
	var img7 = document.createElement("img");
	var img8 = document.createElement("img");
	
	img1.src="http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYobWpLThz2ObEfQJH_9CJko-Cm8j4MqnWkyVTu5An2ryQpdyijgzmqBBuYTvxIYbAc1RrN1CD_FPrwezpgpO56ZjM1zI97VCLs1zd/94fx94f";
	img1.className = "sticker-translucid"
	field.appendChild(img1);
	
	img2.src="http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYobWpLThlwP_3dzJL4OO6lZKMkrmgar-GkjkJ7pNw2LGX8Y3x3QWyqkFqZW6icIOWIQE-MgzW-lC3ybq7m9bi661nEL9o/94fx94f";
	img3.className = ""
	field.appendChild(img2);
	
	img3.src="http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulReQ0DfQOqohZ-CBhJ3KQNouru3LAIuhKKedWlAv9jiwNKNx6-sMLjXzzIJv5Mh3e2S8I6j21Lk_BE_ZGD6d5jVLFFziCH9GQ/94fx94f";
	img3.className = "sticker-translucid"
	field.appendChild(img3);
	
	img4.src="http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYX0DbRvCiwMbQVg8kdFEYoLO3PxJzw-HHTjFD_tuz2oGKlPbyMuzQxz5TvMEi27zA9tT33lfmr0trYDilIYCdcAI_YViB_FOggbC4-r8J0VQ/94fx94f";
	img4.className = ""
	field.appendChild(img4);
	
	img5.src="http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRZRFuCF7X5mMfWX1FmJA1Es6i2FAthwfTNP2QStd3uwdHbzq6jZL-HxW1X65dy3r_Apdmh2A3k-UVqZm6lcNLAdFMgIQaHA8TzaJo/94fx94f";
	img5.className = "sticker-translucid"
	field.appendChild(img5);
	
	img6.src="http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYoLW9Lgpp3fzaTjVN4NOJmIGZkPK6NuzTzm9TscZ32uzCotmn0Aa1_UZrMjygLY6QcwU9MA6F_li3xu_v1oj84srlNTvhug/94fx94f";
	img6.className = "sticker-translucid"
	field.appendChild(img6);
	
	img7.src="http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulReQ0DfQOqohZ-CBhJnLANou7urIgZj7PXHeDF94N2kk4XFz_T2ZO_VwGgHu50o3uyS8d6h3FK3-RdlMm-gItWUcABoNVjSqFS9wvCv28H-SWWLIg/94fx94f";
	img7.className = ""
	field.appendChild(img7);
	
	img8.src="http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQkrFeOesx9zGX1g7MApetbW3JTho3P_HP2lDvonuxIGJlq-nYurSxTtQ6sYp3b-Y8Nn32ADkrhA5Ym-iLdCSI1QgIQaH4MkIbGw/94fx94f";
	img8.className = ""
	field.appendChild(img8);
	
	var divclear = document.createElement("div");
	divclear.className = "clear";
	field.appendChild(divclear);
	
	var style1 = document.createElement('style');
	style1.type = 'text/css';
	style1.innerHTML = ".cssClass1 .sticker-img {";
	style1.innerHTML += "background-image: url(http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYobWpLThz2ObEfQJH_9CJko-Cm8j4MqnWkyVTu5An2ryQpdyijgzmqBBuYTvxIYbAc1RrN1CD_FPrwezpgpO56ZjM1zI97VCLs1zd/94fx94f);";
    style1.innerHTML += "background-repeat: no-repeat;";
    style1.innerHTML += "background-position: center;"; 
	style1.innerHTML += "}";	
	document.getElementsByTagName('head')[0].appendChild(style1);	
	var a1 = document.createElement("a");
	a1.className = "sticker cssClass1";	
	field.appendChild(a1);
	
	var style2 = document.createElement('style');
	style2.type = 'text/css';
	style2.innerHTML = ".cssClass2 .sticker-img {";
	style2.innerHTML += "background-image: url(http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYobWpLThlwP_3dzJL4OO6lZKMkrmgar-GkjkJ7pNw2LGX8Y3x3QWyqkFqZW6icIOWIQE-MgzW-lC3ybq7m9bi661nEL9o/94fx94f);";
    style2.innerHTML += "background-repeat: no-repeat;";
    style2.innerHTML += "background-position: center;"; 
	style2.innerHTML += "}";	
	document.getElementsByTagName('head')[0].appendChild(style2);	
	var a2 = document.createElement("a");
	a2.className = "sticker cssClass2 sticker-translucid";	
	field.appendChild(a2);
	
	var style3 = document.createElement('style');
	style3.type = 'text/css';
	style3.innerHTML = ".cssClass3 .sticker-img {";
	style3.innerHTML += "background-image: url(http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulReQ0DfQOqohZ-CBhJ3KQNouru3LAIuhKKedWlAv9jiwNKNx6-sMLjXzzIJv5Mh3e2S8I6j21Lk_BE_ZGD6d5jVLFFziCH9GQ/94fx94f);";
    style3.innerHTML += "background-repeat: no-repeat;";
    style3.innerHTML += "background-position: center;"; 
	style3.innerHTML += "}";	
	document.getElementsByTagName('head')[0].appendChild(style3);	
	var a3 = document.createElement("a");
	a3.className = "sticker cssClass3";	
	field.appendChild(a3);
	
	var style4 = document.createElement('style');
	style4.type = 'text/css';
	style4.innerHTML = ".cssClass4 .sticker-img {";
	style4.innerHTML += "background-image: url(http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYX0DbRvCiwMbQVg8kdFEYoLO3PxJzw-HHTjFD_tuz2oGKlPbyMuzQxz5TvMEi27zA9tT33lfmr0trYDilIYCdcAI_YViB_FOggbC4-r8J0VQ/94fx94f);";
    style4.innerHTML += "background-repeat: no-repeat;";
    style4.innerHTML += "background-position: center;"; 
	style4.innerHTML += "}";	
	document.getElementsByTagName('head')[0].appendChild(style4);	
	var a4 = document.createElement("a");
	a4.className = "sticker cssClass4 sticker-translucid";	
	field.appendChild(a4);
	
	var style5 = document.createElement('style');
	style5.type = 'text/css';
	style5.innerHTML = ".cssClass5 .sticker-img {";
	style5.innerHTML += "background-image: url(http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRZRFuCF7X5mMfWX1FmJA1Es6i2FAthwfTNP2QStd3uwdHbzq6jZL-HxW1X65dy3r_Apdmh2A3k-UVqZm6lcNLAdFMgIQaHA8TzaJo/94fx94f);";
    style5.innerHTML += "background-repeat: no-repeat;";
    style5.innerHTML += "background-position: center;"; 
	style5.innerHTML += "}";	
	document.getElementsByTagName('head')[0].appendChild(style5);	
	var a5 = document.createElement("a");
	a5.className = "sticker cssClass5";	
	field.appendChild(a5);
	
	var style6 = document.createElement('style');
	style6.type = 'text/css';
	style6.innerHTML = ".cssClass6 .sticker-img {";
	style6.innerHTML += "background-image: url(http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYoLW9Lgpp3fzaTjVN4NOJmIGZkPK6NuzTzm9TscZ32uzCotmn0Aa1_UZrMjygLY6QcwU9MA6F_li3xu_v1oj84srlNTvhug/94fx94f);";
    style6.innerHTML += "background-repeat: no-repeat;";
    style6.innerHTML += "background-position: center;"; 
	style6.innerHTML += "}";	
	document.getElementsByTagName('head')[0].appendChild(style6);	
	var a6 = document.createElement("a");
	a6.className = "sticker cssClass6";	
	field.appendChild(a6);
	
	var style7 = document.createElement('style');
	style7.type = 'text/css';
	style7.innerHTML = ".cssClass7 .sticker-img {";
	style7.innerHTML += "background-image: url(http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulReQ0DfQOqohZ-CBhJnLANou7urIgZj7PXHeDF94N2kk4XFz_T2ZO_VwGgHu50o3uyS8d6h3FK3-RdlMm-gItWUcABoNVjSqFS9wvCv28H-SWWLIg/94fx94f);";
    style7.innerHTML += "background-repeat: no-repeat;";
    style7.innerHTML += "background-position: center;"; 
	style7.innerHTML += "}";	
	document.getElementsByTagName('head')[0].appendChild(style7);	
	var a7 = document.createElement("a");
	a7.className = "sticker cssClass7 sticker-translucid";	
	field.appendChild(a7);
	
	var style8 = document.createElement('style');
	style8.type = 'text/css';
	style8.innerHTML = ".cssClass8  .sticker-img {";
	style8.innerHTML += "background-image: url(http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQkrFeOesx9zGX1g7MApetbW3JTho3P_HP2lDvonuxIGJlq-nYurSxTtQ6sYp3b-Y8Nn32ADkrhA5Ym-iLdCSI1QgIQaH4MkIbGw/94fx94f);";
    style8.innerHTML += "background-repeat: no-repeat;";
    style8.innerHTML += "background-position: center;"; 
	style8.innerHTML += "}";	
	document.getElementsByTagName('head')[0].appendChild(style8);	
	var a8 = document.createElement("a");
	a8.className = "sticker cssClass8 sticker-translucid";	
	a8.href ="http://google.es";
	a8.target = "_blank";
	field.appendChild(a8);
	
	var divclear2 = document.createElement("div");
	divclear2.className = "clear";
	field.appendChild(divclear2);
};