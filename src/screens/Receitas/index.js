import React, { useState, useRef } from "react";
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
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

export default function Receitas({ navigation, itens, addItem }) {
    const { control, handleSubmit, errors } = useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [receitaTotal, setReceitaTotal] = useState();
    const [categorias, setCategorias] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState();
    const [money, setMoney] = useState();
    const [search, setSearch] = useState(false);
    const moneyRef = useRef(null);

    let [fontsLoaded] = useFonts({
        OpenSans_600SemiBold,
        OpenSans_400Regular
      });
    

    async function get() {
        try {
            const res = await api.get('/receitas');
            setData(res.data.receitas);
        } catch (err) {
            console.log(err.response.data);
        }
    }

    async function getDashboard() {
        try {
            const res = await api.get('/dashboard');
            setReceitaTotal(res.data[0].receita);
        } catch (err) {
            console.log(err.response.data);
        }
    }

    async function getCategorias() {
        try {
            const cat = await api.get('/categorias');
            const catReceitas = cat.data.categorias.filter(cat => {
                return cat.ctg_tipo;
            });
            setCategorias(catReceitas);

        } catch (err) {
            console.log(err.response.data);
        }
    }


    // useEffect(() => {
    //     get();
    //     getCategorias();
    //     getDashboard();
    // }, []);

    useFocusEffect(
        React.useCallback(() => {
            get();
            getCategorias();
            getDashboard();
        }, [])
    );


    async function post(data) {
        try {
            if (categorias.length == 1 || selectedCategoria == undefined) {
                data.receita_categoria = categorias[0].ctg_id;
            } else {
                data.receita_categoria = selectedCategoria;
            }
            const moneyUnmask = moneyRef?.current.getRawValue();
            data.receita_valor = moneyUnmask;
            console.log(data)
            await api.post('/receitas', data);
            get();
            getDashboard();
            setModalVisible(false);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    return (
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
                <TextHead>Receita Total</TextHead>
                <FlexRow>
                    <TouchableHighlight style={{ borderRadius: 50 }} activeOpacity={0.5} underlayColor="#dddd" onPress={() => setModalVisible(true)}>
                        <Text><Icon name="add" size={30} color="rgba(4, 119, 196, 1)" /></Text>
                    </TouchableHighlight>
                    <TextCash> <TextMask value={receitaTotal} type={'money'} /> </TextCash>
                    <TouchableHighlight style={{ borderRadius: 50 }} activeOpacity={0.5} underlayColor="#dddd" onPress={() => setSearch(true)}>
                        <Text><Icon name="search" size={30} color="rgba(4, 119, 196, 1)" /></Text>
                    </TouchableHighlight>
                </FlexRow>

            </Head>
            <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1 }}>
                <Container>
                    {data ? (
                        data.map((r) => (
                            <CardItem key={r.receita_id}>
                                <View>
                                    <TextCard>{r.receita_descricao}</TextCard>
                                    <TextCategory>{r.categoria.ctg_nome}</TextCategory>
                                    <TextCategory>{moment(r.created_at).format('DD/MM')}</TextCategory>
                                </View>
                                <TextCash>
                                    <TextMask
                                        value={r.receita_valor}
                                        type={'money'}
                                    />
                                </TextCash>
                            </CardItem>
                        ))

                    ) : (
                        <Text>Não há receitas :(</Text>
                    )}
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
                            <TextTitleName>Adicionar Receita</TextTitleName>
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
                                        <Texto>Descrição da Receita</Texto>
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
                                name="receita_descricao"
                                rules={{ required: true }}
                                defaultValue=""
                            />
                            <Texto>Valor da Receita</Texto>
                            <Select>
                                <TextInputMask
                                    style={{ fontSize: 25 }}
                                    type={'money'}
                                    value={money}
                                    onChangeText={text => setMoney(text)}
                                    ref={moneyRef}
                                />
                            </Select>
                            <Button
                                onPress={handleSubmit(post)}
                                title="confirmar"
                                color="#0477C4"
                            />
                        </Forms>
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
                            <TextInputStyled placeholder="Pesquisar Receita" onChangeText={(value) => onChange(value)} autoFocus={true} autoCapitalize="characters" />
                        </Forms>
                    </ModalIten>
                </Container>
            </ScrollView>
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