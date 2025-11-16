import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Calendar() {
    return (
        <View style={styles.container}>
            <Text style={styles.rememberTitle}>Próximos Compromissos</Text>

            <View style={styles.rememberArea} >
                <View style={styles.rememberCard}>
                    <View style={styles.rememberData}>
                        <Text style={styles.rememberDay}>25</Text>
                        <View style={styles.rememberDescription}>
                            <Text style={styles.rememberTime}>08:00</Text>
                            <Text style={styles.rememberSpecialty}>Cardiologista</Text>
                            <Text style={styles.rememberDoctorName}>Dr. Flávio Augusto</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.rememberCard}>
                    <View style={styles.rememberData}>
                        <Text style={styles.rememberDay}>28</Text>
                        <View style={styles.rememberDescription}>
                            <Text style={styles.rememberTime}>07:30</Text>
                            <Text style={styles.rememberSpecialty}>Ortopedista</Text>
                            <Text style={styles.rememberDoctorName}>Dr. Cláudio Neves</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.rememberCard}>
                    <View style={styles.rememberData}>
                        <Text style={styles.rememberDay}>29</Text>
                        <View style={styles.rememberDescription}>
                            <Text style={styles.rememberTime}>09:00</Text>
                            <Text style={styles.rememberSpecialty}>Oftalmologista</Text>
                            <Text style={styles.rememberDoctorName}>Dra. Andrea Gouvea</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.rememberCard}>
                    <View style={styles.rememberData}>
                        <Text style={styles.rememberDay}>30</Text>
                        <View style={styles.rememberDescription}>
                            <Text style={styles.rememberTime}>08:30</Text>
                            <Text style={styles.rememberSpecialty}>Otorrinolaringologista</Text>
                            <Text style={styles.rememberDoctorName}>Dra. Catiuce Martins</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Botão flutuante para adicionar novo compromisso */}
            <TouchableOpacity style={styles.addButton} onPress={() => alert("Adicionar novo compromisso")}>
                <FontAwesome5 name="plus" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingLeft: 28,
        paddingRight: 28,
        backgroundColor: "#FFF"
    },
    rememberArea: {
        marginTop: 18,
        marginBottom: 80, // espaço pro botão
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
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
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
});
