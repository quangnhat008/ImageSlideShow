import React, {Component} from "react";
import {View, TouchableOpacity, Text, ScrollView, Image, Platform, Animated, Easing, Dimensions} from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer';
import {WINDOW_WIDTH, styles} from "./styles";

type Props = {
    images: any,
    intIndex: number,
    onClose: void
}

export default class SlideShow extends Component<Props> {
    constructor(props) {
        super(props);

        this.state = {
            images: this.mapSlide(this.props.images),
            imgSelected: this.props.intIndex,
            _containerWidth: null,
            toLeft: new Animated.Value(0)
        };
        this._tabsMeasurements = [];
        // console.log('state', this.state);
    }

    mapSlide = (slide) => {
        return slide.map(i => {
            let item = {
                url: i
            };
            return item;
        });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.imgSelected != this.state.imgSelected) {
            this.setState({imgSelected: nextProps.imgSelected},
                () => this.updateView({value: nextProps.imgSelected}));
        }
    }

    updateView(offset) {
        this.updateStatusView();
        const position = Math.floor(offset.value);
        const pageOffset = offset.value % 1;
        const tabCount = this.state.images.length;
        const lastTabPosition = tabCount - 1;

        if (tabCount === 0 || offset.value < 0 || offset.value > lastTabPosition) {
            return
        }

        if (this.necessarilyMeasurementsCompleted(position, position === lastTabPosition)) {
            this.updateTabPanel(position, pageOffset);
        }
    }

    necessarilyMeasurementsCompleted(position, isLastTab) {
        return this._tabsMeasurements[position] &&
            (isLastTab || this._tabsMeasurements[position + 1]) &&
            this._tabContainerMeasurements && this._containerMeasurements;
    }

    updateTabPanel(position, pageOffset) {
        const containerWidth = this._containerMeasurements.width;
        const tabWidth = this._tabsMeasurements[position].width;
        const nextTabMeasurements = this._tabsMeasurements[position + 1];
        const nextTabWidth = nextTabMeasurements && nextTabMeasurements.width || 0;
        const tabOffset = this._tabsMeasurements[position].left;
        const absolutePageOffset = pageOffset * tabWidth;
        let newScrollX = tabOffset + absolutePageOffset;

        // center tab and smooth tab change (for when tabWidth changes a lot between two tabs)
        newScrollX -= (containerWidth - (1 - pageOffset) * tabWidth - pageOffset * nextTabWidth) / 2;
        newScrollX = newScrollX >= 0 ? newScrollX : 0;

        if (Platform.OS === 'android') {
            this._scrollView && this._scrollView.scrollTo({x: newScrollX, y: 0, animated: true})
        } else {
            const rightBoundScroll = this._tabContainerMeasurements.width - (this._containerMeasurements.width);
            newScrollX = newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX;
            newScrollX = newScrollX >= 0 ? newScrollX : 0;
            this._scrollView && this._scrollView.scrollTo({x: newScrollX, y: 0, animated: true})
        }
    }

    measureTab = (page, event) => {
        // console.log('page - measureTab', page, event.nativeEvent.layout);
        const {x, width, height} = event.nativeEvent.layout;
        this._tabsMeasurements[page] = {left: x, right: x + width, width, height};
        this.updateView({value: this.state.imgSelected});
    };

    onContainerLayout = (e) => {
        // console.log('onContainerLayout', e.nativeEvent.layout);
        this._containerMeasurements = e.nativeEvent.layout;
        this.updateView({value: this.state.imgSelected})
    };

    onTabContainerLayout = (e) => {
        // console.log('onTabContainerLayout', e.nativeEvent.layout);
        this._tabContainerMeasurements = e.nativeEvent.layout;
        let width = this._tabContainerMeasurements.width;
        if (width < WINDOW_WIDTH) {
            width = WINDOW_WIDTH
        }
        this.setState({_containerWidth: width});
        this.updateView({value: this.state.imgSelected})
    };

    render() {
        // console.log('this', this);
        return (
            <View style={{flex: 1}}>
                <ImageViewer
                    index={this.state.imgSelected}
                    imageUrls={this.state.images}
                    saveToLocalByLongPress={false}
                    renderIndicator={() => null}
                    onChange={(imgSelected) => this.setState({imgSelected}, () => this.updateView({value: imgSelected}))}
                />

                <View style={styles.headerView}>
                    <TouchableOpacity style={styles.btnClose} onPress={() => this.props.onClose && this.props.onClose()}>
                        <Text style={styles.txtClose}>Đóng</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.statusSlideView}>
                    <View style={{flexDirection: 'row'}}>
                        {this.state.images.map((o, i) => <View key={i} style={styles.dotStyle}/>)}

                        <Animated.View style={[styles.dotStyle, {
                            backgroundColor: 'rgb(255, 66, 78)',
                            position: 'absolute',
                            borderColor: 'transparent',
                            left: this.state.toLeft
                        }]}/>
                    </View>
                </View>

                <View style={styles.listImgView} onLayout={this.onContainerLayout}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                                ref={(sv) => this._scrollView = sv}
                        // onLayout={e => console.log('ScrollView layout', e.nativeEvent.layout)}
                                contentContainerStyle={styles.listImg}>
                        <View style={{flexDirection: 'row'}} onLayout={this.onTabContainerLayout}>
                            {this.state.images.map((o, i) =>
                                <TouchableOpacity key={i} onLayout={this.measureTab.bind(this, i)}
                                                  onPress={() => this.setState({imgSelected: i}, () => this.updateView({value: i}))}>
                                    <Image source={{uri: o.url}}
                                           style={[styles.img, {opacity: i == this.state.imgSelected ? 1 : 0.5}]}/>
                                </TouchableOpacity>)}
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }

    updateStatusView() {
        Animated.timing(this.state.toLeft, {
            duration: 250,
            toValue: this.state.imgSelected * 15,
            easing: Easing.linear
        }).start();
    }
}
