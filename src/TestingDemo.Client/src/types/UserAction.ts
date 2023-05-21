import { UserActions } from '../enums/UserActions';

export type UserAction = {
  type: UserActions;
  payload?: object;
};
