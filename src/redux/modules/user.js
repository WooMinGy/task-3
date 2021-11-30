import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

// actions
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";

// action creators
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

// initialState
const initialState = {
  user: null,
  is_login: false,
};

// middleware actions
const loginAction = (user) => {
  return function (dispatch, getState, { history }) {
    console.log(history);
    dispatch(logIn(user));
    history.push("/");
  };
};

// reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success"); // 뒤에는 토큰이 들어갈 자리!
        draft.user = action.payload.user; // draft를 쓰면 알아서 불변성을 관리해 준다. 이때 createAction 패키지를 쓰면 중간에 payload(우리의 데이터가 담기는 곳)를 거쳐야 함
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
); // initialState 넣는것을 까먹으면 안된다~

// action creator export
const actionCreators = {
  logIn,
  logOut,
  getUser,
  loginAction,
};

export { actionCreators };

// redux-actions 패키지를 쓸 때
// const logIn = createAction(LOG_IN, (user) => ({user}));

// const reducer = handleActions({
//   [LOG_IN]: (state, action) => {

//   },
// }, {}); 마지막 중괄호는 initialState가 들어가는 자리이다.

// redux-actions 패키지를 쓰기 전
// 액션생성함수
// const logIn= (user) =>{
//   return {
//     type: LOG_IN,
//     user
//   }
// }
// 리듀서 부분
// const reducer = () => {
//   switch(action.type){
//     case "LOG_IN" : {
//       state.user = action.user;
//     }
//   }
// }
