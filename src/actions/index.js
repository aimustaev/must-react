import { api } from '../components/api';

export const actionGetUserInfo = (onChange) => {
  api.getUserInfo().then((result) => onChange(result));
};

export const actionGetInitialCards = (onRenderCards) => {
  api.getInitialCards().then((result) => onRenderCards(result));
};
export const actionLikeCard = (id) => {
  api.likeCard(id);
};
