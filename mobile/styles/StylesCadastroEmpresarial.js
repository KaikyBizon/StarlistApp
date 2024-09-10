import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  inputs: {
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: "#cecece",
    borderRadius: 10,
    height: 50,
    width: 380,
    paddingHorizontal: 6,
    marginBottom: 8,
    fontFamily: 'Kanit_500Medium',
    color: "black",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: "#cecece",
    borderRadius: 10,
    height: 50,
    width: 380,
    justifyContent: 'center',
    marginBottom: 8,
  },
  picker: {
    color: "black",
    fontFamily: 'Kanit_500Medium',
  },
  containerLogo: {
    width: 380,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    flex: 0,
    width: 300,
    height: 200,
    marginRight: 25,
  },
  btnSubmit: {
    backgroundColor: "#faed27",
    height: 70,
    width: 380,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  label: {
    color: "#ffffff",
    marginBottom: 1,
    fontFamily: 'Kanit_500Medium',
  },
  submitTxt: {
    color: "black",
    fontSize: 18,
    fontFamily: 'Kanit_500Medium',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#726C6F',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  modalErrorText: {
    marginBottom: 10,
    textAlign: 'center',
    color: '#faed27',
  },
  closeButton: {
    backgroundColor: '#FAED27',
    borderRadius: 9,
    padding: 8,
    elevation: 2,
  },
  closeButtonText: {
    color: '#726C6F',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;