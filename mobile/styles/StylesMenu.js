import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    width: '100%',
    height: 70,
    marginTop: 15
  },
  logo: {
    width: 170,
    height: 95,
    resizeMode: 'contain',
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navItem: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  navIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  searchBar: {
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#808080',
    color: 'black',
    flex: 1
    
  },
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 10,
    gap: 10,
    alignItems: 'center',
  },
});

export default styles;