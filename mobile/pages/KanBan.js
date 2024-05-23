import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, ScrollView } from 'react-native';
import styles from '../styles/StylesKanBan';
import Menu from '../components/Menu';

export default function KanBan() {

  return (
    <View style={styles.background}>
      <Menu />
      <View style={styles.containerMenu}>
        <Image style={styles.menu} resizeMode='contain' source={require('../assets/images/cardapio.png')} />
        <Text style={styles.txtData}>28 DE MARÇO DE 2024</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.tarefa}>
          <View style={styles.tarefaData}>
            <Text style={styles.txtTarefa}>TAREFA</Text>
          </View>
          <View style={styles.infoTarefa}>
            <View style={styles.detalheTarefa}>
              <Text style={styles.txtInfo}>Detalhes</Text>
            </View>
            <View style={styles.barraVert}>
            </View>
            <View style={styles.dataTarefa}>
              <Text style={styles.txtInfo}>Data e Hora</Text>
              <Text style={styles.txtHora}>07/05/2024 as 17:00</Text>
            </View>
          </View>
        </View>
        <View style={styles.tarefa}>
          <View style={styles.tarefaData}>
            <Text style={styles.txtTarefa}>TAREFA</Text>
          </View>
          <View style={styles.infoTarefa}>
            <View style={styles.detalheTarefa}>
              <Text style={styles.txtInfo}>Detalhes</Text>
            </View>
            <View style={styles.barraVert}>
            </View>
            <View style={styles.dataTarefa}>
              <Text style={styles.txtInfo}>Data e Hora</Text>
              <Text style={styles.txtHora}>07/05/2024 as 17:00</Text>
            </View>
          </View>
        </View>
        <View style={styles.tarefa}>
          <View style={styles.tarefaData}>
            <Text style={styles.txtTarefa}>TAREFA</Text>
          </View>
          <View style={styles.infoTarefa}>
            <View style={styles.detalheTarefa}>
              <Text style={styles.txtInfo}>Detalhes</Text>
            </View>
            <View style={styles.barraVert}>
            </View>
            <View style={styles.dataTarefa}>
              <Text style={styles.txtInfo}>Data e Hora</Text>
              <Text style={styles.txtHora}>07/05/2024 as 17:00</Text>
            </View>
          </View>
        </View>
        <View style={styles.tarefa}>
          <View style={styles.tarefaData}>
            <Text style={styles.txtTarefa}>TAREFA</Text>
          </View>
          <View style={styles.infoTarefa}>
            <View style={styles.detalheTarefa}>
              <Text style={styles.txtInfo}>Detalhes</Text>
            </View>
            <View style={styles.barraVert}>
            </View>
            <View style={styles.dataTarefa}>
              <Text style={styles.txtInfo}>Data e Hora</Text>
              <Text style={styles.txtHora}>07/05/2024 as 17:00</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
} 
