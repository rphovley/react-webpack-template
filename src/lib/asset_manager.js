import { Lucid, Blockfrost } from 'lucid-cardano';
import api_key from '../../api_key.json'

export const NetworkTestnet = 'Testnet'
export const NetworkMainnet = 'Mainnet'

export class AssetManager {
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
          'https://cardano-testnet.blockfrost.io/api/v0',
          api_key.BLOCKFROST
        );
        const lucidClient = await Lucid.new(bfAPI, this.network);
        this.clientInstance = await lucidClient.selectWallet(this.walletProvider);
      }
      return this.clientInstance;
    }
  
    async getBalance() {
      const client = await this.client();
      const my_address = await client.wallet.address();
      const utxos = await client.utxosAt(my_address);
      const balance_lovelace = collect_lovelace(utxos);
      const balance = balance_lovelace / 1000000.;
      return balance;
    }
  }

  const collect_lovelace = (utxos) => {
      let acc = 0;
      for (const utxo of utxos) {
          const lovelace = utxo.assets.lovelace;
          acc += Number(lovelace);
      }
      return acc
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
  