import { combineReducers } from "redux";
import user from './user';

// (이전 상태, 액션) => 다음 상태
const rootReducer = combineReducers({
    index: (state = {}, action) => {
        switch (action.type) {
            default:
                return state;
        }
    },
    user,
});

export default rootReducer;