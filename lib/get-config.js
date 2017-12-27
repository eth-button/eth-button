export default function getConfig(scriptEl) {
  const account = scriptEl.getAttribute("data-account");
  if (!account) {
    throw new Error("Eth-Button requires a `data-account` attribute!");
  }
  const config = {
    account: account
  };

  return config;
}
