import { FontAwesome5 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";

// FIREBASE
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

export default function Home() {
    const [search, setSearch] = useState("");
    const [nextAppointments, setNextAppointments] = useState([]);
    const navigation = useNavigation();
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        loadNextAppointments();
    }, []);

    async function loadNextAppointments() {
        try {
            const q = query(
                collection(db, "consultas"),
                orderBy("datetime"),
                limit(2)
            );

            const querySnapshot = await getDocs(q);
            const list = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setNextAppointments(list);
        } catch (error) {
            console.log("Erro ao carregar compromissos:", error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <FontAwesome5 name="heartbeat" size={30} color="#41A4F4" />
                <Text style={styles.textHeader}>Health Senior</Text>

                <View style={styles.rightIcons}>
                    <View style={styles.notificationIcon}>
                        <Ionicons name="notifications" size={24} color="#41A4F4" />
                    </View>

                    <TouchableOpacity style={styles.logoutIcon} onPress={logout}>
                        <Ionicons name="log-out-outline" size={22} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.searchArea}>
                <FontAwesome5 name="search" size={18} color="#41A4F4" />
                <TextInput
                    style={styles.search}
                    placeholder="Buscar.."
                    value={search}
                    onChangeText={setSearch}
                    placeholderTextColor="#41A4F4"
                />
            </View>

            <View style={styles.cardHome}>
                <Text style={styles.titleCard}>Cuide de sua saúde. {'\n'}Todas suas necessidades estão aqui</Text>
                <Text style={styles.paragraphCard}>Desde lembretes de consultas e exames, até medicamentos e seus horários</Text>
                <TouchableOpacity style={styles.examsBtn} onPress={() => navigation.navigate('Saúde')}>
                    <Text style={styles.examsTextBtn}>Exames</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.rememberTitle}>Próximos Compromissos</Text>

            <View style={styles.rememberArea}>

                {nextAppointments.length === 0 && (
                    <Text style={{ color: "#888" }}>Nenhum compromisso encontrado.</Text>
                )}

                {nextAppointments.map(appt => (
                    <TouchableOpacity
                        key={appt.id}
                        style={styles.rememberCard}
                        onPress={() => navigation.navigate("Compromissos")}
                        activeOpacity={0.8}
                    >
                        <View style={styles.rememberData}>
                            <Text style={styles.rememberDay}>
                                {appt?.date ? appt.date.split("/")[0] : "--"}
                            </Text>
                            <View style={styles.rememberDescription}>
                                <Text style={styles.rememberTime}>{appt?.time ?? "--:--"}</Text>
                                <Text style={styles.rememberSpecialty}>{appt?.specialty ?? "Sem especialidade"}</Text>
                                <Text style={styles.rememberDoctorName}>{appt?.doctorName ?? "Sem nome"}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 90,
        paddingLeft: 28,
        paddingRight: 28,
        backgroundColor: "#FFF"
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    textHeader: {
        fontSize: 26,
        color: "#41A4F4",
        flex: 1
    },
    rightIcons: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    notificationIcon: {
        backgroundColor: '#F0F3F7',
        borderRadius: 50,
        padding: 6,
    },
    logoutIcon: {
        backgroundColor: "#FF4D4D",
        borderRadius: 50,
        padding: 8
    },
    searchArea: {
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#F1F4F8",
        backgroundColor: "#F1F4F8",
        height: 48,
        paddingLeft: 10,
        elevation: 3,
    },
    search: {
        flex: 1,
        fontSize: 20,
        color: "#41A4F4"
    },
    cardHome: {
        marginTop: 36,
        backgroundColor: "#47A7F6",
        padding: 20,
        gap: 16,
        borderRadius: 12,
        elevation: 3,
    },
    titleCard: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600"
    },
    paragraphCard: {
        color: "#FFFFFF",
        fontSize: 14,
    },
    examsBtn: {
        backgroundColor: "#75b6f6",
        borderRadius: 8,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center'
    },
    examsTextBtn: {
        color: "#FFFFFF",
        fontWeight: 'bold',
        fontSize: 22
    },
    rememberArea: {
        marginTop: 18,
    },
    rememberTitle: {
        marginTop: 36,
        fontSize: 20,
        color: "#41A4F4",
        marginBottom: 12
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
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16
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
        gap: 4
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
    }
});
