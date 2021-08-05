import styled from "styled-components/native";

export const Titulo = styled.Text`
  display: flex;
  text-align: center;
  justify-content: center;
  color: #fff;
  font-size: 30px;
  margin-bottom: 85px;
  font-weight: 700;
`;

export const TextInputStyled = styled.TextInput`
  padding: 10px;
  padding-left: 15px;

  width: 90%;
  color: #000;
`;

export const Email = styled.View`
  background-color: #e3e3e3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding-left: 15px;
  border-radius: 50px;
  margin-bottom: 10px;
  width: 90%;
  padding-right: 20px;
`;

export const Senha = styled.View`
  background-color: #e3e3e3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding-left: 20px;
  border-radius: 50px;
  margin-bottom: 10px;
  width: 90%;
  padding-right: 20px;
`;

export const ViewButton = styled.View`
  background-color: #0477C4;
  border-radius: 50px;
  margin: 5px 0;
  margin-top: 15px;
  width: 90%;
  color: #fff;
`;

export const ButtonLogin = styled.TouchableOpacity`
  width: 100%;
  color: #fff;
  padding: 10px;
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TextLogin = styled.Text`
  color: #fff;
  font-family: sans-serif;
  font-size: 18px;
  font-weight: 600;
`;
