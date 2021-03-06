import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";
import { Button } from "../elements";
import { storage } from "./firebase";

const Upload = () => {
  const dispatch = useDispatch();
  const is_uploading = useSelector((state) => state.image.uploading); // 업로딩중 파일선택 비활성화 시키기
  const fileInput = React.useRef();

  const selectFile = (e) => {
    console.log(e);
    console.log(e.target);
    console.log(e.target.files[0]); // 밑에 fileInput값과 같은지 확인하기

    console.log(fileInput.current.files[0]); // 인풋에 ref잡아서 했을때도 값이 잘 나오는지 확인

    const reader = new FileReader(); //자바스크립트에 있는것
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      // 읽기가 끝나면 발생하는 이벤트 핸들러
      // console.log(reader.result); 파일리더로 읽어온 이미지의 내용물
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  const uploadFB = () => {
    let image = fileInput.current.files[0];
    dispatch(imageActions.uploadImageFB(image));
  };

  return (
    <React.Fragment>
      <input
        type="file"
        onChange={selectFile}
        ref={fileInput}
        disabled={is_uploading} // // 업로딩중 파일선택 비활성화 시키기
      />
      <Button _onClick={uploadFB}>업로드 하기</Button>
    </React.Fragment>
  );
};

export default Upload;
