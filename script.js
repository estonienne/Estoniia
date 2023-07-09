const buttons = document.querySelectorAll('.video-btn');
const overlay = document.getElementById('video-overlay');

// Function to adjust video size
function adjustVideoSize() {
    let video = overlay.querySelector('video');
    if (video) {
        let aspectRatio = video.videoWidth / video.videoHeight;
        let newWidth = window.innerHeight * aspectRatio;
        video.style.width = newWidth + 'px';
        video.style.height = '100%';
    }
}

// Listen for resize events
window.addEventListener('resize', adjustVideoSize);

// Close the video when overlay is clicked
overlay.addEventListener('click', (event) => {
    let video = overlay.querySelector('video');
    let player = videojs(video);
    if (event.target === overlay || event.target === video) {
        player.pause();
        overlay.style.animation = 'fade-out 1s';
        setTimeout(() => {
            overlay.style.display = 'none';
            overlay.style.animation = 'fade-in 1s';
        }, 1000);
    }
});

// Same event for touchstart to handle mobile interactions
overlay.addEventListener('touchstart', (event) => {
    let video = overlay.querySelector('video');
    let player = videojs(video);
    if (event.target === overlay || event.target === video) {
        player.pause();
        overlay.style.animation = 'fade-out 1s';
        setTimeout(() => {
            overlay.style.display = 'none';
            overlay.style.animation = 'fade-in 1s';
        }, 1000);
    }
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        let videoSrc = button.getAttribute('data-video');
        
        // Create new video element
        let video = document.createElement('video');
        video.className = 'video-js vjs-default-skin';
        video.autoplay = true;
        video.muted = false;

        // Create source for the video element
        let source = document.createElement('source');
        source.src = videoSrc;
        source.type = 'video/mp4';

        // Append source to video
        video.appendChild(source);

        // Append video to overlay
        overlay.innerHTML = ''; // Clear any existing video
        overlay.appendChild(video);

        // Initialize video.js on the new video element
        let player = videojs(video, { controls: false });

        // Display the overlay
        overlay.style.display = 'flex';

        // Adjust the video size
        adjustVideoSize();

        // Handle end of video
        player.on('ended', function() {
            overlay.style.animation = 'fade-out 1s';
            setTimeout(() => {
                overlay.style.display = 'none';
                overlay.style.animation = 'fade-in 1s';
            }, 1000);
        });
    });
});
