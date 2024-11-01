import React, { useContext, useEffect } from 'react';
import { View, FlatList, Text, Button } from 'react-native';
import { MenuContext } from '../context/MenuContext';
import DishItem from '../components/DishItem';
import SearchForm from '../components/SearchForm';

const HomeScreen = () => {
    const { menu, removeDish } = useContext(MenuContext);

    const totalPrice = menu.reduce((sum, dish) => sum + dish.price, 0);
    const averageHealthScore = (menu.reduce((sum, dish) => sum + dish.healthScore, 0) / menu.length) || 0;

    return (
        <View>
            <SearchForm />
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
