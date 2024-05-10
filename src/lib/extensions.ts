export async function executeScriptOnActiveTab<T>(func: () => void): Promise<T | undefined> {
  const [tab] = await chrome.tabs.query({ active: true })
  if (tab && tab.id) {
    const [result] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: func,
    })
    return result.result as T
  }
  return undefined;
}