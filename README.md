# Check Bitflip Domain

A tool for checking bit-flip domain variants using WHOIS.

### CLI

```bash
npm i -g check-bitflip-domain
check-bitflip-domain wellsfargo.com

# ----------------------------------------
# Original domain: wellsfargo.com
# Available bitflipped domains: [ 'wemlsfargo.com', 'weldsfargo.com' ]
```

### API

```bash
npm i check-bitflip-domain --save
```

```javascript
const { checkBitFlippedDomains } = require('check-bitflip-domain');

const availableDomains = await checkBitFlippedDomains('wellsfargo.com');

console.log(availableDomains); // [ 'wemlsfargo.com', 'weldsfargo.com' ]
```

### License

MIT