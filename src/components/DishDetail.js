import React, { useContext } from 'react';
import { View, Text, Button, Image, Alert } from 'react-native';
import { MenuContext } from '../context/MenuContext';

const DishDetail = ({ route }) => {
    const { dish } = route.params;
    const { menu, addDish, removeDish } = useContext(MenuContext);
    const isInMenu = menu.some(item => item.id === dish.id);
    const veganCount = menu.filter(d => d.vegan).length;
    const nonVeganCount = menu.length - veganCount;

    const handleAddDish = () => {
        if (menu.length >= 4) {
            Alert.alert('Límite alcanzado', 'El menú solo puede tener 4 platos.');
        } else if (dish.vegan && veganCount >= 2) {
            Alert.alert('Límite de platos veganos', 'El menú solo puede tener 2 platos veganos.');
        } else if (!dish.vegan && nonVeganCount >= 2) {
            Alert.alert('Límite de platos no veganos', 'El menú solo puede tener 2 platos no veganos.');
        } else {
            addDish(dish);
        }
    };

    return (
        <View>
            <Text>{dish.title}</Text>
            <Image source={{ uri: dish.image }} style={{ width: 100, height: 100 }} />
            <Text>Puntaje saludable: {dish.healthScore}</Text>
            <Text>{dish.vegan ? "Vegan" : "Non-Vegan"}</Text>
            <Button
                title={isInMenu ? "Remove from Menu" : "Add to Menu"}
                onPress={() => isInMenu ? removeDish(dish.id) : handleAddDish()}
            />
        </View>
    );
};

export default DishDetail;
