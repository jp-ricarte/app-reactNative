import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  padding-top: 15%;
  background-color: #fff;
`;

export const FlexRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ViewIcon = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  justify-content: space-between;
`;

export const TextTitle = styled.Text`
  color: #000;
  font-size: 25px;
`;

export const TextTitleName = styled.Text`
  color: #000;
  font-size: 25px;
  font-weight: bold;
`;

export const Wellcome = styled.View`
  background-color: #fff;
  margin: 10px;
  margin-top: 5px;
  padding: 15px;
`;

export const CardReceitaDespesa = styled.View`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  margin: 10px;
  margin-top: 5px;
`;

export const TextCash = styled.Text`
  color: #3dbd20;
  font-size: 25px;
`;

export const TextCashRed = styled.Text`
  color: red;
  font-size: 25px;
`;