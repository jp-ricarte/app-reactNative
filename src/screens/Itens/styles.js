import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;

  background-color: #fff;
  width: 100%;
  height: 100%;
`;
export const ModalIten = styled.Modal`
  display: flex;
  align-self: center;
  background-color: #000;
`;
export const CardItem = styled.View`
  display: flex;
  align-self: center;
  background-color: #fff;
  width: 90%;
  margin-top: 10px;
  padding: 20px;
  border-radius: 20px;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const TextCard = styled.Text`
  color: #01a862;
  font-weight: bold;
`;

export const Texto = styled.Text`
  color: #757474;
  font-weight: 600;
`;

export const TextInputStyled = styled.TextInput`
  padding: 10px;
  padding-left: 0px;
  padding-bottom: 0px;
  margin-bottom: 10px;
  width: 100%;
  color: #000;
  border-bottom-width: 2px;
  border-bottom-color: #01a862;
`;

export const Forms = styled.View`
  margin-top: 50px;
  display: flex;
  background-color: #fff;
  align-self: center;
  flex-direction: column;
  padding: 25px;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  shadow-radius: 3.84px;
  elevation: 5;
`;
