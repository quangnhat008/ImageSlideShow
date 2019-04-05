/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import ImageSlideShow from "./src/ImageSlideShow";

const images = [
    'https://znews-photo-td.zadn.vn/w860/Uploaded/neg_rtlzofn/2017_01_23/14494601_177404746951l3484_2482115257403382069_n.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjBnP7551E0MmwomJ6YO1rnlM1txCDVOmz60z4q52zkE70Lig4',
    'https://dantricdn.com/thumb_w/640/2018/3/14/hot-girl-anh-the-huong-le-xe-buyt8-15210195344091865692058.jpg',
    'http://bong12bet.com/wp-content/uploads/2018/04/hot-girl-Thai-Lan.jpg',
    'https://image.thanhnien.vn/980/uploaded/hoangnam/2017_10_17/at3_xvph.jpg',
    'https://znews-photo-td.zadn.vn/w860/Uploaded/neg_rtlzofn/2017_01_23/14494601_177404746951l3484_2482115257403382069_n.jpg',
    'http://thoimoi.vn/stores/news_dataimages/administrator/032018/18/03/hot-girl-anh-the-ru-bo-ve-ngay-tho-goi-cam-bat-ngo-sau-2-nam-du-hoc-26-.9798.jpg',
    'https://ttol.vietnamnetjsc.vn/images/2018/08/23/07/19/Hot-girl-Tram-Anh-2.jpg',
    'https://anh.24h.com.vn/upload/1-2017/images/2017-01-01/1483237729-148323148262849-hot-girl-tuoi-dau--1-.jpg',
    'https://images.kienthuc.net.vn/zoomh/500/uploaded/nguyenanhson/2017_09_14/2/hot-girl-quang-nam-trang-xinh-khong-ty-vet-gay-sot-mang-Hinh-10.jpg',
    'http://saobiz.net/wp-content/uploads/2015/11/huyenchau9_01.jpg',
    'https://image-us.24h.com.vn/upload/3-2018/images/2018-07-27/1532655855-905-hot-girl-tram-anh-xinh-dep-di-su-kien-bo-mac-loi-xi-xao-7-1532653812-width640height960.jpg'
];

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <View style={{flex: 1}}>
                <ImageSlideShow images={images} intIndex={1} onClose={null}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
