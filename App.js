import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';

const App = () => {

  const [ moneda, setMoneda ] = useState('');
  const [ criptomoneda, setCriptomoneda ] = useState(''); 
  const [ consultarAPI, setConsultarAPI ] = useState(false);
  const [ resultado, setResultado ] = useState({});
  const [ cargando, setCargando] = useState(false);

  useEffect(() => {
    cotizarCriptomoneda();
  }, [consultarAPI]);

  const cotizarCriptomoneda = async () => {
    if (consultarAPI) {
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(url);  
      
      setCargando(true);
      
      setTimeout(() => {
        setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);

        setConsultarAPI(false);

        setCargando(false);
      }, 3000)
    }
  }

  const componente = cargando ? <ActivityIndicator size = 'large' color = '#5E49E2' style = {{marginTop: 45}}/> : <Cotizacion resultado = { resultado }/>
  
  return (
    <ScrollView>
      <Header/>

      <Image 
        source = {require('./assets/img/cryptomonedas.png')} 
        style = {styles.imagen}
      />

      <View style = {styles.formContainer}>
        <Formulario
          moneda = { moneda }
          criptomoneda = { criptomoneda }
          consultarAPI = { consultarAPI }
          setMoneda = { setMoneda }
          setCriptomoneda = { setCriptomoneda }
          setConsultarAPI = { setConsultarAPI }
        />             
      </View>

      {componente} 

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
  },
  formContainer: {
    marginHorizontal: 15
  },
});

export default App;
