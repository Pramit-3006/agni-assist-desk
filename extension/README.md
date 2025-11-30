# AGNI Chrome Extension

Your intelligent AI assistant that works everywhere on your desktop - just like Grammarly!

## Features

- 🔥 **Floating Widget**: Always accessible with a draggable red fire bubble
- 💬 **Voice-Powered Chat**: Hands-free interaction with speech recognition and text-to-speech
- 💻 **Code Assistant**: Debug, format, and generate code with syntax highlighting
- ✅ **Smart Tasks**: Task management with notification reminders
- 🔍 **Research Mode**: AI-powered research and information lookup
- ⌨️ **Keyboard Shortcut**: Press `Alt+A` to toggle AGNI on any page
- 🎯 **Context Menu**: Right-click selected text to analyze with AGNI

## Installation Instructions

### For Development (Load Unpacked)

1. **Build the Web App**:
   ```bash
   npm run build
   ```

2. **Prepare Extension Files**:
   - Copy all files from the `extension/` folder
   - Copy the `dist/` folder contents to the extension folder
   - Make sure `manifest.json` is in the root of your extension folder

3. **Load in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)
   - Click "Load unpacked"
   - Select the extension folder

4. **Start Using AGNI**:
   - Click the AGNI icon in your Chrome toolbar
   - Or press `Alt+A` on any webpage to toggle the widget
   - Right-click selected text and choose "Explain with AGNI" or "Analyze Code with AGNI"

### For Production (Chrome Web Store)

To publish AGNI on the Chrome Web Store:

1. **Prepare Extension Package**:
   - Build the app: `npm run build`
   - Copy extension files and dist folder together
   - Create icons in required sizes (16x16, 48x48, 128x128)
   - Zip the extension folder

2. **Create Chrome Web Store Account**:
   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
   - Pay one-time $5 developer registration fee

3. **Upload Extension**:
   - Click "New Item"
   - Upload your zip file
   - Fill in store listing details:
     - Name: AGNI - AI Assistant
     - Description: Your intelligent AI assistant for coding, tasks, research and more
     - Category: Productivity
     - Add screenshots and promotional images
   - Submit for review

4. **Review Process**:
   - Google reviews in 1-3 days
   - Once approved, AGNI will be live on Chrome Web Store

## Features & Usage

### Voice Commands
- Click the microphone button to start voice input
- Toggle auto-speak to have AGNI read responses aloud
- Works offline using browser's built-in speech recognition

### Code Assistant
- Supports 15+ programming languages
- Real-time syntax highlighting with Monaco Editor
- Debug, format, explain, or generate code with AI

### Task Management
- Create tasks with one click
- Set notification reminders (5, 15, 30 min, 1 hour)
- Tasks sync across all your devices

### Research Mode
- AI-powered topic research
- Summarizes key findings
- Provides structured information

## Keyboard Shortcuts

- `Alt+A` - Toggle AGNI widget on any page
- `Enter` - Send message in chat
- `Shift+Enter` - New line in chat

## Privacy & Permissions

AGNI requires these permissions:
- **activeTab**: To inject the widget into web pages
- **storage**: To save your tasks and settings
- **notifications**: To send task reminders
- **host_permissions**: To work on all websites

Your data is processed securely and never shared with third parties.

## Troubleshooting

**Widget not appearing?**
- Check if extension is enabled in `chrome://extensions/`
- Try refreshing the page
- Check if AGNI is enabled in extension settings

**Voice not working?**
- Grant microphone permission when prompted
- Check browser supports Web Speech API (Chrome, Edge)
- Ensure microphone is not being used by another app

**Extension not loading?**
- Verify all files are in the extension folder
- Check manifest.json is valid
- Look for errors in `chrome://extensions/` (click "Errors")

## Support

For issues or feature requests, contact support or visit our documentation.

## Version History

**v1.0.0** (Initial Release)
- Floating draggable widget
- Voice input/output with Web Speech API
- Monaco-powered code editor with 15+ languages
- Task manager with notification reminders
- AI research mode
- Keyboard shortcuts and context menu integration
