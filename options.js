const $ = id => document.getElementById(id);
chrome.storage.local.get(['apiKey', 'gateway']).then(s => {
  $('apiKey').value = s.apiKey ?? '';
  $('gateway').checked = !!s.gateway;
});
$('save').onclick = async () => {
  await chrome.storage.local.set({ apiKey: $('apiKey').value.trim(), gateway: $('gateway').checked });
  $('status').textContent = '저장됨';
};
