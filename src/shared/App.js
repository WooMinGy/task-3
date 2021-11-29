import React from "react";
import styled from "styled-components";
import { BrowserRouter, Route } from "react-router-dom";
import PostList from "../pages/PostList";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Route path="/" exact component={PostList}></Route>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
