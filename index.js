import EthRPC from "ethjs-rpc";
import getProvider from "./lib/provider";
import getSelf from "./lib/get-self";
import createButton from "./lib/button";

const currentProvider = getProvider(window);
const rpc = currentProvider ? new EthRPC(currentProvider) : null;
const self = getSelf(window);
const button = createButton(window.document, self, rpc);

self.parentNode.replaceChild(button, self);
