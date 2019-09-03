import request from 'request-promise';
import { LoggerContainer } from '../logger/logger-container';
import { AppConstant } from '../../constants/app-constants'
import pHandler from '../../helpers/promise-handler'
const logger = LoggerContainer.instance.getLogger('FixerService');
const INSTANCE = Symbol('FixerService');


export class FixerService {
  private _apiKey: String;
  private _baseURL: String;

  static get instance(): FixerService {
    if (!this[INSTANCE]) {
      this[INSTANCE] = new FixerService();
    }
    return this[INSTANCE];
  }

  setAPIKey(value: String) {
    this._apiKey = value;
    return this;
  }
  setBaseURL(value: String) {
    this._baseURL = value;
    return this;
  }

  async getAllCurrencies() {
    const requestObj = {
      url: `${this._baseURL}${AppConstant.FIXER.GET_CURRENCY}?${AppConstant.FIXER.ACCESS_TOKEN}=${this._apiKey}`,
      method: 'GET',
      json: true
    };
    logger.info('Sending request to Fixer for all currencies... %o', requestObj);
    return await pHandler(request(requestObj));
  }

  async getLatestRates() {
    const requestObj = {
      url: `${this._baseURL}${AppConstant.FIXER.GET_LATEST_RATES}?${AppConstant.FIXER.ACCESS_TOKEN}=${this._apiKey}`,
      method: 'GET',
      json: true
    };
    logger.info('Sending request to Fixer for latest rates... %o', requestObj);
    return await pHandler(request(requestObj));
  }

}

export function initFixerKey({ apiKey, baseURL }): FixerService {
  const fixerService = FixerService.instance;

  fixerService.setAPIKey(apiKey).setBaseURL(baseURL);

  return fixerService;
}
