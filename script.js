document.addEventListener('DOMContentLoaded', () => {
    // Background Music - ensure it plays
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic) {
        bgMusic.volume = 0.5; // Set volume to 50%
        // Try to play, if blocked by browser, play on first user interaction
        bgMusic.play().catch(() => {
            document.body.addEventListener('click', () => {
                bgMusic.play();
            }, { once: true });
        });
    }

    // Typewriter Animation
    const poems = [
        "Roses are red Violets are fine — Will you be mine..!",
        "Roses are red, violets are blue — Valentine's Day's better with you.",
        "Roses are red, violets are fine — One little question… will you be mine?",
        "Roses are red, hearts go boom — You + me = Shaka Laka Boom Boom.",
        "Roses are red, romance is true — This poem exists because of you.",
        "Roses are red, no need to pretend — Be my Valentine till the end?",
        "Roses are red, lips taste divine — Careful… you might end up mine.",
        "Roses are red, hearts misbehave — Be mine tonight… if you're brave.",
        "Roses are red, chemistry's tight — Be my Valentine… all day, all night."
    ];

    let poemIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterElement = document.getElementById('typewriter-text');
    const typingSpeed = 50;
    const deletingSpeed = 30;
    const pauseBeforeDelete = 2000;
    const pauseBeforeNext = 500;

    function typeWriter() {
        const currentPoem = poems[poemIndex];

        if (!isDeleting && charIndex <= currentPoem.length) {
            typewriterElement.textContent = currentPoem.substring(0, charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else if (!isDeleting && charIndex > currentPoem.length) {
            setTimeout(() => {
                isDeleting = true;
                typeWriter();
            }, pauseBeforeDelete);
        } else if (isDeleting && charIndex > 0) {
            typewriterElement.textContent = currentPoem.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeWriter, deletingSpeed);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            poemIndex = (poemIndex + 1) % poems.length;
            setTimeout(typeWriter, pauseBeforeNext);
        }
    }

    // Start typewriter animation
    typeWriter();

    // 1. Parse URL Parameters for Personalization
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');

    // Elements
    const nameContainer = document.getElementById('name-container');
    const successHeading = document.getElementById('success-heading');
    const celebrateMessage = document.getElementById('celebrate-message');

    // Personalization Logic
    if (name && name.trim() !== '') {
        nameContainer.innerHTML = `<span class="bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 bg-clip-text text-transparent animated-text">${name}</span>, Can I be yours this <span class="bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 bg-clip-text text-transparent animated-text">Valentine's Day</span>?`;
        // Update success heading with name - styled with gradient and hearts
        if (successHeading) {
            successHeading.innerHTML = `
                <div style="display: flex; justify-content: center; gap: 15px; margin-bottom: 10px; font-size: 2.5rem;">
                    <span style="color: #f472b6;">❣️</span>
                    <span style="color: #ec4899;">❤️</span>
                    <span style="color: #f472b6;">❣️</span>
                </div>
                Yayyy <span class="bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 bg-clip-text text-transparent animated-text" style="font-size: 2.8rem;">${name}</span>! 🎉
            `;
        }
        // Update celebrate message with name
        if (celebrateMessage) {
            celebrateMessage.innerHTML = `
                <p style="color: #db2777; font-weight: 700; font-size: 1.3rem; margin: 0;">
                    Can't wait to celebrate with you, <span class="bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 bg-clip-text text-transparent animated-text" style="font-size: 1.4rem; font-weight: 900;">${name}</span>! 🌹
                </p>
            `;
        }
    }

    // 2. Button Logic
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const questionCard = document.getElementById('question-card');
    const successContent = document.getElementById('success-content');

    // Messages for No button
    const noMessages = [
        "Absolutely not, your honor", "My lawyers said no", "System says YES only", "That button is broken",
        "Destiny says nope", "Just click Yes Darling", "You know you want to", "Nice try",
        "Not happening",
        "You missed",
        "Wrong choice 😏",
        "Think again",
        "Chase me 😘",
        "You like the chase, huh?",
        "Almost convinced",
        "Getting warmer 🔥",
        "Not yet, sweetheart",
        "Keep trying, cutie 😉",
        "You’re persistent… I like that",
        "Flirt harder",
        "I’m blushing",
        "You’re dangerous",
        "You know I’m worth it",
        "Earn it 😌",
        "Try a little charm",
        "Make me melt",
        "You’re doing great",
        "One more try 😘",
        "I’m enjoying this",
        "You’re making this hard",
        "Okay… maybe",
        "You’re irresistible",
        "Don’t stop now",
        "Stop resisting", "Our Fate has spoken", "No is not an option", "Plot twist: YES",
        "Give up", "Still chasing me?", "Be brave..! click Yes", "You can't escape love",
        "This feels illegal", "I refuse to cooperate",
        "Emotional damage", "Try harder, Juliet", "I choose You",
        "Nice try",
        "Not happening", "You missed", "Almost had it", "Wrong choice", "Think again",
        "Playing hard to get", "Chase me", "Make me say yes", "Almost convinced",
        "Getting warmer", "Not yet, sweetheart", "Keep trying, cutie",
        "You're persistent… I like that", "I'm blushing", "You're dangerous",
        "Earn it", "Make me melt", "You're doing great", "One more try",
        "Okay… maybe", "You're irresistible", "Don't stop now", "You're close",
        "You're breaking my heart ;(", "Plsss? :(", "I'm running away dramatically", "Catch me if you can"
    ];

    let messageIndex = 0;

    // 💕 Create Heart Trail Effect (instead of smoke)
    function createHeartTrail(x, y) {
        const hearts = ['💕', '💗', '💖', '💘', '❤️', '💓'];
        const heart = document.createElement('div');
        heart.classList.add('heart-trail');
        heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1500);
    }

    // Roaming Logic - SMOOTH & SLOW
    function moveButton() {
        const btnRect = noBtn.getBoundingClientRect();
        createHeartTrail(btnRect.left + btnRect.width / 2, btnRect.top + btnRect.height / 2);

        const cardRect = questionCard.getBoundingClientRect();
        const padding = 30;

        const maxX = cardRect.width - btnRect.width - padding;
        const maxY = cardRect.height - btnRect.height - padding;

        const randomX = Math.random() * (maxX - padding) + padding;
        const randomY = Math.random() * (maxY - padding) + padding;

        // Apply with smooth transition (CSS handles easing)
        noBtn.style.position = 'absolute';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
        noBtn.style.zIndex = '50';

        // Add tilt/shake animation
        noBtn.classList.add('shake');
        setTimeout(() => noBtn.classList.remove('shake'), 600);

        updateNoText();
    }

    function updateNoText() {
        noBtn.innerText = noMessages[messageIndex];
        messageIndex = (messageIndex + 1) % noMessages.length;
    }

    // No Button Interactions - WITH DELAY
    let hoverTimeout;
    noBtn.addEventListener('mouseover', () => {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => moveButton(), 600); // 800ms delay - gives time to read
    });
    noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); moveButton(); });
    noBtn.addEventListener('click', (e) => { e.preventDefault(); moveButton(); });

    // Yes Button Click Handler
    yesBtn.addEventListener('click', () => {
        let curtain = document.querySelector('.curtain');
        if (!curtain) {
            curtain = document.createElement('div');
            curtain.classList.add('curtain');
            document.body.appendChild(curtain);
        }

        setTimeout(() => curtain.classList.add('active'), 10);

        // SLOWER TRANSITION
        setTimeout(() => {
            questionCard.style.display = 'none';
            successContent.classList.remove('hidden');
            successContent.style.display = 'block';
            curtain.classList.remove('active');

            // Start INFINITE celebrations!
            triggerInfiniteCelebration();
            spawnBalloons();
        }, 1200); // Match slower curtain
    });

    // 🎊 INFINITE Celebration with Variety
    function triggerInfiniteCelebration() {
        const colors = [
            ['#ff6b6b', '#ee5a24'], // Red
            ['#feca57', '#ff9ff3'], // Yellow-Pink
            ['#48dbfb', '#a29bfe'], // Blue-Purple
            ['#ff9ff3', '#f368e0'], // Pink shades
        ];

        function fireConfetti() {
            const colorSet = colors[Math.floor(Math.random() * colors.length)];

            // Side bursts
            confetti({
                particleCount: Math.floor(Math.random() * 50) + 30,
                angle: Math.random() * 60 + 60,
                spread: Math.random() * 50 + 50,
                origin: { x: 0, y: Math.random() },
                colors: colorSet
            });
            confetti({
                particleCount: Math.floor(Math.random() * 50) + 30,
                angle: Math.random() * 60 + 60,
                spread: Math.random() * 50 + 50,
                origin: { x: 1, y: Math.random() },
                colors: colorSet
            });

            // Center burst occasionally
            if (Math.random() > 0.7) {
                confetti({
                    particleCount: 100,
                    spread: 100,
                    origin: { x: 0.5, y: 0.5 },
                    colors: colorSet
                });
            }
        }

        // Initial massive burst
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });

        // Infinite loop with random intervals
        setInterval(() => fireConfetti(), Math.random() * 2000 + 1000);
    }

    // 🎈 Spawn Floating Balloons
    function spawnBalloons() {
        const balloonEmojis = ['🎈', '🎈', '🎈', '💜', '❤️', '💖'];

        function createBalloon() {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            balloon.innerText = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
            balloon.style.left = `${Math.random() * 100}vw`;
            balloon.style.animationDuration = `${Math.random() * 5 + 6}s`;
            document.body.appendChild(balloon);

            setTimeout(() => balloon.remove(), 12000);
        }

        // Create balloons periodically
        setInterval(createBalloon, 800);
        // Initial batch
        for (let i = 0; i < 10; i++) {
            setTimeout(createBalloon, i * 150);
        }
    }
});
