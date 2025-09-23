// YouTube Music Visualizer Background Script
chrome.runtime.onInstalled.addListener(() => {
    // Set default settings
    chrome.storage.sync.set({
        visualizerEnabled: true
    });
    
    console.log('YouTube Music Visualizer extension installed');
});

// Handle messages from content script and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getSettings') {
        chrome.storage.sync.get(['visualizerEnabled'], (result) => {
            sendResponse({
                visualizerEnabled: result.visualizerEnabled !== false
            });
        });
        return true; // Keep message channel open for async response
    }
});

// Update icon based on current tab
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        if (tab.url.includes('music.youtube.com')) {
            // Enable icon when on YouTube Music
            chrome.browserAction.enable(tabId);
        } else {
            // Disable icon when not on YouTube Music
            chrome.browserAction.disable(tabId);
        }
    }
});

// Handle tab activation
chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        if (tab.url && tab.url.includes('music.youtube.com')) {
            chrome.browserAction.enable(activeInfo.tabId);
        } else {
            chrome.browserAction.disable(activeInfo.tabId);
        }
    });
});