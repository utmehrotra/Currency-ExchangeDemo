import request from 'request-promise';
import { LoggerContainer } from '../logger/logger-container';
import { AppConstant } from '../../constants/app-constants'
import pHandler from '../../helpers/promise-handler'
const logger = LoggerContainer.instance.getLogger('RestCountriesService');
const INSTANCE = Symbol('RestCountriesService');


export class RestCountriesService {

    static get instance(): RestCountriesService {
        if (!this[INSTANCE]) {
            this[INSTANCE] = new RestCountriesService();
        }
        return this[INSTANCE];
    }

    async getAllCountries() {
        const requestObj = {
            url: `${AppConstant.RESTCOUNTRY.GET_ALL}`,
            method: 'GET',
            json: true
        };
        logger.info('Sending request to RestCountries for all countries...', requestObj);
        return await pHandler(request(requestObj));
    }

}