import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Medicines() {
  const [reminders, setReminders] = useState([
    { id: 1, hour: "08:00", dosage: "2 comprimidos", medicine: "Paracetamol", gram: "500mg" },
    { id: 2, hour: "12:00", dosage: "1 cápsula", medicine: "Amoxicilina", gram: "875mg" },
    { id: 3, hour: "18:30", dosage: "1 comprimido", medicine: "Losartana", gram: "50mg" },
    { id: 4, hour: "22:00", dosage: "1 comprimido", medicine: "Melatonina", gram: "3mg" },
  ]);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [newMedicine, setNewMedicine] = useState("");
  const [newDosage, setNewDosage] = useState("");
  const [newHour, setNewHour] = useState("");
  const [newGram, setNewGram] = useState("");

  const openEditModal = (item) => {
    setSelectedItem(item);
    setNewMedicine(item.medicine);
    setNewDosage(item.dosage);
    setNewHour(item.hour);
    setNewGram(item.gram);
    setEditModalVisible(true);
  };

  const saveChanges = () => {
    if (newMedicine && newDosage && newHour && newGram) {
      const updated = reminders.map((item) =>
        item.id === selectedItem.id
          ? { ...item, medicine: newMedicine, dosage: newDosage, hour: newHour, gram: newGram }
          : item
      );
      setReminders(updated);
      setEditModalVisible(false);
    } else {
      alert("Preencha todos os campos!");
    }
  };

  const confirmDelete = () => setConfirmModalVisible(true);

  const deleteReminder = () => {
    setReminders(reminders.filter((item) => item.id !== selectedItem.id));
    setConfirmModalVisible(false);
    setEditModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.rememberTitle}>Próximos Medicamentos</Text>

      <View style={styles.rememberArea}>
        {reminders.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => openEditModal(item)} activeOpacity={0.8}>
            <View style={styles.rememberCard}>
              <View style={styles.rememberData}>
                <Text style={styles.rememberHour}>{item.hour}</Text>
                <View style={styles.rememberDescription}>
                  <Text style={styles.rememberDosage}>{item.dosage}</Text>
                  <Text style={styles.rememberMedicine}>{item.medicine}</Text>
                  <Text style={styles.rememberGram}>{item.gram}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botão flutuante para adicionar novo */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          openEditModal({ id: null, hour: "", dosage: "", medicine: "", gram: "" })
        }
      >
        <FontAwesome5 name="plus" size={20} color="#FFF" />
      </TouchableOpacity>

      {/* Modal de edição / adição */}
      <Modal visible={editModalVisible} transparent animationType="fade">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.modalOverlay}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                {selectedItem?.id ? "Editar Medicamento" : "Adicionar Medicamento"}
              </Text>

              <TextInput
                placeholder="Nome do medicamento"
                placeholderTextColor="#666"
                value={newMedicine}
                onChangeText={setNewMedicine}
                style={styles.input}
              />
              <TextInput
                placeholder="Dosagem (ex: 2 comprimidos)"
                placeholderTextColor="#666"
                value={newDosage}
                onChangeText={setNewDosage}
                style={styles.input}
              />
              <TextInput
                placeholder="Horário (ex: 08:00)"
                placeholderTextColor="#666"
                value={newHour}
                onChangeText={setNewHour}
                style={styles.input}
              />
              <TextInput
                placeholder="Concentração (ex: 500mg)"
                placeholderTextColor="#666"
                value={newGram}
                onChangeText={setNewGram}
                style={styles.input}
              />

              <View style={styles.modalButtons}>
                {selectedItem?.id && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={confirmDelete}
                  >
                    <Text style={styles.deleteText}>Excluir</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setEditModalVisible(false)}
                >
                  <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
                  <Text style={styles.saveText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>

      {/* Modal de confirmação de exclusão */}
      <Modal visible={confirmModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.confirmContainer}>
            <FontAwesome5 name="exclamation-triangle" size={30} color="#F35B5B" />
            <Text style={styles.confirmTitle}>Excluir medicamento?</Text>
            <Text style={styles.confirmText}>Essa ação não poderá ser desfeita.</Text>

            <View style={styles.confirmButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setConfirmModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={deleteReminder}>
                <Text style={styles.deleteText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 28,
    paddingRight: 28,
    backgroundColor: "#FFF",
  },
  rememberArea: {
    marginTop: 18,
    marginBottom: 80,
  },
  rememberTitle: {
    marginTop: 36,
    fontSize: 20,
    color: "#41A4F4",
    marginBottom: 12,
  },
  rememberCard: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  rememberData: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  rememberHour: {
    backgroundColor: "#E6F7F2",
    color: "#2DC59F",
    fontWeight: "700",
    fontSize: 18,
    width: 70,
    height: 50,
    borderRadius: 12,
    textAlign: "center",
    lineHeight: 50,
  },
  rememberDescription: {
    gap: 4,
  },
  rememberDosage: {
    color: "#8C8C8C",
    fontSize: 12,
  },
  rememberMedicine: {
    color: "#1D1D1D",
    fontSize: 16,
    fontWeight: "600",
  },
  rememberGram: {
    color: "#8C8C8C",
    fontSize: 12,
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#41A4F4",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 24,
    width: "85%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    color: "#000",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  cancelText: {
    color: "#333",
    fontWeight: "500",
  },
  saveButton: {
    backgroundColor: "#41A4F4",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  saveText: {
    color: "#FFF",
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#F35B5B",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  deleteText: {
    color: "#FFF",
    fontWeight: "600",
  },
  confirmContainer: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 24,
    width: "80%",
    alignItems: "center",
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  confirmText: {
    color: "#555",
    textAlign: "center",
    marginBottom: 16,
  },
  confirmButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
