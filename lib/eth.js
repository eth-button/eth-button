import BigNumber from "bignumber.js";

const ETHER = new BigNumber("1000000000000000000");

export function formatWei(amount) {
  const bn = new BigNumber(amount).times(ETHER).floor();
  return "0x" + bn.toString(16);
}
