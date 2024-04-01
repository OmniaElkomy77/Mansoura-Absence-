import React, { useEffect, useState } from "react"
import {
    View, Text, StatusBar, StyleSheet,
    FlatList, Image,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    TextInput,
    ToastAndroid, ActivityIndicator
} from "react-native"
import { App_Colors, App_Size } from "../constant/Theme"
import Images from "../constant/Images"
import axios from "axios"
import Api from "../constant/Api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import NetInfo from '@react-native-community/netinfo';
const Studing_subject = ({ navigation, route }) => {
    const [subject_id, setsubject_id] = useState("")
    const [All_subject, setAll_subject] = useState([])
    const [loading, setloading] = useState(false)
    const [student_id, setstudent_id] = useState("")
    const [generation_id, setgeneration_id] = useState("")
    const [connection_Status, setconnection_Status] = useState("")
    // const [user_data, setuser_data] = useState("")

    useEffect(() => {
        const unsubscripe = NetInfo.addEventListener(state => {

            if (state.isConnected == true) {
                setconnection_Status("Online")
                _All_subject()
            } else {
                setconnection_Status("Offline")
            }



        })
        return unsubscripe

    }, [])
    async function _All_subject() {
        // const { data } = route.params
        let data = JSON.parse(await AsyncStorage.getItem("data"))
        // console.log(data.genration_id)
        // setuser_data(data)
        let data_to_send = {
            generation_id: data.genration_id
        }

        // { "genration_id": "3", "student_code": "12214", "student_id": "1", "student_name": "سيف زيدان", "student_national_id": "30121454789452" }

        setloading(true)
        let fetch = await axios.post(Api.Domain + "select_subject.php", data_to_send);
        if (fetch.status == 200) {
            let res = fetch.data
            if (res == "error") {
                ToastAndroid.showWithGravityAndOffset(
                    "حدث خطأ ما",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    20,
                    20
                );


            } else {

                setAll_subject(res)
                // console.log(res)
                setloading(false)
                setstudent_id(data.student_id)
                setgeneration_id(data.genration_id)

            }
        } else {
            ToastAndroid.showWithGravityAndOffset(
                "حدث خطأ ما",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                20,
                20
            );
        }
    }










    function _renderHeader() {
        return (
            <>
                <StatusBar backgroundColor={App_Colors.primary} barStyle="light-content" />
                <View style={style.header}>
                    <Text style={style.header_text}>المواد الدراسية</Text>
                </View>
            </>
        )
    }

    function _renderBody() {
        return (
            <>

                {/* [{"generation_id": "3", "subject_description": "لاشي",
                 "subject_id": "3", "subject_img": null, "subject_name": "كي */}

                {connection_Status == "Offline" ?
                    <View style={{ alignItems: "center", justifyContent: "center", height: App_Size.height }}>
                        <Text style={{ color: "#999", fontSize: 20 }}> يجب عليك الاتصال بالانترنت</Text>
                    </View>
                    :
                    loading == true ?
                        <View style={{ alignItems: "center", justifyContent: "center", height: App_Size.height }}>
                            <ActivityIndicator size={30} color={App_Colors.primary} />
                        </View>
                        :
                        <>
                            <FlatList
                                data={All_subject}
                                renderItem={({ index, item }) => (
                                    <View style={style.View_Action}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                // setModal_delete(true)
                                                navigation.navigate("Lectures",
                                                    {
                                                        student_id: student_id,
                                                        generation_id: generation_id,
                                                        subject_id: item.subject_id
                                                    }
                                                )
                                                // console.log(item.subject_id)
                                                // setsubject_id(item.subject_id)
                                            }}

                                            style={style.button}>
                                            <Image source={Images.Images.subject} style={style.Button_Image} />
                                            <View style={style.Button_View}>
                                                <Text style={style.Button_text}>{item.subject_name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}

                                ListEmptyComponent={() => (
                                    <View style={{ alignItems: "center", justifyContent: "center", height: App_Size.height }}>
                                        <Text style={{ color: "#999", fontSize: 20 }}>لايوجد مواد</Text>
                                    </View>
                                )}

                            />



                        </>



                }
            </>
        )
    }













    return (
        <>
            <View style={style.container}>

                {_renderHeader()}
                {_renderBody()}


            </View>
        </>
    )
}
const style = StyleSheet.create({
    container: {
        backgroundColor: App_Colors.white,
        flex: 1,
    },
    header: {
        backgroundColor: App_Colors.white,
        elevation: 5,
        height: 70,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    header_text: {
        color: App_Colors.black,
        fontSize: 25,
        fontWeight: "bold"
    },
    View_Action: {
        // height: 200,
        padding: 15,
        width: '100%',
        // backgroundColor: "#514",
        alignItems: "center",
        justifyContent: "space-around"
    },
    button: {
        // height: 100,
        padding: 10,
        width: "95%",
        backgroundColor: "#fff",
        elevation: 7,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"

    },
    Button_Image: {
        resizeMode: "center",
        height: 70,
        width: 70,

    },
    Button_View:
    {
        width: "75%",
        // backgroundColor: "#525",
        height: 50,
        justifyContent: "center"
    },
    Button_text: {
        color: App_Colors.black,
        fontSize: 18,
        fontWeight: "700"
    },
    fab: {
        position: 'absolute',
        margin: 16,
        left: 0,
        bottom: 0,
        // color: App_Colors.primary
        backgroundColor: App_Colors.primary


    }
})

export default Studing_subject;