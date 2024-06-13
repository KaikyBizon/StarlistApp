import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerProfile: {
        flex: 1,
        padding: 20,
        backgroundColor: '#9d9d9d',
      },

      profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      },

      profileInfo: {
        alignItems: 'center',
      },

      userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#404040', 
        fontFamily: 'Kanit_500Medium',
      },

      userId: {
        fontSize: 16,
        marginTop: 5,
        color: '#404040',
        fontFamily: 'Kanit_500Medium',
      },

      textinputPerfil: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 0,
        marginBottom: 30,
        paddingHorizontal: 10,
        borderRadius: 10,
        color: 'black',  
        fontFamily: 'Kanit_500Medium',
      },

      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
      },

      buttonDelete: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: 'red',
      },

      buttonSalvar: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: '#faed27',
      },

      buttonTextDelete: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Kanit_500Medium',
      },

      buttonTextSalvar: {
        color: '#404040',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Kanit_500Medium',
      },

      buttonSair: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 5,
        marginTop: 10,
        backgroundColor: '#696969',
      },

      buttonTextSair: {
        color: '#c1c1c1',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Kanit_500Medium',
      },

      inputPerfil: {
        color: '#faed27', 
        fontFamily: 'Kanit_500Medium',
      },

      viewInputPerfil: {
        marginTop: 0,
      }
});

export default styles;