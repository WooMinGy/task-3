// 1. import하기
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import User from "./modules/user";
import Post from "./modules/post";
import Image from "./modules/image";
import Comment from "./modules/comment";

export const history = createBrowserHistory(); // @히스토리 만들기@

// 2. rootreducer 만들기
const rootReducer = combineReducers({
  user: User,
  post: Post,
  image: Image,
  comment: Comment,
  router: connectRouter(history), // @우리가 만든 히스토리와 라우터가 연결된다 - 브라우저 히스토리가 스토어에 다 저장됨!@
});

// 3. 미들웨어 준비
const middlewares = [thunk.withExtraArgument({ history: history })]; // withExtraArgument()는 thunk 안에 내장되어 있는것인데 '다른 인수를 더 넘겨줄게'라고 이해하면 된다.
// 그래서 앞으로 thunk를 사용할 때 (액션생성함수 실행 후 리듀서가 실행되기 전 단계) history를 사용할 수 있게 된다.
// 비동기 갔다와서 .then 하고 history를 받아다 쓸 수 있다.

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

// 4. redux devTools 설정
const composeEnhancers = // JS는 브라우저가 아니어도 돌아가는데 그러면 window객체가 없기때문에 브라우저 일때만 작동하도록 하고 데브툴즈가 깔려있을때만 작동하도록 작성
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

// 5. 미들웨어 묶기 - 지금까지의 미들웨어를 사용한다 하고 묶어준다.
const enhancer = composeEnhancers(applyMiddleware(...middlewares));
// 6. 스토어 만들기 - 미들웨어하고 루트 리듀서를 엮어준다.
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
