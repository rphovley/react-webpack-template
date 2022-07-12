import { Lucid, Blockfrost } from 'lucid-cardano';

export const NetworkTestnet = 'Testnet'
export const NetworkMainnet = 'Mainnet'

const blockfrostUrls = {
  [NetworkTestnet]: 'https://cardano-testnet.blockfrost.io/api/v0',
  [NetworkMainnet]: 'https://cardano.blockfrost.io/api/v0',
};

export class Transferer {
  constructor(
    network,
    walletProvider,
    blockfrostKey
  ) {
    if (!blockfrostKey) {
      console.error(
        'Blockfrost API Key not provided. A valid key must be provided in source index'
      );
      throw new Error('Invalid API Key');
    }
    this.walletProvider = walletProvider;
    this.network = network;
    this.blockfrostKey = blockfrostKey;
  }

  async client() {
    if (!this.clientInstance) {
      const bfAPI = new Blockfrost(
        blockfrostUrls[this.network],
        this.blockfrostKey
      );
      const lucidClient = await Lucid.new(bfAPI, this.network);
      this.clientInstance = await lucidClient.selectWallet(this.walletProvider);
    }
    return this.clientInstance;
  }

  async sendAda(addr, amt) {
    if (!addr) {
      throw new Error('Invalid Addr. Cannot be empty');
    }

    if (!amt) {
      throw new Error('Invalid ADA Amount. Cannot be empty');
    }
    console.log(`Sending ADA to: ${addr}`);
    const client = await this.client();
    const lovelaceAmount = BigInt(Number(amt) * 1000000);
    const tx = await client
      .newTx()
      .payToAddress(addr, { lovelace: lovelaceAmount })
      .complete();

    const signedTx = await tx.sign().complete();
    const txHash = await signedTx.submit();

    console.log('txHash:', txHash);
    return txHash;
  }
}

export const networkName = (key) => {
  if (!key) {
    throw new Error('Invalid network key');
  }

  switch (key.toLowerCase()) {
    case 'testnet':
      return NetworkTestnet;
    case 'mainnet':
      return NetworkMainnet;
    default:
      throw new Error(`Network not supported: ${key}`);
  }
};
