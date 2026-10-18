import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const products = [
    { name: 'Kaffe', price: '25 kr' },
    { name: 'Te', price: '20 kr' },
    { name: 'Kakao', price: '30 kr' },
];

export default function App() {
    return (
        <ScrollView style={styles.screen}>
            <Text style={styles.title}>Menu</Text>

            {products.map((product) => (
                <View key={product.name} style={styles.row}>
                    <Text testID="name">{product.name}</Text>
                    <Text testID="price">{product.price}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: { padding: 16 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
});
