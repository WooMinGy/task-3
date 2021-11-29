import React from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Container>하이</Container>
    </div>
  );
}

const Container = styled.div`
  max-width: 350px;
  min-height: 85vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

export default App;
