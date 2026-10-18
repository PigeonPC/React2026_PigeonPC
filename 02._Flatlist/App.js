import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
 
export default function App() {
 
//key value pair
const people = [
  {id:1, name: "anna"},
  {id:2, name:"bent"},
  {id:3, name:"charlie"}
 
]
 
//strings, kan ikke stole på id'erne
const p2 = ["anna", "bent"]
 
  return (
    <View style={styles.container}>
      <FlatList
      data={people}
      keyExtractor={(item) => String(item.id)}
        renderItem = {
          ({item})=>(
            <Text>{item.name}</Text>
          )
        }
      />
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});