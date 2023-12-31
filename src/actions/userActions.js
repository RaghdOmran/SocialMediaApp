import { SET_USER, REMOVE_USER } from './types';

export const setUser = user => ({
  type: SET_USER,
  payload: user
});

export const removeUser = () => ({
  type: REMOVE_USER
});
