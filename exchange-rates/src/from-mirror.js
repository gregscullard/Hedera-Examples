const axios = require('axios');

function processTransactions(transactions) {
    const rates = {};
    transactions.forEach(transaction => {
        if (transaction.entity_id = "0.0.112") {
            const memoBase64Buffer = Buffer.from(transaction.memo_base64, 'base64');
            let memoText = memoBase64Buffer.toString('ascii');
            // replace all spaces
            memoText = memoText.replaceAll(" ", "");
            // convert to an array
            const ratesArray = memoText.split(",");
            ratesArray.forEach(rate => {
                // add to the JSON object returned by the function
                const rateValues = rate.split(":");
                rates[rateValues[0]] = rateValues[1];
            });
            return rates;
        }
    });
    return rates;
}
async function main() {

    // query transactions from account 0.0.57 updating file 0.0.112 which contains the current exchange rate
    axios.get('https://testnet.mirrornode.hedera.com/api/v1/transactions?account.id=0.0.57&limit=1&order=desc&transactiontype=FILEUPDATE')
        .then(response => {
            let exchangeRate = 0;
            if (response.data.transactions) {
                exchangeRate = processTransactions(response.data.transactions)
            }
            if (exchangeRate.currentRate) {
                console.log(`1 hbar = ${exchangeRate.currentRate} USD`);
            } else {
                console.log("No exchange rate found");
            }
        })
        .catch(error => {
            console.error(error);
        })
}

main();
