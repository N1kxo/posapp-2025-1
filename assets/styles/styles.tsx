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
containerAddMenu:{

        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        backgroundColor: "rgb(164, 190, 243)",
        gap: 50,

    },

    photo: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor:"rgb(134, 19, 136)",
        overflow: 'hidden',
        
    },
    
    imageContainer: {
        width: '50%', // o un valor fijo como 300
        aspectRatio: 4 / 4, // ajusta según la forma que quieras
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor:"rgb(134, 19, 136)",
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        // solo mientras no hay imagen
    },
    
    cameraButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 30,
        padding: 5, 
        paddingHorizontal: 10,
        fontSize: 16,
      },
      priceInput: {
        width: "50%",
        borderWidth: 1,
        borderColor:"rgb(134, 19, 136)",
        backgroundColor: "#ccc",
        paddingVertical: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        
      },
      descriptionInput: {
        width: "50%",
        borderWidth: 1,
        borderColor:"rgb(134, 19, 136)",
        padding: 10,
        fontSize: 16,
        textAlignVertical: 'top',
        backgroundColor: "#ccc",
      },
      titleInput:{

        width: "50%",
        borderWidth: 1,
        borderColor:"rgb(134, 19, 136)",
        paddingVertical: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: "#ccc",
     
        
      } ,
    


    item: {
        backgroundColor: "rgb(135, 160, 178)", // Azul grisáceo
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    addButton: {
        backgroundColor: "rgb(86, 71, 135)", // Azul oscuro
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    updateButton: {
        backgroundColor: "rgb(134, 19, 136)", // Dark Magenta
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    deleteButton: {
        backgroundColor: "rgb(255, 0, 0)", // Rojo para eliminar
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    editButton: {
        backgroundColor: "rgb(86, 71, 135)", // Azul oscuro
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },

});
