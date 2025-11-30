// Background service worker for AGNI Chrome Extension

// Listen for extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('AGNI Extension installed');
  
  // Set default settings
  chrome.storage.sync.set({
    enabled: true,
    autoSpeak: false,
    theme: 'dark'
  });
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_SETTINGS') {
    chrome.storage.sync.get(['enabled', 'autoSpeak', 'theme'], (settings) => {
      sendResponse(settings);
    });
    return true; // Will respond asynchronously
  }
  
  if (request.type === 'UPDATE_SETTINGS') {
    chrome.storage.sync.set(request.settings, () => {
      sendResponse({ success: true });
    });
    return true;
  }
  
  if (request.type === 'SHOW_NOTIFICATION') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon-128.png',
      title: request.title,
      message: request.message
    });
  }
});

// Create context menu for quick access
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'agni-explain',
    title: 'Explain with AGNI',
    contexts: ['selection']
  });
  
  chrome.contextMenus.create({
    id: 'agni-code',
    title: 'Analyze Code with AGNI',
    contexts: ['selection']
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'agni-explain' || info.menuItemId === 'agni-code') {
    chrome.tabs.sendMessage(tab.id, {
      type: 'CONTEXT_MENU_CLICK',
      action: info.menuItemId,
      selectedText: info.selectionText
    });
  }
});
