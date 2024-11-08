import React, { useContext } from 'react';
import { View, FlatList, Text, Alert } from 'react-native';
import { MenuContext } from '../context/MenuContext';
import DishItem from '../components/DishItem';
import SearchForm from '../components/SearchForm';

const HomeScreen = () => {
    const { menu, removeDish, isMenuValid } = useContext(MenuContext);

    const totalPrice = menu.reduce((sum, dish) => sum + (dish.price || 0), 0);
    const averageHealthScore = (menu.reduce((sum, dish) => sum + dish.healthScore, 0) / menu.length) || 0;

    const handleSelectDish = (dish) => {
        if (isMenuValid(dish)) {
            addDish(dish);
        } else {
            Alert.alert('No se puede añadir', 'El menú debe contener 2 platos veganos y 2 no veganos.');
        }
    };

    return (
        <View>
            <SearchForm onSelect={handleSelectDish} />
            <FlatList
                data={menu}
                renderItem={({ item }) => (
                    <DishItem
                        dish={item}
                        onRemove={removeDish}
                    />
                )}
                keyExtractor={item => item.id.toString()}
            />
            <Text>Precio Final: {totalPrice}</Text>
            <Text>Puntaje Aprox Saludable: {averageHealthScore.toFixed(2)}</Text>
        </View>
    );
};

export default HomeScreen;
