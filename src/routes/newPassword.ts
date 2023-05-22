import { NewPassword } from '../pages/NewPassword';

export default {
  component: NewPassword,
  url: 'password-reset/:token',
  exact: true,
};
