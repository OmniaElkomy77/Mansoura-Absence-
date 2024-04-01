import React, { useState, useEffect } from "react"
import { View, Text, StatusBar, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native"
import { App_Colors } from "../constant/Theme"
import Images from "../constant/Images"
import NetInfo from '@react-native-community/netinfo';
const Profile = ({ navigation, route }) => {
    const [student_id, setstudent_id] = useState("")
    const [generation_id, setgeneration_id] = useState("")
    const [connection_Status, setconnection_Status] = useState("")
    useEffect(() => {

        const unsubscripe = NetInfo.addEventListener(state => {

            if (state.isConnected == true) {
                setconnection_Status("Online")
                const { student_id } = route.params
                const { generation_id } = route.params
                setstudent_id(student_id)
                setgeneration_id(generation_id)
            } else {
                setconnection_Status("Offline")
            }



        })
        return unsubscripe

    }, [])


    function _renderHeader() {
        return (
            <>
                <StatusBar backgroundColor={App_Colors.primary} barStyle="light-content" />
                <View style={style.header}>
                    <Text style={style.header_text}>الصفحه الرئيسيه</Text>
                </View>
            </>
        )
    }
    function _renderBody() {
        return (
            <>


                {connection_Status == "Offline" ?

                    <View style={{ alignItems: "center", justifyContent: "center", height: App_Size.height }}>
                        <Text style={{ color: "#999", fontSize: 20 }}> يجب عليك الاتصال بالانترنت</Text>
                    </View>

                    :
                    <ScrollView>


                        <View style={style.View_Action}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Qr_scan",
                                        {
                                            student_id: student_id,
                                            lecture_id: route.params.lecture_id
                                        }
                                    )
                                }}

                                style={style.button}>
                                <Image source={Images.Images.qr_code} style={style.Button_Image} />
                                <View style={style.Button_View}>
                                    <Text style={style.Button_text}> تسجيل الحضور</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={style.View_Action}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Attendance",
                                        {
                                            student_id: student_id,
                                            generation_id: generation_id
                                        }
                                    )
                                }}


                                style={style.button}>
                                <Image source={Images.Images.attendance} style={style.Button_Image} />
                                <View style={style.Button_View}>
                                    <Text style={style.Button_text}> أيام الحضور</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={style.View_Action}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Absence",
                                        {
                                            student_id: student_id,
                                            generation_id: generation_id
                                        }
                                    )
                                }}
                                style={style.button}>
                                <Image source={Images.Images.absence} style={style.Button_Image} />
                                <View style={style.Button_View}>
                                    <Text style={style.Button_text}>أيام الغياب</Text>
                                </View>
                            </TouchableOpacity>
                        </View>



                    </ScrollView>
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
        width: "75%",
        // backgroundColor: "#525",
        height: 50,
        justifyContent: "center"
    },
    Button_text: {
        color: App_Colors.black,
        fontSize: 18,
        fontWeight: "700"
    }
}
)
export default Profile;
