const corsProxyUrl = 'https://corsproxy.io/?';

// Replace window.fetch
const originalFetch = window.fetch;
window.fetch = async function(url, options) {
  // Modify the URL to use the CORS proxy
  const proxiedUrl = corsProxyUrl + url;

  // Call the original fetch function with the modified URL
  return originalFetch(proxiedUrl, options);
};

// Replace window.XMLHttpRequest
const originalXMLHttpRequest = window.XMLHttpRequest;
window.XMLHttpRequest = function() {
  const xhr = new originalXMLHttpRequest();

  // Override the open method to modify the URL
  xhr.open = function(method, url) {
    const proxiedUrl = corsProxyUrl + url;
    xhr.openOriginal(method, proxiedUrl);
  };

  return xhr;
};