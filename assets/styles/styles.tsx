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
    qrContainer: {
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: 20, // Espacio entre la cámara y los botones
        marginBottom: 20, // Espacio en la parte inferior
    },
      
      qrText: {
        fontSize: 18,
        color: 'white',
        marginBottom: 20,                 // Espacio entre el texto y los botones
        textAlign: 'center',              // Centra el texto
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
    containerAddMenu: {
        flex: 1,
        justifyContent: "flex-start", // Cambiado de "center" a "flex-start"
        alignItems: "center",
        backgroundColor: "rgb(164, 190, 243)",
        paddingTop: 20, // Espacio en la parte superior
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
        width: '50%', // Aumenté el ancho para mejor visibilidad
        height: '50%',
        aspectRatio: 1, // Definir altura explícita
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: "rgb(134, 19, 136)",
        marginTop: 20, // Espacio arriba
        marginBottom: 20, // Espacio abajo
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
     
        
    },
    
    item: {
        backgroundColor: "rgb(164, 190, 243)", // Jordy Blue
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
    photo2: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: "rgb(134, 19, 136)",
        borderWidth: 2,
        overflow: 'hidden',
      },
      pedidoCard: {
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        borderWidth: 2,
        backgroundColor: "#fff", // se sobreescribe con el color según estado
    },
    
    pedidoCardResaltado: {
        borderColor: "rgb(134, 19, 136)", // Borde más llamativo (Dark Magenta)
        borderWidth: 4,
    },
      itemTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "rgb(0, 0, 0)",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        marginBottom: 5,
      },
      
      itemPrice: {
        fontSize: 16,
        fontWeight: "600",
        color: "rgb(134, 19, 136)",
        marginBottom: 8,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      },
      itemDescription: {
        fontSize: 14,
        color: "rgb(0, 0, 0)",
        marginBottom: 8,
        textAlign: "center",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
      },

      
      quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        gap: 10, // o usa marginHorizontal
      },
      
      quantityButton: {
        backgroundColor: "rgb(134, 19, 136)",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 6,
      },
      
      quantityButtonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
      },
      
      quantityText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        marginHorizontal: 10,
      },
      filterBox: {
        backgroundColor:  "rgb(134, 19, 136)", // Dark Magenta
        padding: 5,
        borderRadius: 8,
        flexDirection: 'row',  // This will place items side by side
        alignItems: 'center',  // Aligns items vertically in the center
        justifyContent: 'space-between', 
        marginTop: 2,
    },
    cameraContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      },


    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center", // Centrado vertical
        backgroundColor: "#f2f2f2",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        height: 60,
      },
    
      icon: {
        width: 30,            // ✅ Asegura que todos los íconos ocupen el mismo espacio
        textAlign: 'center',
      },
    
      paymentText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'left',     // ✅ Alineación a la izquierda
        flex: 1,               // ✅ Hace que el texto se expanda hacia la derecha
      },
      imageContainer2: {
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
    containerAddMenu2:{

        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        backgroundColor: "rgb(164, 190, 243)",
        gap: 50,

    },
      
      
    
      
});
