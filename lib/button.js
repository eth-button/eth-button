import getConfig from "./get-config";
import loadStyles from "./styles";
import Blockies from "lib-blockies";
import ethSend from "eth-send";
import { formatWei } from "./eth";

function makeElement(document, type, className, parent) {
  const el = document.createElement(type);
  if (className) {
    el.className = className;
  }
  if (parent) {
    parent.appendChild(el);
  }
  return el;
}

const disabledExplanation =
  "Donate " +
  '<a href="https://ethereum.org/" target="_blank" title="Ethereum">Ether</a>' +
  " with " +
  '<a href="https://metamask.io/" target="_blank" title="MetaMask">MetaMask</a>' +
  " or " +
  '<a href="https://github.com/ethereum/mist/releases" target="_blank" title="Mist">Mist</a>';

export default function createButton(document, scriptEl, rpc) {
  const config = getConfig(scriptEl);
  loadStyles(document);
  const container = makeElement(document, "div", "EthDonateButton");

  const blockie = new Blockies(config.address.toLowerCase());
  const canvas = blockie.createCanvas(8);
  canvas.className = "EthDonateButton--Blockie";
  canvas.title = config.address;
  container.appendChild(canvas);
  const content = makeElement(
    document,
    "div",
    "EthDonateButton--Content",
    container
  );
  const labelRow = makeElement(
    document,
    "div",
    "EthDonateButton--LabelRow",
    content
  );
  const label = makeElement(
    document,
    "div",
    "EthDonateButton--LabelRow--Caption",
    labelRow
  );
  label.innerHTML = "Give ETH to";
  const address = makeElement(
    document,
    "div",
    "EthDonateButton--LabelRow--Address",
    labelRow
  );
  const addressLink = makeElement(document, "a", null, address);
  addressLink.href = "https://etherscan.io/address/" + config.address + "/";
  addressLink.innerHTML = config.address;
  addressLink.title = config.address;
  addressLink.target = "_blank";
  const inputRow = makeElement(
    document,
    "div",
    "EthDonateButton--InputRow",
    content
  );
  const inputElement = makeElement(
    document,
    "input",
    "EthDonateButton--InputRow--Input",
    inputRow
  );
  inputElement.placeholder = "0.0Ξ";
  inputElement.min = "0";
  inputElement.step = "0.01";
  inputElement.type = "number";
  const button = makeElement(
    document,
    "div",
    "EthDonateButton--InputRow--Button disabled",
    inputRow
  );
  button.innerHTML = "Donate";

  if (!rpc) {
    container.className = container.className + " disabled";
    const overlay = makeElement(
      document,
      "div",
      "EthDonateButton--DisabledOverlay",
      container
    );
    const explanation = makeElement(document, "div", null, overlay);
    explanation.innerHTML = disabledExplanation;
    return container;
  }

  let buttonActive = false;

  const states = ["enabled", "disabled", "loading", "done", "error"];
  function setState(state) {
    const otherStates = states.slice();
    otherStates.splice(otherStates.indexOf(state), 1);
    const search = new RegExp(otherStates.join("|"));
    if (button.className.match(search)) {
      button.className = button.className.replace(search, state);
      return true;
    } else {
      return false;
    }
  }

  function enableButton() {
    if (setState("enabled")) {
      button.innerHTML = "Donate";
      buttonActive = true;
    }
  }

  function disableButton() {
    if (setState("disabled")) {
      button.innerHTML = "Donate";
      buttonActive = false;
    }
  }

  function loadingButton() {
    if (setState("loading")) {
      button.innerHTML = "<div></div>";
      buttonActive = false;
    }
  }

  function doneButton() {
    if (setState("done")) {
      button.innerHTML = "✔";
      buttonActive = false;
    }
  }

  function errorButton() {
    if (setState("error")) {
      button.innerHTML = "✘";
      buttonActive = false;
    }
  }

  function resetButton() {
    if (parseFloat(inputElement.value) > 0.0) {
      enableButton();
    } else {
      disableButton();
    }
  }

  button.addEventListener("click", function clickHandler(e) {
    if (buttonActive) {
      loadingButton();
      inputElement.disabled = true;
      const amount = formatWei(inputElement.value);
      ethSend(rpc, config.address, amount)
        .then(function(res) {
          doneButton();
          console.log(res);
        })
        .catch(function(err) {
          inputElement.disabled = false;
          errorButton();
          setTimeout(resetButton, 3000);
          console.error(err);
        });
    }
  });

  function changeHandler(e) {
    resetButton();
  }

  inputElement.addEventListener("change", changeHandler);
  inputElement.addEventListener("keyup", changeHandler);

  return container;
}
