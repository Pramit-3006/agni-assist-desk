// Content script - Injects AGNI into web pages

(function() {
  'use strict';

  // Check if already injected
  if (window.__AGNI_INJECTED__) {
    return;
  }
  window.__AGNI_INJECTED__ = true;

  console.log('AGNI: Content script loaded');

  // Create root container for AGNI widget
  const agniRoot = document.createElement('div');
  agniRoot.id = 'agni-extension-root';
  agniRoot.style.cssText = `
    position: fixed;
    z-index: 2147483647;
    pointer-events: none;
  `;
  document.body.appendChild(agniRoot);

  // Create iframe for isolated environment
  const iframe = document.createElement('iframe');
  iframe.id = 'agni-iframe';
  iframe.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 80px;
    height: 80px;
    border: none;
    border-radius: 50%;
    z-index: 2147483647;
    pointer-events: auto;
    box-shadow: 0 8px 32px rgba(255, 0, 0, 0.3);
  `;
  
  // Load AGNI app in iframe
  iframe.src = chrome.runtime.getURL('popup.html');
  agniRoot.appendChild(iframe);

  // Communication between page and AGNI
  let isExpanded = false;

  window.addEventListener('message', (event) => {
    if (event.data.type === 'AGNI_TOGGLE') {
      isExpanded = !isExpanded;
      
      if (isExpanded) {
        iframe.style.width = '450px';
        iframe.style.height = '600px';
        iframe.style.borderRadius = '16px';
      } else {
        iframe.style.width = '80px';
        iframe.style.height = '80px';
        iframe.style.borderRadius = '50%';
      }
    }
    
    if (event.data.type === 'AGNI_RESIZE') {
      iframe.style.width = event.data.width;
      iframe.style.height = event.data.height;
    }
  });

  // Listen for context menu actions
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'CONTEXT_MENU_CLICK') {
      // Forward to iframe
      iframe.contentWindow.postMessage({
        type: 'CONTEXT_ACTION',
        action: request.action,
        text: request.selectedText
      }, '*');
      
      // Expand AGNI if collapsed
      if (!isExpanded) {
        window.postMessage({ type: 'AGNI_TOGGLE' }, '*');
      }
    }
  });

  // Keyboard shortcut: Alt+A to toggle AGNI
  document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 'a') {
      e.preventDefault();
      window.postMessage({ type: 'AGNI_TOGGLE' }, '*');
    }
  });

  console.log('AGNI: Widget injected. Press Alt+A to toggle.');
})();
