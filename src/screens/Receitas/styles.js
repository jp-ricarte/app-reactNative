import styled from "styled-components/native";
 
export const Container = styled.View`
  display: flex;
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
  width: 95%;
  margin-top: 10px;
  padding: 15px;
  border-radius: 5px;
`;

export const TextCard = styled.Text`
  color: #000;
  font-weight: bold;
  font-size: 18px;
`;
export const TextCash = styled.Text`
  color: #3dbd20;
  font-weight: bold;
  font-size: 18px;
`;

export const TextCategory = styled.Text`
  color: #757474;
  font-size: 14px;
`;

export const Texto = styled.Text`
  color: #757474;
  font-weight: 600;
  font-size: 16px;
  margin-top: 10px;
`;

export const TextInputStyled = styled.TextInput`
  padding: 10px;
  padding-left: 10px;
  padding-bottom: 0px;
  margin-bottom: 10px;
  width: 100%;
  color: #000;
  border-bottom-width: 1.5px;
  border-bottom-color: #0477C4;
  font-size: 16px;
`;

export const Select = styled.View`
  padding: 10px;
  padding-left: 0px;
  padding-bottom: 0px;
  margin-bottom: 10px;
  width: 100%;
  color: #000;
  border-bottom-width: 1.5px;
  border-bottom-color: #0477C4;
`;

export const Forms = styled.View`
  display: flex;
  background-color: #fff;
  align-self: center;
  flex-direction: column;
  padding: 25px;
  width: 100%;
  height: 100%;
  shadow-radius: 3.84px;
  elevation: 5;
`;
