import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Modal, Share, Linking } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';


const VPNHomePage = ({ navigation }: any) => {
  const [isConnected, setIsConnected] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [starPopupVisible, setStarPopupVisible] = useState(false);
  const translateX = new Animated.Value(isConnected ? 60 : 0);
  const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();
  const [selectedCountry, setSelectedCountry] = useState<{ name: string; flag: string }>({
    name: 'USA-1',
    flag: '🇺🇸',
  });

  const [currentFlagIndex, setCurrentFlagIndex] = useState(0);
  const locations = [
  { name: 'Singapore', flag: '🇸🇬' },
  { name: 'Japan-1', flag: '🇯🇵' },
  { name: 'Japan-2', flag: '🇯🇵' },
  { name: 'India', flag: '🇮🇳' },
  { name: 'USA-1', flag: '🇺🇸' },
  { name: 'USA-2', flag: '🇺🇸' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'Netherlands', flag: '🇳🇱' },
  { name: 'Dummy Cont 1', flag: '🇨🇦' }, 
  { name: 'Dummy Cont 2', flag: '🇧🇷' }, 
  { name: 'Dummy Cont 3', flag: '🇦🇺' }, 
  { name: 'Dummy Cont 4', flag: '🇪🇸' }
];

type RootStackParamList = {
  Home: { selectedLocation?: { name: string; flag: string } };
};



useEffect(() => {
    if (route.params?.selectedLocation) {
      setSelectedCountry(route.params.selectedLocation);
    }
  }, [route.params?.selectedLocation]);





useEffect(() => {
  const interval = setInterval(() => {
    setCurrentFlagIndex((prevIndex) => (prevIndex + 1) % locations.length);
  }, 1000); // Change flag every 1 second

  return () => clearInterval(interval); // Cleanup on unmount
}, []);

  const toggleConnection = () => {
    const toValue = isConnected ? 0 : 60; // Slide distance for ON/OFF toggle
    Animated.timing(translateX, {
      toValue,
      duration: 100,
      useNativeDriver: false,
    }).start(() => setIsConnected(!isConnected));
  };
  const shareApp = async () => {
  try {
    const result = await Share.share({
      message: 'Check out DEX VPN! Download now: https://example.com/download',
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log('Shared with activity type:', result.activityType);
      } else {
        console.log('App shared successfully!');
      }
    } else if (result.action === Share.dismissedAction) {
      console.log('Share dismissed');
    }
  } catch (error) {
    console.error('Error sharing app:', error);
  }
};


  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const openStarPopup = () => setStarPopupVisible(true);
  const closeStarPopup = () => setStarPopupVisible(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openMenu}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.vpnName}>DEX VPN</Text>
        <TouchableOpacity onPress={openStarPopup}>
          <Text style={styles.starIcon}>⭐</Text>
        </TouchableOpacity>
      </View>

      {/* Flag */}
      <View style={styles.flagContainer}>
  <Text style={styles.flag}>{locations[currentFlagIndex].flag}</Text>
      </View>

      {/* Polished Toggle Switch */}
      <TouchableOpacity style={styles.toggleSwitch} onPress={toggleConnection} activeOpacity={0.8}>
        <Animated.View style={[styles.toggleCircle, { transform: [{ translateX }] }]}>
          <Text style={styles.toggleText}>{isConnected ? 'ON' : 'OFF'}</Text>
        </Animated.View>
      </TouchableOpacity>

      <Text style={styles.connectText}>{isConnected ? 'Connected' : 'Connect'}</Text>

      {/* Location Card */}
      <TouchableOpacity style={styles.locationCard} onPress={() => navigation.navigate('Location')}>
      <Text style={styles.flagIcon}>{selectedCountry.flag}</Text>
      <View style={styles.locationInfo}>
        <Text style={styles.locationLabel}>Location</Text>
        <Text style={styles.locationName}>{selectedCountry.name}</Text>
      </View>
      <Text style={styles.arrow}>▶</Text>
    </TouchableOpacity>

      {/* Side Menu */}
      <Modal transparent={true} visible={menuVisible} animationType="slide">
        <TouchableOpacity style={styles.modalOverlay} onPress={closeMenu}>
          <View style={styles.menuContainer}>
            <Text style={styles.menuHeader}>Version 1.6.9</Text>
            <TouchableOpacity style={styles.menuItem}>
              <Text>⭐ Rate App</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text>📱 More Apps</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={shareApp} >
              <Text>🔗 Share App</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => Linking.openURL('mailto:sayto@gmail.com')}>
                    <Text>💬 Feedback</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PrivacyPolicy')}>
              <Text>📜 Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('TermsAndConditions')}>
              <Text>📄 Terms and Conditions</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Rate Us Popup */}
      <Modal transparent={true} visible={starPopupVisible} animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.popupContainer}>
            <Text style={styles.popupHeader}>Rate Us</Text>
            <Text style={styles.popupText}>
              If you enjoy using our app, please take a moment to rate us. Thanks for your support!
            </Text>
            <View style={styles.popupButtonContainer}>
              <TouchableOpacity style={styles.popupButton}>
                <Text style={styles.popupButtonText}>Rate Now</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.popupButton} onPress={closeStarPopup}>
                <Text style={styles.popupButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A4DA2',
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vpnName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  menuIcon: {
    fontSize: 30,
    color: '#fff',
  },
  starIcon: {
    fontSize: 24,
    color: '#FFD700',
  },
  flagContainer: {
    marginBottom: 20,
    borderRadius: 100,
    overflow: 'hidden',
  },
  flag: {
    fontSize: 120,
  },
  toggleSwitch: {
    width: 120,
    height: 60,
    backgroundColor: '#333',
    borderRadius: 30,
    justifyContent: 'center',
    padding: 5,
    marginBottom: 10,
  },
  toggleCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  connectText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    justifyContent: 'space-between',
  },
  flagIcon: {
    fontSize: 30,
  },
  locationInfo: {
    marginLeft: 10,
    flex: 1,
  },
  locationLabel: {
    fontSize: 16,
    color: '#999',
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 20,
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 10,
  },
  menuHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  popupHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  popupText: {
    fontSize: 16,
    marginBottom: 20,
  },
  popupButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popupButton: {
    padding: 10,
    backgroundColor: '#0A4DA2',
    borderRadius: 5,
  },
  popupButtonText: {
    color: '#fff',
  },
});

export default VPNHomePage;
