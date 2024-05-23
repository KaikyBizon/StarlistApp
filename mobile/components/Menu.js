import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import styles from '../styles/StylesMenu';

const MenuScreen = ({ searchText, setSearchText }) => {
  const navigation = useNavigation();
  const [searchVisible, setSearchVisible] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          {searchVisible && (
            <TextInput
              style={styles.searchBar}
              placeholder="Pesquisar..."
              placeholderTextColor="#888"
              value={searchText}
              onChangeText={setSearchText}
            />
          )}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setSearchVisible(!searchVisible)}
          >
            <Feather size={24} name="search" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Planos')}
          >
            <Feather size={24} name="shopping-cart" />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        backgroundColor: '#9d9d9d',
      },
      headerTintColor: '#000',
    });
  }, [navigation, searchVisible, searchText]);

  return null;
};

export default MenuScreen;
