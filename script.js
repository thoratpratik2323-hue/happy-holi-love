document.addEventListener('DOMContentLoaded', () => {
    const canvasContainer = document.getElementById('canvas-container');
    const playBtn = document.getElementById('playBtn');

    // Vibrant Holi Colors Palette (Pink, Yellow, Orange, Green, Blue, Purple)
    const holiColors = [
        '#FF1493', // Deep Pink
        '#FF4500', // Orange Red
        '#FFD700', // Gold / Yellow
        '#00FF00', // Lime
        '#00BFFF', // Deep Sky Blue
        '#9400D3', // Dark Violet
        '#FF00FF', // Magenta
        '#32CD32', // Lime Green
        '#FF69B4', // Hot Pink
        '#8A2BE2'  // Blue Violet
    ];

    // Function to create a splash effect at x, y
    function createSplash(x, y) {
        // Random color
        const color = holiColors[Math.floor(Math.random() * holiColors.length)];

        // Number of blobs for a single splash to make it look organic
        const blobs = Math.floor(Math.random() * 5) + 3; // 3 to 7 blobs per click

        for (let i = 0; i < blobs; i++) {
            const blob = document.createElement('div');
            blob.classList.add('splash');

            // Randomize position slightly around the click center
            const offsetX = (Math.random() - 0.5) * 100;
            const offsetY = (Math.random() - 0.5) * 100;

            // Randomize size heavily (from 50px to 300px)
            const size = Math.random() * 250 + 50;

            // Randomize blur for a dusty/powdery effect
            const blur = Math.random() * 30 + 10;

            // Set styles
            blob.style.left = `${x + offsetX}px`;
            blob.style.top = `${y + offsetY}px`;
            blob.style.width = `${size}px`;
            blob.style.height = `${size}px`;
            blob.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
            blob.style.filter = `blur(${blur}px)`;

            // Some blobs get higher opacity
            if (Math.random() > 0.5) {
                blob.style.opacity = Math.random() * 0.5 + 0.5;
            }

            canvasContainer.appendChild(blob);

            // Optional: remove them after animation if we want it to clean up
            // setTimeout(() => blob.remove(), 20000); 
        }
    }

    const bgMusic = document.getElementById('bgMusic');
    let hasStartedMusic = false;

    function playMusic() {
        if (!hasStartedMusic && bgMusic) {
            bgMusic.play().catch(err => console.log(err));
            hasStartedMusic = true;
        }
    }

    // Interactive clicking everywhere on the document
    document.addEventListener('click', (e) => {
        playMusic();
        // Don't splash if they click the button itself
        if (e.target.id === 'playBtn' || e.target.closest('.content') && e.target.tagName !== 'BUTTON') {
            // let the button handle it separately, or just splash behind it
        }
        createSplash(e.clientX, e.clientY);
    });

    // Touch support for mobile phones (if she checks it on phone!)
    document.addEventListener('touchstart', (e) => {
        playMusic();
        for (let i = 0; i < e.touches.length; i++) {
            createSplash(e.touches[i].clientX, e.touches[i].clientY);
        }
    });

    // Handle button click for a giant center splash explosion
    playBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent document click from firing twice

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Big explosion!
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const randomX = centerX + (Math.random() - 0.5) * window.innerWidth;
                const randomY = centerY + (Math.random() - 0.5) * window.innerHeight;
                createSplash(randomX, randomY);
            }, i * 50); // cascading explosion
        }

        playBtn.innerText = 'Keep Tapping Everywhere!';
    });
});
