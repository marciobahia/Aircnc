import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import {Alert, View, ScrollView, SafeAreaView , StyleSheet, Image, AsyncStorage, text } from 'react-native';
import SpotList from '../components/SpotList';
import logo from '../../assets/logo.png';

export default function List () {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.100.4:3333', {
                query: { user_id}
            })
            socket.on('booking_response', booking => {
                Alert.alert(`Sua Reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
            })
        })
    }, []);

    useEffect(() => {
       AsyncStorage.getItem('techs').then(storageTechs => {
          const  techsArray = storageTechs.split(',').map(tech => tech.trim());

          setTechs(techsArray);
       })
    }, []);

    return (
    <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={logo} />

<ScrollView>     
{techs.map(tech => <SpotList key={tech} tech={tech} />)}
</ScrollView>

    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
},

logo: {
    //Altura
    height:32,
    //Limitar o conteudo da imagem dentro do espaço existente e não fique atrás da Status Bar
    resizeMode: "contain",
    //alinhar imagem no centro
    alignSelf: 'center',
    marginBottom: 20,
   
},
});



































