import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VPNHomePage from './VPNHomePage';
import LocationScreen from './LocationScreen';
import NoWifiIcon from './assets/No_wifi_red-removebg-preview.png';
import PrivacyPolicyScreen from './PrivacyPolicyScreen';
import TermsAndConditions from './TermsAndConditions';


const Stack = createNativeStackNavigator();

const App = () => {
    const [isConnected, setIsConnected] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected ?? true); // Fallback to true if null
        });

        return () => unsubscribe();
    }, []);

    const checkConnection = () => {
        NetInfo.fetch().then(state => setIsConnected(state.isConnected ?? true));
    };

    return (
        <NavigationContainer>
            {/* Global Internet Checker */}
            <Modal
                visible={!isConnected}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image source={NoWifiIcon} style={styles.icon} />
                        <Text style={styles.title}>No internet connection</Text>
                        <Text style={styles.subtitle}>Try these steps to get back online:</Text>
                        <Text style={styles.steps}>Check your modem and router!</Text>
                        <Text style={styles.steps}>Check your mobile data!</Text>
                        <TouchableOpacity style={styles.button} onPress={checkConnection}>
                            <Text style={styles.buttonText}>Try again</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={VPNHomePage} />
                <Stack.Screen name="Location" component={LocationScreen} />
                <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
                <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    icon: {
        width: 120,
        height: 120,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    steps: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default App;