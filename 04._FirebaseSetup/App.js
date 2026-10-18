import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, TextInput, FlatList, Button, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { app, database } from './firebase.js'
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';

const storage = getStorage(app);

export default function App() {
  //alert(JSON.stringify(database, null, 4))
  const [myText, setText] = useState("");
  const [noter, setNoter] = useState([]);
  const [editObject, setEditObject] = useState(null);
  const [editText, setEditText] = useState("");
  const [imagePath, setImagePath] = useState(null);


  useEffect(() => {
    const noteRef = collection(database, "notes")
    const unsubscribe = onSnapshot(noteRef, (snap) => {
      setNoter(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    })
    return unsubscribe
  }, [])


  async function deleteDocument(note) {
    await deleteDoc(doc(database, "notes", note.id))
  }

  async function gem() {
    await addDoc(collection(database, "notes"), {
      text: myText
    })
  }

  function updateDocument(note) {
    setEditObject(note)
    setEditText(note.text)
  }

  function saveOnUpdate() {
    updateDoc(doc(database, "notes", editObject.id), {
      text: editText
    })

  }

  async function hentBillede() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true
    })
    if (!result.canceled) {
      setImagePath(result.assets[0].uri)
    }
  }

  async function hentBilledeFraCloud() {
    getDownloadURL(ref(storage, "Owl.jpg"))
      .then((url) => {
        setImagePath(url)
      })
      .catch((error) => {
        alert("Fejl i fil download " + error)
      })
  }

  async function uploadBillede() {
    const res = await fetch(imagePath)
    const blob = await res.blob()
    const storageRef = ref(storage, "Owl.jpg")
    await uploadBytes(storageRef, blob)
      .then((snapshot) => {
        alert("billede uploadet")
      })
      .catch((error) => {
        alert("error i upload " + error)
      })
  }

  return (
    <View style={styles.container}>

      {editObject &&
        <View>
          <TextInput value={editText} onChangeText={setEditText} />
          <Pressable onPress={saveOnUpdate}>
            <Text>Gem</Text>
          </Pressable>
        </View>
      }

      <FlatList
        data={noter}
        renderItem={(note) => (
          <View>
            <Text>{note.item.text}</Text>
            <Pressable onPress={() => deleteDocument(note.item)}>
              <Text>Delete</Text>
            </Pressable>

            <Pressable onPress={() => updateDocument(note.item)}>
              <Text>Update</Text>
            </Pressable>
          </View>
        )}
      />


      <Image style={{ width: 400, height: 400 }} source={{ uri: imagePath }} />
      <Button title="Upload Billede" onPress={uploadBillede} />
      <Button title="Hent Billede Fra Cloud" onPress={hentBilledeFraCloud} />
      <Button title="Hent Billede" onPress={hentBillede} />


      <Text>Indsæt nyt dokument</Text>
      <TextInput onChangeText={setText} />

      <Pressable onPress={gem}>
        <Text>Gem</Text>
      </Pressable>

      <Pressable onPress={deleteDocument}>
        <Text>Slet</Text>
      </Pressable>

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

