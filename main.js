var letters = document.getElementsByClassName('grid-item')
var timer = document.getElementById('timer')
var timer_seconds = 13 // seconds available for each player turn
var timer_button = document.getElementById('timer_button')
var g_timer = null //global timer
var explosion_dot = document.getElementById('explosion-dot')

var categories = [
	'Χώρες', 
	'Πρωτεύουσες', 
	'Λουλούδια', 
	'Επαγγέλματα', 
	'Ελληνικές Ομάδες', 
	'Ξένες Ομάδες', 
	'Θηλαστικά', 
	'Νομίσματα', 
	'Επώνυμα από το έργο', 
	'Ανδρικά ονόματα', 
	'Γυναικεία Ονόματα', 
	'Ελληνικές πόλεις', 
	'Υλικά ΚΣ', 
	'Έλληνες Ποδοσφαιριστές', 
	'Ξένοι Ποδοσφαιριστές', 
	'Έλληνες μπασκετμπολίστες', 
	'Ξένοι μπασκετμπολίστες', 
	'Τενίστες/στριες', 
	'Τίτλοι βιβλίων', 
	'Τραγούδια ΚΣ', 
	'Είδη ψαριών', 
	'Φαγητά', 
	'Βουνά', 
	'Ιστορικές προσωπικότητες', 
	'Ήρωες Καρτούν', 
	'Εργαλεία', 
	'Εφευρέσεις', 
	'Ποτάμια', 
]


// TIMER
var start_timer = function(){
	
	// Set the date we're counting down to
	var start = new Date();
	start.setSeconds(start.getSeconds() + timer_seconds);
	
	
	// if timer is running, stop it
	clearInterval(g_timer)

	// (re)start the explosion effect
	explosion_dot.classList.remove('effect-explosion')
	void explosion_dot.offsetWidth

	
	// (re)start the color effect
	timer_button.classList.remove('effect-change-color')
	// https://css-tricks.com/restart-css-animation/
	// -> triggering reflow /* The actual magic */ to restart the effect
	// without this it wouldn't work. Try uncommenting the line and the transition won't be retriggered.
	// Oops! This won't work in strict mode. Thanks Felis Phasma!
	// element.offsetWidth = element.offsetWidth;
	// Do this instead:
	void timer_button.offsetWidth
	timer_button.classList.add('effect-change-color')
	timer_button.style.animationDuration = timer_seconds + 's'
	



	// Start and update the count down every 1 second
	g_timer = setInterval(function () {
		
		// Get todays date and time
		var now = new Date().getTime();
		
		// Find the distance between now and the count down date
		var distance = start - now;
		
		// Time calculations for seconds
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		
		// Display the result
		timer_button.innerHTML = seconds

		// If the count down is finished, write some text 
		if (distance < 0) {
			clearInterval(g_timer);
			timer_button.innerHTML = 'ΈΧΑΣΕΣ! :(';
			timer_button.style.backgroundColor = 'red'
			// timer_button.classList.add('effect-explosion')
			explosion_dot.classList.add('effect-explosion')

		}
	}, 1000);
	
}




// start the timer
timer_button.addEventListener('click', function() {
	
	// select a random category
	var random_num = Math.floor(Math.random() * categories.length)
	
	// remove the category from the array 
	// so as not to be used again in the same round
	var removed = categories.splice(random_num, 1) 
	document.getElementById('category').innerHTML = removed
	// console.log('random num', random_num)	
	// console.log('categories ', categories)
	// console.log('removed ', removed)

	// reset letters status
	initialize_letters()

	// start the timer
	start_timer()
})

var initialize_letters = function(){
	for (var i = 0; i < letters.length; i++) {
		letters[i].classList.remove('disabled')
	}
}


// when a letter is clicked, 
// disabled it and reset the timer
var toggle_class = function() {
	this.classList.toggle('disabled')
	start_timer()
	
}



// add the same event to all letters
for (var i = 0; i < letters.length; i++) {
	letters[i].addEventListener('click', toggle_class, false)
}
