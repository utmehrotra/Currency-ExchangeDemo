import { CurrencyService } from '../modules/currency/currency-service'
import { CountryService } from '../modules/country/country-service'
import { FixerService } from '../modules/third-party/fixer-service'
import { RestCountriesService } from '../modules/third-party/restcountries-service'
import formatResponse from '../helpers/format-response'
import { LoggerContainer } from '../modules/logger/logger-container';

const logger = LoggerContainer.instance.getLogger('StartupController');

declare interface InitResponse {
    currencyCount?: Number
    countryCount?: Number
    currencyList?: any
    bulkCurrencyInsert?: any
    errors?: any
    message?: any
}
export default class StartupController {

    async init(req, res) {
        const response: InitResponse = {};
        const currencyService = CurrencyService.instance;
        response.currencyCount = await currencyService.checkCurrencyCount();
        if (!response.currencyCount) {
            const fixerService = FixerService.instance;
            const [currencyErr, currencyList] = await fixerService.getAllCurrencies();
            const [latestRatesErr, latestRateList] = await fixerService.getLatestRates();
            if (!currencyErr && !latestRatesErr) {
                response.currencyList = currencyList;
                response.bulkCurrencyInsert = await currencyService.addCurrencies(currencyList.symbols, latestRateList.rates);
            } else {
                logger.error("Error in getting currencies", currencyErr);
                logger.error("Error in getting currency rates", latestRatesErr);
                response.message = "We need to rerun this service";
                return formatResponse(null, response, { res });
            }
        }

        const countryService = CountryService.instance;
        response.countryCount = await countryService.checkCountryCount();
        if (!response.countryCount) {
            const restCountriesService = RestCountriesService.instance;
            const [countryErr, countryList] = await restCountriesService.getAllCountries();
            if (!countryErr) {
                const currencies = await currencyService.getAllCurrencies();
                console.log(currencies);
                var currencyObj = currencies.reduce((obj, item) => (obj[item.code] = item._id, obj), {});
                console.log(currencyObj);
                response.bulkCurrencyInsert = await countryService.addCountries(countryList, currencyObj);
            } else {
                logger.error("Error in getting countries", countryErr);
                response.message = "We need to rerun this service";
            }
        }



        formatResponse(null, response, { res });
    }
}