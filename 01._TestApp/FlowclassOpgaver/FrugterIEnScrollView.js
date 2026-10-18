import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

const fruits = ['Æble', 'Banan', 'Kiwi', 'Mango', 'Pære'];

export default function App() {
    return (
        <ScrollView style={styles.container} testID="list">
            {fruits.map((fruit)=>(
                <Text testID="fruit" key={fruit} style={styles.row}>
                    {fruit}
                </Text>
            ))
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
    row: { fontSize: 16, paddingVertical: 6 },
});
