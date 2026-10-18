
import { StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';

// React Native Maps bruges til at vise et interaktivt kort
// Marker bruges til at placere markører på kortet
import MapView, { Marker } from 'react-native-maps';

// Expo Location bruges til at hente telefonens GPS-position
import * as Location from 'expo-location';


export default function App() {

  // State til at gemme de markers brugeren tilføjer
  // Starter som et tomt array
  const [markers, setMarkers] = useState([]);

  // State til kortets geografiske område
  // null betyder, at placeringen endnu ikke er hentet
  const [region, setRegion] = useState(null);


  // HENT TELEFONENS AKTUELLE PLACERING
  useEffect(() => {

    // Asynkron funktion der henter telefonens placering
    async function getLocation() {

      // Beder brugeren om tilladelse til at bruge GPS/lokation
      const { status } = await Location.requestForegroundPermissionsAsync();

      // Stopper hvis brugeren ikke giver tilladelse
      if (status !== 'granted') return;

      // Henter telefonens aktuelle koordinater
      const { coords } = await Location.getCurrentPositionAsync();

      // Gemmer koordinaterne i region-state
      // Kortet centreres omkring brugerens placering
      setRegion({
        latitude: coords.latitude,   // Breddegrad
        longitude: coords.longitude, // Længdegrad
        latitudeDelta: 0.01,         // Hvor stort et område der vises
        longitudeDelta: 0.01,        // Mindre tal = mere zoom
      });
    }

    // Kalder funktionen når komponenten indlæses
    getLocation();

  }, []); // Tomt array = effekten køres ved første mount


  // FAST GEOGRAFISK PLACERING
  // Kan bruges som standardplacering eller fallback
  // Bruges ikke i den nuværende kode
  const myRegion = {
    latitude: 55.8,
    longitude: 12,
    latitudeDelta: 1,
    longitudeDelta: 1,
  };


  // TILFØJ MARKER VED LANGT TRYK PÅ KORTET
  function longPress(e) {

    // Henter koordinaterne hvor brugeren holder fingeren nede
    // e er event-objektet fra MapView
    const marker = e.nativeEvent.coordinate;

    // Opretter et nyt array med eksisterende markers + den nye
    // Spread operator (...) kopierer de eksisterende elementer
    setMarkers([...markers, marker]);
  }


  // TRYK PÅ EN MARKER
  // Funktionen er lavet, men bruges endnu ikke
  function markerOnPress(e) {
    alert("marker her ");
  }


  // BRUGERFLADE (JSX)
  return (
    <View style={styles.container}>

      <MapView
        region={region}        // Kortets centrum og zoomniveau
        style={{ flex: 1 }}    // Kortet fylder hele containeren
        onLongPress={longPress} // Kalder longPress ved langt tryk
      >

        {/* Gennemløber markers-arrayet og viser en Marker for hver placering */}
        {markers.map((m, index) => (
          <Marker
            coordinate={m} // Markørens latitude og longitude
            key={index}    // Unik React-key for elementet i listen
          />
        ))}

      </MapView>

    </View>
  );
}


// STYLING
const styles = StyleSheet.create({

  container: {
    flex: 1, // Fylder den tilgængelige skærmplads
  },

});
