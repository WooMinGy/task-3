import React from "react";
import styled from "styled-components";

import { Text, Grid } from "./index";

const Input = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    multiLine,
    value,
    is_submit,
    onSubmit,
  } = props;

  if (multiLine) {
    return (
      <Grid>
        {label ? "" : <Text margin="0px">{label}</Text>}
        <ElTextarea
          rows={10} // 텍스트 인풋 10줄
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
        ></ElTextarea>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        {label ? "" : <Text margin="0px">{label}</Text>}
        {is_submit ? (
          <ElInput
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
            value={value}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit(e);
              }
            }}
          />
        ) : (
          <ElInput type={type} placeholder={placeholder} onChange={_onChange} />
        )}
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.", // 아무것도 안들어가 있을때 input에 써져있을 값
  type: "text",
  value: "",
  is_submit: false,
  _onChange: () => {}, // 부모가 얘가 바뀔때 알기를 원하기 때문에 콜백함수를 써준다
  onSubmit: () => {},
};

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const ElInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default Input;
