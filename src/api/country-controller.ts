import { CountryService } from '../modules/country/country-service'
import formatResponse from '../helpers/format-response';

export default class CountryController {
    async searchCountry(req, res) {
        const { name = '' } = req.query || {};
        const countryService = CountryService.instance;
        const countryList = await countryService.searchCountryByName(name);

        formatResponse(null, countryList, { res });
    }
}