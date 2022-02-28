import { Link } from "react-router-dom";
import styled from "styled-components";

export const Page = styled(Link)`
  // padding: 8px 0 8px 8px;
  display: flex;
  // border: 1px solid black;
  // margin-bottom: 8px;
  text-align: center;
  text-decoration: none;
  color: black;
  // background: #e8e8e9;
  border-radius: 8px;

  :visited {
    color: black;
  }

  // :hover {
  //   background: #f3f4f4;
  // }
`;
