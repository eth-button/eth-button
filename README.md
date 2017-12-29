[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# eth-button

A simple way to receive Ether donations.  Works with Mist and MetaMask.

Check the [github pages](https://eth-button.github.io/eth-button/) for more information.

## Usage

Add script tag where you want the UI to appear:

```
<script
  type="text/javascript"
  src="https://cdn.rawgit.com/eth-button/eth-button/26ae30eaa5d41c2751cf7d8d6b412d8ea9218b25/dist/eth-button.js"
  data-address="{YOUR ETHEREUM ADDRESS}"
  data-meta="eth-button">
</script>
```

You should be able to copy and paste the above, replacing only the `YOUR ETHEREUM ADDRESS` with your public Ethereum address.  Or, you can use the generator on the [documentation site.](https://eth-button.github.io/eth-button/)

Details:

* `data-address` - This parameter is required.  This is the address you would like to receive donations with.
* `data-meta` - This parameter is required.  Copy and paste it from above.
* `src` - The above should always include a direct link to the minified script.
  * You should always link directly to git hashes, for security reasons.  Git tags can be changed, but git commit hashes will always point to a specific version of code.

## Advanced Usage

If you would like to customize the styles, please take a look at [styles.js](https://github.com/eth-button/eth-button/tree/master/lib/styles.js).  These styles will be added to the `head` of the page, unless a `style` tag with the id `EthButtonStyles` already exists.  To load custom styles, either add your own `style` tag with the id `EthButtonStyles`, or extend the existing styles with your own CSS rules.

If you prefer to not trust minified code (totally fair), you can fork this repository, build your own, and host it yourself.

## Building

Install dependencies with `npm install`.  All dependencies are installed locally and should be version locked.

To build the code, run `npm run webpack`.  This will write a new version to `dist/eth-button.js`.

To test changes locally, try running `npm run dev`.  This will start a `webpack-dev-server` instance and serve the whole directory on `localhost` at port `8080`.  You can then visit `http://localhost:8080/examples/demo.html` to view changes live.  `webpack-dev-server` will auto-reload the page when you make changes to the source files.

You can also run your own `ganache-cli` instance with `npm run testrpc`.  This will autogenerate a few addresses that can be accessed via [MetaMask](https://metamask.io).  The default address in `demo.html` is the second of such addresses.  The `ganache-cli` instance is configured with a deterministic seed and automining with a blocktime of 14 seconds.

## Bugs

If you find a bug, or would like to see a feature implemented, please open an issue in the github repository.  Pull requests are also always welcome!

## Documentation

See the [github pages.](https://eth-button.github.io/eth-button/)
