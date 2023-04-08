import { api } from '../components/api';

export const actionGetUserInfo = (onChange) => {
  api.getUserInfo().then((result) => onChange(result));
};

export const actionGetInitialCards = (onRenderCards) => {
  api.getInitialCards().then((result) => onRenderCards(result));
};

export const actionLikeCard = (id, hasLike) => {
  if (!hasLike) {
    return api.likeCard(id);
  }
  return api.dislikeCard(id);
};

export const actionDeleteCard = (id) => {
  api.deleteCard(id);
};

// export const actionDislikeCard = (id) => {
//   api.dislikeCard(id);
// };
