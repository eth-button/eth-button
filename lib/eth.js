import BigNumber from "bignumber.js";

const ETHER = new BigNumber("1000000000000000000");

function format(amount) {
  const bn = new BigNumber(amount).times(ETHER).floor();
  return "0x" + bn.toString(16);
}

function getAccounts(rpc) {
  return rpc.sendAsync({
    method: "eth_accounts"
  });
}

function sendTransaction(rpc, from, to, amount, options) {
  options = options || {};
  const params = {
    from: from,
    to: to,
    value: format(amount)
  };
  if (options.gas) {
    params.gas = options.gas;
  }
  if (options.gasPrice) {
    params.gasPrice = options.gasPrice;
  }
  return rpc.sendAsync({
    method: "eth_sendTransaction",
    params: [params]
  });
}

function waitForTransaction(rpc, txid) {
  return rpc
    .sendAsync({
      method: "eth_getTransactionReceipt",
      params: [txid]
    })
    .then(function(res) {
      if (!res) {
        return new Promise(function(resolve) {
          setTimeout(resolve, 1000);
        }).then(function() {
          return waitForTransaction(rpc, txid);
        });
      } else {
        return res;
      }
    });
}

export default function sendEth(rpc, to, amount, options) {
  return getAccounts(rpc)
    .then(function(accounts) {
      return sendTransaction(rpc, accounts[0], to, amount, options);
    })
    .then(function(txid) {
      console.log(txid);
      return waitForTransaction(rpc, txid);
    });
}
