/**
 * Nome do Componente: MenuScreen
 *
 * Descrição Detalhada:
 *   Componente funcional React Native que define o layout do cabeçalho para a navegação, incluindo um botão para alternar a visibilidade da barra de pesquisa e outro para navegar para a tela de 'Planos'. A visibilidade da barra de pesquisa é controlada por estados internos, e as opções do cabeçalho são configuradas dinamicamente usando o hook useLayoutEffect.
 *
 * Observações Pertinentes:
 *   1. Utiliza o hook useNavigation do React Navigation para acessar o objeto de navegação.
 *   2. Usa o useState para controlar a visibilidade da barra de pesquisa.
 *   3. O useLayoutEffect é usado para definir dinamicamente as opções do cabeçalho quando a tela é montada ou quando os estados relevantes são atualizados.
 *   4. A visibilidade da barra de pesquisa é controlada por um botão que alterna o estado searchVisible.
 *   5. Inclui navegação para a tela 'Planos' através de um botão no cabeçalho.
 *
 * Estado:
 *   - searchVisible: Controle da visibilidade da barra de pesquisa.
 *   - searchText: Texto atual da barra de pesquisa, passado como prop.
 *   - setSearchText: Função para atualizar o texto da barra de pesquisa, passada como prop.
 *
 * Funções:
 *   - Nenhuma função de componente exposta diretamente, todas as ações são controladas via props e estados internos.
 *
 * Estrutura JSX:
 *   - Não há elementos visuais diretamente renderizados. O componente ajusta as opções do cabeçalho do navegador React Navigation.
 *   - Contém botões para alternar a pesquisa e navegar para a tela 'Planos'.
 *
 * @returns {null}
 */

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