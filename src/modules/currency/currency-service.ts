import { CurrencyModel } from '../../models/currency';


export class CurrencyService {
    private static __instance: CurrencyService;

    static get instance() {
        if (!this.__instance) this.__instance = new CurrencyService();
        return this.__instance;
    }

    async checkCurrencyCount(): Promise<Number> {
        const currencyCount = await CurrencyModel.find({}).count();
        return currencyCount;
    }

    async getAllCurrencies() {
        const currencies = await CurrencyModel.find({});
        return currencies;
    }

    async addCurrencies(currencies, rates) {
        const bulk = CurrencyModel.collection.initializeUnorderedBulkOp();
        for (let currency in currencies) {
            bulk.insert({
                code: currency,
                name: currencies[currency],
                exchangeRate: rates[currency]
            })
        }
        return await bulk.execute();
    }
}
