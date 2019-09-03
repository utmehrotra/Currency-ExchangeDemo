export const AppConstant = {
    DEFAULT: {
        SIZE: 10,
    },
    USER: {
        DEFAULT: {
            PROJECTION: {
                'name': 1, 'email': 1, 'createdAt': 1, 'password': 1, 'countries': 1
            }
        }
    },
    COUNTRY: {
        DEFAULT: {
            SIZE: 5
        }
    },
    FIXER: {
        GET_CURRENCY: 'api/symbols',
        GET_LATEST_RATES: 'api/latest',
        ACCESS_TOKEN: 'access_key'
    },
    RESTCOUNTRY: {
        GET_ALL: "https://restcountries.eu/rest/v2/all"
    },
    ERROR_MESSAGE: {
        MISSING: {
            EMAIL: 'Email missing or not valid',
            PASSWORD: 'Password should be atleast 4 characters',
            NAME: 'Name missing',
            COUNTRY_ID: 'CountryId missing',
        },
        USER: {
            ALREADY_EXISTS: 'User already exists. Please sign in',
            DOESNT_EXISTS: 'User doesn\'t exists. Please sign up',
            EMAIL_PASSWORD_ERROR: 'Email and password doesn\'t match'
        },
        COUNTRY: {
            DOESNT_EXISTS: 'This country doesn\'t exists',
        }
    }
};

