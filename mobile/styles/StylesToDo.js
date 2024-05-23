import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#9d9d9d',
        alignItems:'center',
        width: '100%',
        height: '100%',
    }, 
    menu:{
        width:30, 
        height:30
    },
    containerMenu: {
        flexDirection:'row',
        alignItems:'center', 
        width:'90%',
        height: '17%', 
    }, 
    txtData: {
        color: '#faed27',
        fontSize: 25,
        marginLeft:15,
        fontFamily: 'Kanit_500Medium',
    },
    tarefaData:{
        flexDirection:'row',
        alignItems:'center',
    }, 
    estrela:{
        width:20,
        height:20
    },
    txtTarefa: {
        color: '#f6f1a6', 
        fontSize:20, 
        marginLeft:10,
        marginTop:5,
        marginBottom:5,
        fontFamily: 'Kanit_500Medium',
    }, 
    txtInfo:{
        fontSize:15, 
        width:200,
        marginLeft:30, 
        marginBottom:10,
        fontFamily: 'Kanit_500Medium',
    }, 
    txtHora:{
        fontSize:15,
        fontFamily: 'Kanit_500Medium',
    },
    infoTarefa:{
        flexDirection:'row',
    },
    container: {
        flex: 1,
        width: '80%', 
    }, 
    footer:{
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'space-between', 
        width:'90%', 
        marginBottom: 10
    }, 
    txtRodape:{
        color:'#FAED27',
        fontSize: 25, 
        fontFamily: 'Kanit_500Medium',
    },
    add:{
        width:60, 
        height:60
    },
    goCalendario: {
        flexDirection: 'row',
        width: '55%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    iconeCalendario: {
        width: 40,
        height: 40,
    }
});