export const initialState = {
    userData: null,
};

// action creator
export const loginAction = (data) => {
    return {
        type: 'LOG_IN',
        data,
    }
};

export const logoutAction = () => {
    return {
        type: 'LOG_OUT',
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            console.log('LOG_IN ACTION', action.data);
            return {
                ...state,
                userData: action.data,
            };
        case 'LOG_OUT':
            console.log('LOG_OUT ACTION');
            return {
                ...state,
                userData: null,
            }
        default:
            return state;
    }
};

export default reducer;