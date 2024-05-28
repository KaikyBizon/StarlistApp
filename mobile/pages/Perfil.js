import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Menu from '../components/Menu';
import styles from '../styles/StylesPerfil';

function Perfil({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');

  const handleSave = () => {
    // Lógica para salvar as informações do perfil
  };

  const handleDelete = () => {
    // Lógica para deletar o perfil
  };

  const formatDate = (text) => {
    let cleaned = ('' + text).replace(/\D/g, '');
    cleaned = cleaned.substring(0, 8);
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = cleaned.substring(0, 2) + '/' + cleaned.substring(2);
    }
    if (cleaned.length > 4) {
      formatted = cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4) + '/' + cleaned.substring(4);
    }
    return formatted;
  };

  const handleDobChange = (text) => {
    const formattedText = formatDate(text);
    setDob(formattedText);
  };

  return (
    <View style={styles.containerProfile}>
      <Menu />

      <View style={styles.profileContainer}>
        <Image source={require('../assets/images/icone_usuario.png')} style={styles.logo} />

        <View style={styles.profileInfo}>
          <Text style={styles.userName}>Thainá Eduarda</Text>
          <Text style={styles.userId}>ID: 23</Text>
        </View>

      </View>

      <View style={styles.viewInputPerfil}>
        <Text style={styles.inputPerfil}>Nome</Text>

        <TextInput
          style={styles.textinputPerfil}
          placeholder="Thaina Eduarda Alexandre"
          value={name}
          onChangeText={setName}
        />

      </View>

      <View style={styles.viewInputPerfil}>
        <Text style={styles.inputPerfil}>E-mail</Text>

        <TextInput
          style={styles.textinputPerfil}
          placeholder="thainaeduarda123@gmail.com"
          value={email}
          onChangeText={setEmail}
        />

      </View>

      <View style={styles.viewInputPerfil}>
        <Text style={styles.inputPerfil}>Data de nascimento</Text>

        <TextInput
          style={styles.textinputPerfil}
          placeholder="18/05/2007"
          value={dob}
          onChangeText={handleDobChange}
          keyboardType='numeric'
        />

      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonSalvar} onPress={handleSave}>
          <Text style={styles.buttonTextSalvar}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonDelete} onPress={handleDelete}>
          <Text style={styles.buttonTextDelete}>Deletar</Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity style={styles.buttonSair} onPress={() => navigation.navigate('Bemvindo')}>
        <Text style={styles.buttonTextSair}>Sair</Text>
      </TouchableOpacity>
      
    </View>
  );
}

export default Perfil;