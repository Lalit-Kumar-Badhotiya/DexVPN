import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

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

const LocationScreen = ({ navigation }: any) => {
  const handleLocationSelect = (location: any) => {
  navigation.navigate('Home', { selectedLocation: location });
};

 

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.backArrow}>⬅</Text>
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>Locations</Text>

      <FlatList
        data={locations}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.locationCard} onPress={() => handleLocationSelect(item)}>
            <Text style={styles.flag}>{item.flag}</Text>
            <Text style={styles.locationName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: -5,
    left: 15,
    padding: 10,
    zIndex: 10,
  },
  backArrow: {
    fontSize: 36, // larger and thicker
    fontWeight: 'bold',
    color: '#000',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  flag: {
    fontSize: 30,
    marginRight: 20,
  },
  locationName: {
    fontSize: 18,
  },
});

export default LocationScreen;
