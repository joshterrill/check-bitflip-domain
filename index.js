const freewhois = require('freewhois');

function flipBits(char) {
    const flippedChars = [];
    const charCode = char.charCodeAt(0);

    for (let i = 0; i < 8; i++) {
        const flippedCharCode = charCode ^ (1 << i); // Flip each bit
        const flippedChar = String.fromCharCode(flippedCharCode);

        if (/^[a-z0-9]$/i.test(flippedChar)) {
            flippedChars.push(flippedChar.toLowerCase()); // Ensure lowercase
        }
    }

    return flippedChars;
}

function generateBitFlippedDomains(domain) {
    const [baseDomain, tld] = domain.split('.');
    const squattedDomains = new Set();

    for (let i = 0; i < baseDomain.length; i++) {
        const flippedChars = flipBits(baseDomain[i]);
        for (const flippedChar of flippedChars) {
            const newDomain = baseDomain.slice(0, i) + flippedChar + baseDomain.slice(i + 1) + '.' + tld;
            squattedDomains.add(newDomain);
        }
    }

    return Array.from(squattedDomains);
}

function checkDomainAvailability(domain) {
    return new Promise(async (resolve) => {
        try {
            await freewhois(domain);
            resolve({ domain, available: false });
        } catch (error) {
            resolve({ domain, available: true });
        }
    });
}

async function checkBitFlippedDomains(originalDomain) {
    const squattedDomains = generateBitFlippedDomains(originalDomain);
    const availability = [];
    for (const domain of squattedDomains) {
        availability.push(checkDomainAvailability(domain));
    }

    const results = await Promise.all(availability);
    const availableDomains = results.filter(result => result.available);
    
    return availableDomains.map(res => res.domain);
}

module.exports = {
    checkBitFlippedDomains
};

