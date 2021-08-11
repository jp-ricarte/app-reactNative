import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Alert,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useForm, Controller } from "react-hook-form";
import { Picker } from '@react-native-picker/picker';
import {
  Container,
  Texto,
  TextCard,
  TextInputStyled,
  Forms,
  ModalIten,
  CardItem,
  Select
} from "../Receitas/styles";
import api from "../../services/api";

export default function Categorias({ navigation }) {
  const [selectedLanguage, setSelectedLanguage] = useState(true);
  const { control, handleSubmit, errors } = useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);

  async function get() {
    try {
      const res = await api.get('/categorias');
      setData(res.data.categorias);
    } catch(err) {
      console.log(err.response.data); 
    }
  }

  useEffect(() => {
    get();
  }, []);

  async function post(data) {
    try {
      data.ctg_tipo = selectedLanguage;
      console.log(data)
      await api.post('/categorias', data);
      get();
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Container>
        <Button
          onPress={() => setModalVisible(true)}
          title="&#8853; Adicionar"
          color="#0477C4"
        />
        {data.map((ctg) => (
          <CardItem key={ctg.ctg_id}>
            <TextCard>{ctg.ctg_nome}</TextCard>
          </CardItem>
        ))}
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
              size={35}
              style={{
                position: "relative",
                top: -10,
                left: "90%",
                zIndex: 10,
              }}
              color="rgb(4, 119, 196)"
            />

            <Select>
              <Texto>Tipo da Categoria</Texto>
              <Picker
                style={{ height: 30, width: '100%', marginTop: 10, marginLeft: 0 }}
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }>
                <Picker.Item label="Receita" value="true" />
                <Picker.Item label="Despesa" value="false" />
              </Picker>
            </Select>

            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <>
                  <Texto>Nome da Categoria</Texto>
                  <TextInputStyled
                    onBlur={onBlur}
                    placeholder=""
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    autoFocus={true}
                  />
                </>
              )}
              name="ctg_nome"
              rules={{ required: true }}
              defaultValue=""
            />


            <Button
              onPress={handleSubmit(post)}
              title="confirmar"
              color="#0477C4"
            />
          </Forms>
        </ModalIten>
      </Container>
    </ScrollView>
  );
}