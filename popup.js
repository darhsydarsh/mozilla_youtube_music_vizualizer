// Popup JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Cross-browser compatibility
    const browserAPI = typeof browser !== 'undefined' ? browser : chrome;
    
    const visualizerToggle = document.getElementById('visualizerToggle');
    const githubLink = document.getElementById('githubLink');
    
    // Load current settings
    browserAPI.storage.sync.get(['visualizerEnabled'], (result) => {
        visualizerToggle.checked = result.visualizerEnabled !== false;
    });
    
    // Handle toggle change
    visualizerToggle.addEventListener('change', () => {
        const enabled = visualizerToggle.checked;
        
        // Save setting
        browserAPI.storage.sync.set({ visualizerEnabled: enabled });
        
        // Send message to content script
        browserAPI.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0] && tabs[0].url.includes('music.youtube.com')) {
                browserAPI.tabs.sendMessage(tabs[0].id, {
                    action: 'toggleVisualizer',
                    enabled: enabled
                }, (response) => {
                    if (browserAPI.runtime.lastError) {
                        console.log('Content script not ready yet');
                    }
                });
            }
        });
    });
    
    // Handle GitHub link
    githubLink.addEventListener('click', (e) => {
        e.preventDefault();
        browserAPI.tabs.create({
            url: 'https://github.com/darhsydarsh/mozilla_youtube_music_vizualizer'
        });
        window.close();
    });
    
    // Check if we're on YouTube Music
    browserAPI.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0] && !tabs[0].url.includes('music.youtube.com')) {
            // Show message that extension only works on YouTube Music
            const info = document.querySelector('.info');
            info.innerHTML = `
                <p style="color: #ff6b6b;">⚠️ Please navigate to music.youtube.com to use the visualizer.</p>
                <p class="note">The visualizer only works on YouTube Music pages.</p>
            `;
            visualizerToggle.disabled = true;
        }
    });
});