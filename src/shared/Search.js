import React from "react";
import _ from "lodash";

// debounce와 throttle 예시!
const Search = () => {
  const [text, setText] = React.useState("");

  const debounce = _.debounce((e) => {
    console.log("debounce :::", e.target.value); //"debounce :::" 부분이 없으면 onChange 함수에 debounce(throttle도 포함)를 넣어서 실행할때 실행이 안됨
  }, 1000); // 뒤에 시간만큼 뒤에 실행

  const throttle = _.throttle((e) => {
    console.log("throttle :::", e.target.value);
  }, 1000); // input의 onChange에 한번씩 넣어서 작동시켜 보기

  const keyPress = React.useCallback(debounce, []); // 앞은 함수, 뒤는 조건으로 useEffect와 흡사하다.
  // 함수를 저장(memorization)해서 컴포넌트가 리랜더링이 되더라도 함수를 초기화 하지 않도록 하는 함수이다.

  const onChange = (e) => {
    setText(e.target.value);
    keyPress(e);
  }; // 여기는 함수형이기 때문에 리랜더링이 될때마다 계속 실행되게 되어서 제 기능을 못한다.
  // 리덕스에서 데이터를 가져다 쓸 때도 리랜더링이 되기 때문에 이와같이 오류가 나는데 이럴땐 useCallback 함수를 써야한다!

  return (
    <div>
      <input type="text" onChange={onChange} value={text} />
    </div>
  );
};

export default Search;

// debounce는 같은 이벤트가 계속 진행될때 마지막 이벤트가 끝나는 시점으로 부터 지정한 시간 뒤에 실행
// throttle은 일정 시간마다 한번씩 이벤트 실행
