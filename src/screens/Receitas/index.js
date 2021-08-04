import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
  ButtonAdd
} from "./styles";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

export default function Receitas({ navigation, itens, addItem }) {

  const { control, handleSubmit, errors } = useForm();
  const [modalVisible, setModalVisible] = useState(false);

  // useEffect(() => {
  //
  // });

  function post(data) {
    try {
      console.log(data);

      setModalVisible(false);
    } catch (error) {
      console.log(data);
      console.log(error);
    }
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
              onPress={() => addItem({ name: "Joao" })}
              title="confirmar"
              color="#01a862"
            />
          </Forms>
        </ModalIten>
      </Container>
    </ScrollView>
  );
}