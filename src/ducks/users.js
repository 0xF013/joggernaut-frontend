const FETCH_START = 'USERS_FETCH_START';
const FETCH_SUCCESS = 'USERS_FETCH_SUCCESS';
const UPDATE_START = 'USERS_UPDATE_START';
const UPDATE_SUCCESS = 'USERS_UPDATE_SUCCESS';
const CREATE_START = 'USERS_CREATE_START';
const CREATE_SUCCESS = 'USERS_CREATE_SUCCESS';
const DESTROY_SUCCESS = 'DESTROY_SUCCESS';

const adaptDate = user => {
  user.formattedCreatedAt = new Date(user.createdAt).toLocaleString();
  return user;
};

export function fetch() {
  return async (dispatch, _, { rest }) => {
    dispatch({ type: FETCH_START });
    const { data } = await rest.users.fetch();
    data.map(adaptDate);
    dispatch({ type: FETCH_SUCCESS, payload: data.map(adaptDate) });
  }
}

export function update(user) {
  return async (dispatch, _, { rest, serverValidationHandler }) => {
    dispatch({ type: UPDATE_START });
    return rest.users.update(user)
      .catch(serverValidationHandler)
      .then(({ data }) => dispatch({ type: UPDATE_SUCCESS, payload: adaptDate(data) }));
  }
}

export function destroy(id) {
  return async (dispatch, _, { rest }) => {
    return rest.users.destroy(id)
      .then(({ data }) => dispatch({ type: DESTROY_SUCCESS, payload: { id } }));
  }
}



export function toggleRole(user, role) {
  return async (dispatch, _, { rest }) => {
    dispatch({ type: UPDATE_START });
    const roles = [ ...user.roles ];
    if (roles.includes(role)) {
      roles.splice(roles.indexOf(role), 1);
    } else {
      roles.push(role);
    }
    return rest.users.updateRoles(user.id, roles)
      .then(({ data }) => dispatch({ type: UPDATE_SUCCESS, payload: adaptDate(data) }));
  }
}

export function create(user) {
  return async (dispatch, _, { rest, serverValidationHandler }) => {
    dispatch({ type: CREATE_START });
    return rest.users.create(user)
      .catch(serverValidationHandler)
      .then(({ data }) => dispatch({ type: CREATE_SUCCESS, payload: adaptDate(data) }));
  }
}

const initialState = {
  pending: false,
  updatePending: false,
  createPending: false,
  items: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_START:
      return {
        ...state,
        pending: true
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        pending: false,
        items: action.payload
      };
    case CREATE_START:
      return {
        ...state,
        createPending: true
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        createPending: false,
        items: [action.payload, ...state.items]
      };
    case UPDATE_START:
      return {
        ...state,
        updatePending: true
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        updatePending: false,
        items: state.items.map(item => {
          if (item.id === action.payload.id) {
            return { ...item, ...action.payload };
          }
          return item;
        })
      };
    case DESTROY_SUCCESS:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      };

    default:
      return state;
  }
}
