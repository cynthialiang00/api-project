import { csrfFetch } from './csrf';

const GET_SPOTS = "spot/GET_SPOTS";
const GET_USER_SPOTS = "spot/GET_USER_SPOTS";
const GET_SPOT_DETAIL = "spot/GET_SPOT_DETAIL";
const EDIT_SPOT = "spot/EDIT_SPOT";
const DELETE_SPOT = "spot/DELETE_SPOT";

const actionGetSpots= (spots) => {
    return {
        type: GET_SPOTS,
        payload: spots,
    };
};

const actionGetUserSpots = (spots) => {
    return {
        type: GET_USER_SPOTS,
        payload: spots
    };
};

const actionGetSpotDetail = (spot) => {
    return {
        type: GET_SPOT_DETAIL,
        payload: spot
    };
};

const actionEditSpot = (spot) => {
    return {
        type: EDIT_SPOT,
        payload: spot
    }
};

const actionDeleteSpot = (id) => {
    return {
        type: DELETE_SPOT,
        payload: id
    }
};


export const thunkGetSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'GET',
    });

    const data = await response.json();
    dispatch(actionGetSpots(normalizeData(data.Spots)));
    return response;
};

export const thunkGetUserSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current', {
        method: 'GET',
    });

    const data = await response.json();
    dispatch(actionGetUserSpots(normalizeData(data.Spots)));
    return response;
};

export const thunkGetSpotDetail = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'GET',
    });

    const data = await response.json();
    dispatch(actionGetSpotDetail(data));
    return response;
};

export const thunkEditSpot = (spotId, spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        body: spot
    });

    const data = await response.json();
    dispatch(actionEditSpot(data));
    return response;
}

export const thunkDeleteSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    });

    const data = await response.json();
    dispatch(actionDeleteSpot(spotId));
    return response;
};

export const fetchCreateSpot = async(spot) => {
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        body: spot
    });

    const data = await response.json();
    return data;
    
};

export const fetchAddImg = async (spotId, img) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        body: img
    });

    const data = await response.json();
    return data;

};


const initialState = {allSpots: {}, singleSpot: {}};

const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SPOTS:
            newState = Object.assign({}, state);
            newState.allSpots = {};
            newState.allSpots = action.payload;
            return newState;
        case GET_USER_SPOTS:
            newState = Object.assign({}, state);
            newState.allSpots = {};
            newState.allSpots = action.payload;
            return newState;
        case GET_SPOT_DETAIL:
            newState = Object.assign({}, state);
            newState.singleSpot = {};
            newState.singleSpot = action.payload;
            return newState;
        case EDIT_SPOT:
            newState = Object.assign({}, state);
            newState.singleSpot = {};
            newState.singleSpot = action.payload;
            return newState;
        case DELETE_SPOT:
            newState = Object.assign({}, state);
            newState.allSpots = {...state.allSpots};
            newState.singleSpot = {};
            delete newState.allSpots[action.payload];
            return newState;
        default:
            return state;
    }
};


// Function takes in an array of data and normalizes it based on data element's id
// Returns the normalized data as an object
const normalizeData = (dataArr) => {
    const normalizeObj = {};
    dataArr.forEach(element => {
        normalizeObj[element.id] = element
    });

    return normalizeObj;

}
export default spotReducer;