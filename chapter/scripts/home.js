function addLoadEvent (func) {
	var oldonload = window.onload;
	if (typeof window.onload != "function") {
		window.onload = func;
	} else {
		window.onload = function (){
			oldonload();
			func();
		}
	}
}

function insertAfter (newElement,targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

function addClass (element,value) {
    if (!element.className) {
    	element.className = value;
    } else {
   		newClassName = element.className;
    	newClassName+= " ";
    	newClassName+= value;
    	element.className = newClassName;
    }
}

/*home*/
function moveElement (elementID,final_x,final_y,interval) {
	if (!document.getElementById) return false;
	if (!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	if (elem.movement) {
		clearTimeout(elem.movement);
	}
	if (!elem.style.left) {
    	elem.style.left = "0px";
    }
  	if (!elem.style.top) {
    	elem.style.top = "0px";
  	}
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if(xpos == final_x && ypos == final_y){
		return true;
	}
	if(xpos < final_x){
		var dist = Math.ceil((final_x - xpos)/10);
		xpos = xpos + dist;
	}
	if(xpos > final_x){
		var dist = Math.ceil((xpos - final_x)/10);
		xpos = xpos - dist;
	}
	if(xpos < final_x){
		var dist = Math.ceil((final_y - ypos)/10);
		ypos = ypos + dist;
	}
	if(xpos > final_x){
		var dist = Math.ceil((ypos - final_y)/10);
		ypos = ypos - dist;
	}
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat,interval);
}

function show (){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("intro")) return false;
	var intro = document.getElementById("intro");
	var show = document.createElement("div");
	show.setAttribute("id","show");
	var frame = document.createElement("img");
	frame.setAttribute("src","images/frame.gif");
	frame.setAttribute("id","frame");
	show.appendChild(frame);
	var preview = document.createElement("img");
	preview.setAttribute("src","images/slideshow.gif");
	preview.setAttribute("id","preview");
	show.appendChild(preview);
	insertAfter(show,intro);
	var links = document.getElementsByTagName("a");
	for (var i=0; i<links.length; i++){
		links[i].onmouseover = function (){
			var dest = this.getAttribute("href");
			if (dest.indexOf("index.html") != -1){
				moveElement("preview",0,0,5);
			}
			if (dest.indexOf("about.html") != -1){
				moveElement("preview",-150,0,5);
			}
			if (dest.indexOf("photos.html") != -1){
				moveElement("preview",-300,0,5);
			}
			if (dest.indexOf("live.html") != -1){
				moveElement("preview",-450,0,5);
			}
			if (dest.indexOf("contact.html") != -1){
				moveElement("preview",-600,0,5);
			}
		}
	}
}

//about
function showSection (id){
	if(!document.getElementById) return false;
	if(!document.getElementById("jay")) return false;
	if(!document.getElementById("domsters")) return false;
	var jay = document.getElementById("jay");
	var domsters = document.getElementById("domsters");
	if(jay.getAttribute("id") != id){
		jay.style.display = "none";
		domsters.style.display = "block";
	}else{
		jay.style.display = "block";
		domsters.style.display = "none";
	}
}

function onList (){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("list")) return false;
	var list = document.getElementById("list");
	var links = list.getElementsByTagName("a");
	for(var i=0; i<links.length; i++){
		var sectionId = links[i].getAttribute("href").split("#")[1];
    	if (!document.getElementById(sectionId)) continue;
    	document.getElementById(sectionId).style.display = "none";
    	links[i].destination = sectionId;
    	links[i].onclick = function() {
    		showSection(this.destination);
    		return false;
    	}
	}
}

//photos
function Pic (){
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var text = document.createTextNode("Choose an image");
	description.appendChild(text);
	var pic = document.createElement("img");
	pic.setAttribute("id","pic");
	pic.setAttribute("src","images/placeholder.gif");
	pic.setAttribute("alt","my image gallery");
	pic.style.border = "0.1em solid #ba9";
	var gallery = document.getElementById("imagegallery");
	insertAfter(description,gallery);
	insertAfter(pic,description);
}

function showPic (whichpic){
	if(!document.getElementById) return false;
	if(!document.getElementById("pic")) return false;
	var source = whichpic.getAttribute("href");
	var pic = document.getElementById("pic");
	pic.setAttribute("src",source);
	if (document.getElementById("description")){
		if (whichpic.getAttribute("title")){
			var text = whichpic.getAttribute("title");
		} else{
			var text = "";
		}
		var description = document.getElementById("description");
		if (description.firstChild.nodeType == 3){
			description.firstChild.nodeValue=text;
		}
		return false;
	}
}

function showPhotos (){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for (var i=0; i<links.length; i++){
		links[i].onclick = function (){
			return showPic(this);
		}
	}
}

function loadEvent (){
	show ();
	onList ();
	Pic ();
	showPhotos ();
}

addLoadEvent(loadEvent);
