import styled from 'styled-components';

const AutofillForm = styled.form`
  input:-webkit-autofill {
     -webkit-box-shadow: 0 0 0 36px white inset;
  }
`;

export default AutofillForm;
