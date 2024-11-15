import axios from 'axios';

API_KEY = 'e2bafbf8b12b47f2bd8d585e1581c299';

const spoonacularAPI = axios.create({
  baseURL: 'https://api.spoonacular.com/recipes',
});

const fetchRecipeDetails = async (id) => {
  try {
    const response = await spoonacularAPI.get(`/${id}/information`, {
      params: { apiKey: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener detalles del plato:', error);
    throw error;
  }
};

const searchRecipes = async (query) => {
  try {
    const response = await spoonacularAPI.get('/complexSearch', {
      params: {
        query,
        number: 10,
        addRecipeInformation: true,
        apiKey: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error al buscar platos:', error);
    throw error;
  }
};

export { fetchRecipeDetails, searchRecipes };
