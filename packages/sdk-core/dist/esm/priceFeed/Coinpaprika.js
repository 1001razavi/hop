import { fetchJsonOrThrow } from '#utils/index.js';
export class CoinpaprikaPriceFeed {
    constructor() {
        this._baseUrl = 'https://api.coinpaprika.com/v1';
        this.idMap = {
            BTC: 'btc-bitcoin',
            DAI: 'dai-dai',
            ETH: 'eth-ethereum',
            GNO: 'gno-gnosis',
            HOP: 'hop-hop-protocol',
            MATIC: 'matic-polygon',
            RETH: 'reth-rocket-pool-eth',
            SNX: 'snx-synthetix-network-token',
            SUSD: 'susd-susd',
            TUSD: 'tusd-trueusd',
            USDC: 'usdc-usd-coin',
            USDT: 'usdt-tether',
            UNI: 'uni-uniswap'
        };
        this.getPriceByTokenSymbol = async (symbol, base = 'USD') => {
            symbol = symbol.toUpperCase();
            if (symbol === 'WBTC') {
                symbol = 'BTC';
            }
            if (symbol === 'WETH') {
                symbol = 'ETH';
            }
            if (symbol === 'WMATIC') {
                symbol = 'MATIC';
            }
            if (symbol === 'XDAI') {
                symbol = 'DAI';
            }
            if (symbol === 'WXDAI') {
                symbol = 'DAI';
            }
            const id = this.idMap[symbol];
            if (!id) {
                throw new Error(`id mapping not found for "${symbol}"`);
            }
            const url = `${this._baseUrl}/tickers/${id}`;
            const json = await fetchJsonOrThrow(url);
            const value = json?.quotes?.[base]?.price;
            if (!value) {
                if (json.error) {
                    throw new Error(`coinpaprika: "${symbol}": ${json.error}`);
                }
                throw new Error(`coinpaprika: "${symbol}": invalid price response`);
            }
            const price = Number(value);
            if (Number.isNaN(price)) {
                throw new Error('coinpaprika: invalid price (not a number)');
            }
            return price;
        };
    }
}
//# sourceMappingURL=Coinpaprika.js.map