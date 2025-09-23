# YouTube Music Visualizer

A beautiful Firefox extension that adds audio visualizations to your YouTube Music listening experience. Transform your music into stunning visual displays with real-time frequency analysis and colorful animations.

## Features

- **Real-time Audio Visualization**: Dynamic frequency bars that respond to your music
- **Beautiful Gradients**: Colorful, animated visualizations that enhance your listening experience
- **Easy Toggle**: Simple on/off control through the extension popup
- **Responsive Design**: Adapts to different screen sizes and YouTube Music layouts
- **Minimal Performance Impact**: Optimized for smooth playback without interrupting your music

## Installation

### For Development/Testing

1. **Clone or Download** this repository:
   ```bash
   git clone https://github.com/darhsydarsh/mozilla_youtube_music_vizualizer.git
   ```

2. **Open Firefox** and navigate to `about:debugging`

3. **Click** "This Firefox" in the left sidebar

4. **Click** "Load Temporary Add-on..."

5. **Navigate** to the extension folder and select the `manifest.json` file

6. The extension will be loaded temporarily and will appear in your toolbar

### For Permanent Installation

1. The extension will need to be packaged and submitted to Mozilla Add-ons (AMO) for permanent installation
2. Once approved, users can install it directly from the Firefox Add-ons store

## Usage

1. **Navigate** to [YouTube Music](https://music.youtube.com)
2. **Start playing** any song
3. The visualizer will automatically appear above the player controls
4. **Click the extension icon** in the toolbar to toggle the visualizer on/off
5. **Enjoy** your music with beautiful visual effects!

## How It Works

The extension uses the Web Audio API to analyze the frequency data from YouTube Music's audio stream. It creates a visual representation using HTML5 Canvas with:

- **Frequency Analysis**: Real-time FFT analysis of the audio stream
- **Dynamic Rendering**: Smooth 60fps animations using requestAnimationFrame
- **Color Gradients**: HSL color space for vibrant, music-responsive colors
- **Responsive Bars**: Bar heights correspond to different frequency ranges

## Technical Details

- **Manifest Version**: 2 (Firefox compatible)
- **Permissions**: Limited to YouTube Music domain only
- **Content Script**: Injects visualizer into YouTube Music pages
- **Background Script**: Manages extension state and settings
- **Storage**: Saves user preferences using Firefox's storage API

## Files Structure

```
mozilla_youtube_music_vizualizer/
├── manifest.json           # Extension configuration
├── content.js             # Main visualizer logic
├── background.js          # Extension background processes
├── popup.html            # Extension popup interface
├── popup.js              # Popup functionality
├── popup.css             # Popup styling
├── visualizer.css        # Visualizer styling
├── icons/
│   └── icon.svg          # Extension icon
├── create-icons.html     # Icon generator tool
└── README.md            # This file
```

## Browser Compatibility

- **Firefox**: Version 60+ (manifest v2 support)
- **Chrome/Edge**: Compatible with minor manifest adjustments

## Privacy & Permissions

This extension:
- ✅ Only accesses YouTube Music pages
- ✅ Stores minimal settings locally
- ✅ Does not collect or transmit user data
- ✅ Does not require microphone access
- ✅ Works entirely client-side

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your improvements
4. Test thoroughly on YouTube Music
5. Submit a pull request

## Known Issues

- Visualizer may take a few seconds to initialize on page load
- Requires user interaction to start audio context (browser security feature)
- Some ad-blockers may interfere with audio analysis

## Roadmap

- [ ] Multiple visualization modes (bars, circle, waveform)
- [ ] Customizable colors and themes
- [ ] Beat detection and rhythm sync
- [ ] Fullscreen visualization mode
- [ ] Export visualization as video

## License

MIT License - Feel free to use and modify as needed.

## Support

If you encounter any issues or have suggestions:
1. Check the [Issues](https://github.com/darhsydarsh/mozilla_youtube_music_vizualizer/issues) page
2. Create a new issue with detailed information
3. Include your Firefox version and steps to reproduce

---

Enjoy your music with beautiful visualizations! 🎵✨
