import React, { useState, useContext } from 'react';
import { View, TextInput, Button, FlatList } from 'react-native';
import { searchRecipes } from '../api/spoonacularApi';
import { MenuContext } from '../context/MenuContext';
import DishItem from './DishItem';

const SearchForm = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const { addDish, menu } = useContext(MenuContext);

    const handleSearch = async () => {
        if (query.length > 2) {
            const dishes = await searchRecipes(query);
            setResults(dishes);
        }
    };

    const handleAddDish = (dish) => {
        if (menu.length < 4) {
            addDish(dish);
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Search for dishes"
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSearch}
            />
            <FlatList
                data={results}
                renderItem={({ item }) => (
                    <DishItem
                        dish={item}
                        onAdd={handleAddDish}
                    />
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

export default SearchForm;
