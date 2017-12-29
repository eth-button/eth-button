[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# eth-button

A simple way to receive Ether donations.  Works with Mist and MetaMask.

Check the [github pages](https://eth-button.githubpages.io/eth-button) for more information.

## Usage

Add script tag where you want the UI to appear:

```
<script
  type="text/javascript"
  src="{TBD}"
  data-address="{YOUR ETHEREUM ADDRESS}"
  data-meta="eth-button">
</script>
```

You should be able to copy and paste the above, replacing only the `YOUR ETHEREUM ADDRESS` with your public Ethereum address.

Details:

* `data-address` - This parameter is required.  This is the address you would like to receive donations with.
* `data-meta` - This parameter is required.  Copy and paste it from above.
* `src` - The above should always include a direct link to the minified script.
 * You should always link directly to git hashes, for security reasons.  Git tags can be changed, but git commit hashes will always point to a specific version of code.

## Advanced Usage

If you would like to customize the styles, please take a look at [styles.js](https://github.com/eth-button/eth-button/tree/master/lib/styles.js).  These styles will be added to the `head` of the page, unless a `style` tag with the id `EthButtonStyles` already exists.  To load custom styles, either add your own `style` tag with the id `EthButtonStyles`, or extend the existing styles with your own CSS rules.

## Bugs

If you find a bug, or would like to see a feature implemented, please open an issue in the github repository.  Pull requests are also always welcome!

## Documentation

See the [github pages.](https://eth-button.githubpages.io/eth-button)
