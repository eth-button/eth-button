const QUERY = 'script[data-meta="eth-button"]';

export default function getSelf(global) {
  const scriptEls = global.document.querySelectorAll(QUERY);
  return scriptEls[scriptEls.length - 1];
}
