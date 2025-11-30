# 🔥 AGNI Chrome Extension - Complete Setup Guide

## What You've Got

AGNI is now a **fully-featured Chrome extension** that works system-wide on your desktop - just like Grammarly! ✨

### All Features Are Live:

✅ **Voice Input/Output** - Hands-free with Web Speech API  
✅ **Enhanced Code Editor** - Monaco Editor with 15+ languages  
✅ **Research Mode** - AI-powered information lookup  
✅ **Smart Reminders** - Browser notifications for tasks  
✅ **Chrome Extension** - Works on ALL websites  
✅ **Keyboard Shortcut** - Press `Alt+A` anywhere  
✅ **Context Menu** - Right-click text to analyze  

---

## 🚀 Quick Start - Testing the Web App

The web version is already working! Click the floating fire button to test all features:

1. **Voice Chat**: Click the mic button and speak
2. **Code Assistant**: Select "Code" tab, choose a language, paste code
3. **Tasks**: Add tasks and set reminders (click the bell icon)
4. **Research**: Search for any topic

---

## 📦 Installing as Chrome Extension

### Step 1: Build the Project

```bash
npm run build
```

This creates a `dist/` folder with all your compiled app files.

### Step 2: Prepare Extension Folder

Create a new folder called `agni-extension/` and add:

1. Copy all files from the `extension/` folder
2. Copy all files from `public/` folder (including manifest.json)
3. Copy the entire `dist/` folder contents

Your folder structure should look like:
```
agni-extension/
├── manifest.json
├── background.js
├── content.js
├── content.css
├── popup.html
├── icon-16.png (you'll add these)
├── icon-48.png
├── icon-128.png
└── dist/ (all built app files)
```

### Step 3: Create Extension Icons

You need 3 icon sizes. You can:

**Option A**: Use online tool like [Favicon Generator](https://realfavicongenerator.net/)
- Upload a fire emoji image or red circular logo
- Download all sizes

**Option B**: Use this emoji as placeholder:
- Take screenshots of 🔥 emoji at different sizes
- Rename them to icon-16.png, icon-48.png, icon-128.png

**Option C**: Create simple red circle PNGs:
- Use any image editor
- Create red gradient circles at 16×16, 48×48, 128×128

Place all three icons in the `agni-extension/` folder.

### Step 4: Load Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right)
3. Click **"Load unpacked"**
4. Select your `agni-extension/` folder
5. Done! 🎉

---

## 🎮 Using AGNI Extension

### On Any Website:

1. **Press `Alt+A`** - Toggle AGNI widget
2. **Click the widget** - Expand to full panel
3. **Right-click text** - Select "Explain with AGNI" or "Analyze Code"

### From Toolbar:

1. Click AGNI icon in Chrome toolbar
2. Choose from Quick Actions:
   - Quick Chat
   - Code Assistant
   - Task Manager
   - Research Mode

### Tips:

- Widget is draggable - move it anywhere
- Works on ALL websites (even Gmail, GitHub, etc.)
- Your tasks sync across all tabs
- Notifications work even when browser is in background

---

## 🛠️ Advanced Configuration

### Customize Keyboard Shortcut

1. Go to `chrome://extensions/shortcuts`
2. Find "AGNI - AI Assistant"
3. Change `Alt+A` to your preferred shortcut

### Adjust Permissions

Edit `public/manifest.json`:

```json
{
  "host_permissions": [
    "*://github.com/*",    // Only GitHub
    "*://gmail.com/*"      // Only Gmail
  ]
}
```

To work on specific sites instead of all sites.

---

## 📤 Publishing to Chrome Web Store

Want to share AGNI with the world?

### Prerequisites:

1. One-time $5 Chrome Web Store developer registration
2. Google account
3. Extension icons (all 3 sizes)
4. Screenshots for store listing

### Steps:

1. **Create Developer Account**:
   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
   - Pay $5 registration fee

2. **Prepare Package**:
   - Zip your `agni-extension/` folder
   - Ensure all icons are included
   - Test thoroughly in Chrome

3. **Upload & Submit**:
   - Click "New Item" in dashboard
   - Upload zip file
   - Fill in details:
     - **Name**: AGNI - AI Assistant
     - **Summary**: Your intelligent AI assistant with voice, code help, and task management
     - **Category**: Productivity
     - **Screenshots**: Take 3-5 screenshots of AGNI in action

4. **Review**:
   - Google reviews within 1-3 days
   - Once approved, AGNI is live!

---

## 🎯 Feature Highlights

### Voice Commands
- Uses browser's built-in speech recognition
- Works offline
- Auto-speak responses option

### Code Editor
Supports these languages:
- JavaScript, TypeScript, Python
- Java, C++, C#, Go, Rust
- PHP, Ruby, Swift, Kotlin
- HTML, CSS, JSON

### Research Mode
- AI analyzes and summarizes topics
- Provides key findings
- Structured, easy-to-read results

### Task Notifications
- Set reminders for 5, 15, 30 minutes or 1 hour
- Browser notifications even when tab is inactive
- Tasks persist across browser sessions

---

## 🐛 Troubleshooting

### Extension won't load?
- Check all files are in the folder
- Verify `manifest.json` is in root
- Look for errors in `chrome://extensions/` (click "Errors" button)

### Widget not appearing?
- Press `Alt+A` to toggle
- Check extension is enabled
- Refresh the page

### Voice not working?
- Grant microphone permission
- Check browser supports Web Speech API
- Chrome and Edge work best

### Notifications not showing?
- Click "Enable Notifications" in Tasks tab
- Check browser notification settings
- Allow notifications for the site

---

## 🎨 Customization Ideas

### Change Colors

Edit `src/index.css` to change the fire theme:

```css
:root {
  --primary: 0 72% 51%;    /* Red */
  --secondary: 14 100% 57%; /* Orange */
  /* Change these HSL values */
}
```

### Add More Languages

Edit `src/components/EnhancedCodeAssistant.tsx`:

```javascript
const LANGUAGES = [
  "javascript", "typescript", "python",
  "your-language-here"  // Add here
];
```

### Custom Shortcuts

Edit `extension/content.js`:

```javascript
if (e.altKey && e.key === 'a') {  // Change 'a' to your key
```

---

## 📚 Documentation

- **Web Speech API**: [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- **Monaco Editor**: [Microsoft Docs](https://microsoft.github.io/monaco-editor/)
- **Chrome Extensions**: [Developer Guide](https://developer.chrome.com/docs/extensions/)
- **Lovable Cloud**: Built-in AI backend (already configured)

---

## 💡 What Makes AGNI Special

Unlike other AI assistants:

✨ **System-Wide**: Works on ANY website, not just one app  
🎤 **Voice-First**: True hands-free experience  
💻 **Developer-Focused**: Real code editor, not just text  
🔒 **Privacy-Friendly**: Uses browser APIs, minimal data sent  
🚀 **Instant**: No loading, always ready  
🎯 **Context-Aware**: Right-click menu integration  

---

## 🚀 Next Steps

1. **Test Everything**: Try each feature in the web app
2. **Build Extension**: Run `npm run build`
3. **Create Icons**: Use any method above
4. **Load in Chrome**: Test on real websites
5. **Polish**: Customize colors, shortcuts
6. **Publish**: Share with the world!

---

Need help? Check the logs in Chrome DevTools or extension error page.

Happy building! 🔥
