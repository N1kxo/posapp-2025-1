import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "rgb(255, 255, 255)", // Fondo blanco
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "rgb(0, 0, 0)", // Texto negro
        textAlign: "center",
    },
    input: {
        backgroundColor: "rgb(164, 190, 243)", // Jordy Blue
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        marginBottom: 15,
        color: "rgb(0, 0, 0)", // Texto negro
    },
    button: {
        backgroundColor: "rgb(134, 19, 136)", // Dark Magenta
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "rgb(255, 255, 255)", // Texto blanco
        fontWeight: "bold",
        fontSize: 16,
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginTop: 20,
    },
});
