"use strict";
const itemsContainer = document.querySelectorAll('.items-container');
let actualContainer, actualBtn, actualUl, actualForm, actualTextInput, actualValidation;
function addContainerListeners(currentContainer) {
    const currentContainerDeletionBtn = currentContainer.querySelector('.delete-container-btn');
    const currentAddItemBtn = currentContainer.querySelector('.add-item-btn');
    const currentCloseFormBtn = currentContainer.querySelector('.close-form-btn');
    const currentForm = currentContainer.querySelector('form');
    deleteBtnListeners(currentContainerDeletionBtn);
    addItemBtnListener(currentAddItemBtn);
    closingFormBtnListener(currentCloseFormBtn);
    addFormSubmitListener(currentForm);
}
itemsContainer.forEach((container) => {
    addContainerListeners(container);
});
function addFormSubmitListener(form) {
    form.addEventListener('submit', createNewItem);
}
function deleteBtnListeners(btn) {
    btn.addEventListener('click', handleContainerDeletion);
}
function addItemBtnListener(btn) {
    btn.addEventListener('click', handleAddItem);
}
function closingFormBtnListener(btn) {
    btn.addEventListener('click', () => toggleForm(actualBtn, actualForm, false));
}
function handleContainerDeletion(e) {
    const btn = e.target;
    const btnsArray = [...document.querySelectorAll('.delete-container-btn')];
    const containers = [...document.querySelectorAll('.items-container')];
    containers[btnsArray.indexOf(btn)].remove();
}
function handleAddItem(e) {
    const btn = e.target;
    if (actualContainer) {
        toggleForm(actualBtn, actualForm, false);
    }
    setContainerItems(btn);
    toggleForm(actualBtn, actualForm, true);
}
function toggleForm(btn, form, action) {
    if (!action) {
        form.style.display = "none";
        btn.style.display = "block";
    }
    else if (action) {
        form.style.display = "block";
        btn.style.display = "none";
    }
}
function setContainerItems(btn) {
    actualBtn = btn;
    actualContainer = btn.parentElement;
    actualUl = actualContainer.querySelector('ul');
    actualForm = actualContainer.querySelector('form');
    actualTextInput = actualContainer.querySelector('input');
    actualValidation = actualContainer.querySelector('.validation-msg');
}
function createNewItem(e) {
    e.preventDefault();
    //validation
    if (actualTextInput.value.length === 0) {
        actualValidation.textContent = "Must be at least 1 character long";
        return;
    }
    else {
        actualValidation.textContent = " ";
    }
    //creation item
    const itemContent = actualTextInput.value;
    const li = `
  <li class="item" draggable="true">
    <p>${itemContent}</p>
    <button>X</button>
  </li> 
  `;
    actualUl.insertAdjacentHTML('beforeend', li);
    const item = actualUl.lastElementChild;
    const liBtn = item.querySelector('button');
    handleItemDeletion(liBtn);
    actualTextInput.value = "";
}
function handleItemDeletion(btn) {
    btn.addEventListener('click', () => {
        const elToRemove = btn.parentElement;
        elToRemove.remove();
    });
}
// Add new container
const addContainerBtn = document.querySelector('.add-container-btn');
const addContainerForm = document.querySelector('.add-new-container form');
const addContainerFormInput = document.querySelector('.add-new-container input');
const validationNewContainer = document.querySelector('.add-new-container .validation-msg');
const addContainerCloseBtn = document.querySelector('.close-add-list');
const addNewContainer = document.querySelector('.add-new-container');
const containerList = document.querySelector('.main-content');
addContainerBtn.addEventListener('click', () => {
    toggleForm(addContainerBtn, addContainerForm, true);
});
addContainerCloseBtn.addEventListener('click', () => {
    toggleForm(addContainerBtn, addContainerForm, false);
});
addContainerForm.addEventListener('submit', createNewContainer);
function createNewContainer(e) {
    e.preventDefault();
    //validation
    if (addContainerFormInput.value.length === 0) {
        validationNewContainer.textContent = "Must be at least 1 character long";
        return;
    }
    else {
        validationNewContainer.textContent = " ";
    }
    //creation
    const itemContainer = document.querySelector(".items-container");
    const newContainer = itemContainer.cloneNode();
    const newContainerContent = `
  <div class="top-container">
    <h2>${addContainerFormInput.value}</h2>
    <button class="delete-container-btn">X</button>
  </div>
    <ul></ul>
    <button class="add-item-btn">Add an Item</button>
    <form autocomplete="off">
      <div class="top-form-container">
        <label for="item">Add a new item</label>
        <button class="close-form-btn">X</button>
      </div>
      <input type="text" id="item2">
      <span class="validation-msg"></span>
      <button type="submit">Submit</button>
    </form>`;
    newContainer.innerHTML = newContainerContent;
    containerList.insertBefore(newContainer, addNewContainer);
    addContainerFormInput.value = "";
    addContainerListeners(newContainer);
}
