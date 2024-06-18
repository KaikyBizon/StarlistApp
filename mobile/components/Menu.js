import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import styles from '../styles/StylesMenu';

const MenuScreen = ({ searchText, setSearchText }) => {
  // Obtém o objeto de navegação
  const navigation = useNavigation();
  // Estado para controlar a visibilidade da barra de pesquisa
  const [searchVisible, setSearchVisible] = useState(false);

  // Hook para definir dinamicamente as opções do cabeçalho quando a tela é montada
  React.useLayoutEffect(() => {
    navigation.setOptions({
      // Configura o conteúdo do lado direito do cabeçalho
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          {/* Exibe a barra de pesquisa se searchVisible for verdadeiro */}
          {searchVisible && (
            <TextInput
              style={styles.searchBar}
              placeholder="Pesquisar..."
              placeholderTextColor="#888"
              value={searchText}
              onChangeText={setSearchText}
            />
          )}
          {/* Botão para alternar a visibilidade da barra de pesquisa */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setSearchVisible(!searchVisible)}
          >
            <Feather size={24} name="search" />
          </TouchableOpacity>
          {/* Botão para navegar para a tela 'Planos' */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Planos')}
          >
            <Feather size={24} name="shopping-cart" />
          </TouchableOpacity>
        </View>
      ),
      // Estilo do cabeçalho
      headerStyle: {
        backgroundColor: '#9d9d9d',
      },
      // Cor dos ícones do cabeçalho
      headerTintColor: '#000',
    });
  }, [navigation, searchVisible, searchText]); // Dependências do hook useLayoutEffect

  return null; // O componente não renderiza elementos visuais diretamente
};

export default MenuScreen;
