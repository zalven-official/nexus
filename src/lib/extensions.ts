export async function executeScriptOnActiveTab(func: () => void) {
  const [tab] = await chrome.tabs.query({ active: true });
  if (tab && tab.id) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: func,
    });
  }
}