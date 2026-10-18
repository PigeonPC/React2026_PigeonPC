import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
      <View style={styles.container}>
        <Text style={{ color: '#fff', fontSize: 50, margin:20, fontWeight:700}}>
          SOLFORMØRKELSE
        </Text>

        <Image
            source={require('./eclipse.jpg')}
            style={{ width: 400, height: 400 }}
        />

        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
});

