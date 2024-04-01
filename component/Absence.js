import React, { useEffect, useState } from "react"
import {
    View, Text, StatusBar, StyleSheet, Image, TouchableOpacity,
    FlatList, ToastAndroid,
    ActivityIndicator
} from "react-native"
import { App_Colors, App_Size } from "../constant/Theme"
import Images from "../constant/Images"
import Api from "../constant/Api"
import axios from "axios"
import NetInfo from '@react-native-community/netinfo';
const Absence = ({ navigation, route }) => {
    const [Absence_arr, setAbsence_arr] = React.useState([])
    const [loading, setloading] = React.useState(false)
    const [connection_Status, setconnection_Status] = useState("")
    useEffect(() => {
        const unsubscripe = NetInfo.addEventListener(state => {

            if (state.isConnected == true) {
                setconnection_Status("Online")
                all_day_Absence()
            } else {
                setconnection_Status("Offline")
            }

        })
        return unsubscripe
    }, [])

    async function all_day_Absence() {
        const { student_id } = route.params
        const { generation_id } = route.params
        setloading(true)

        let data = {
            student_id: student_id,
            generation_id: generation_id

        }
        // console.log(data)
        let fetch = await axios.post(Api.Domain + "select_absence_lecture.php", data);
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
            }
            else {

                setAbsence_arr(res)
                // console.log("res", res)
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
                    <Text style={style.header_text}>أيام الغياب</Text>
                </View>
            </>
        )
    }
    function _renderBody() {
        return (
            <View>



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
                        <View style={{ marginBottom: 75 }}>
                            <FlatList
                                data={Absence_arr}
                                renderItem={({ index, item }) => (
                                    item.absence == 0 ?
                                        <View style={style.Day_Absence}>
                                            <View style={style.markType}>

                                            </View>
                                            <View style={style.View_date}>
                                                <Text style={style.Text_date}>{item.lecture_date.slice(0, 10)}</Text>
                                            </View>
                                        </View>
                                        :
                                        null
                                    // <View style={{ alignItems: "center", justifyContent: "center", height: App_Size.height }}>
                                    //     <Text style={{ color: "#999", fontSize: 20 }}>لايوجد محاضرات </Text>
                                    // </View>
                                )
                                }
                                ListEmptyComponent={() => (
                                    <View style={{ alignItems: "center", justifyContent: "center", height: App_Size.height }}>
                                        <Text style={{ color: "#999", fontSize: 20 }}>لايوجد محاضرات </Text>
                                    </View>
                                )}








                            />

                        </View>
                }

            </View>
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
    Day_Absence: {
        height: 70,
        width: "95%",
        backgroundColor: "#fff",
        alignSelf: "center",
        marginVertical: 10,
        borderRadius: 10,
        elevation: 5,
        flexDirection: "row",
        // marginBottom: 10

    },
    markType: {
        width: 20,
        height: "100%",
        backgroundColor: "#f00",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10

    },
    View_date: {
        width: "80%",
        // backgroundColor: "#145",
        padding: 10,
        alignItems: "flex-start",
        justifyContent: "center"
    },
    Text_date: {
        fontSize: 20,
        fontWeight: "bold",
        color: App_Colors.black
    }
})
export default Absence;