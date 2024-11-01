import React from 'react';
import { View, Text, Button, Image } from 'react-native';

const DishItem = ({ dish, onRemove }) => {
    return (
        <View>
            <Text>{dish.title}</Text>
            <Image source={{ uri: dish.image }} style={{ width: 100, height: 100 }} />
            <Button title="Remove" onPress={() => onRemove(dish.id)} />
        </View>
    );
};

export default DishItem;
