const START = 'AUTHORIZATION_START';
const SUCCESS = 'AUTHORIZATION_SUCCESS';
const SUCCESS_UPDATE = 'AUTHORIZATION_SUCCESS_UPDATE';
const FAIL = 'AUTHORIZATION_FAIL';
const CLEAR = 'AUTHORIZATION_CLEAR';
const INIT = 'AUTHORIZATION_INIT';

const STORAGE_KEY = 'joggernaut_auth';

const initialState = {
  isAuthenticated: false,
  pending: true,
  error: false,
  user: {}
};

export function authorizeSuccess(payload) {
  return (dispatch) => {
    dispatch({ type: SUCCESS, payload });
    return dispatch(updateStorage());
  };
}

export function authorize({ email, password }) {
  return (dispatch, getState, { rest, storage }) => {
    dispatch({ type: START });
    return rest.sessions.create({ email, password })
      .then(({ data }) => {
        dispatch(authorizeSuccess(data));
        const authState = getState().auth;
        rest.setAuthToken(authState.user.accessToken);
        return dispatch(updateStorage());
      })
      .catch(() => dispatch({ type: FAIL }))
    ;
  }
};

export function logout() {
  return (dispatch, _, { rest, storage }) => {
    dispatch({ type: CLEAR });
    storage.clear(STORAGE_KEY);
    return rest.sessions
      .delete()
      .then(() => rest.clearAuthToken())
    ;
  }
}

export function checkStorage() {
  return (dispatch, _, { rest, storage }) => {
    const storedState = storage.get(STORAGE_KEY);
    if (storedState) {
      rest.setAuthToken(storedState.user.accessToken);
      dispatch({ type: INIT, payload: storedState });
    } else {
      dispatch({ type: CLEAR });
    }
  }
}

function updateStorage() {
  return async (dispatch, getState, { storage }) => {
    const authState = getState().auth;
    storage.set(STORAGE_KEY, authState);
  }
}

export function updateMyProfile(user) {
  return async (dispatch, _, { rest, serverValidationHandler }) => {
    return rest.users.update(user)
      .catch(serverValidationHandler)
      .then(({ data }) => {
        dispatch({ type: SUCCESS_UPDATE, payload: data });
        return dispatch(updateStorage());
      });
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START:
      return {
        ...state,
        pending: true,
        error: false
      };
    case SUCCESS:
      return {
        ...state,
        pending: false,
        error: false,
        isAuthenticated: true,
        user: action.payload
      };
    case SUCCESS_UPDATE:
      return {
        ...state,
        pending: false,
        error: false,
        isAuthenticated: true,
        user: {
          ...state.user,
          email: action.payload.email,
          name: action.payload.name
        }
      };
    case FAIL:
      return {
        ...state,
        pending: false,
        error: true,
        isAuthenticated: false
      };
    case CLEAR:
      return {
        ...initialState,
        pending: false
      };
    case INIT:
      return {
        ...action.payload
      }
    default:
      return state;
  }
}
