import { actions } from '../utils/constants.js';

export function setAction(name, func) {
  actions[name] = func;
}
