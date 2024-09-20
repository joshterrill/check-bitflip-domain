#!/usr/bin/env node

const { checkBitFlippedDomains } = require('../');

// CLI argument parsing
const domain = process.argv[2];

if (!domain) {
    console.error("Usage: check-bitflip-domain <domain>");
    process.exit(1);
}

(async () => {
    try {
        const availableDomains = await checkBitFlippedDomains(domain);
        console.log('----------------------------------------');
        console.log('Original domain:', domain);
        console.log("Available bitflipped domains:", availableDomains);
        console.log('----------------------------------------');
    } catch (err) {
        process.exit(1);
    }
})();

