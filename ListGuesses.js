import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const ListGuesses = ({ list, guess }) => {
    const [filterInput, setFilter] = useState('');
    const filteredList = list.filter(option => option.name.toLowerCase().includes(filterInput.toLowerCase()));

    return (
        <View>
            <Text>Available Options:</Text>
            <TextInput
                style={styles.filterInput}
                placeholder="Filter options..."
                value={filterInput}
                onChangeText={setFilter}
            />
            <ScrollView style={styles.scrollableList}>
                {filteredList.map((option) => (
                    <TouchableOpacity key={option.UID} onPress={() => guess(option.UID)}
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
