import React, { useState, useRef } from "react";
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Button,
  Alert,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  StyleSheet
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
  Select,
  Head,
  TextHead,
  FlexRow,
  ButtonHead,

} from "./styles";
import { Picker } from '@react-native-picker/picker';
import { TextInputMask, TextMask } from 'react-native-masked-text'
import { useFonts, OpenSans_600SemiBold, OpenSans_400Regular } from '@expo-google-fonts/open-sans';
import api from "../../services/api";
import { Header } from "react-native/Libraries/NewAppScreen";
import { TextTitleName } from "../Home/styles";
import LoadingSkeleton from '../../components/LoadingSkeleton';

export default function Despesas({ navigation, itens, addItem }) {
  const { control, handleSubmit, errors } = useForm();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [despesaTotal, setDespesaTotal] = useState();
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState();
  const [money, setMoney] = useState(0);
  const [showDate, setShowDate] = useState(false);
  const [dateValue, setDateValue] = useState();
  const [edit, setEdit] = useState();
  const [objectEdit, setObjectEdit] = useState();
  const [search, setSearch] = useState(false);
  const moneyRef = useRef(null);

  let [fontsLoaded] = useFonts({
    OpenSans_600SemiBold,
    OpenSans_400Regular
  });

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    const value = moment(currentDate).format('DD/MM/YYYY');
    setDateValue(value);
    setDate(currentDate);
    console.log(dateValue);
  };

  async function get() {
    try {
      const res = await api.get('/despesas');
      setData(res.data.despesas);
      setLoading(false);
    } catch (err) {
      console.log(err.response.data);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      get();
      getCategorias();
      getDashboard();

    }, [])
  );

  async function getDashboard() {
    try {
      const res = await api.get('/dashboard');
      setDespesaTotal(res.data[0].despesa);
    } catch (err) {
      console.log(err.response.data);
    }
  }

  async function getCategorias() {
    try {
      const cat = await api.get('/categorias');
      const catDespesas = cat.data.categorias.filter(cat => {
        return !cat.ctg_tipo;
      });
      setCategorias(catDespesas);

    } catch (err) {
      console.log(err.response.data);
    }
  }

  function getEdit(id) {

    const objectSelected = data.find(obj => {
      return obj.despesa_id == id;
    })
    setShowDate(false);
    setMoney(objectSelected.despesa_valor);
    const value = moment(objectSelected.despesa_data).format('DD/MM/YYYY');
    setDateValue(value);
    setSelectedCategoria(objectSelected.despesa_categoria);

    setModalVisible(true);
    setEdit(true);
    setObjectEdit(objectSelected);
  }

  async function patch(data) {
    if (typeof money !== 'number') {
      const moneyUnmask = moneyRef?.current.getRawValue();
      data.despesa_valor = moneyUnmask;
    }
    data.despesa_categoria = selectedCategoria;
    data.despesa_data = date;
    console.log('[objectEdit]', objectEdit);
    console.log('[selectedCategoria]', selectedCategoria);
    console.log('[data]', data);
    try {
      await api.patch(`despesas/${objectEdit.despesa_id}`, data);
      setModalVisible(false);
      setEdit(false);
      setObjectEdit(false);
      get();
      getCategorias();
      getDashboard();
      Toast.show({
        text1: 'Despesa Editada!',
        position: 'bottom'
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function deletar(id) {
    try {
      await api.delete(`despesas/${id}`);
      console.log(data);
      setModalVisible(false);
      setEdit(false);
      setObjectEdit(false);
      get();
      getCategorias();
      getDashboard();
    } catch (err) {
      console.log(err.response.data);
    }
  }

  async function post(data) {
    console.log('??', data);
    try {
      if (categorias.length == 1 || selectedCategoria == undefined) {
        data.despesa_categoria = categorias[0].ctg_id;
      } else {
        data.despesa_categoria = selectedCategoria;
      }
      const moneyUnmask = moneyRef?.current.getRawValue();
      data.despesa_valor = moneyUnmask;
      data.despesa_data = date;
      setMoney(0);
      setDate();
      Toast.show({
        text1: 'Despesa Criada!',
        position: 'bottom'
      });
      await api.post('/despesas', data);

      get();
      getDashboard();
      setModalVisible(false);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <>
        <>
          <Head style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4,
          }}>
            <TextHead>Despesa Total</TextHead>
            <FlexRow>
              <TouchableHighlight style={{ borderRadius: 50 }} activeOpacity={0.5} underlayColor="#dddd" onPress={() => { setModalVisible(true); setEdit(false); setObjectEdit(null); setDateValue() }}>
                <Text><Icon name="add" size={30} color="rgba(4, 119, 196, 1)" /></Text>
              </TouchableHighlight>
              <TextCash> <TextMask value={despesaTotal} type={'money'} /> </TextCash>
              <TouchableHighlight style={{ borderRadius: 50 }} activeOpacity={0.5} underlayColor="#dddd" onPress={() => setSearch(true)}>
                <Text><Icon name="search" size={30} color="rgba(4, 119, 196, 1)" /></Text>
              </TouchableHighlight>
            </FlexRow>

          </Head>

          <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1 }}>

            <Container>
              {loading ? (
                <>
                <CardItem style={{ marginBottom: 6 }}>
                  <LoadingSkeleton />
              </CardItem>
              <CardItem style={{ marginBottom: 6 }}>
              <LoadingSkeleton />
          </CardItem >
          <CardItem style={{ marginBottom: 6 }}>
          <LoadingSkeleton />
      </CardItem>
      </>
              ) : (
                data ? (
                  data.map((r) => (
                    <TouchableHighlight style={{ paddingBottom: 6 }} onPress={() => getEdit(r.despesa_id)} activeOpacity={0.5} underlayColor="#dddd" key={r.despesa_id}>
                      <CardItem>
                        <View>
                          <TextCard>{r.despesa_descricao}</TextCard>
                          <TextCategory>{r.categoria.ctg_nome}</TextCategory>
                          <TextCategory>{r.despesa_data ? moment(r.despesa_data).format('DD/MM') : moment(r.created_at
                          ).format('DD/MM')}</TextCategory>
                        </View>
                        <TextCash>
                          <TextMask
                            value={r.despesa_valor}
                            type={'money'}
                          />
                        </TextCash>
                      </CardItem>
                    </TouchableHighlight>
                  ))
  
                ) : (
                  <Text>Não há despesas :(</Text>
                )
              )}
              <ModalIten
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setObjectEdit(null);
                  setModalVisible(false);
                }}
              >
                <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1 }}>
                  <Forms>
                    <Icon
                      onPress={() => setModalVisible(false)}
                      name="cancel"
                      size={35}
                      style={{
                        position: "relative",
                        top: -15,
                        left: "90%",
                        zIndex: 10,
                      }}
                      color="rgb(4, 119, 196)"
                    />
                    <TextTitleName>{edit ? "Editar " : "Adicionar "}Despesa</TextTitleName>
                    <Select>
                      <Texto>Categoria</Texto>
                      <Picker

                        style={{ height: 30, width: '100%', marginTop: 10, marginLeft: 0, fontSize: 24, }}
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
                          <Texto>Descrição da Despesa</Texto>
                          <TextInputStyled
                            onBlur={onBlur}
                            placeholder=""
                            onChangeText={(value) => onChange(value)}
                            value={value}
                            autoFocus={true}
                            autoCapitalize="characters"

                          />
                        </>
                      )}
                      name="despesa_descricao"
                      rules={{ required: true }}
                      defaultValue={objectEdit ? objectEdit.despesa_descricao : ""}
                    />
                    <Texto>Valor da Despesa</Texto>
                    <Select>
                      <TextInputMask
                        style={{ fontSize: 25 }}
                        type={'money'}
                        value={money}
                        onChangeText={text => setMoney(text)}
                        ref={moneyRef}
                      />
                    </Select>
                    {dateValue && <TextTitleName style={{ textAlign: 'center', marginBottom: 10 }}>{edit && !date ? moment(objectEdit.despesa_data).format('DD/MM/YYYY') : dateValue}</TextTitleName>}
                    <Button
                      onPress={() => setShowDate(true)}
                      title="selecione a data da despesa"
                    />
                    {showDate && (
                      <DateTimePicker

                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onChangeDate}
                      />

                    )}
                    <View style={{ marginTop: 40 }} />
                    {edit ? (
                      <>
                        <Button
                          onPress={handleSubmit(patch)}
                          title="EDITAR"
                        />
                        <View style={{ margin: 10 }}></View>
                        <Button
                          onPress={() => deletar(objectEdit.despesa_id)}
                          title="deletar"
                          color="red"
                        />
                      </>
                    ) : (
                      <Button
                        onPress={handleSubmit(post)}
                        title="confirmar"
                        color="#0477C4"
                      />

                    )}
                  </Forms>
                </ScrollView>
              </ModalIten>
              <ModalIten
                animationType="slide"
                transparent={true}
                visible={search}
                onRequestClose={() => {
                  setSearch(false);
                }}>
                <Forms>
                  <Icon
                    onPress={() => setSearch(false)}
                    name="cancel"
                    size={35}
                    style={{
                      position: "relative",
                      top: -15,
                      left: "90%",
                      zIndex: 10,
                    }}
                    color="rgb(4, 119, 196)"
                  />
                  <TextInputStyled placeholder="Pesquisar Despesa" onChangeText={(value) => onChange(value)} autoFocus={true} autoCapitalize="characters" />
                </Forms>
              </ModalIten>
            </Container>
          </ScrollView>
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </>

    </>
  );
}

const styles = StyleSheet.create({
  font: {
    fontFamily: 'OpenSans_400Regular'
  },

  fontBold: {
    fontFamily: 'OpenSans_600SemiBold'
  },

});