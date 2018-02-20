import moment from 'moment';

const FETCH_START = 'JOGS_FETCH_START';
const FETCH_SUCCESS = 'JOGS_FETCH_SUCCESS';
const CREATE_START = 'JOGS_CREATE_START';
const UPDATE_START = 'JOGS_UPDATE_START';
const SET_AVERAGES = 'SET_AVERAGES';
const SET_FILTER_DATE = 'SET_FILTER_DATE';
const CLEAR_FILTERS = 'CLEAR_FILTERS';

const dateFormat = 'YYYY-MM-DD';

const jogLense = jog => ({
  ...jog,
  formattedDate: moment(jog.date).format(dateFormat),
  formattedDistance: `${(jog.distance / 1000).toFixed(2)} km`,
  formattedDuration: `${Math.floor(jog.duration / 60)}:${(jog.duration % 60).toString().padStart(2, 0)}`,
  speed: `${((jog.distance / 1000) / (jog.duration / 60)).toFixed(2)} km/h`
});

const averageLense = avg => ({
  ...avg,
  weekStart: moment(avg.week).format(dateFormat),
  weekEnd: moment(avg.week).add(6, 'days').format(dateFormat),
  week: moment(avg.week).isoWeek().toString(),
  speed: Number(avg.average_speed),
  distance: Number(avg.average_distance)
})

export function fetch(userId) {
  return async (dispatch, _, { rest }) => {
    dispatch({ type: FETCH_START });
    const { data } = await rest.jogs.fetch(userId);
    dispatch({ type: FETCH_SUCCESS, payload: data.map(jogLense) });
  }
}

export function create(userId, jog) {
  return async (dispatch, _, { rest, serverValidationHandler }) => {
    dispatch({ type: CREATE_START });
    return rest.jogs.create(userId, {
      ...jog,
      date: moment(jog.date).format('YYYY-MM-DDTHH:mm:ss')
    })
      .catch(serverValidationHandler)
      .then(({ data }) => dispatch(fetch(userId)));
  }
}

export function destroy(userId, jog) {
  return async (dispatch, _, { rest }) => {
    return rest.jogs.destroy(userId, jog.id)
      .then(({ data }) => dispatch(fetch(userId)));
  }
}

export function getAverages(userId) {
  return async (dispatch, _, { rest }) => {
    return rest.jogs.getAverages(userId)
      .then(({ data }) => dispatch({ type: SET_AVERAGES, payload: data.map(averageLense) }));
  }
}

export function update(userId, jog) {
  return async (dispatch, _, { rest, serverValidationHandler }) => {
    dispatch({ type: UPDATE_START });
    return rest.jogs.update(userId, {
      ...jog,
      date: moment(jog.date).format('YYYY-MM-DDTHH:mm:ss')
    })
      .catch(serverValidationHandler)
      .then(({ data }) => dispatch(fetch(userId)));
  }
}

export function setFilterDate(name, date) {
  return (dispatch) => {
    // a little mutation, what could go wrong?
    date.setHours(0, 0, 0, 0);
    return dispatch({ type: SET_FILTER_DATE, payload: { name, date } });
  }
}

export function clearFilters() {
  return { type: CLEAR_FILTERS };
}

const initialState = {
  pending: false,
  pendingCreate: false,
  updatePending: false,
  items: [],
  averages: [],
  from: null,
  to: null
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
        updatePending: false,
        createPending: false,
        items: action.payload
      };
    case CREATE_START:
      return {
        ...state,
        createPending: true
      };
    case UPDATE_START:
      return {
        ...state,
        updatePending: true
      };
    case SET_AVERAGES:
      return {
        ...state,
        averages: action.payload
      }
    case SET_FILTER_DATE:
      return {
        ...state,
        [action.payload.name]: action.payload.date
      }
    case CLEAR_FILTERS:
      return {
        ...state,
        from: null,
        to: null
      };
    default:
      return state;
  }
}
