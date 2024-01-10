import icons from "url:../../img/icons.svg";

export class View {
  _data;

  render(data) {
    if (!data || Array.isArray(data) && data.length === 0) return this.renderError();

    this._data = data;
    let html = this._generateHTML();
    this._clearAndAppendHTML(html);
  }

  update(data) {
    if (!data) return this.renderError();
    this._data = data;
    let html = this._generateHTML();

    //Create a virtual dom with new HTML and add to the real dom only the differences
    let virtualDom = document.createRange().createContextualFragment(html);
    let virtualDomNodes = Array.from(virtualDom.querySelectorAll("*"));
    let viewDomNodes = Array.from(this._parentElement.querySelectorAll("*"));

    virtualDomNodes.forEach((viratualNode, i) => {
      let viewNode = viewDomNodes[i];
      //Update changed text
      if (!viratualNode.isEqualNode(viewNode) && viratualNode.firstChild?.nodeValue.trim() !== '')
        viewNode.textContent = viratualNode.textContent;
      //Update changed attributes
      if (!viratualNode.isEqualNode(viewNode))
        Array.from(viratualNode.attributes).forEach(attr => viewNode.setAttribute(attr.name, attr.value));
    });
  }

  renderSpinner() {
    let spinnerHTML = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
        `;
    this._clearAndAppendHTML(spinnerHTML);
  }

  renderError(message = this._errorMessage) {
    let errorHTML = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
          <p>${message}</p>
        </div>
      `;

    this._clearAndAppendHTML(errorHTML);
  }

  renderSuccess(message = this._successMessage) {
    let successHTML = `
        <div class="recipe">
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;

    this._clearAndAppendHTML(successHTML);
  }

  _clearAndAppendHTML(elementHTML) {
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", elementHTML);
  }
}