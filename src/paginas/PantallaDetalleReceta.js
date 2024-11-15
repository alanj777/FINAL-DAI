import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, ScrollView, Button, StyleSheet } from 'react-native';
import { fetchRecipeDetails } from '../api/spoonacular';
import { MenuContext } from '../context/MenuProvider';

const RecipeDetailScreen = ({ route }) => {
  const { recipe } = route.params;
  const { selectedRecipes, addRecipe, removeRecipe } = useContext(MenuContext);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const recipeDetails = await fetchRecipeDetails(recipe.id);
        setDetails(recipeDetails);
      } catch (error) {
        console.error('Error cargando los detalles de la receta:', error);
      }
    };
    loadDetails();
  }, [recipe.id]);

  const isInMenu = selectedRecipes.some((item) => item.id === recipe.id);

  return (
    <ScrollView style={styles.container}>
      {details && (
        <>
          <Image source={{ uri: details.image }} style={styles.image} />
          <Text style={styles.title}>{details.title}</Text>
          <Text style={styles.price}>Precio: ${details.pricePerServing?.toFixed(2) || 'N/A'}</Text>
          <Text style={styles.healthScore}>Health Score: {details.healthScore || 'N/A'}</Text>
          <Text style={styles.vegan}>
            Es vegano: {details.vegan ? 'Sí' : 'No'}
          </Text>
          <Text style={styles.description}>
            {details.summary?.replace(/<[^>]*>/g, '') || 'Sin descripción'}
          </Text>
          <Button
            title={isInMenu ? 'Sacalo del menú' : 'Agregalo al menú'}
            onPress={() => (isInMenu ? removeRecipe(details) : addRecipe(details))}
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  image: { width: '100%', height: 200 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 18, color: '#333', marginBottom: 5 },
  healthScore: { fontSize: 16, marginBottom: 5 },
  vegan: { fontSize: 16, marginBottom: 5 },
  description: { fontSize: 16, lineHeight: 24, marginBottom: 10 },
});

export default RecipeDetailScreen;