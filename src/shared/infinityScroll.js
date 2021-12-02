import React from "react";
import _ from "lodash";
import { Spinner } from "../elements";

const InfinityScroll = (props) => {
  const { children, callNext, is_next, loading } = props;

  const _handleScroll = _.throttle(() => {
    // console.log("스크롤 되고있엉");
    // console.log(loading);
    if (loading) {
      return;
    }
    const { innerHeight } = window;
    const { scrollHeight } = document.body;

    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    // 도큐먼트에 도큐먼트 엘리먼트가 있니? 아니면 도큐먼트 바디의 탑을 가져와라
    // 둘다 하는 이유는 브라우저마다 지원하는 방식이 다르기 때문이다.
    // console.log(innerHeight, scrollHeight, scrollHeight);

    if (scrollHeight - innerHeight - scrollTop < 200) {
      callNext();
    }
  }, 300);

  const handleScroll = React.useCallback(_handleScroll, [loading]);

  React.useEffect(() => {
    if (loading) {
      return;
    }

    if (is_next) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll); // useEffect에선이벤트 해제는 리턴으로 넘겨서 해제 언마운트와 비슷하게 동작한다 (클린업)
  }, [is_next, loading]);

  return (
    <React.Fragment>
      {props.children}
      {is_next && <Spinner />}
    </React.Fragment>
  );
};

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  is_next: false,
  loading: false,
};

export default InfinityScroll;
