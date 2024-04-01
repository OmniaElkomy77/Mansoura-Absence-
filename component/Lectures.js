import React, { useEffect, useState } from "react"
import {
    View, Text, StatusBar, StyleSheet, Image, TouchableOpacity
    , ScrollView, FlatList, ToastAndroid, ActivityIndicator
} from "react-native"
import { App_Colors, App_Size } from "../constant/Theme"
import Images from "../constant/Images"
import axios from "axios"
//  import Api from "../constant/Api"
import NetInfo from '@react-native-community/netinfo';
const Lectures = ({ navigation, route }) => {
    const [student_id, setstudent_id] = useState("")
    const [generation_id, setgeneration_id] = useState("")
    const [lectures, setlectures] = useState([])
    const [loading, setloading] = useState(false)
    const [connection_Status, setconnection_Status] = useState("")
    useEffect(() => {
        const unsubscripe = NetInfo.addEventListener(state => {

            if (state.isConnected == true) {
                setconnection_Status("Online")
                lectures_data()
            } else {
                setconnection_Status("Offline")
            }



        })
        return unsubscripe


    }, [])

    async function lectures_data() {
        const { student_id } = route.params
        const { generation_id } = route.params
        const { subject_id } = route.params
        setstudent_id(student_id)
        setgeneration_id(generation_id)
        let data_to_send = {
            generation_id: generation_id,
            student_id: student_id,
            subject_id: subject_id
        }
        // console.log(data_to_send)
        // { "genration_id": "3", "student_code": "12214", "student_id": "1", "student_name": "سيف زيدان", "student_national_id": "30121454789452" }

        setloading(true)
        let fetch = await axios.post("https://camp-coding.online/absence_Mansoura_Un/student/student_lec.php", data_to_send);
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

                setlectures(res)
                // console.log(res)
                setloading(false)


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
                    <Text style={style.header_text}>المحاضرات </Text>
                </View>
            </>
        )
    }
    function _renderBody() {
        return (
            <>

                {
                    connection_Status == "Offline" ?
                        <View style={{ alignItems: "center", justifyContent: "center", height: App_Size.height }}>
                            <Text style={{ color: "#999", fontSize: 20 }}> يجب عليك الاتصال بالانترنت</Text>
                        </View>
                        :
                        loading == true ?
                            <View style={{ alignItems: "center", justifyContent: "center", height: App_Size.height }}>
                                <ActivityIndicator size={30} color={App_Colors.primary} />
                            </View>
                            :
                            <FlatList data={lectures}
                                renderItem={({ index, item }) => (
                                    <View style={style.View_Action}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate("Profile",
                                                    {
                                                        student_id: student_id,
                                                        generation_id: generation_id,
                                                        lecture_id: item.lecture_id
                                                    }

                                                )
                                                // console.log(item.lecture_id)
                                            }}

                                            style={style.button}>
                                            <Image source={Images.Images.lectures} style={style.Button_Image} />
                                            <View style={style.Button_View}>
                                                <Text style={style.Button_text}>{item.lecture_name}</Text>
                                            </View>
                                            <View>
                                                <Text style={style.date}>{item.lecture_date.slice(0, 10)}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                )}

                                ListEmptyComponent={() => (
                                    <View style={{ alignItems: "center", justifyContent: "center", height: App_Size.height }}>
                                        <Text style={{ color: "#999", fontSize: 20 }}> لا يوجد محاضرات</Text>
                                    </View>
                                )}





                            />




                }


            </>
        )
    }
    return (
        <View style={style.container}>
            {
                _renderHeader()
            }
            {
                _renderBody()
            }
        </View>

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
    View_Image: {
        // height: 150,
        padding: 15,
        width: "100%",

        alignItems: "center",
        justifyContent: "center"
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
        width: "50%",
        // backgroundColor: "#525",
        height: 50,
        justifyContent: "center"
    },
    Button_text: {
        color: App_Colors.black,
        fontSize: 18,
        fontWeight: "700"
    },
    date: {
        color: "#999",
        fontSize: 15
    }
}
)
export default Lectures;
