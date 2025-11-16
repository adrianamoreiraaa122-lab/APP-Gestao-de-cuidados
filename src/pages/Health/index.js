import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Health() {
  const [info, setInfo] = useState([
    { icon: "heartbeat", label: "Pressão", value: "120/80 mmHg" },
    { icon: "temperature-high", label: "Temperatura", value: "36.7°C" },
    { icon: "tint", label: "Glicose", value: "95 mg/dL" },
    { icon: "weight", label: "Peso", value: "68 kg" },
  ]);

  const atividades = [
    { icon: "walking", nome: "Caminhada leve" },
    { icon: "utensils", nome: "Almoço saudável" },
    { icon: "book", nome: "Leitura matinal" },
    { icon: "brain", nome: "Exercício mental" },
  ];

  const visitas = [
    { nome: "Maria Souza (filha)", data: "10/11/2025 - 14:00" },
    { nome: "Carlos Pereira (amigo)", data: "12/11/2025 - 16:30" },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [editedValues, setEditedValues] = useState({});

  const handleOpenModal = () => {
    const initialValues = {};
    info.forEach((item) => {
      if (item.label === "Pressão") {
        initialValues[item.label] = item.value.replace(" mmHg", "").replace("/", "");
      } else {
        initialValues[item.label] = item.value.replace(/[^\d.,]/g, "");
      }
    });
    setEditedValues(initialValues);
    setModalVisible(true);
  };

  const validateValues = (label, value) => {
    const num = parseFloat(value);

    switch (label) {
      case "Pressão":
        if (value.length < 5 || value.length > 6) {
          Alert.alert("Valor inválido", "Digite uma pressão válida, ex: 12080");
          return false;
        }
        return true;
      case "Temperatura":
        if (num < 34 || num > 42) {
          Alert.alert("Temperatura fora do normal", "Informe uma temperatura entre 34°C e 42°C.");
          return false;
        }
        return true;
      case "Glicose":
        if (num < 60 || num > 300) {
          Alert.alert("Glicose fora do normal", "Informe um valor entre 60 e 300 mg/dL.");
          return false;
        }
        return true;
      case "Peso":
        if (num < 30 || num > 200) {
          Alert.alert("Peso fora do normal", "Informe um valor entre 30 e 200 kg.");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleSave = () => {
    const updatedInfo = info.map((item) => {
      const newValue = editedValues[item.label];
      if (!newValue) return item;

      if (!validateValues(item.label, newValue)) return item;

      let formattedValue = "";

      switch (item.label) {
        case "Pressão":
          const systolic = newValue.substring(0, 3);
          const diastolic = newValue.substring(3);
          formattedValue = `${systolic}/${diastolic} mmHg`;
          break;
        case "Temperatura":
          formattedValue = `${newValue}°C`;
          break;
        case "Glicose":
          formattedValue = `${newValue} mg/dL`;
          break;
        case "Peso":
          formattedValue = `${newValue} kg`;
          break;
      }

      return { ...item, value: formattedValue };
    });

    setInfo(updatedInfo);
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Histórico Médico */}
      <Text style={styles.title}>Histórico Médico</Text>

      <View style={styles.grid}>
        {info.map((item, index) => (
          <View key={index} style={styles.card}>
            <FontAwesome5 name={item.icon} size={24} color="#6C63FF" />
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
      </View>

      {/* Botão Editar */}
      <TouchableOpacity style={styles.editButton} onPress={handleOpenModal}>
        <FontAwesome5 name="edit" size={20} color="#fff" />
        <Text style={styles.editText}>Editar Informações</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <ScrollView
            style={styles.modalContent}
            contentContainerStyle={{ paddingBottom: 40 }}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.modalTitle}>Editar Dados</Text>

            {info.map((item, index) => (
              <View key={index} style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{item.label}</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={editedValues[item.label]}
                  onChangeText={(text) =>
                    setEditedValues({ ...editedValues, [item.label]: text.replace(/[^\d.,]/g, "") })
                  }
                  maxLength={item.label === "Pressão" ? 6 : 5}
                />
              </View>
            ))}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>

      {/* Atividades Realizadas */}
      <Text style={styles.subtitle}>Atividades Realizadas (últimas)</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {atividades.map((item, index) => (
          <View key={index} style={styles.activityCard}>
            <FontAwesome5 name={item.icon} size={22} color="#6C63FF" />
            <Text style={styles.activityText}>{item.nome}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Próximas Visitas */}
      <Text style={styles.subtitle}>Próximas Visitas Agendadas</Text>
      {visitas.map((item, index) => (
        <View key={index} style={styles.visitCard}>
          <FontAwesome5 name="user-friends" size={20} color="#6C63FF" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.visitName}>{item.nome}</Text>
            <Text style={styles.visitDate}>{item.data}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { marginTop: 36, fontSize: 20, color: "#41A4F4", marginBottom: 12 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  card: {
    width: "47%",
    backgroundColor: "#f3f2ff",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  label: { fontSize: 14, color: "#666", marginTop: 6 },
  value: { fontSize: 16, fontWeight: "bold", color: "#333" },
  editButton: {
    flexDirection: "row",
    backgroundColor: "#41A4F4",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  editText: { color: "#fff", fontSize: 16, marginLeft: 8 },
  modalContainer: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.3)" },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#41A4F4",
    marginBottom: 16,
    textAlign: "center",
  },
  inputGroup: { marginBottom: 15 },
  inputLabel: { color: "#333", marginBottom: 6, fontWeight: "500" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: "#333",
  },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  button: {
    flex: 1,
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: { backgroundColor: "#ccc" },
  saveButton: { backgroundColor: "#41A4F4" },
  buttonText: { color: "#fff", fontSize: 16 },
  subtitle: { marginTop: 24, fontSize: 20, color: "#41A4F4", marginBottom: 12 },
  activityCard: {
    backgroundColor: "#f3f2ff",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    width: 130,
  },
  activityText: { marginTop: 8, fontSize: 14, color: "#444", textAlign: "center" },
  visitCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f2ff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  visitName: { fontSize: 16, fontWeight: "600", color: "#333" },
  visitDate: { fontSize: 14, color: "#666" },
});
