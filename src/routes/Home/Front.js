import React from "react";
import styled from "styled-components";
import BannerImg from "../../assets/images.jpg";

const Home = styled.div`
  margin: 1px auto;
  width: 100%;
  min-height: calc(100vh - (70px + 44px));
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: url(${BannerImg});
  h2 {
    font-size: 1.5em;
    font-weight: bold;
    text-align: center;
    color: #fff;
  }
  h3 {
    font-size: 1.4em;
    font-weight: normal;
    text-align: center;
    margin-top: 20px;
    color: #fff;
  }
  button {
    display: flex;
    margin: auto;
    margin-top: 30px;
    color: #fff;
    border-radius: 4px;
    background-color: #3f51b5;
  }
`;
export default () => {
  return (
    <Home>
      <h2>Mange Tasks</h2>
      <h3>Find new ways to write tasks to do list, just</h3>
      <a href="/register">
        <button>Sign up for free</button>
      </a>
    </Home>
  );
};
