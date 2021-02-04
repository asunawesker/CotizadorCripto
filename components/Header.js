import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native';

const Header = () => (
    <Text style={styles.encabezado}>Criptomonedas</Text>
 );

const styles = StyleSheet.create({
    encabezado: {
        paddingTop: Platform.OS === 'ios' ? 50 : 10,
        fontWeight: 'bold',
        fontFamily: 'Lato-Black',
        backgroundColor: '#5E49E2',
        paddingBottom: 10,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 20,
        color: 'white',
        marginBottom: 30
    }
})
 
export default Header;