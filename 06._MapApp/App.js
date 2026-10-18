import { StyleSheet, View } from 'react-native'; 
import {useState, useEffect} from 'react'
import MapView, {Marker} from 'react-native-maps' // npx expo install react-native-maps
import * as Location from 'expo-location'

export default function App() {
  const [markers, setMarkers] = useState([])
  const [region, setRegion] = useState(null);

  useEffect(() => {
    async function getLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const { coords } = await Location.getCurrentPositionAsync();
      setRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }

    getLocation();
  }, []);

  const myRegion = {
    latitude: 55.8,
    longitude: 12,
    latitudeDelta: 1,
    longitudeDelta: 1
  }

  function longPress(e){
    const marker = e.nativeEvent.coordinate
    setMarkers([...markers, marker])
  }

  function markerOnPress(e){ 
    alert("marker her ")
  }

  return (
    <View style={styles.container}>
     <MapView 
       region={region}
       style={{flex:1}}
       onLongPress={longPress} 
     >
      { 
        markers.map((m,index) => (
          <Marker coordinate={m} key={index}/>
        ))
      }
     </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

