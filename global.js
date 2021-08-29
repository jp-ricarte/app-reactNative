import styled from "styled-components/native";
import { createGlobalStyle } from 'styled-components';

export const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  width: 100%;
  height: 100%;
`;

export const TextInputStyled = styled.TextInput`
  padding: 10px;
  padding-bottom: 0px;
  margin-bottom: 10px;
  width: 100%;
  color: #000;
  border-bottom-width: 1.5px;
  border-bottom-color: #0477C4;
`;
