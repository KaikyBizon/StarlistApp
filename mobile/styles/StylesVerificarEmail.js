// StylesVerificarEmail.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#faed27',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    height: 50,
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#faed27',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  buttonCancel: {
    backgroundColor: 'red',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextCancel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;