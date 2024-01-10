import { View } from "./View";

class BookmarksView extends View {
    _parentElement = document.querySelector(".bookmarks");
    _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it";

    addHandlerRender(handler) {
        window.addEventListener("load", () => {
            console.log("CIAO");
            handler();
        })
    }

    _generateHTML() {
        return this._data.map(this._generateRecipePreviewHTML).join("");
    }

    _generateRecipePreviewHTML(recipe) {
        let id = window.location.hash.slice(1);

        let previewHTML = `
            <li class="preview">
                <a class="preview__link ${recipe.id === id ? "preview__link--active" : ""}" href="#${recipe.id}">
                <figure class="preview__fig">
                    <img src="${recipe.imageUrl}" alt="Test" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${recipe.title}</h4>
                    <p class="preview__publisher">${recipe.publisher}</p>
                </div>
                </a>
            </li>
        `;
        return previewHTML;
    }
}

export default new BookmarksView();