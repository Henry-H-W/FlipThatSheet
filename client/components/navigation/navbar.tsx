import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Text, TouchableWithoutFeedback } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TopBar = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleDropdown = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconButton} onPress={toggleDropdown}>
        <FontAwesome name="music" size={28} style={styles.icon} />
      </TouchableOpacity>

      <View style={styles.rightIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="book" size={28} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="cloud-download" size={28} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="cog" size={28} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {modalVisible && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={modalVisible}
          onRequestClose={toggleDropdown}
        >
          <TouchableWithoutFeedback onPress={toggleDropdown}>
            <View style={styles.modalOverlay}>
              <View style={styles.dropdown}>
                <TouchableOpacity style={styles.dropdownItem}>
                  <Text style={styles.dropdownText}>Option 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownItem}>
                  <Text style={styles.dropdownText}>Option 2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownItem}>
                  <Text style={styles.dropdownText}>Option 3</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 10,
    height: 60,
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    color: '#00BFFF',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 200,
    padding: 10,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
});

export default TopBar;