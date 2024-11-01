import React, { useContext } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { MenuContext } from '../context/MenuContext';

const DishDetail = ({ route }) => {
    const { dish } = route.params;
    const { menu, addDish, removeDish } = useContext(MenuContext);
    const isInMenu = menu.some(item => item.id === dish.id);

    return (
        <View>
            <Text>{dish.title}</Text>
            <Image source={{ uri: dish.image }} style={{ width: 100, height: 100 }} />
            <Text>Health Score: {dish.healthScore}</Text>
            <Text>{dish.vegan ? "Vegan" : "Non-Vegan"}</Text>
            <Button
                title={isInMenu ? "Remove from Menu" : "Add to Menu"}
                onPress={() => isInMenu ? removeDish(dish.id) : addDish(dish)}
            />
        </View>
    );
};

export default DishDetail;
