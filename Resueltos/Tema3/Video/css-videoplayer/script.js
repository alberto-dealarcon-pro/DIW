window.onload = function() {

	// Video
	var latch=false;
	var time=0;
	var video = document.getElementById("video");

	// Buttons
	var playButton = document.getElementById("play-pause");
	var muteButton = document.getElementById("mute");
	var fullScreenButton = document.getElementById("full-screen");

	// Sliders
	var seekBar = document.getElementById("seek-bar");
	var volumeBar = document.getElementById("volume-bar");


	// Event listener for the play/pause button
	playButton.addEventListener("click", function() {
		if (video.paused == true) {
			// Play the video
			video.play();

			// Update the button text to 'Pause'
			playButton.innerHTML = "Pause";
		} else {
			// Pause the video
			video.pause();

			// Update the button text to 'Play'
			playButton.innerHTML = "Play";
		}
	});


	// Event listener for the mute button
	muteButton.addEventListener("click", function() {
		if (video.muted == false) {
			// Mute the video
			video.muted = true;

			// Update the button text
			muteButton.innerHTML = "Unmute";
		} else {
			// Unmute the video
			video.muted = false;

			// Update the button text
			muteButton.innerHTML = "Mute";
		}
	});


	// Event listener for the full-screen button
	fullScreenButton.addEventListener("click", function() {
		if (video.requestFullscreen) {
			video.requestFullscreen();
		} else if (video.mozRequestFullScreen) {
			video.mozRequestFullScreen(); // Firefox
		} else if (video.webkitRequestFullscreen) {
			video.webkitRequestFullscreen(); // Chrome and Safari
		}
	});

	seekBar.addEventListener("click", function() {
		console.log("Click");
		time = video.duration * (seekBar.value / 100);
		console.log("después de esperar");
		video.currentTime = time;
		var value =(100 / video.duration) * time;
			// Update the slider value
		seekBar.value = value;		
	});
	seekBar.addEventListener("mouseup", function() {
		console.log("Click");
		time = video.duration * (seekBar.value / 100);
		console.log("después de esperar");
		video.currentTime = time;
		var value =(100 / video.duration) * time;
			// Update the slider value
		seekBar.value = value;		
	});


	// Event listener for the seek bar
	seekBar.addEventListener("change", function() {
		console.log("Change");
		// Calculate the new time
		//var time = video.duration * (seekBar.value / 100);
		//video.currentTime = time;
	});
	
	
	
	// Update the seek bar as the video plays
	video.addEventListener("timeupdate", function() {
		console.log("Time update");
		// Calculate the slider value
		time = video.currentTime;
		var value =(100 / video.duration) * time;
		// Update the slider value
		seekBar.value = value;
	});

	// Pause the video when the seek handle is being dragged
	seekBar.addEventListener("mousedown", function() {
		video.pause();
	});

	// Play the video when the seek handle is dropped
	seekBar.addEventListener("mouseup", function() {
		video.play();
	});

	// Event listener for the volume bar
	volumeBar.addEventListener("change", function() {
		// Update the video volume
		video.volume = volumeBar.value;
	});
}