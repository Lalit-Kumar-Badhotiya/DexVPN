import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PrivacyPolicyScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.backArrow}>⬅</Text>
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>Privacy Policy</Text>

      {/* Dummy content */}
      <Text style={styles.content}>
        This is a dummy Privacy Policy. You can replace this text with your real privacy policy details.
      </Text>
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
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
});

export default PrivacyPolicyScreen;
