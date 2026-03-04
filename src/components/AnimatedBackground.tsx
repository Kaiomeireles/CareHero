import React, { useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, Animated, View } from 'react-native';
import { THEME } from '../constants/Theme';

const { width, height } = Dimensions.get('window');

export default function AnimatedBackground() {
    const anim1 = useRef(new Animated.Value(0)).current;
    const anim2 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(anim1, { toValue: 1, duration: 15000, useNativeDriver: true }),
                Animated.timing(anim1, { toValue: 0, duration: 15000, useNativeDriver: true }),
            ])
        ).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(anim2, { toValue: 1, duration: 20000, useNativeDriver: true }),
                Animated.timing(anim2, { toValue: 0, duration: 20000, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    const translate1 = anim1.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100]
    });

    const translate2 = anim2.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -150]
    });

    const scale1 = anim1.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.2]
    });

    const scale2 = anim2.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.4]
    });

    return (
        <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
            <Animated.View
                style={[
                    styles.blob1,
                    { transform: [{ translateY: translate1 }, { scale: scale1 }] }
                ]}
            />
            <Animated.View
                style={[
                    styles.blob2,
                    { transform: [{ translateY: translate2 }, { scale: scale2 }] }
                ]}
            />
            <Animated.View
                style={[
                    styles.blob3,
                    { transform: [{ translateX: translate1 }, { translateY: translate2 }] }
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    blob1: {
        position: 'absolute',
        top: -width * 0.3,
        left: -width * 0.2,
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
        backgroundColor: THEME.accent,
        opacity: 0.05,
    },
    blob2: {
        position: 'absolute',
        bottom: -width * 0.2,
        right: -width * 0.3,
        width: width * 0.9,
        height: width * 0.9,
        borderRadius: width * 0.45,
        backgroundColor: THEME.secondary,
        opacity: 0.06,
    },
    blob3: {
        position: 'absolute',
        top: height * 0.3,
        left: width * 0.5,
        width: width * 0.7,
        height: width * 0.7,
        borderRadius: width * 0.35,
        backgroundColor: THEME.success,
        opacity: 0.04,
    }
});
