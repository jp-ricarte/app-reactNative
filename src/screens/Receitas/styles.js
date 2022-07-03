import styled from "styled-components/native";
 
export const Container = styled.SafeAreaView`
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 30%;
  margin-bottom: 5%;
  background-color: #fff;
`;

export const Head = styled.View`
  display: flex;
  justify-content: center;
  width: 100%;
  background: #fff;
  height: 15%;
  position: absolute;
  z-index: 1;
`;

export const TextHead = styled.Text`
  color: #000;
  margin-top: 8px;
  font-size: 16px;
  text-align: center;
  `;

export const ButtonHead = styled.Text`
  color: #000;
  margin-top: 25px;
  margin-bottom: 2px;;
  font-size: 16px;
  text-align: center;
  `;

export const FlexRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 7%;
  position: relative;
  top: 17px;
`;

export const ModalIten = styled.Modal`
  display: flex;
  align-self: center;
  background-color: #000;
`;
export const CardItem = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
  background-color: #fff;
  width: 95%;
  margin-top: 10px;
  padding: 15px;
  border-radius: 5px;
`;

export const TextCard = styled.Text`
  color: #000;
  font-size: 16px;
`;

export const TextMonth = styled.Text`
  color: #000;
  font-size: 20px;
`;

export const TextCash = styled.Text`
  color: #3dbd20;
  font-size: 18px;
`;

export const TextCategory = styled.Text`
  color: #757474;
  font-size: 13px;
`;

export const Texto = styled.Text`
  color: #757474;
  font-weight: 600;
  font-size: 16px;
  margin-top: 10px;
`;

export const TextInputStyled = styled.TextInput`
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  width: 100%;
  color: #000;
  font-size: 18px;
  background-color: #f4f4f4;
  `;
  
  export const Select = styled.View`
  padding: 10px;
  padding-bottom: 40px;
  border-radius: 10px;
  margin-bottom: 10px;
  font-size: 20px;
  width: 100%;
  color: #000;
  background-color: #f4f4f4;
  `;

export const InputCash = styled.View`
padding: 20px;
border-radius: 10px;
margin-bottom: 10px;
font-size: 20px;
width: 100%;
color: #000;
background-color: #f4f4f4;
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
