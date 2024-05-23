import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#9d9d9d',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    menu: {
        width: 30,
        height: 30
    },
    containerMenu: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        height: '17%'
    },
    txtData: {
        color: '#faed27',
        fontSize: 25,
        marginLeft: 15
    },
    tarefa: {
        height: 140,
        borderWidth:2, 
        borderColor:'#726c6f',
        borderRadius:10, 
        marginBottom:20 
    },

    tarefaData: {
        flexDirection: 'row',
        alignItems: 'center'
    }, 
    barraVert:{
        backgroundColor:'#726c6f', 
        width:2,
        borderRadius:10
    },
    estrela: {
        width: 20,
        height: 20
    },
    txtTarefa: {
        color: '#726c6f',
        fontSize: 20,
        marginLeft: 15,
        marginTop: 5,
        marginBottom: 5
    },
    txtInfo: {
        fontSize: 15,
        color:'#726c6f',
        width: 200,
        marginLeft: 15,
        marginBottom: 10
    }, 
    txtHora: {
        fontSize: 15,
        color:'#726c6f',
        width: 200,
        marginLeft: 15
    },
    detalheTarefa: {
        width: '50%',
        height:'100%',
    },
    infoTarefa: {
        flexDirection: 'row',
        height: '71%', 
    },
    container: {
        flex: 1,
        width: '90%',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: 10
    },
    txtRodape: {
        color: '#FAED27',
        fontSize: 25,
        fontWeight: 'bold'
    },
    add: {
        width: 60,
        height: 60
    },
});