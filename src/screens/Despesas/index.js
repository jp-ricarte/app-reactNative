import React, { useState, useEffect, useRef } from "react";
import moment from 'moment';
import {
    Button,
    Alert,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    ActivityIndicator
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

import api from "../../services/api";

export default function Despesas({ navigation, itens, addItem }) {
    const { control, handleSubmit, errors } = useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [despesaTotal, setDespesaTotal] = useState();
    const [categorias, setCategorias] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState();
    const [money, setMoney] = useState();
    const moneyRef = useRef(null);

    async function get() {
        try {
            const res = await api.get('/despesas');
            setData(res.data.despesas);
        } catch (err) {
            console.log(err.response.data);
        }
    }

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
            const catReceitas = cat.data.categorias.filter(cat => {
                return !cat.ctg_tipo;
            });
            setCategorias(catReceitas);
        } catch (err) {
            console.log(err.response.data);
        }
    }



    useEffect(() => {
        get();
        getCategorias();
        getDashboard();
    }, [data]);

    async function post(data) {
        try {
            if (categorias.length == 1 || selectedCategoria == undefined) {
                data.despesa_categoria = categorias[0].ctg_id;
            } else {
                data.despesa_categoria = selectedCategoria;
            }
            const moneyUnmask = moneyRef?.current.getRawValue();
            data.despesa_valor = moneyUnmask;
            console.log(data)
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
                    <TouchableHighlight style={{borderRadius: 50}} activeOpacity={0.5} underlayColor="#dddd" onPress={() => setModalVisible(true)}>
                        <Text><Icon name="add" size={30} color="rgba(4, 119, 196, 1)" /></Text>
                    </TouchableHighlight>
                    <TextCash> <TextMask value={despesaTotal} type={'money'} /> </TextCash> 
                    <TouchableHighlight style={{borderRadius: 50}} activeOpacity={0.5} underlayColor="#dddd" onPress={() => setModalVisible(true)}>
                        <Text><Icon name="search" size={30} color="rgba(4, 119, 196, 1)" /></Text>
                    </TouchableHighlight>
                </FlexRow>
                
            </Head>
            <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1 }}>
                <Container>
                    {data ? (
                        data.map((r) => (
                            <CardItem key={r.despesa_id}>
                                <View>
                                    <TextCard>{r.despesa_descricao}</TextCard>
                                    <TextCategory>{r.categoria.ctg_nome}</TextCategory>
                                    <TextCategory>{moment(r.created_at).format('DD/MM')}</TextCategory>
                                </View>
                                <TextCash>
                                    - {''}
                                    <TextMask
                                        value={r.despesa_valor}
                                        type={'money'}
                                    />
                                </TextCash>
                            </CardItem>
                        ))

                    ) : (
                        <Text>Não há despesas :)</Text>
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
                                defaultValue=""
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
                            <Button
                                onPress={handleSubmit(post)}
                                title="confirmar"
                                color="#0477C4"
                            />
                        </Forms>
                    </ModalIten>
                </Container>
            </ScrollView>
        </>
    );
}