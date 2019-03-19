var letters = document.getElementsByClassName('grid-item')
var timer = document.getElementById('timer')
var timer_button = document.getElementById('timer_button')
var g_timer = null //global timer


// TIMER
var start_timer = function(){
	
	// Set the date we're counting down to
	var start = new Date();
	start.setSeconds(start.getSeconds() + 11);
	
	
	// if timer is running, stop it
	clearInterval(g_timer)


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
			timer_button.innerHTML = 'KABOOM!';
		}
	}, 1000);
	
}

// start the timer
timer_button.addEventListener('click', start_timer)

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