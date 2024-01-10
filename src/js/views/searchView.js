class SearchView {
    _parentElement = document.querySelector(".search");

    getValue() {
        let input = this._parentElement.querySelector("input");
        let value = input.value;
        input.value = "";
        return value;
    }

    addHandlerForm(handler) {
        this._parentElement.addEventListener("submit", (e) => {
            e.preventDefault();
            handler();
        })
    }
}

export default new SearchView();