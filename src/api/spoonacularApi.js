import axios from 'axios';

const API_KEY = 'e2bafbf8b12b47f2bd8d585e1581c299'; // Reemplaza con tu API Key de Spoonacular
const BASE_URL = 'https://api.spoonacular.com/recipes';

export const searchRecipes = async (query) => {
    const response = await axios.get(`${BASE_URL}/complexSearch`, {
        params: {
            query,
            apiKey: API_KEY,
            number: 10,
        },
    });
    return response.data.results;
};
