import { View } from "./View";
import { RES_PER_PAGE } from "../config.js";
import icons from "../../img/icons.svg";

class PaginationView extends View {
    _parentElement = document.querySelector(".pagination");

    addHandlerClick(handler) {
        this._parentElement.addEventListener("click", (e) => {
            let btn = e.target.closest(".btn--inline");
            if (!btn) return;

            let goToPage = +btn.dataset.page;
            handler(goToPage);
        });
    }

    _generateHTML() {
        let maxPages = Math.ceil(this._data.recipes.length / RES_PER_PAGE);
        let currentPage = this._data.page;

        if (currentPage === 1 && maxPages > 1)
            return this._getNextButtonHTML(currentPage);

        if (currentPage === 1 && maxPages === 1)
            return "";

        if (currentPage === maxPages)
            return this._getPrevButtonHTML(currentPage);

        return this._getPrevButtonHTML(currentPage) + this._getNextButtonHTML(currentPage);
    }

    _getPrevButtonHTML(pageIndex) {
        return `
        <button data-page="${pageIndex - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${pageIndex - 1}</span>
        </button>
        `;
    }

    _getNextButtonHTML(pageIndex) {
        return `
        <button data-page="${pageIndex + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${pageIndex + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }
}

export default new PaginationView();