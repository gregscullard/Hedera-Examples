const {Client, FileId, AccountId, PrivateKey, FileContentsQuery, ExchangeRates} = require("@hashgraph/sdk");

const dotenv = require("dotenv");

dotenv.config({ path: '../../.env' });

async function main() {

    let client = Client.forNetwork(process.env.HEDERA_NETWORK);

    const operatorKey = PrivateKey.fromString(process.env.OPERATOR_KEY);

    client.setOperator(
        AccountId.fromString(process.env.OPERATOR_ID),
        operatorKey
    );

    const fileData = await new FileContentsQuery()
        .setFileId(FileId.fromString("0.0.112"))
        .execute(client);

    const exchangeRates = ExchangeRates.fromBytes(fileData);
    console.log(`1 hbar = ${exchangeRates.currentRate.exchangeRateInCents} cents`);
}

main();
