import { IntlReducer as Intl } from 'react-redux-multilingual';
import { clearStorage } from '../config';
import { combineReducers } from 'redux';

import { auth } from '../modules/auth/redux/reducers';
import { user } from '../modules/user/redux/reducers';
import { country } from '../modules/country/redux/reducers';

const appReducer = combineReducers({
    auth,
    user,
    country,

    Intl
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET') {
        state = undefined;
        clearStorage();
    }

    return appReducer(state, action);
}

export default rootReducer;