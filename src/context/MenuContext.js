import React, { createContext, useState } from 'react';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [menu, setMenu] = useState([]);
    
    const addDish = (dish) => {
        setMenu((prev) => [...prev, dish]);
    };

    const removeDish = (id) => {
        setMenu((prev) => prev.filter(dish => dish.id !== id));
    };

    return (
        <MenuContext.Provider value={{ menu, addDish, removeDish }}>
            {children}
        </MenuContext.Provider>
    );
};
