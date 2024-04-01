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
const Attendance = ({ navigation, route }) => {
    const [Attendance_arr, setAttendance_arr] = React.useState([])
    const [loading, setloading] = React.useState(false)
    const [connection_Status, setconnection_Status] = useState("")
    useEffect(() => {
        const unsubscripe = NetInfo.addEventListener(state => {

            if (state.isConnected == true) {
                setconnection_Status("Online")
                all_day_attendance()
            } else {
                setconnection_Status("Offline")
            }

        })
        return unsubscripe

    }, [])

    async function all_day_attendance() {
        const { student_id } = route.params
        const { generation_id } = route.params
        setloading(true)

        let data = {
            student_id: student_id,
            generation_id: generation_id

        }
        console.log(data)
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


                setAttendance_arr(res)
                // console.log("res",res)
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
                    <Text style={style.header_text}>أيام الحضور</Text>
                </View>
            </>
        )
    }
    function _renderBody() {
        return (
            <View>


                {/* [{"absence": 1, 
                "generation_id": "3",
                 "lecture_code": "123456789", "lecture_date": "2023-03-02 07:19:06.794906", "lecture_id": "1", "lecture_name": "المحاضرة الاولي", "locked": "1", "subject_id": "1"}, {"absence": 0, "generation_id": "3", "lecture_code": "1073583907", "lecture_date": "2023-02-27 02:01:12.482112", "lecture_id": "8", "lecture_name": "المحاضرة", "locked": "1", "subject_id": "1"}, {"absence": 1, "generation_id": "3", "lecture_code": "1024526296", "lecture_date": "2023-03-02 08:21:31.773727", "lecture_id": "9", "lecture_name": "محاضره الاولي", "locked": "0", "subject_id": "2"}, {"absence": 1, "generation_id": "3", "lecture_code": "171009966", "lecture_date": "2023-03-02 08:21:34.115754", "lecture_id": "10", "lecture_name": "محاضره الثانيه", "locked": "0", "subject_id": "2"}, {"absence": 1, "generation_id": "3", "lecture_code": "33918839", "lecture_date": "2023-03-02 08:21:35.834521", "lecture_id": "11", "lecture_name": "محاضره الثالثه", "locked": "0", "subject_id": "2"}, {"absence": 1, "generation_id": "3", "lecture_code": "1220513775", "lecture_date": "2023-03-02 08:21:38.635039", "lecture_id": "12", "lecture_name": "محاضره الرابعه", "locked": "0", "subject_id": "2"}, {"absence": 1, "generation_id": "3", "lecture_code": "271300548", "lecture_date": "2023-03-02 08:21:40.838246", "lecture_id": "13", "lecture_name": "محاضره الخامسه", "locked": "0", "subject_id": "2"}, {"absence": 1, "generation_id": "3", "lecture_code": "829584321", "lecture_date": "2023-03-02 08:21:42.843409", "lecture_id": "14", "lecture_name": "محاضره السادسه", "locked": "0", "subject_id": "2"}, {"absence": 0, "generation_id": "3", "lecture_code": "843237082", "lecture_date": "2023-02-27 15:42:38.000000", "lecture_id": "28",
                 "lecture_name": "20 المحاضرة", "locked": "0", "subject_id": "1"}] */}

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
                                data={Attendance_arr}
                                renderItem={({ index, item }) => (
                                    item.absence == 1 ?
                                        <View style={style.Day_Attendance}>
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
    Day_Attendance: {
        height: 70,
        width: "95%",
        backgroundColor: "#fff",
        alignSelf: "center",
        marginVertical: 10,
        borderRadius: 10,
        elevation: 5,
        flexDirection: "row"

    },
    markType: {
        width: 20,
        height: "100%",
        backgroundColor: App_Colors.primary,
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
export default Attendance;