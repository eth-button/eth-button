export default function getConfig(scriptEl) {
  const address = scriptEl.getAttribute("data-address");
  if (!address) {
    throw new Error("Eth-Button requires a `data-address` attribute!");
  }
  const config = {
    address: address
  };

  return config;
}
