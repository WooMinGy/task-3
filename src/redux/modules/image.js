import { createAction, handleActions } from "redux-actions";
import produce from "immer";

import { storage } from "../../shared/firebase";

const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";

const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

const initialState = {
  image_url: "",
  uploading: false,
  preview: null,
};

const uploadImageFB = (image) => {
  return function (dispatch, getState) {
    dispatch(uploading(true));

    const _upload = storage.ref(`images/${image.name}`).put(image);
    // const _upload = storage.ref(`images/${image.name}`).put(image); // 참조 만들어주기

    _upload.then((snapshot) => {
      // dispatch(uploading(false)); // 여기서 업로드가 끝이 나야 한다. 그래서 여기서 써도 되지만 한번이라도 dispatch를 덜 하기위해 리듀서로 고고!
      snapshot.ref.getDownloadURL().then((url) => {
        dispatch(uploadImage(url));
      });
    });
  };
};

export default handleActions(
  {
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image_url = action.payload.image_url;
        draft.uploading = false; // 여기서 업로드를 끝내자!
      }),
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initialState
);

const actionCreators = {
  uploadImage,
  uploadImageFB,
  setPreview,
};

export { actionCreators };
