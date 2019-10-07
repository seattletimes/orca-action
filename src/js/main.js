require("component-responsive-frame/child");
var dot = require("./lib/dot");
var $ = require("jquery");

var template = dot.compile(require("./_info.html"));

var qsa = s => Array.prototype.slice.call(document.querySelectorAll(s));

var addClass = function(elm, cssClass) {
	if (!!elm.classList) {
		elm.classList.add(cssClass);
	} else if (elm.nodeName === "SVG") {
		let appliedClasses = elm.getAttribute("class") || "";
		appliedClasses = !appliedClasses.split(" ").includes(cssClass)
			? `${elm.className} ${cssClass}`
			: appliedClasses;
      	elm.setAttribute('class', appliedClasses);
	}
};

$(document).ready(function() {
	qsa(".st0").forEach(function(bubble) {
	  bubble.addEventListener("click", function(e) {
	  	$(".buttons").addClass("shown");
	    document.querySelector(".details").innerHTML = template(data[e.target.dataset.key]);
	    
	    // "selected" class makes bubble gray while selected
	    if (document.querySelector(".selected")) {
	    	document.querySelector(".selected").classList.remove("selected");
	    }
	    e.target.classList.add("selected");

	    // "selected" data attribute for functionality; supports IE 11
	    document.querySelectorAll(".st0").forEach(function(bubble) {
	    	bubble.dataset.selected = "false";
	    });
	    e.target.dataset.selected = "true";
	  });
	});

	var options = Object.keys(window.data);

	qsa(".goto").forEach(function(btn) {
		btn.addEventListener("click", function(e) {
			var selected = $("[data-selected='true']")[0];
			var selectedIndex = selected ? options.indexOf(selected.dataset.key) : -1;

			if (e.target.classList.contains("back")) {
				selectedIndex = Math.max(0, selectedIndex - 1);
			} else {
				selectedIndex = Math.min(options.length - 1, selectedIndex + 1);
			}

			$(".goto.back").toggleClass("disabled", selectedIndex == 0);
	   	$(".goto.next").toggleClass("disabled", selectedIndex == options.length - 1);

			document.querySelector(".details").innerHTML = template(data[options[selectedIndex]]);
	    
			var new_key = options[selectedIndex];

			// "selected" class to make bubble gray while selected
	    if (document.querySelector(".selected")) {
	    	qsa(".selected").forEach(function(bubble) {
	    		bubble.classList.remove("selected")
	    	});
	    }
    	$("[data-key=" + new_key + "]").addClass("selected");

    	// "selected" data attribute for functionality; supports IE 11
	    document.querySelectorAll(".st0").forEach(function(bubble) {
	    	bubble.dataset.selected = "false";
	    });
			$("[data-key=" + new_key + "]").each(function() {
				this.dataset.selected = "true";
			})
		});
	});

	document.querySelector(".start").addEventListener("click", function(e) {
		$("[data-key='personal']").each(function() {
			this.classList.add("selected");
			this.dataset.selected = "true";
		})
		$(".buttons").addClass("shown");

		document.querySelector(".details").innerHTML = template(data[options[0]]);
	});
});