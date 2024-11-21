/**
 * Nome do Componente: GerenciarEquipe
 *
 * Descrição Detalhada:
 *   Componente funcional React que implementa a funcionalidade de gerenciamento de equipe.
 *   Permite visualizar membros da equipe, expulsar membros e adicionar novos participantes 
 *   através de um modal. Utiliza hooks do React para gerenciar o estado dos dados e 
 *   a interação do usuário. A interface permite uma navegação fácil e intuitiva.
 *
 * Observações Pertinentes:
 *   1. Utiliza o hook 'useState' para gerenciar o estado das variáveis de visibilidade do modal 
 *      e o email digitado para buscar o usuário.
 *   2. O componente inclui um modal para buscar usuários por e-mail e um botão para expulsar 
 *      membros da equipe.
 *   3. A interface inclui um layout simples para exibir os membros da equipe com a opção 
 *      de expulsá-los, e um campo de input para buscar novos usuários.
 *   4. O modal é transparente e usa animação de deslizamento para melhor experiência do usuário.
 *
 * Estado:
 *   - modalVisible: Booleano que controla a visibilidade do modal de adicionar participantes.
 *   - email: Armazena o valor do e-mail digitado no campo de busca de usuário.
 *
 * Funções:
 *   - handleExpulsar: Função chamada ao expulsar um membro da equipe, exibindo um alerta com a confirmação.
 *   - handleBuscarUsuario: Função chamada para buscar um usuário pelo e-mail fornecido, 
 *     exibindo um alerta com o e-mail digitado. Também fecha o modal e limpa o campo de e-mail após a busca.
 *   - closeModal: Função para fechar o modal e resetar o campo de e-mail, garantindo que o campo 
 *     esteja vazio ao fechar o modal.
 *
 * Estrutura JSX:
 *   - Renderiza os membros da equipe com imagem, nome e a opção de expulsar o membro.
 *   - Renderiza um botão para abrir o modal e adicionar novos participantes.
 *   - Renderiza o modal com um campo de input para buscar o e-mail de um novo participante 
 *     e dois botões para buscar o usuário ou fechar o modal.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal, TextInput } from 'react-native';
import MenuScreen from '../components/Menu';
import profileImage from '../assets/images/perfil.png'; 
import styles from '../styles/StylesGerenciarEquipe';

export default function GerenciarEquipe() {
    const [modalVisible, setModalVisible] = useState(false); 
    const [email, setEmail] = useState(''); 

    // Função para lidar com a ação de expulsar um membro
    const handleExpulsar = (nome) => {
        alert(`${nome} foi expulso do time!`);
    };

     // Função para buscar o usuário pelo e-mail
     const handleBuscarUsuario = () => {
        alert(`Buscando usuário com e-mail: ${email}`);
        setModalVisible(false); 
        setEmail(''); 
    };

    // Função para fechar o modal e limpar o campo de e-mail
    const closeModal = () => {
        setModalVisible(false);
        setEmail(''); // Resetando o campo de e-mail
    };
    return (
        <View style={styles.container}>
            <MenuScreen />
            <ScrollView style={styles.scrollView}>
                {/* Membros da equipe */}
                {['João Silva', 'Maria Oliveira', 'Carlos Souza', 'Ana Costa', 'Pedro Santos', 'Laura Lima'].map((nome) => (
                    <View key={nome} style={styles.memberContainer}>
                        <View style={styles.memberInfo}>
                            <Image
                                source={profileImage} 
                                style={styles.profileImage}
                            />
                            <Text style={styles.memberName}>{nome}</Text>
                        </View>
                        <Text style={styles.memberRole}>colaborador</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleExpulsar(nome)}
                        >
                            <Text style={styles.buttonText}>Expulsar do time</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)} 
            >
                <Text style={styles.addButtonText}>Adicionar Participantes</Text>
            </TouchableOpacity>

           
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)} 
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Adicionar Participantes</Text>
                        
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o e-mail do usuário"
                            value={email}
                            onChangeText={setEmail} 
                        />

                        
                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisible(false)} 
                            >
                                <Text style={styles.buttonText}>Fechar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.searchButton}
                                onPress={handleBuscarUsuario} 
                            >
                                <Text style={styles.buttonText}>Buscar Usuário</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}