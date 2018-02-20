const translations = {
  NAME_REQUIRED: 'Name is required',
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_IN_USE: 'Email already in use',
  EMAIL_INVALID: 'Email is invalid',
  PASSWORD_TOO_SHORT: 'Password is too short',
  DATE_REQUIRED: 'Date is required',
  DATE_IN_FUTURE: 'Date is in the future',
  DISTANCE_REQUIRED: 'Distance is required',
  DISTANCE_INVALID: 'Distance format is invalid',
  DURATION_REQUIRED: 'Duration is required',
  DURATION_INVALID: 'Duration is invalid',
  DURATION_TOO_LONG: 'Duration is too high',
  END_DATE_IN_FUTURE: 'End date is in the future',
  SPEED_USAIN_BOLT: 'Unrealistic speed'

};

const translate = term => translations[term] || term;

const translateObject = object => {
  const result = {};
  Object.entries(object).forEach(([k, v]) => result[k] = translate(v) );
  return result;
}

export default {
  translate,
  translateObject
};
