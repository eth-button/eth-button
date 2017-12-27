export default function getProvider(global) {
  // mist/metamask
  if (global.web3 !== undefined && global.web3.currentProvider) {
    return global.web3.currentProvider;
  }
  // todo: infura?
  return null;
}
