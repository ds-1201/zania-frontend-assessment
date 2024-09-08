// interface
import { Cat } from "../interface";

export const sortCatsByPosition = (list: Cat[]) => {
  return list.slice().sort((first, second) => first.position - second.position);
};
