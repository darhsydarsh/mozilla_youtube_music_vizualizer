# Installation Guide - YouTube Music Visualizer

## Quick Installation (Development Mode)

### Firefox Installation

1. **Download** or clone this repository to your computer
2. **Open Firefox** browser
3. **Type** `about:debugging` in the address bar and press Enter
4. **Click** "This Firefox" in the left sidebar
5. **Click** "Load Temporary Add-on..." button
6. **Navigate** to the downloaded folder and select `manifest.json`
7. **Click** "Open"
8. The extension is now installed and ready to use!

### How to Use

1. **Go to** [YouTube Music](https://music.youtube.com)
2. **Play** any song
3. **Look for** the visualizer appearing above the player controls
4. **Click** the extension icon in your toolbar to toggle on/off

## Troubleshooting

### Visualizer Not Showing?
- Make sure you're on music.youtube.com (not regular youtube.com)
- Try refreshing the page after loading a song
- Check that the extension is enabled in the popup

### No Audio Visualization?
- Click anywhere on the page first (browsers require user interaction for audio)
- Make sure the song is actually playing
- Try pausing and playing the song again

### Extension Icon Grayed Out?
- The extension only works on YouTube Music pages
- Navigate to music.youtube.com to activate it

## For Advanced Users

### Loading from Source
```bash
# Clone the repository
git clone https://github.com/darhsydarsh/mozilla_youtube_music_vizualizer.git

# Navigate to the folder
cd mozilla_youtube_music_vizualizer

# Follow Firefox installation steps above
```

### Packaging for Distribution
```bash
# Create a ZIP file with all extension files (excluding .git)
zip -r youtube-music-visualizer.zip . -x "*.git*" "INSTALL.md" "create-icons.html"
```

## Permissions Explained

This extension requires:
- **Access to music.youtube.com**: To inject the visualizer into YouTube Music pages
- **Active Tab**: To communicate between the popup and the content script  
- **Storage**: To remember your on/off preference

## Need Help?

- Check the main [README.md](README.md) for more details
- Report issues on [GitHub Issues](https://github.com/darhsydarsh/mozilla_youtube_music_vizualizer/issues)
- Make sure you're using Firefox 60 or later