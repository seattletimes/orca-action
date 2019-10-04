// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
var dot = require("./lib/dot");
var $ = require("jquery");

var template = dot.compile(require("./_info.html"));

var qsa = s => Array.prototype.slice.call(document.querySelectorAll(s));

qsa(".st0").forEach(function(group) {
  group.addEventListener("click", function(e) {
  	$(".buttons").addClass("shown");
    document.querySelector(".details").innerHTML = template(data[e.target.classList[1]]);
    if (document.querySelector(".selected")) 
    	document.querySelector(".selected").classList.remove("selected");
    e.target.classList.add("selected");
  });
});

var options = Object.keys(window.data);

qsa(".goto").forEach(function(btn) {
	btn.addEventListener("click", function(e) {
		var selected = document.querySelector(".selected");
		var selectedIndex = selected ? options.indexOf(selected.classList[1]) : -1;

		if (e.target.classList.contains("back")) {
			selectedIndex = Math.max(0, selectedIndex - 1);
		} else {
			selectedIndex = Math.min(options.length - 1, selectedIndex + 1);
		}
		$(".goto.back").toggleClass("disabled", selectedIndex == 0);
   	$(".goto.next").toggleClass("disabled", selectedIndex == options.length - 1);

		document.querySelector(".details").innerHTML = template(data[options[selectedIndex]]);
    if (document.querySelector(".selected"))
    	qsa(".selected").forEach(function(bubble) {
    		bubble.classList.remove("selected")
    	});
    	qsa("." + options[selectedIndex]).forEach(function(bubble) {
    		bubble.classList.add("selected")
    	});
	});
});

document.querySelector(".start").addEventListener("click", function(e) {
	qsa(".personal").forEach(function(bubble) {
		bubble.classList.add("selected")
	})
	$(".buttons").addClass("shown");
});
