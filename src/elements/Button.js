import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { text, _onClick, is_float, children, margin, width, padding } = props;
  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{text ? text : children}</FloatButton>
      </React.Fragment>
    );
  } // 버튼이미지 참고. 로그인 했을때만 보이는 글쓰기 버튼

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
  };

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick}>
        {text ? text : children}
      </ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text: false,
  children: null,
  _onClick: () => {},
  is_float: false,
  margin: false,
  width: "100%",
  padding: "12px 0px",
};

const ElButton = styled.button`
  width: ${(props) => props.width};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  background-color: #212121;
  color: #ffffff;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: none;
  cursor: pointer;
`;

const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #212121;
  color: #ffffff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 16px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
  cursor: pointer;
`; // 버튼 이미지 참고.

export default Button;
