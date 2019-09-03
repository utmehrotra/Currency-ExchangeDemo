import { CountryModel } from '../../models/country';
import { AppConstant } from '../../constants/app-constants';

export class CountryService {
    private static __instance: CountryService;

    static get instance() {
        if (!this.__instance) this.__instance = new CountryService();
        return this.__instance;
    }

    async checkCountryCount(): Promise<Number> {
        const countryCount = await CountryModel.find({}).count();
        return countryCount;
    }

    async getAllCountries(): Promise<Number> {
        const countries = await CountryModel.find({});
        return countries;
    }

    async getCountryByIds(ids) {
        const countries = await CountryModel.find({ _id: { $in: ids } });
        return countries;
    }

    async searchCountryByName(name) {
        const countries = await CountryModel.find({ name: { $regex: name, $options: 'i' } }, null, { limit: AppConstant.COUNTRY.DEFAULT.SIZE });
        return countries;
    }

    async addCountries(countries, allCurrencies) {
        const bulk = CountryModel.collection.initializeUnorderedBulkOp();
        countries.forEach((country) => {
            const currencies = country.currencies.map((currency) => {
                return allCurrencies[currency.code]
            });
            console.log(currencies);
            bulk.insert({
                name: country.name,
                region: country.region,
                population: country.population,
                demonym: country.demonym,
                area: country.area,
                currencies
            })
        })

        return await bulk.execute();
    }
}
