import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, Alert, Picker } from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native';

const Formulario = ({ moneda, criptomoneda, setMoneda, setCriptomoneda, setConsultarAPI }) => {
    
    const [ criptomonedas, setCriptomonedas ] = useState([]);

    useEffect(() => {   
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            setCriptomonedas(resultado.data.Data);
        }     
        consultarAPI();
    }, []);    

    const obtenerMoneda = moneda => {
        setMoneda(moneda);
    }

    const obtenerCriptomoneda = criptomoneda => {
        setCriptomoneda(criptomoneda);
    }

    const cotizarPrecio = () => {
        if (moneda.trim() === '' && criptomoneda.trim() === '') {
            alerta();
            return;
        }

        setConsultarAPI(true);
    }

    const alerta = () => {
        Alert.alert(
            'Error en la cotización',
            'Los campos moneda y criptomoneda no pueden estar vacíos, ' + 
            'favor de seleccionar ambos valores',
            [
                { text: 'OK' }
            ],
        );
    }

    return ( 

        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
                selectedValue={moneda}
                onValueChange={ moneda => obtenerMoneda(moneda) }
            >
                <Picker.Item label="Seleccione la moneda" value="" /> 
                <Picker.Item label="Dolar de Estados Unidos" value="USD" /> 
                <Picker.Item label="Peso Mexicano" value="MXN" /> 
                <Picker.Item label="Euro" value="EUR" /> 
                <Picker.Item label="Libra Esterlina" value="GBP" /> 
            </Picker>

            <Text style={styles.label}>criptomoneda</Text>
            <Picker
                selectedValue={criptomoneda}
                onValueChange={ criptomoneda => obtenerCriptomoneda(criptomoneda) }
            >
                <Picker.Item label="Seleccione la criptmoneda" value="" /> 
                {criptomonedas.map( criptomoneda => (
                    <Picker.Item 
                        key={criptomoneda.CoinInfo.Id} 
                        label={criptomoneda.CoinInfo.FullName} 
                        value={criptomoneda.CoinInfo.Name} 
                    /> 
                ))}
            </Picker>

            <Pressable
                style={( { pressed } ) => [
                    {
                        backgroundColor: pressed
                        ? 'black'
                        : '#5E49E2',
                    },
                    styles.btnCotizar
                  ]}
                onPress = {() => {cotizarPrecio()}}
            >
                {({ pressed }) => (
                    <Text style={styles.textCotizar}>
                        {pressed ? 'Cotizando' : 'Cotizar'}
                    </Text>
                )}              
            </Pressable>
        </View>
     );
}

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20,
        fontWeight: 'bold'
    },
    btnCotizar: {        
        marginVertical: 20,
        marginHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5
    },
    textCotizar: {
        color: 'white',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Lato-Black'
    },
});
 
export default Formulario;