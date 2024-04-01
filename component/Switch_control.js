import React, { useState, useEffect } from "react"
import { View, Text, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from "react-native"
import { App_Colors, App_Size } from "../constant/Theme"
import Images from "../constant/Images"
import AsyncStorage from "@react-native-async-storage/async-storage"
const Switch_controle = ({ navigation, route }) => {


    useEffect(() => {
        getlog()
    }, []);

    async function getlog() {
        const SwitchNavigation = await AsyncStorage.getItem('switch')
        // console.log(SwitchNavigation)
        setTimeout(() => {
            if (SwitchNavigation != null || SwitchNavigation != undefined) {
                if (SwitchNavigation == 'Auth') {
                    navigation.navigate('Login')
                } else if (SwitchNavigation == 'Home') {
                    navigation.navigate('Studing_subject')
                }

            } else {
                navigation.navigate('Login')
            }
        }, 400)
    }

    function _renderBody() {
        return (
            <>

                <View style={style.View_Image}>
                    <Image source={Images.Images.logo} style={style.image} />
                </View>


            </>
        )
    }
    return (
        <View style={style.container}>
            <StatusBar backgroundColor={App_Colors.primary} barStyle="light-content" />
            {_renderBody()}
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        backgroundColor: App_Colors.white,
        flex: 1,
    },
    View_Image: {
        height: App_Size.height,


        alignItems: "center",
        justifyContent: "center",

    },
    image: {
        height: App_Size.height,
        width: "100%",
        resizeMode: "center",

    },



})
export default Switch_controle;