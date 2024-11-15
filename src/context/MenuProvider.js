import React, { createContext, useState } from 'react';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  const addRecipe = (recipe) => {
    if (selectedRecipes.length >= 4) {
      alert('Máximo 4 recetas en el menú');
      return;
    }

    const vegans = selectedRecipes.filter((item) => item.vegan).length;
    const nonVegans = selectedRecipes.length - vegans;

    if ((recipe.vegan && vegans >= 2) || (!recipe.vegan && nonVegans >= 2)) {
      alert('Solo 2 recetas de cada tipo (vegano/no vegano) son permitidas');
      return;
    }

    setSelectedRecipes([...selectedRecipes, recipe]);
  };

  const removeRecipe = (recipe) => {
    setSelectedRecipes(selectedRecipes.filter((item) => item.id !== recipe.id));
  };

  const getMenuStats = () => {
    const healthTotal = selectedRecipes.reduce((acc, item) => acc + item.healthScore, 0);
    const avgHealth = selectedRecipes.length > 0 ? healthTotal / selectedRecipes.length : 0;
    const totalVegans = selectedRecipes.filter((item) => item.vegan).length;
    const totalCost = selectedRecipes.reduce((acc, item) => acc + (item.pricePerServing || 0), 0);

    return { healthTotal, avgHealth, totalVegans, totalCost };
  };

  return (
    <MenuContext.Provider
      value={{
        selectedRecipes,
        addRecipe,
        removeRecipe,
        getMenuStats,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};