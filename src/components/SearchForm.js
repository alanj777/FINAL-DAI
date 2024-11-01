import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import axios from 'axios';

const SearchForm = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchPlates = async () => {
    if (query.length < 2) return; // No buscar si la longitud es menor a 2

    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
        params: {
          query,
          number: 10,
          apiKey: 'e2bafbf8b12b47f2bd8d585e1581c299', // Asegúrate de reemplazar con tu API Key
        },
      });
      setResults(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Buscar platos"
        onSubmitEditing={searchPlates}
      />
      <Button title="Buscar" onPress={searchPlates} />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text onPress={() => onSelect(item)}>{item.title}</Text>
        )}
      />
    </View>
  );
};

export default SearchForm;
