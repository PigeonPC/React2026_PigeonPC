import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, Flatlist } from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {

  const [noteText, setNoteText] = useState(''); //indeholder notetext i inputfeltet
  const [notes, setNotes] = useState([]); //Array til gemte noter
  const [selectedNote, setSelectedNote] = useState(null); //indeholder den note, der er trykket på


  useEffect(() => {
    loadNotes();
  }, []);


  async function loadNotes() {
    try {
      const savedNotes = await AsyncStorage.getItem('notes'); //leder efter notes i storage

      if (savedNotes !== null) {
        setNotes(JSON.parse(savedNotes)); //konverterer fra JSON til objekter i array
      }
    } catch (error) {
      console.log('Could not load notes:', error);
    }
  }



  async function saveNote() {
    const trimmedNote = noteText.trim(); //trimmer for mellemrum

    if (trimmedNote === '') {
      return;
    }

    //opretter et nyt note objekt
    const newNote = {
      id: Date.now().toString(), //gemmer dato som id
      text: trimmedNote,
    };

    const updatedNotes = [...notes, newNote]; //tilføjer til slutningen af array

    setNotes(updatedNotes);
    setNoteText(''); //inputfelt ryddes

    //opdateret array gemmes i storage
    try {
      await AsyncStorage.setItem(
        'notes',
        JSON.stringify(updatedNotes) //skal gemmes som JSON tekst, ikke array
      );
    } catch (error) {
      console.log('Could not save notes:', error);
    }
  }



  async function deleteNote(id) {
    const updatedNotes = notes.filter((note) => note.id !== id); //nyt array uden valgte note

    //opdater state
    setNotes(updatedNotes);

    //overskriver gamle værdi i storage, med nyt array
    try {
      await AsyncStorage.setItem(
        'notes',
        JSON.stringify(updatedNotes)
      );
    } catch (error) {
      console.log('Could not delete note:', error);
    }
  }


  //_____________________________________________________________________________

  return (
    <View style={styles.outerContainer}>
      <View style={styles.whiteContainer}>

        {/*Hvis selectedNote indeholder en note, vises detaljesiden*/}
        {selectedNote ? (
          <>
            {/*Overskriften står uden for ScrollView og bliver derfor stående*/}
            <Text style={styles.heading}>Note</Text>

            <View style={styles.detailContainer}>

              {/*Notens tekst kan scrolles*/}
              <ScrollView style={styles.detailScroll}>

                {/*Viser hele teksten fra den valgte note*/}
                <Text style={styles.detailText}>
                  {selectedNote.text}
                </Text>

              </ScrollView>

              {/*Fjerner den valgte note og viser listen igen*/}
              <Pressable
                style={styles.button}
                onPress={() => setSelectedNote(null)}>

                <Text style={styles.buttonText}>Back</Text>
              </Pressable>

            </View>
          </>

        ) : (


          /*Hvis selectedNote er null, vises den normale noteside*/
          <>
            <Text style={styles.heading}>Notebook</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={noteText}
                onChangeText={setNoteText}
                placeholder="Write your note here..."
                multiline={true}
              />

              <Pressable style={styles.button} onPress={saveNote}>
                <Text style={styles.buttonText}>Save note</Text>
              </Pressable>
            </View>


            <ScrollView style={styles.notesContainer}>

              {/*Laver en kopi af notes og vender rækkefølgen*/}
              {/*Den nyeste note bliver derfor vist øverst*/}
              {[...notes].reverse().map((note) => (

                <View key={note.id} style={styles.noteBox}>

                  {/*Gemmer den valgte note, når man trykker på den*/}
                  <Pressable
                    style={styles.noteContent}
                    onPress={() => setSelectedNote(note)}>

                    <Text style={styles.noteText}>
                      {
                        //Tjekker om noten er mere end 25 tegn
                        note.text.length > 25

                          //Hvis den er længere end 25, vis dem og tilføj ...
                          ? note.text.slice(0, 25) + '...'

                          //Hvis den ikke er længere, vis hele noten
                          : note.text
                      }
                    </Text>
                  </Pressable>


                  <Pressable
                    style={styles.deleteButton}
                    onPress={() => deleteNote(note.id)}>

                    <Ionicons
                      name="trash-outline"
                      size={18}
                      color="white"
                    />
                  </Pressable>

                </View>
              ))}
            </ScrollView>
          </>
        )
        }

        <StatusBar style="auto" />
      </View >
    </View >
  );
}



const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#ffe96a',
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: '5%',
    paddingRight: '5%',
  },

  whiteContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },

  heading: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 40,
    paddingBottom: 25,
  },

  inputContainer: {
    width: 500,
    height: 200,
  },

  input: {
    flex: 1,
    backgroundColor: '#dddddd',
    borderColor: '#919191',
    borderWidth: 2,
    padding: 10,
    borderRadius: 8,
    textAlignVertical: 'top',
  },

  button: {
    alignSelf: 'flex-end',
    backgroundColor: '#1fa3b2',
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#138592',
  },

  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },

  notesContainer: {
    width: 500,
    marginTop: 20,
  },

  noteBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#c8e2e6',
    borderColor: '#98acaf',
    borderWidth: 2,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },

  noteContent: {
    flex: 1,
  },

  noteText: {
    flex: 1,
    color: 'black',
    fontSize: 15,
    marginRight: 10,
  },

  deleteButton: {
    backgroundColor: '#d9534f',
    borderColor: '#a93632',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 5,
    marginLeft: 5,
  },

  detailContainer: {
    flex: 1, //må fylde den tilgængelige højde
    width: 500,
  },

  detailScroll: {
    flex: 1,
  },

  detailText: {
    width: '100%',
    color: 'black',
    fontSize: 18,
    backgroundColor: '#c8e2e6',
    borderColor: '#98acaf',
    borderWidth: 2,
    borderRadius: 8,
    padding: 15,
  },

});