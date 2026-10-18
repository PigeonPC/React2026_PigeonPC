import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

//Skærmen har et TextInput (testID "input") og et Text (testID "display"),
//men de ved intet om hinanden. Få visningen til at vise præcis det, der står i feltet,
//mens der tastes — visningen skal starte med teksten "Hej".

export default function App() {
    const [text, setText] = useState("Hej");

    return (
        <View style={styles.container}>
            <TextInput
                testID="input"
                style={styles.input}
                onChangeText={setText}
                placeholder="Skriv noget..."
            />
            <Text testID="display" style={styles.display}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 24, gap: 16 },
    input: { borderWidth: 1, borderColor: '#999', borderRadius: 8, padding: 12 },
    display: { fontSize: 20 },
});
