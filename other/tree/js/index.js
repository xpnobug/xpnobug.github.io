//Magic goes here... 

var cat = document.getElementById("cat"),
		shadowBack = document.getElementsByClassName("shadow-2"),
		shadowMed = document.getElementsByClassName("shadow-1"),
		tlc = new TimelineLite();
		tl = new TimelineLite();

tlc
	.fromTo(cat, 1, {opacity:1, y:60}, {opacity:1, y:0, delay:2, ease:Power4.easeOut});

tl 
	.fromTo(shadowBack, 2, {opacity:0}, {opacity:.5, repeat:-1, yoyo:true, delay:.5})
	.fromTo(shadowMed, 2, {opacity:.25}, {opacity:.5, repeat:-1, yoyo:true,})


cat.onmouseover = function(e) {
	tlc.reverse();
};
cat.onmouseout = function(e) {
	tlc.play();
};