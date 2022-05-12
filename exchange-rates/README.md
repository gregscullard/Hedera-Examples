# Exchange rates

Shows how to obtain the current hbar / usd exchange rate using two different methods (mirror query and file query)

One example retrieves a transaction which updates file 0.0.112 from mirror node. The transaction's memo contains the exchange rates which the example decodes and prints.

The other example retrieves the contents of file 0.0.112 from a Hedera consensus node and uses the SDK to parse the file contents and output the current exchange rate.

## Setup environment

Please refer to the main [readme](../README.md)

## Installation

```shell
npm install
```

## Run

### from file

```shell
cd src
node from-file.js 
```

outputs the current exchange rate (for example)

```shell
1 hbar = 8.161933333333334 cents
```

### from mirror

```shell
cd src
node from-mirror.js 
```

outputs the current exchange rate (for example)

```shell
1 hbar = 0.0816 USD
```

the example fetches the transaction from the testnet mirror node (https://testnet.mirrornode.hedera.com/api/v1/transactions?account.id=0.0.57&limit=1&order=desc&transactiontype=FILEUPDATE') to fetch from the mainnet mirror, replace `testnet` with `mainnet-public`

_the `mainnet-public` endpoint is subject to throttles (100 Requests per second for all users combined), the code should be updated to handle errors, etc... if used in production_ 

