require("component-responsive-frame/child");
var dot = require("./lib/dot");
var $ = require("jquery");

var template = dot.compile(require("./_info.html"));

var qsa = s => Array.prototype.slice.call(document.querySelectorAll(s));

$(document).ready(function() {
	qsa(".st0").forEach(function(bubble) {
	  bubble.addEventListener("click", function(e) {
	  	$(".buttons").addClass("shown");
	    document.querySelector(".details").innerHTML = template(data[e.target.getAttribute("data-key")]);
	    
	    // "selected" class makes bubble gray while selected
	    if (document.querySelector(".selected")) {
	    	$(".selected").removeClass("selected");
	    }
	    $(e.target).addClass("selected");

	    // "selected" data attribute for functionality
	    qsa(".st0").forEach(function(bubble) {
	    	bubble.setAttribute("data-selected", "false");
	    });
	    e.target.setAttribute("data-selected", "true");
	  });
	});

	var options = Object.keys(window.data);

	qsa(".goto").forEach(function(btn) {
		btn.addEventListener("click", function(e) {
			var selected = $("[data-selected='true']")[0];
			var selectedIndex = selected ? options.indexOf(selected.getAttribute("data-key")) : -1;

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
	    		$(bubble).removeClass("selected")
	    	});
	    }
    	$("[data-key=" + new_key + "]").addClass("selected");

    	// "selected" data attribute for functionality
	    qsa(".st0").forEach(function(bubble) {
	    	bubble.setAttribute("data-selected", "false");
	    });
			$("[data-key=" + new_key + "]").each(function() {
				this.setAttribute("data-selected", "true");
			})
		});
	});

	document.querySelector(".start").addEventListener("click", function(e) {
		$("[data-key='personal']").each(function() {
			$(this).addClass("selected");
			this.setAttribute("data-selected", "true");
		})
		$(".buttons").addClass("shown");

		document.querySelector(".details").innerHTML = template(data[options[0]]);
	});
});