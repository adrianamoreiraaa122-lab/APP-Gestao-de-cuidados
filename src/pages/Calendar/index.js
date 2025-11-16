import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome5 } from "@expo/vector-icons";
import { db } from "../../services/firebaseConnection";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  Timestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function Calendar() {
  const [modalVisible, setModalVisible] = useState(false); // adicionar
  const [detailsModalVisible, setDetailsModalVisible] = useState(false); // modal de detalhes
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false); // confirm modal (double-check)
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [specialty, setSpecialty] = useState("Cardiologista");
  const [doctorName, setDoctorName] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null); // compromisso selecionado

  const specialties = [
    "Cardiologista",
    "Ortopedista",
    "Oftalmologista",
    "Otorrinolaringologista",
    "Dermatologista",
    "Ginecologista",
    "Pediatra",
  ];

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    try {
      const q = query(collection(db, "consultas"), orderBy("datetime"), limit(50));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
      setAppointments(data);
    } catch (err) {
      console.log("Erro ao buscar consultas:", err);
    }
  }

  async function handleAddAppointment() {
    if (!date || !time || !doctorName) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    const [day, month, year] = date.split("/");
    const [hours, minutes] = time.split(":");

    if (!day || !month || !year || !hours || !minutes) {
      Alert.alert("Atenção", "Data ou horário no formato inválido!");
      return;
    }

    const datetime = new Date(year, month - 1, day, hours, minutes);

    try {
      await addDoc(collection(db, "consultas"), {
        date,
        time,
        specialty,
        doctorName,
        datetime: Timestamp.fromDate(datetime),
      });

      setModalVisible(false);
      setDate("");
      setTime("");
      setDoctorName("");
      setSpecialty("Cardiologista");
      await fetchAppointments();

      Alert.alert("Sucesso!", "Consulta registrada com sucesso.");
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", "Não foi possível salvar a consulta.");
    }
  }

  // Abre modal de detalhes ao clicar no compromisso
  function openDetailsModal(appt) {
    setSelectedAppointment(appt);
    setDetailsModalVisible(true);
  }

  // Fecha modal de detalhes
  function closeDetailsModal() {
    setSelectedAppointment(null);
    setDetailsModalVisible(false);
  }

  // Primeiro passo: abrir modal de confirmação (double-check)
  function askDeleteAppointment() {
    setConfirmDeleteVisible(true);
  }

  // Segundo passo: confirmar exclusão
  async function handleDeleteAppointment() {
    if (!selectedAppointment || !selectedAppointment.id) {
      Alert.alert("Erro", "Compromisso inválido.");
      setConfirmDeleteVisible(false);
      return;
    }

    try {
      await deleteDoc(doc(db, "consultas", selectedAppointment.id));
      setConfirmDeleteVisible(false);
      closeDetailsModal();
      await fetchAppointments();
      Alert.alert("Excluído", "Consulta excluída com sucesso.");
    } catch (err) {
      console.log("Erro ao excluir:", err);
      setConfirmDeleteVisible(false);
      Alert.alert("Erro", "Não foi possível excluir a consulta.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.rememberTitle}>Próximos Compromissos</Text>

      <ScrollView style={styles.rememberArea}>
        {appointments.length === 0 && (
          <Text style={{ color: "#888", textAlign: "center", marginTop: 20 }}>
            Nenhum compromisso encontrado.
          </Text>
        )}

        {appointments.map((appt) => (
          <TouchableOpacity
            key={appt.id}
            style={styles.rememberCard}
            activeOpacity={0.8}
            onPress={() => openDetailsModal(appt)}
          >
            <View style={styles.rememberData}>
              <Text style={styles.rememberDay}>{appt?.date ? appt.date.split("/")[0] : "--"}</Text>
              <View style={styles.rememberDescription}>
                <Text style={styles.rememberTime}>{appt?.time ?? "--:--"}</Text>
                <Text style={styles.rememberSpecialty}>{appt?.specialty ?? "Sem especialidade"}</Text>
                <Text style={styles.rememberDoctorName}>{appt?.doctorName ?? "Sem nome"}</Text>
              </View>
            </View>

            <View style={{ paddingLeft: 8 }}>
              <FontAwesome5 name="chevron-right" size={14} color="#888" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* BOTÃO ADICIONAR */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <FontAwesome5 name="plus" size={20} color="#FFF" />
      </TouchableOpacity>

      {/* MODAL ADICIONAR */}
      <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nova Consulta</Text>

            <TextInput
              placeholder="Data (DD/MM/AAAA)"
              placeholderTextColor="#6C63FF"
              style={styles.modalInput}
              value={date}
              onChangeText={setDate}
            />

            <TextInput
              placeholder="Horário (HH:MM)"
              placeholderTextColor="#6C63FF"
              style={styles.modalInput}
              value={time}
              onChangeText={setTime}
            />

            <Picker selectedValue={specialty} style={styles.picker} onValueChange={(itemValue) => setSpecialty(itemValue)}>
              {specialties.map((s) => (
                <Picker.Item key={s} label={s} value={s} />
              ))}
            </Picker>

            <TextInput
              placeholder="Nome do Doutor"
              placeholderTextColor="#6C63FF"
              style={styles.modalInput}
              value={doctorName}
              onChangeText={setDoctorName}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleAddAppointment}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL DETALHES (ABRE AO CLICAR NO ITEM) */}
      <Modal
        animationType="slide"
        transparent
        visible={detailsModalVisible}
        onRequestClose={() => closeDetailsModal()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalhes da Consulta</Text>

            <Text style={styles.detailLabel}>Data</Text>
            <Text style={styles.detailValue}>{selectedAppointment?.date ?? "--"}</Text>

            <Text style={styles.detailLabel}>Horário</Text>
            <Text style={styles.detailValue}>{selectedAppointment?.time ?? "--:--"}</Text>

            <Text style={styles.detailLabel}>Especialidade</Text>
            <Text style={styles.detailValue}>{selectedAppointment?.specialty ?? "—"}</Text>

            <Text style={styles.detailLabel}>Médico</Text>
            <Text style={styles.detailValue}>{selectedAppointment?.doctorName ?? "—"}</Text>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 18 }}>
              <TouchableOpacity style={[styles.saveButton, { flex: 1, marginRight: 8 }]} onPress={() => { askDeleteAppointment(); }}>
                <Text style={styles.saveButtonText}>Excluir</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.cancelButton, { flex: 1, marginLeft: 8 }]}
                onPress={() => closeDetailsModal()}
              >
                <Text style={styles.cancelButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL DE CONFIRMAÇÃO (DOUBLE-CHECK) */}
      <Modal
        animationType="fade"
        transparent
        visible={confirmDeleteVisible}
        onRequestClose={() => setConfirmDeleteVisible(false)}
      >
        <View style={styles.confirmOverlay}>
          <View style={styles.confirmBox}>
            <Text style={styles.confirmTitle}>Confirmar exclusão</Text>
            <Text style={styles.confirmText}>
              Tem certeza que deseja excluir esta consulta? Esta ação não pode ser desfeita.
            </Text>

            <View style={{ flexDirection: "row", marginTop: 16 }}>
              <TouchableOpacity
                style={[styles.cancelButton, { flex: 1, marginRight: 8 }]}
                onPress={() => setConfirmDeleteVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.deleteButton, { flex: 1, marginLeft: 8 }]}
                onPress={() => handleDeleteAppointment()}
              >
                <Text style={styles.deleteButtonText}>Confirmar exclusão</Text>
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
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  rememberData: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rememberDay: {
    backgroundColor: "#E6F7F2",
    color: "#2DC59F",
    fontWeight: "700",
    fontSize: 18,
    width: 50,
    height: 50,
    borderRadius: 12,
    textAlign: "center",
    lineHeight: 50,
  },
  rememberDescription: {
    gap: 4,
  },
  rememberTime: {
    color: "#8C8C8C",
    fontSize: 12,
  },
  rememberSpecialty: {
    color: "#1D1D1D",
    fontSize: 16,
    fontWeight: "600",
  },
  rememberDoctorName: {
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
    elevation: 6,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 18,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#41A4F4",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#F1F4F8",
    borderRadius: 10,
    height: 45,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#F1F4F8",
    borderRadius: 10,
    marginBottom: 12,
    height: 45,
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#41A4F4",
    borderRadius: 10,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  saveButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    borderRadius: 10,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#41A4F4",
    backgroundColor: "#FFF",
  },
  cancelButtonText: {
    textAlign: "center",
    color: "#41A4F4",
    fontSize: 16,
  },
  detailLabel: {
    fontSize: 12,
    color: "#888",
    marginTop: 6,
  },
  detailValue: {
    fontSize: 16,
    color: "#111",
    marginBottom: 6,
  },
  confirmOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  confirmBox: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 18,
  },
  confirmTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#D9534F",
    marginBottom: 8,
  },
  confirmText: {
    color: "#444",
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: "#D9534F",
    borderRadius: 10,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
