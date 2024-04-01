import React, { useEffect, useState } from "react"
import {
    View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Modal,
    TouchableWithoutFeedback, Keyboard,
    ToastAndroid,
    ActivityIndicator
} from "react-native"
import { App_Colors, App_Size } from "../constant/Theme"
import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-camera';
import Api from "../constant/Api";
import axios from "axios";
import NetInfo from '@react-native-community/netinfo';
const Qr_scan = ({ navigation, route }) => {
    const [modal_attendance, setmodal_attendance] = React.useState(false)
    const [qr_data, setqrdata] = React.useState("")
    const [connection_Status, setconnection_Status] = useState("")
    const [Button_loading, setButton_loading] = useState(false)

    useEffect(() => {

        const unsubscripe = NetInfo.addEventListener(state => {

            if (state.isConnected == true) {
                setconnection_Status("Online")

            } else {
                setconnection_Status("Offline")
            }



        })
        return unsubscripe

    }, [])








    async function submit() {
        Keyboard.dismiss()
        if (connection_Status == "Offline") {

            ToastAndroid.showWithGravityAndOffset(
                "يجب عليك الاتصال بالانترنت",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                20,
                20
            );

        } else {
            const { student_id } = route.params
            const { lecture_id } = route.params
            let data = {
                student_id: student_id,
                lecture_id: lecture_id,
                code: qr_data
            }



            // console.log(data)
            setButton_loading(true)
            let fetch = await axios.post(Api.Domain + "take_absence.php", data);
            if (fetch.status == 200) {
                let res = fetch.data
                if (res == 'user_not_found') {

                    ToastAndroid.showWithGravityAndOffset(
                        " هذه الكود غير صحيح",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        20,
                        20
                    );
                    setButton_loading(false)
                }
                else if (res == "assign_before") {
                    ToastAndroid.showWithGravityAndOffset(
                        " لقد اخذ الغياب من قبل ",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        20,
                        20
                    );
                    setButton_loading(false)
                } else if (res == "lec_not_open_yet") {
                    ToastAndroid.showWithGravityAndOffset(
                        "هذه المحاضره لم تفتح بعد",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        20,
                        20
                    );
                    setButton_loading(false)
                }

                else if (res == "error") {
                    ToastAndroid.showWithGravityAndOffset(
                        "حدث خطأ ما",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        20,
                        20
                    );
                }
                else if (res == "success") {
                    ToastAndroid.showWithGravityAndOffset(
                        " تم اخذ الغياب  بنجاح",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        20,
                        20
                    );

                    setqrdata("")
                    setButton_loading(false)
                    setmodal_attendance(false)

                } else {
                    ToastAndroid.showWithGravityAndOffset(
                        "حدث خطأ ما",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        20,
                        20
                    );
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
        setqrdata("")

    }







    async function ifScaned(e) {
        if (connection_Status == "Offline") {
            ToastAndroid.showWithGravityAndOffset(
                "يجب عليك الاتصال بالانترنت",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                20,
                20
            );
        } else {
            // setButton_loading(true)
            const { student_id } = route.params
            const { lecture_id } = route.params


            let data = {
                student_id: student_id,
                lecture_id: lecture_id,
                code: e.data
            }
            // console.log(data)
            let fetch = await axios.post(Api.Domain + "take_absence.php", data);
            if (fetch.status == 200) {
                let res = fetch.data
                if (res == 'user_not_found') {

                    ToastAndroid.showWithGravityAndOffset(
                        " هذه الكود غير صحيح",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        20,
                        20
                    );

                }
                else if (res == "assign_before") {
                    ToastAndroid.showWithGravityAndOffset(
                        " لقد اخذ الغياب من قبل ",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        20,
                        20
                    );
                } else if (res == "lec_not_open_yet") {
                    ToastAndroid.showWithGravityAndOffset(
                        "هذه المحاضره لم تفتح بعد",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        20,
                        20
                    );
                }

                else if (res == "error") {
                    ToastAndroid.showWithGravityAndOffset(
                        "حدث خطأ ما",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        20,
                        20
                    );
                }
                else if (res == "success") {
                    ToastAndroid.showWithGravityAndOffset(
                        " تم اخذ الغياب  بنجاح",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        20,
                        20
                    );
                    // setButton_loading(false)

                } else {
                    ToastAndroid.showWithGravityAndOffset(
                        "حدث خطأ ما",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        20,
                        20
                    );
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



    }




    function _renderBody() {
        return (
            <>
                {modal_attendance == true ? null :
                    <QRCodeScanner
                        containerStyle={{ backgroundColor: App_Colors.white, height: 200 }}
                        onRead={(val) => {
                            ifScaned(val)

                        }}
                        reactivate={true}
                        permissionDialogMessage="تسجيل الحضور"
                        reactivateTimeout={10}
                        showMarker={true}
                        markerStyle={{ backgroundColor: 'transparent', borderRadius: 30, }}

                        bottomContent={
                            <TouchableOpacity
                                onPress={() => {

                                    if (connection_Status == "Offline") {
                                        ToastAndroid.showWithGravityAndOffset(
                                            "يجب عليك الاتصال بالانترنت",
                                            ToastAndroid.SHORT,
                                            ToastAndroid.BOTTOM,
                                            20,
                                            20
                                        );
                                    } else {
                                        setmodal_attendance(true)
                                    }

                                }}

                                style={{
                                    height: 50, width: 200,
                                    backgroundColor: App_Colors.primary, borderRadius: 10,
                                    justifyContent: 'center', alignItems: 'center',
                                    alignSelf: "center",
                                    marginTop: 50
                                }}>

                                <Text style={{ fontSize: 20, color: App_Colors.white, fontWeight: "bold" }} >تسجيل الحضور بالرمز</Text>
                            </TouchableOpacity>}


                    />


                }






            </>
        )
    }


    function _modal_attendance() {
        return (
            <Modal
                visible={modal_attendance}
                onRequestClose={() => {
                    setmodal_attendance(false)
                }}
                animationType="slide"
                // presentationStyle="formSheet"s
                transparent={true}>
                <View
                    style={{
                        // opacity:0.7,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        flex: 1,
                        justifyContent: 'flex-end',
                    }}>
                    <TouchableWithoutFeedback
                        style={{ flex: 1 }}
                        onPress={() => {
                            setmodal_attendance(false)
                        }}>
                        <View
                            style={{
                                position: 'absolute',
                                height: '100%',
                                width: '100%',
                            }}
                        />
                    </TouchableWithoutFeedback>
                    <View
                        style={{
                            height: App_Size.height,
                            // width: width,
                            flex: 1,
                            // alignContent: 'center',
                            justifyContent: 'space-around',
                        }}>
                        <View
                            style={{
                                // height:height,
                                alignSelf: 'center',
                                justifyContent: 'space-around',
                                width: '90%',
                                backgroundColor: App_Colors.white,
                                borderRadius: 10,
                                elevation: 5,
                                paddingVertical: 15,
                                marginBottom: 10,
                            }}>

                            <View
                                style={{
                                    // height: 50,
                                    // width: '100%',
                                    // backgroundColor: "#858",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Text
                                    style={{ color: App_Colors.black, fontWeight: 'bold', fontSize: 20 }}>
                                    تسجيل الحضور بالرمز
                                </Text>
                            </View>


                            <View style={{
                                // height: "40%",
                                marginVertical: 15,
                                // backgroundColor: "#125",
                                alignItems: 'center',
                                justifyContent: "center"

                            }}>
                                <TextInput style={{
                                    padding: 15,

                                    width: "95%", backgroundColor: "#eee",
                                    color: App_Colors.black,
                                    borderRadius: 10
                                }}
                                    placeholder=" تسجيل الحضور بالرمز "
                                    placeholderTextColor={"#999"}
                                    keyboardType="numeric"
                                    value={qr_data}
                                    onChangeText={(value) => {
                                        setqrdata(value)
                                    }}

                                />


                            </View>
                            <View
                                style={{
                                    height: 80,
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    // backgroundColor: "#eee",
                                    alignItems: 'center',
                                }}>
                                <TouchableOpacity
                                    onPress={() => {


                                        submit()
                                    }}
                                    style={{
                                        height: 50,
                                        width: 100,
                                        backgroundColor: App_Colors.primary,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                    }}>


                                    {
                                        Button_loading == true ? (

                                            <ActivityIndicator size={25} color={App_Colors.white} />
                                        ) : (
                                            <Text
                                                style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                                                تأكيد
                                            </Text>
                                        )



                                    }





                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                    <TouchableWithoutFeedback
                        style={{ flex: 1 }}
                        onPress={() => {
                            setmodal_attendance(false)
                        }}>
                        <View
                            style={{
                                width: '100%',
                            }}
                        />
                    </TouchableWithoutFeedback>
                </View>
            </Modal>

        )
    }
    return (
        <>
            <View style={style.container}>
                <StatusBar backgroundColor={App_Colors.primary} barStyle="light-content" />
                {_renderBody()}
                {_modal_attendance()}
            </View>
        </>
    )
}
const style = StyleSheet.create({
    container: {
        backgroundColor: App_Colors.white,
        flex: 1,
    }
})
export default Qr_scan;