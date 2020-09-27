// BOOTSTRAP STUFF
$(document).ready(function() {
	
	// Sticky for non supporting browsers
	var elements = $('.stuck, .search-stuck');
	Stickyfill.add(elements);


	// mobile menu active
	$('.buton-meniu').click(function() {
		$('.buton-meniu').toggleClass('meniu-activ');
	})

	// bootstrap tooltip 
	$(function () {
	  $('[data-toggle="tooltip"]').tooltip()
	})

});



// CREATE STICKY OBSERVER FOR SEARCH BOX
// when jumbo becomes invisible we add "isSticky" class on searchbox
let searchSticky = document.getElementById('search-job');
let searchStickyWatch = document.getElementById('jumbo');

let stickyObserver = new IntersectionObserver(function(entries) {
	// no intersection with screen
	if(entries[0].intersectionRatio === 0)
		searchSticky.classList.add("isSticky");
	// fully intersects with screen
	else if(entries[0].intersectionRatio > 0)
		searchSticky.classList.remove("isSticky");
}, { threshold: [0, 1] });

// call intersection observer if the element is on page
if (searchStickyWatch) {
	stickyObserver.observe(searchStickyWatch);
}
// END STICKY OBSERVER