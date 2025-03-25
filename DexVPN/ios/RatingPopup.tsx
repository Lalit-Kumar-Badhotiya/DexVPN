import React, { FC, useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

type RatingPopupProps = {
  visible: boolean;
  onClose: () => void; // Correctly type onClose as a function with no arguments
};

const RatingPopup: FC<RatingPopupProps> = ({ visible, onClose }) => {
  const [rating, setRating] = useState(4);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Do you like DEX VPN?</Text>
          <Text style={styles.subtitle}>We need your support!</Text>

          <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((num) => (
              <TouchableOpacity key={num} onPress={() => setRating(num)}>
                <Text style={[styles.star, rating >= num ? styles.filledStar : styles.emptyStar]}>
                  ★
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.rateButton} onPress={onClose}>
            <Text style={styles.rateButtonText}>Rate us 5 stars</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>✖</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  starContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  star: {
    fontSize: 30,
    marginHorizontal: 5,
  },
  filledStar: {
    color: "#FFD700",
  },
  emptyStar: {
    color: "#ccc",
  },
  rateButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  rateButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  closeButton: {
    marginTop: 15,
  },
  closeText: {
    fontSize: 20,
    color: "#000",
  },
});

export default RatingPopup;
