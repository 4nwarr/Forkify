//Here in the model i will implement the "businness logic", the code that actual solves the business problem.
//The HTTP library (making and reciving ajax requests)
//The state, all the data about the application, UI shoud always be in sync with the state
import { API_ENDPOINT, RES_PER_PAGE } from "./config.js";
import { getJSON } from "./helper.js";

//state contains all the data needed for the program
export let state = {
    recipe: {},
    search: {
        query: "",
        recipes: [],
        page: 1
    },
    bookmarks: []
}

export const loadRecipe = async function (recipeID) {
    try {
        let recipeData = await getJSON(`${API_ENDPOINT}/${recipeID}`);

        let { recipe } = recipeData.data;

        state.recipe = {
            cookingTime: recipe.cooking_time,
            id: recipe.id,
            imageUrl: recipe.image_url,
            ingredients: recipe.ingredients,
            publisher: recipe.publisher,
            servings: recipe.servings,
            sourceUrl: recipe.source_url,
            title: recipe.title
        }


        if (state.bookmarks.some(recipeB => recipeB.id === recipeID))
            state.recipe.bookmarked = true;
        else
            state.recipe.bookmarked = false;

    }

    catch (err) {
        throw err;
    }
}

export const loadSearchRecipes = async function (query) {
    try {
        state.search.query = query;
        let data = await getJSON(`${API_ENDPOINT}?search=${query}`);
        let { recipes } = data.data;

        let renamedRecipes = recipes.map(recipe => {
            return {
                id: recipe.id,
                imageUrl: recipe.image_url,
                publisher: recipe.publisher,
                title: recipe.title
            }
        });

        state.search.recipes = renamedRecipes;
    }

    catch (err) {
        throw err;
    }
}

export const getLoadSearchPage = function (page = 1) {
    let start = ((page - 1) * RES_PER_PAGE);
    let end = start + RES_PER_PAGE;
    state.search.page = page;

    return state.search.recipes.slice(start, end);
}

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity / state.recipe.servings) * newServings;
    });

    state.recipe.servings = newServings;
}

const saveToLocalStorage = function () {
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
}

export const addBookmark = function (recipe) {
    state.bookmarks.push(recipe);

    state.recipe.bookmarked = true;
    saveToLocalStorage();
}

export const removeBookmark = function (recipe) {
    let recipeIndex = state.bookmarks.findIndex(el => el.id === recipe.id);
    state.bookmarks.splice(recipeIndex, 1);

    state.recipe.bookmarked = false;
    saveToLocalStorage();
}

export const loadLocalStorage = function () {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    if (!bookmarks) return;

    state.bookmarks = bookmarks;
}

loadLocalStorage();