import { providersAPI } from "../Api/ProvidersApi/api";

const GET_PROVIDER = "GET_PROVIDER";

const initialState = {
  providers: [],
};

const providerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROVIDER:
      return {
        ...state,
        providers: action.payload,
      };

    default:
      return state;
  }
};

export const setProvider = (payload)=>(
    {type: GET_PROVIDER, payload}
)
export const getProviders = () => async (dispatch, getState) => {
    const {lang} = getState().CategoryPage;
    const response = await providersAPI.getProviders(lang);
    dispatch(setProvider(response));
};
export default providerReducer;