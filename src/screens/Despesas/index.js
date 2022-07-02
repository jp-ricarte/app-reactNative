import React, { useState, useRef, useEffect } from "react";
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
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useForm, Controller } from "react-hook-form";
import {
  Texto,
  Container,
  TextCard,
  TextCash,
  TextCategory,
  Forms,
  ModalIten,
  CardItem,
  ButtonAdd,
  Head,
  TextHead,
  FlexRow,
  ButtonHead,

} from "./styles";
import { InputCash, TextInputStyled, Select } from "../Receitas/styles";
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
  const [nameSearched, setNameSearched] = useState('');
  const [showDate, setShowDate] = useState(false);
  const [dateValue, setDateValue] = useState();
  const [edit, setEdit] = useState();
  const [objectEdit, setObjectEdit] = useState();
  const [search, setSearch] = useState(false);
  const [filtrada, setFiltrada] = useState([]);
  const [month, setMonth] = useState(moment().format('MMMM'));
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
    const idUser = await AsyncStorage.getItem('id');
    setLoading(true);
    try {
      const res = await api.get(`/despesas/${idUser}`);
      setData(res.data.despesas);
      setLoading(false);
    } catch (err) {
      console.log(err.response.data);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      const despesasFiltradas = data.filter(despesa => {
        return despesa.despesa_descricao.toLowerCase().includes(nameSearched.toLowerCase());
      });
      setFiltrada(despesasFiltradas);

      get();
      getCategorias();
      getDashboard();

    }, [nameSearched])
  );

  useEffect(() => {
    get();
  }, [])

  async function getDashboard() {
    const idUser = await AsyncStorage.getItem('id');
    try {
      const res = await api.get(`/dashboard/${idUser}`);
      setDespesaTotal(res.data[0].despesaMensal);
    } catch (err) {
      console.log(err.response.data);
    }
  }

  async function getCategorias() {
    const idUser = await AsyncStorage.getItem('id');
    try {
      const cat = await api.get(`/categorias/${idUser}`);
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
      get(month);
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
    const idUser = await AsyncStorage.getItem('id');
    try {
      if (categorias.length == 1 || selectedCategoria == undefined) {
        data.despesa_categoria = categorias[0].ctg_id;
      } else {
        data.despesa_categoria = selectedCategoria;
      }
      const moneyUnmask = moneyRef?.current.getRawValue();
      data.despesa_valor = moneyUnmask;
      data.despesa_data = date;
      Toast.show({
        text1: 'Despesa Criada!',
        position: 'bottom'
      });
      setMoney(0);
      setDate(new Date());
      setDateValue();
      await api.post(`/despesas/${idUser}`, data);

      get(month);
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
          <TextHead><TextCash> <TextMask value={despesaTotal} type={'money'} /> </TextCash></TextHead>
          <FlexRow>
            <TouchableHighlight style={{ borderRadius: 50 }} activeOpacity={0.5} underlayColor="#dddd" onPress={() => { setModalVisible(true); setEdit(false); setObjectEdit(null); setDateValue(); setMoney(0) }}>
              <Text><Icon name="add" size={30} color="rgba(4, 119, 196, 1)" /></Text>
            </TouchableHighlight>
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
                        <TextCategory>{r.ctg_nome}</TextCategory>
                        <TextCategory>{r.despesa_data ? moment(r.despesa_data).format('DD/MM/YYYY') : moment(r.created_at
                        ).format('DD/MM/YYYY')}</TextCategory>
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
                  <Texto>Categoria</Texto>
                  <Select>
                    <Picker

                      style={{ height: 30, width: '100%', marginLeft: 0, fontSize: 27, paddingBottom: 20 }}
                      selectedValue={selectedCategoria}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectedCategoria(itemValue)
                      }>

                      {categorias.map((ctg) => (
                        <Picker.Item key={ctg.ctg_id} style={{fontSize: 20}} label={ctg.ctg_nome} value={ctg.ctg_id} />
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
                  <InputCash>
                    <TextInputMask
                      style={{ fontSize: 21 }}
                      type={'money'}
                      value={money}
                      onChangeText={text => setMoney(text)}
                      ref={moneyRef}
                    />
                  </InputCash>
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
              <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1 }}>
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
                  <TextInputStyled placeholder="Pesquisar Despesa" onChangeText={(value) => setNameSearched(value)} autoFocus={true} autoCapitalize="characters" />
                  {filtrada.map((r) => (
                    <TouchableHighlight style={{ paddingBottom: 6 }} onPress={() => getEdit(r.despesa_id)} activeOpacity={0.5} underlayColor="#dddd" key={r.despesa_id}>
                      <CardItem>
                        <View>
                          <TextHead>{r.despesa_mes}</TextHead>
                          <TextCard>{r.despesa_descricao}</TextCard>
                          <TextCategory>{r.ctg_nome}</TextCategory>
                          <TextCategory>{r.despesa_data ? moment(r.despesa_data).format('DD/MM/YYYY') : moment(r.created_at
                          ).format('DD/MM/YYYY')}</TextCategory>
                        </View>
                        <TextCash>
                          <TextMask
                            value={r.despesa_valor}
                            type={'money'}
                          />
                        </TextCash>
                      </CardItem>
                    </TouchableHighlight>
                  ))}
                </Forms>
              </ScrollView>
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