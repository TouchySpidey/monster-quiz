import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { guess } from './api';

const ListGuesses = ({ list, user }) => {
    const [youWon, setYouWon] = useState(false);
    const [filterInput, setFilter] = useState('');
    const filteredList = list.filter(option => option.name.toLowerCase().includes(filterInput.toLowerCase()));
    console.log({ list, filterInput, filteredList, user });

    const handleItemClick = option => {
        console.log('Clicked:', option);
        // Perform any action when an item is clicked
        guess(option.UID, user).then(data => {
            console.log({ data });
            if (data.correct === true) {
                setYouWon(true);
            }
        });
    };

    return (
        <View>
            {youWon && <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 20 }}>You won!</Text>}
            <Text>Available Options:</Text>
            <TextInput
                style={styles.filterInput}
                placeholder="Filter options..."
                value={filterInput}
                onChangeText={setFilter}
            />
            <ScrollView style={styles.scrollableList}>
                {filteredList.map((option) => (
                    <TouchableOpacity key={option.UID} onPress={() => handleItemClick(option)}
                        style={styles.listItem}>
                        <Text>{option.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollableList: {
        maxHeight: 200,
        overflowY: 'auto',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    listContainer: {
        padding: 0,
        margin: 0,
    },
    listItem: {
        cursor: 'pointer',
        padding: 5,
    },
    listItemHover: {
        backgroundColor: '#f0f0f0',
    },
});

export default ListGuesses;
