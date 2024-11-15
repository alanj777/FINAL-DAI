import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { searchRecipes } from '../api/spoonacular';
import { MenuContext } from '../context/MenuProvider';
import RecipeCard from '../components/RecipeCard';
import { useNavigation } from '@react-navigation/native';

const RecipeSearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const { selectedRecipes, addRecipe, removeRecipe } = useContext(MenuContext);
  const navigation = useNavigation();

  const onSearch = async () => {
    if (searchQuery.length > 2) {
      const results = await searchRecipes(searchQuery);
      setRecipes(results);
    } else {
      Alert.alert('Error', 'Escribí al menos 3 caracteres para buscar.');
    }
  };

  const navigateToDetails = (recipe) => {
    navigation.navigate('Detail', { recipe });
  };

  const confirmRemoveRecipe = (recipe) => {
    Alert.alert(
      'Eliminar receta',
      `¿Estás seguro de que querés eliminar ${recipe.title} del menú?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminala', onPress: () => removeRecipe(recipe) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar recetas..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={onSearch}
      />
      <TouchableOpacity style={styles.button} onPress={onSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.recipeList}
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isInMenu = selectedRecipes.some((r) => r.id === item.id);

          return (
            <RecipeCard
              recipe={item}
              onDetailsPress={() => navigateToDetails(item)}
              onToggleMenu={() => {
                if (isInMenu) {
                  confirmRemoveRecipe(item);
                } else {
                  addRecipe(item);
                }
              }}
              includedInMenu={isInMenu}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f4f9',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recipeList: {
    marginTop: 10,
  },
});

export default RecipeSearchScreen;