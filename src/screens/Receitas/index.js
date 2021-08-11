import React, { useState, useEffect } from "react";
import moment from 'moment';
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
  Texto,
  Container,
  TextCard,
  TextCash,
  TextCategory,
  TextInputStyled,
  Forms,
  ModalIten,
  CardItem,
  ButtonAdd,
  Select
} from "./styles";
import { Picker } from '@react-native-picker/picker';

import api from "../../services/api";

export default function Receitas({ navigation, itens, addItem }) {
  const { control, handleSubmit, errors } = useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState();

  async function get() {
    try {
      const res = await api.get('/receitas');
      setData(res.data.receitas);
    } catch (err) {
      console.log(err.response.data);
    }
  }



  async function getCategorias() {
    try {
      const cat = await api.get('/categorias');
      setCategorias(cat.data.categorias);
    } catch (err) {
      console.log(err.response.data);
    }
  }



  useEffect(() => {
    get();
    getCategorias();
  }, []);

  async function post(data) {
    try {
      data.receita_categoria = selectedCategoria;
      console.log(data)
      await api.post('/receitas', data);
      get();
      setModalVisible(false);
    } catch (error) {
      console.log(error.response.data);
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
        {data.map((r) => (
          <CardItem key={r.receita_id}>
            <TextCard>{r.receita_descricao}</TextCard>
            <TextCategory>{r.categoria.ctg_nome}</TextCategory>
            <TextCash>R$ {r.receita_valor}</TextCash>
            <TextCategory>{moment().format('DD/MM')}</TextCategory>
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
                top: -15,
                left: "90%",
                zIndex: 10,
              }}
              color="rgb(4, 119, 196)"
            />

            <Select>
              <Texto>Categoria</Texto>
              <Picker
                style={{ height: 30, width: '100%', marginTop: 10, marginLeft: 0 }}
                selectedValue={selectedCategoria}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedCategoria(itemValue)
                }>

                {categorias.map((ctg) => (
                  <Picker.Item key={ctg.ctg_id} label={ctg.ctg_nome} value={ctg.ctg_id} />
                ))}

              </Picker>
            </Select>

            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <>
                  <Texto>Nome da Receita</Texto>
                  <TextInputStyled
                    onBlur={onBlur}
                    placeholder=""
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    autoFocus={true}

                  />
                </>
              )}
              name="receita_descricao"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <>
                  <Texto>Valor da Receita</Texto>
                  <TextInputStyled
                    onBlur={onBlur}
                    keyboardType='numeric'
                    placeholder=""
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    autoFocus={true}

                  />
                </>
              )}
              name="receita_valor"
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