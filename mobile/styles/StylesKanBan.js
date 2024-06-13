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
    height: 30,
  },
  containerMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: '17%',
  },
  txtData: {
    color: '#faed27',
    fontSize: 25,
    marginLeft: 15,
    fontFamily: 'Kanit_500Medium',
  },
  tarefa: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#726c6f',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    width: '100%',
  },
  tarefaData: {
    marginBottom: 8,
  },
  txtTarefa: {
    color: '#726c6f',
    fontSize: 20,
    marginBottom: 5,
    fontFamily: 'Kanit_500Medium',
  },
  infoTarefa: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
  },
  detalheTarefa: {
    flex: 1,
  },
  txtInfo: {
    fontSize: 15,
    color: '#726c6f',
    marginBottom: 10,
    fontFamily: 'Kanit_500Medium',
  },
  barraVert: {
    backgroundColor: '#726c6f',
    width: 2,
    borderRadius: 10,
    marginHorizontal: 8,
  },
  dataTarefa: {
    alignItems: 'flex-end',
  },
  txtHora: {
    fontSize: 15,
    color: '#726c6f',
    fontFamily: 'Kanit_500Medium',
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
    marginBottom: 10,
  },
  txtRodape: {
    color: '#FAED27',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Kanit_500Medium',
  },
  add: {
    width: 60,
    height: 60,
  },
});
