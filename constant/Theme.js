import { Dimensions } from 'react-native'
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors'
const { width, height } = Dimensions.get("window")
export const App_Colors = {
    primary: "#2e7a39",
    white: "white",
    black: "#000"

}
export const App_Size = {
    width,
    height
}

const Theme = { App_Colors, App_Size }

export default Theme;
