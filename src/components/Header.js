import React from "react";
import { Grid, Text, Button } from "../elements";
import { getCookie, deleteCookie } from "../shared/Cookie";

import { useSelector, useDispatch } from "react-redux"; // 스토어에 있는걸 가져와서 쓸 수 있게 import해주기
import { actionCreators as userActions } from "../redux/modules/user";

import Permit from "../shared/Permit";
import { history } from "../redux/configureStore";
import { apiKey } from "../shared/firebase";

const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;

  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  // console.log(is_session);

  if (is_login && is_session) {
    //두 조건이 true일 경우에만 실행
    return (
      <React.Fragment>
        <Grid is_flex padding="4px 16px">
          <Grid>
            <Text margin="0px" size="24px" bold>
              헬로
            </Text>
          </Grid>

          <Grid is_flex>
            <Button text="내 정보"></Button>
            <Button
              _onClick={() => {
                history.push("/noti");
              }}
              text="알림"
            ></Button>
            <Button
              text="로그아웃"
              _onClick={() => {
                dispatch(userActions.logoutFB()); // 처음 만들때 온클릭하고 페이지에서 로그아웃 버튼을 눌러 쿠키만 날린다고 리랜더링이 되는건 아니기 때문에 페이지에서 새로고침을 해서 확인하자!
              }}
            ></Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid is_flex padding="4px 16px">
        <Grid>
          <Text margin="0px" size="24px" bold>
            헬로
          </Text>
        </Grid>

        <Grid is_flex>
          <Button
            text="로그인"
            _onClick={() => {
              history.push("/login");
            }}
          ></Button>
          <Button
            text="회원가입"
            _onClick={() => {
              history.push("/signup");
            }}
          ></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Header.defaultProps = {};

export default Header;
