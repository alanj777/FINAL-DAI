import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const RecipeCard = ({ recipe, onDetailsPress, onToggleMenu, includedInMenu }) => {
  const type = recipe.vegan ? 'V' : 'N-V';

  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>
          {type} {recipe.title}
        </Text>
        <Button title="Ver Detalles" onPress={() => onDetailsPress(recipe)} />
        <Button
          title={includedInMenu ? 'Eliminar del menú' : 'Agregar al menú'}
          onPress={() => onToggleMenu(recipe)}
        />
      </View>
      <Image source={{ uri: recipe.image }} style={styles.thumbnail} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#ffffff', 
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, //Shaders RTX
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#333', //Lindo color, lindo contraste (3 horas hasta que encontré el que iba)
    marginBottom: 8,
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd', 
  },
  button: {
    marginTop: 6,
  },
});


export default RecipeCard;