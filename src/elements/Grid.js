import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { is_flex, width, margin, padding, bg, children, center } = props;

  const styles = {
    is_flex: is_flex,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
  }; // 스타일을 담당하는애가 스타일쪽 코드에 들어가있는거 맘에 안들면 이렇게 하도록ㅋ

  return (
    <React.Fragment>
      <GridBox {...styles}>{children}</GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box; // 패딩이나 보더도 사이즈에 포함 할껀지 정하는 css
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) =>
    props.bg
      ? `background-color: ${props.bg};`
      : ""}  // props.bg가 있으면 쓰고 없으면 안쓴다.

  ${(props) =>
    props.is_flex
      ? `display:flex; align-items: center; justify-content: flex-start;`
      : ""}
  ${(props) => (props.center ? "text-align: center" : "")}
`;

export default Grid;
