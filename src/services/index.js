import { SubmissionError } from 'redux-form';
import rest from './rest';
import createStorage from './storage';
import i18n from './i18n';

const storage = createStorage({ localStorage });

export default {
  storage,
  rest,
  serverValidationHandler: ({ response: { data } }) => { throw new SubmissionError(i18n.translateObject(data)) }
};

