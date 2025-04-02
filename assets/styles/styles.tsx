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
        borderWidth: 1,
        borderColor: "rgb(100, 100, 100)",
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
    camera: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    controls: {
        position: "absolute",
        top: 20,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semi-transparente
        borderRadius: 10,
    },
    controlsText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
    buttonMenu: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: "rgba(34, 34, 34, 0.7)", // Botones semi-transparente
        alignItems: "center",
        margin: 5,
    },
    previewImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "rgb(134, 19, 136)",
        marginTop: 15,
        alignSelf: "center",
    },
});
