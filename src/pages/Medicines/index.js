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
    Platform
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { db } from "../../services/firebaseConnection";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    query,
    orderBy
} from "firebase/firestore";

export default function Medicines() {
    const [modalVisible, setModalVisible] = useState(false);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [dosage, setDosage] = useState("");
    const [time, setTime] = useState("");
    const [selectedMed, setSelectedMed] = useState(null);

    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        fetchMedicines();
    }, []);

    async function fetchMedicines() {
        try {
            const q = query(collection(db, "remedios"), orderBy("time"));
            const snapshot = await getDocs(q);

            const list = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setMedicines(list);
        } catch (err) {
            console.log("Erro ao buscar remédios:", err);
        }
    }

    async function handleAddMedicine() {
        if (!name || !quantity || !dosage || !time) {
            Alert.alert("Atenção", "Preencha todos os campos!");
            return;
        }

        try {
            await addDoc(collection(db, "remedios"), {
                name,
                quantity,
                dosage,
                time
            });

            setModalVisible(false);
            setName("");
            setQuantity("");
            setDosage("");
            setTime("");
            fetchMedicines();
        } catch (err) {
            console.log("Erro ao salvar remédio:", err);
            Alert.alert("Erro", "Não foi possível salvar o remédio.");
        }
    }

    async function handleDeleteMedicine() {
        try {
            await deleteDoc(doc(db, "remedios", selectedMed?.id));
            setConfirmDeleteVisible(false);
            setDetailModalVisible(false);
            fetchMedicines();
        } catch (err) {
            console.log("Erro ao excluir:", err);
            Alert.alert("Erro", "Não foi possível excluir o remédio.");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lembretes de Remédios</Text>

            <ScrollView style={styles.listArea}>
                {medicines.map(med => (
                    <TouchableOpacity
                        key={med.id}
                        style={styles.card}
                        onPress={() => {
                            setSelectedMed(med);
                            setDetailModalVisible(true);
                        }}
                    >
                        <View style={styles.cardBox}>
                            <Text style={styles.cardTime}>{med.time}</Text>
                            <View>
                                <Text style={styles.cardName}>{med.name}</Text>
                                <Text style={styles.cardDosage}>
                                    {med.quantity} — {med.dosage}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
            >
                <FontAwesome5 name="plus" size={20} color="#FFF" />
            </TouchableOpacity>

            {/* Modal Novo Remédio */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Novo Remédio</Text>

                        <TextInput
                            placeholder="Nome do Remédio (Ex: Dipirona)"
                            placeholderTextColor="#6C63FF"
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />

                        <TextInput
                            placeholder="Quantidade (Ex: 1 comprimido)"
                            placeholderTextColor="#6C63FF"
                            style={styles.input}
                            value={quantity}
                            onChangeText={setQuantity}
                        />

                        <TextInput
                            placeholder="Dose (Ex: 500mg)"
                            placeholderTextColor="#6C63FF"
                            style={styles.input}
                            value={dosage}
                            onChangeText={setDosage}
                        />

                        <TextInput
                            placeholder="Horário (HH:MM)"
                            placeholderTextColor="#6C63FF"
                            style={styles.input}
                            value={time}
                            onChangeText={setTime}
                        />

                        <TouchableOpacity style={styles.saveButton} onPress={handleAddMedicine}>
                            <Text style={styles.saveText}>Salvar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal Detalhes */}
            <Modal visible={detailModalVisible} animationType="fade" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Detalhes do Remédio</Text>

                        <Text style={styles.detailText}>💊 {selectedMed?.name}</Text>
                        <Text style={styles.detailText}>📦 {selectedMed?.quantity}</Text>
                        <Text style={styles.detailText}>🧪 {selectedMed?.dosage}</Text>
                        <Text style={styles.detailText}>⏰ {selectedMed?.time}</Text>

                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => setConfirmDeleteVisible(true)}
                        >
                            <Text style={styles.deleteText}>Excluir</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setDetailModalVisible(false)}>
                            <Text style={styles.cancelText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal Confirmação */}
            <Modal visible={confirmDeleteVisible} animationType="fade" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.confirmContent}>
                        <Text style={styles.modalTitle}>Confirmar exclusão</Text>
                        <Text style={styles.confirmMessage}>Excluir o remédio:</Text>
                        <Text style={styles.confirmName}>{selectedMed?.name}</Text>

                        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteMedicine}>
                            <Text style={styles.deleteText}>Excluir</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setConfirmDeleteVisible(false)}>
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </TouchableOpacity>
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
        paddingHorizontal: 28,
        backgroundColor: "#FFF"
    },

    title: {
        marginTop: 36,
        fontSize: 20,
        color: "#41A4F4",
        marginBottom: 12,
        fontWeight: "600"
    },

    listArea: {
        marginTop: 18,
        marginBottom: 80
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        borderWidth: Platform.OS === "ios" ? 0.8 : 0,
        borderColor: "rgba(0,0,0,0.08)",
        paddingVertical: 16,
        paddingHorizontal: 18,
        marginBottom: 18,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 4
    },

    cardBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16
    },

    cardTime: {
        backgroundColor: "#E6F7F2",
        color: "#2DC59F",
        fontWeight: "700",
        fontSize: 16,
        width: 50,
        height: 50,
        borderRadius: 12,
        textAlign: "center",
        lineHeight: 50
    },

    cardName: {
        color: "#1D1D1D",
        fontSize: 16,
        fontWeight: "600"
    },

    cardDosage: {
        color: "#8C8C8C",
        fontSize: 12
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
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
        elevation: 6
    },

    modalContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },

    modalContent: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        marginHorizontal: 20,
        padding: 20
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 12,
        color: "#41A4F4",
        textAlign: "center"
    },

    input: {
        borderWidth: 1,
        borderColor: "#DDE3EE",
        borderRadius: 10,
        height: 45,
        paddingHorizontal: 10,
        marginBottom: 12
    },

    saveButton: {
        backgroundColor: "#41A4F4",
        borderRadius: 10,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    },

    saveText: {
        color: "#FFF",
        fontWeight: "700",
        fontSize: 16
    },

    cancelText: {
        color: "#41A4F4",
        fontSize: 16,
        textAlign: "center"
    },

    detailText: {
        fontSize: 15,
        marginBottom: 6,
        color: "#1D1D1D"
    },

    deleteButton: {
        backgroundColor: "#FF4D4D",
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 14
    },

    deleteText: {
        color: "#FFF",
        fontWeight: "700",
        textAlign: "center",
        fontSize: 15
    },

    confirmContent: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        marginHorizontal: 20,
        padding: 24,
        alignItems: "center"
    },

    confirmMessage: {
        fontSize: 15,
        color: "#1D1D1D",
        textAlign: "center",
        marginBottom: 8
    },

    confirmName: {
        color: "#FF4D4D",
        fontSize: 17,
        fontWeight: "700",
        marginBottom: 16
    }
});
