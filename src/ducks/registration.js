const START = 'REGISTRATION_START';
const SUCCESS = 'REGISTRATION_SUCCESS';
const FAIL = 'REGISTRATION_FAIL';

const defaultState = {
  pending: true,
  error: false
};

export function register({ name, email, password }) {
  return (dispatch, _, { rest, serverValidationHandler }) => {
    dispatch({ type: START });
    return rest.registrations.create({ name, email, password })
      .catch(serverValidationHandler)
      .then(({ data }) => {
        dispatch({ type: SUCCESS, payload: data });
        return data;
      })
    ;
  }
};

export default function reducer(state = defaultState, action) {
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
        error: false
      };
    case FAIL:
      return {
        ...state,
        pending: false,
        error: true
      };
    default:
      return state;
  }
}
