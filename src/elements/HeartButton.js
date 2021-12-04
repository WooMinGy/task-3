import React from "react";
import styled from "styled-components";

import red_heart from "../imageIcon/redHeart.png";
import empty_heart from "../imageIcon/emptyHeart.png";

const HeartButton = (props) => {
  return (
    <React.Fragment>
      <Heart></Heart>
    </React.Fragment>
  );
};

const Heart = styled.div``;

export default HeartButton;
