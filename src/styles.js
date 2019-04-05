import {Dimensions, Platform} from "react-native";
export const {height, width} = Dimensions.get('window');
export const WINDOW_WIDTH = width;

export const styles = {
    btnClose: {
        // backgroundColor: 'red',
        height: 45,
        paddingHorizontal: 20,
        justifyContent: 'center'
    },
    txtClose: {
        color: 'white',
        fontSize: 18,
    },
    headerView: {
        marginTop: Platform.OS == 'ios' ? 0 : 25,
        paddingTop: Platform.OS == 'ios' ? 20 : 0,
        position: 'absolute',
        width,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'flex-end',
    },
    listImgView: {
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: height * 0.15,
        backgroundColor: 'rgba(0,0,0,0.65)'
    },
    img: {
        height: 55, width: 55,
        borderRadius: 3,
        borderWidth: 0.5,
        marginRight: 15,
        borderColor: 'rgb(227, 227, 227)'
    },
    listImg: {
        alignItems: 'center',
        paddingLeft: 15,
    },
    dotStyle: {
        height: 10,
        width: 10,
        marginRight: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white'
    },
    statusSlideView: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: height * 0.2,
        left: 0, right: 0,
        justifyContent: 'center'
    }
};