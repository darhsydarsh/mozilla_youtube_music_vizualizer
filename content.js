// YouTube Music Visualizer Content Script
(function() {
    'use strict';
    
    // Cross-browser compatibility
    const browserAPI = typeof browser !== 'undefined' ? browser : chrome;
    
    let visualizerContainer = null;
    let canvas = null;
    let ctx = null;
    let audioContext = null;
    let analyser = null;
    let dataArray = null;
    let bufferLength = null;
    let animationId = null;
    let isVisualizerEnabled = true;
    
    // Initialize the visualizer
    function initializeVisualizer() {
        // Check if we're on YouTube Music
        if (!window.location.hostname.includes('music.youtube.com')) {
            return;
        }
        
        // Load settings from storage
        browserAPI.storage.sync.get(['visualizerEnabled'], function(result) {
            isVisualizerEnabled = result.visualizerEnabled !== false;
            if (isVisualizerEnabled) {
                setupVisualizer();
            }
        });
    }
    
    // Create the visualizer container and canvas
    function createVisualizerElements() {
        // Create container
        visualizerContainer = document.createElement('div');
        visualizerContainer.id = 'youtube-music-visualizer';
        visualizerContainer.className = 'visualizer-container';
        
        // Create canvas
        canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 200;
        canvas.className = 'visualizer-canvas';
        
        visualizerContainer.appendChild(canvas);
        ctx = canvas.getContext('2d');
        
        // Insert the visualizer into the page
        insertVisualizerIntoPage();
    }
    
    // Insert visualizer into the YouTube Music page
    function insertVisualizerIntoPage() {
        // Wait for the page to load properly
        const checkForPlayerBar = setInterval(() => {
            const playerBar = document.querySelector('#layout > ytmusic-player-bar');
            if (playerBar) {
                clearInterval(checkForPlayerBar);
                // Insert above the player bar
                playerBar.parentNode.insertBefore(visualizerContainer, playerBar);
            }
        }, 1000);
    }
    
    // Setup audio context and analyzer
    function setupAudioAnalysis() {
        try {
            // Create audio context
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);
            
            // Find the audio element
            const audioElement = document.querySelector('audio');
            if (audioElement) {
                const source = audioContext.createMediaElementSource(audioElement);
                source.connect(analyser);
                analyser.connect(audioContext.destination);
                return true;
            }
        } catch (error) {
            console.log('Audio analysis setup failed:', error);
        }
        return false;
    }
    
    // Main visualizer setup
    function setupVisualizer() {
        // Create visualizer elements
        createVisualizerElements();
        
        // Setup audio analysis with retry mechanism
        const setupAudio = () => {
            if (!setupAudioAnalysis()) {
                // Retry after 2 seconds if audio element not found
                setTimeout(setupAudio, 2000);
                return;
            }
            
            // Start the visualization
            startVisualization();
        };
        
        // Start setup with a delay to ensure page is loaded
        setTimeout(setupAudio, 3000);
    }
    
    // Visualization animation loop
    function visualize() {
        if (!isVisualizerEnabled || !analyser || !ctx) {
            return;
        }
        
        animationId = requestAnimationFrame(visualize);
        
        // Get frequency data
        analyser.getByteFrequencyData(dataArray);
        
        // Clear canvas
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw frequency bars
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;
        
        for (let i = 0; i < bufferLength; i++) {
            barHeight = (dataArray[i] / 255) * canvas.height * 0.8;
            
            // Create gradient colors
            const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
            gradient.addColorStop(0, `hsl(${(i * 2) % 360}, 70%, 60%)`);
            gradient.addColorStop(1, `hsl(${(i * 2) % 360}, 90%, 40%)`);
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            
            x += barWidth + 1;
        }
    }
    
    // Start visualization
    function startVisualization() {
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume();
        }
        visualize();
    }
    
    // Stop visualization
    function stopVisualization() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }
    
    // Toggle visualizer
    function toggleVisualizer(enabled) {
        isVisualizerEnabled = enabled;
        if (visualizerContainer) {
            visualizerContainer.style.display = enabled ? 'block' : 'none';
        }
        
        if (enabled) {
            startVisualization();
        } else {
            stopVisualization();
        }
        
        // Save setting
        browserAPI.storage.sync.set({ visualizerEnabled: enabled });
    }
    
    // Listen for messages from popup
    browserAPI.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === 'toggleVisualizer') {
            toggleVisualizer(message.enabled);
            sendResponse({ success: true });
        }
    });
    
    // Handle page navigation
    let currentUrl = window.location.href;
    const observer = new MutationObserver(() => {
        if (currentUrl !== window.location.href) {
            currentUrl = window.location.href;
            // Reinitialize on navigation
            setTimeout(initializeVisualizer, 2000);
        }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Initialize when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeVisualizer);
    } else {
        initializeVisualizer();
    }
})();