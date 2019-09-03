import { LoggerContainer } from './modules/logger/logger-container';
import { HttpStatus } from './modules/http-status';
import UserController from './api/user-controller';
import StartupController from './api/startup-controller';
import CountryController from './api/country-controller';
import { Authenticator } from './middleware/authenticator';


const logger = LoggerContainer.instance.getLogger('Router');
const authenticator = Authenticator.instance;

const userController = new UserController();
const startupController = new StartupController();
const countryController = new CountryController();

export function attachApplicationRoutes(app) {

  app.use((req, res, next) => {
    logger.debug('Processing route: %s', req.url);
    next();
  });

  app.get('/health', (req, res) => {
    logger.debug('I am healthy.');
    res.send(HttpStatus.OK, { healthy: true });
  });

  app.get('/init', startupController.init);
  // User routes
  app.post('/user/signup', userController.signUp);
  app.post('/user/login', userController.login);
  app.post('/user/country', authenticator.isAuthorized, userController.addFavouriteCountries);
  app.get('/user/country', authenticator.isAuthorized, userController.getFavouriteCountries);

  // Country routes
  app.get('/country', authenticator.isAuthorized, countryController.searchCountry);
}
