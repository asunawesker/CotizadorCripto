import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Cotizacion = ({resultado}) => {

    if (Object.keys(resultado).length === 0) return null;

    return(
        <View style = {styles.resultado}>
            <Text style = {[styles.label, styles.precio]}>{resultado.PRICE}</Text>
            <Text style = {styles.label}>Precio más alto del día: {resultado.HIGHDAY}</Text>
            <Text style = {styles.label}>Precio más bajo del día: {resultado.LOWDAY}</Text>
            <Text style = {styles.label}>Variación últimas 24 horas: {resultado.CHANGEPCT24HOUR}</Text>
            <Text style = {styles.label}>Última actualización: {resultado.LASTUPDATE}</Text>
        </View>
    );    
}

const styles = StyleSheet.create({
    resultado: {
        backgroundColor: '#5E49E2',
        paddingHorizontal: 45,
        paddingVertical: 15,
        borderBottomLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    label: {
        color: 'white',
        fontFamily: 'Lato-Regular',
        fontSize: 18,
    },
    precio: {
        fontSize: 36,
        fontWeight: 'bold'
    },
});
 
export default Cotizacion;