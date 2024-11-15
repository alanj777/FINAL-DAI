import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { MenuContext } from '../context/MenuProvider';
import RecipeCard from '../components/RecipeCard';
import { useNavigation } from '@react-navigation/native';

const MenuScreen = () => {
  const navigation = useNavigation();
  const { selectedRecipes, removeRecipe, getMenuStats } = useContext(MenuContext);
  const { healthTotal, avgHealth, totalVegans, totalCost } = getMenuStats();

  const goToSearchScreen = () => {
    navigation.navigate('Search');
  };

  const confirmRemoveRecipe = (recipe) => {
    Alert.alert(
      "Eliminar receta",
      `¿Estás seguro de que querés eliminar ${recipe.title} del menú?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: () => removeRecipe(recipe) }
      ]
    );
  };

  const handleViewDetails = (recipe) => {
    navigation.navigate('Detail', { recipe });
  };

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <Text style={styles.stat}>Health Total: {healthTotal.toFixed(2)}</Text>
        <Text style={styles.stat}>Average Health: {avgHealth.toFixed(2)}</Text>
        <Text style={styles.stat}>Total Vegans: {totalVegans}</Text>
        <Text style={styles.stat}>Total Cost: ${totalCost.toFixed(2)}</Text>
      </View>

      <Button 
        title="Buscame Recetas" 
        onPress={goToSearchScreen} 
        color="#6200ee" 
        style={styles.searchButton} 
      />

      {selectedRecipes.length > 0 ? (
        <FlatList
          data={selectedRecipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              onDetailsPress={() => handleViewDetails(item)} 
              onToggleMenu={() => confirmRemoveRecipe(item)}
              includedInMenu={true}
            />
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Tu menú está vacío</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f9f9f9' 
  },
  statsContainer: { 
    marginBottom: 20, 
    padding: 15, 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 10, 
    elevation: 3,
  },
  stat: { 
    fontSize: 16, 
    color: '#333', 
    marginBottom: 5 
  },
  emptyContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  emptyText: { 
    fontSize: 18, 
    color: '#888' 
  },
  searchButton: {
    marginTop: 10, 
    borderRadius: 5, 
    overflow: 'hidden', 
  },
});

export default MenuScreen;