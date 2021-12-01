// import styled from "styled-components";
// import React from "react";
// // image, button js 참고하기!
// // import plusBtn from "../plusBtn.png";
// // import homeBtn from "../homeBtn.png";
// // import deleteBtn from "../deleteBtn.png";
// //여기에 import 해서 src이용해서 쓰는게 나을지 아니면
// //각각 app.js에서 import 해서 쓰는게 나을지 모르겠다..ㅠㅠ
// //만약 image.js 처럼 src를 준다 그러면 어떤식으로 작성해야 되나?

// const ImageBtn = (props) => {
//   const { _onClick, is_float } = props;
//   if (is_float) {
//     return (
//       <React.Fragment>
//         <FloatImg onClick={_onClick}></FloatImg>
//       </React.Fragment>
//     );
//   }
//   return null;
// };

// ImageBtn.defaultProps = {
//   _onClick: () => {},
//   is_float: false,
// };

// const FloatImg = styled.img`
//   position: fixed;
//   bottom: 50px;
//   right: 16px;
//   width: 50px;
//   height: 50px;
//   box-sizing: border-box;
//   cursor: pointer;
// `;

// export default ImageBtn;
