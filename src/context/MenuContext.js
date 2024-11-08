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

    const isMenuValid = (dish) => {
        const veganCount = menu.filter(d => d.vegan).length;
        const nonVeganCount = menu.length - veganCount;

        if (menu.length >= 4) return false;
        if (dish.vegan && veganCount >= 2) return false;
        if (!dish.vegan && nonVeganCount >= 2) return false;
        return true;
    };

    return (
        <MenuContext.Provider value={{ menu, addDish, removeDish, isMenuValid }}>
            {children}
        </MenuContext.Provider>
    );
};
