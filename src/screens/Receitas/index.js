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
    TextHead

} from "./styles";
import { Picker } from '@react-native-picker/picker';
import { TextInputMask, TextMask } from 'react-native-masked-text'

import api from "../../services/api";
import { Header } from "react-native/Libraries/NewAppScreen";

export default function Receitas({ navigation, itens, addItem }) {
    const { control, handleSubmit, errors } = useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState();
    const [money, setMoney] = useState();
    const moneyRef = useRef(null);

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
            console.log(categorias);
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
            setModalVisible(false);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <>
                    <Head>
                        <TextHead>Receita Total</TextHead>
                    </Head>
            <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1 }}>
                <Container>
                    {data ? (
                        data.map((r) => (
                            <CardItem key={r.receita_id}>
                                <View>
                                    <TextCard>{r.receita_descricao}</TextCard>
                                    <TextCategory>{r.categoria.ctg_nome}</TextCategory>
                                    <TextCategory>{moment().format('DD/MM')}</TextCategory>
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
                </Container>
            </ScrollView>
        </>
    );
}