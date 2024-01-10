//Using the MVC (Model-View-Controller) architecture
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import recipesView from "./views/recipesView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";

const controlRecipe = async function (e) {
  try {
    const id = location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    await model.loadRecipe(id);

    let recipe = model.state.recipe;
    console.log(model.state);
    recipeView.render(recipe);
    bookmarksView.render(model.state.bookmarks);

    recipesView.update(model.getLoadSearchPage());
  }

  catch (err) {
    recipeView.renderError();
  }
}

const controlSearchRecipes = async function () {
  try {
    let query = searchView.getValue();

    recipesView.renderSpinner();
    await model.loadSearchRecipes(query);

    //render recipes
    recipesView.render(model.getLoadSearchPage());
    //render paginationButtons
    paginationView.render(model.state.search);
  }

  catch (err) {
    console.log(err);
  }
}

const controlPagination = function (goToPage) {
  //render recipes
  recipesView.render(model.getLoadSearchPage(goToPage));
  //render paginationButtons
  paginationView.render(model.state.search);
}

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
}

const controlBookmarks = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  }
  else
    model.removeBookmark(model.state.recipe);

  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmark = function () {
  bookmarksView.render(model.state.bookmarks);
}

const init = function () {
  //listener-subscriber pattern
  bookmarksView.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerBookmark(controlBookmarks)
  searchView.addHandlerForm(controlSearchRecipes);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerServings(controlServings);
}

init();
