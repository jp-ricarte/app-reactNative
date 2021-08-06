import React, { useState, useEffect } from "react";
import {
  Button,
  Alert,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useForm, Controller } from "react-hook-form";
import {
  Container,
  Texto,
  TextCard,
  TextInputStyled,
  Forms,
  ModalIten,
  CardItem,
} from "../Receitas/styles";
import api from "../../services/api";
 

export default function Categorias({ navigation }) {

  const { control, handleSubmit, errors } = useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
  
  });

  async function post(data) {
    try {
      await api.post('/categorias', data);
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function get() {
    const res = await api.get('/categorias');
    setData(res.data);
  }

  return ( 
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Container>
        <Button
          onPress={() => setModalVisible(true)}
          title="&#8853; Adicionar"
          color="#01a862"
        />
        {/* {itens.map((item) => (
          <CardItem>
            <TextCard>{item.name}</TextCard>
          </CardItem>
        ))} */}
        <ModalIten
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <Forms>
            <Icon
              onPress={() => setModalVisible(false)}
              name="close"
              size={25}
              style={{
                position: "relative",
                top: -15,
                left: "90%",
                zIndex: 10,
              }}
              color="rgb(1,168,98)"
            />

            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <>
                  <Texto>Nome do Item</Texto>
                  <TextInputStyled
                    onBlur={onBlur}
                    placeholder=""
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    autoFocus={true}
                  />
                </>
              )}
              name="name"
              rules={{ required: true }}
              defaultValue=""
            />
            <Button
              onPress={handleSubmit(post)}
              title="confirmar"
              color="#01a862"
            />
          </Forms>
        </ModalIten>
      </Container>
    </ScrollView>
  );
}