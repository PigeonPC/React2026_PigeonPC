
import { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';

// Expo ImagePicker bruges til at åbne kameraet eller vælge medier fra galleriet
import * as ImagePicker from 'expo-image-picker';

// Expo MediaLibrary bruges til at gemme videoer i telefonens galleri
import * as MediaLibrary from 'expo-media-library/legacy';

// Expo Video bruges til at afspille videoer i appen
import { useVideoPlayer, VideoView } from 'expo-video';


export default function App() {

  // State til at gemme URI'en (filadressen) på den valgte eller optagede video
  // null betyder, at der endnu ikke er valgt en video
  const [videoUri, setVideoUri] = useState(null);

  // Opretter en videoafspiller med videoUri som kilde
  // Når videoUri ændres, opdateres afspillerens videokilde
  const player = useVideoPlayer(videoUri);


  // OPTAG VIDEO MED KAMERA
  async function optag() {

    // Beder brugeren om tilladelse til at bruge telefonens kamera
    await ImagePicker.requestCameraPermissionsAsync();

    // Åbner kameraet og tillader videooptagelse
    // await venter på, at brugeren optager eller annullerer
    const svar = await ImagePicker.launchCameraAsync({
      mediaTypes: ['videos']
    });

    // Hvis brugeren annullerer, afsluttes funktionen
    if (svar.canceled) return;

    // Henter URI'en til den optagede video
    const uri = svar.assets[0].uri;

    // Gemmer URI'en i state, så videoen kan vises i appen
    setVideoUri(uri);

    // Beder om tilladelse til at tilføje medier til telefonens galleri
    // true betyder writeOnly: appen anmoder kun om skriveadgang
    await MediaLibrary.requestPermissionsAsync(true);

    // Gemmer en kopi af den optagede video i telefonens galleri
    await MediaLibrary.saveToLibraryAsync(uri);
  }


  // VÆLG VIDEO FRA GALLERI
  async function vaelg() {

    // Åbner telefonens galleri og tillader kun valg af videoer
    const svar = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['videos']
    });

    // Stopper funktionen, hvis brugeren ikke vælger en video
    if (svar.canceled) return;

    // Gemmer den valgte videos URI i state
    // Dette får React til at opdatere brugerfladen
    setVideoUri(svar.assets[0].uri);
  }


  // BRUGERFLADE (JSX)
  return (
    <View style={styles.side}>

      {/* Knap der kalder optag(), når brugeren trykker */}
      <Button
        title="Optag video"
        onPress={optag}
      />

      {/* Knap der åbner galleriet */}
      <Button
        title="Vælg video"
        onPress={vaelg}
      />

      {/* Conditional rendering:
          VideoView vises kun, hvis videoUri har en værdi */}
      {videoUri && (
        <VideoView
          player={player}        // Den videoafspiller vi oprettede
          style={styles.video}   // Størrelsen på videoen
          nativeControls        // Viser play/pause og andre afspilningsknapper
        />
      )}

    </View>
  );
}


// STYLING
const styles = StyleSheet.create({

  side: {
    flex: 1,                  // Fylder den tilgængelige skærmplads
    alignItems: 'center',     // Centrerer indholdet vandret
    justifyContent: 'center', // Centrerer indholdet lodret
    gap: 12,                  // Afstand mellem elementerne
  },

  video: {
    width: 300,               // Videoens bredde
    height: 400,              // Videoens højde
  },

});
