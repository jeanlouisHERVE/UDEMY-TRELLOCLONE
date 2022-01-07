const itemsContainer = document.querySelectorAll('.items-container') as NodeListOf<HTMLDivElement>

let actualContainer: HTMLDivElement,
    actualBtn: HTMLButtonElement,
    actualUl: HTMLUListElement,
    actualForm: HTMLFormElement,
    actualTextInput: HTMLInputElement,
    actualValidation: HTMLSpanElement;

function addContainerListeners(currentContainer : HTMLDivElement) {
  const currentContainerDeletionBtn = currentContainer.querySelector('.delete-container-btn') as HTMLButtonElement; 
  const currentAddItemBtn = currentContainer.querySelector('.add-item-btn') as HTMLButtonElement;

  deleteBtnListeners(currentContainerDeletionBtn);
  addItemBtnListener(currentAddItemBtn);
}



itemsContainer.forEach((container: HTMLDivElement) => {
  addContainerListeners(container);
});


function deleteBtnListeners(btn : HTMLButtonElement) {
  btn.addEventListener('click', handleContainerDeletion);
}

function addItemBtnListener(btn: HTMLButtonElement) {
  btn.addEventListener('click', handleAddItem)
}

function handleContainerDeletion(e: MouseEvent){
  const btn = e.target as HTMLButtonElement; 
  const btnsArray = [...document.querySelectorAll('.delete-container-btn')] as HTMLButtonElement[];
  const containers = [...document.querySelectorAll('.items-container')] as HTMLDivElement[];
  containers[btnsArray.indexOf(btn)].remove();
}

function handleAddItem(e: MouseEvent) {
  const btn = e.target as HTMLButtonElement;
  if(actualContainer) {toggleForm(actualBtn, actualForm, false)}
  setContainerItems(btn); 
  toggleForm(actualBtn, actualForm, true)
}

function toggleForm (btn: HTMLButtonElement, form: HTMLFormElement, action: Boolean) {
  if (!action) {
    form.style.display = "none";
    btn.style.display = "block";
  } else if (action) {
    form.style.display = "block";
    btn.style.display = "none";
  }
}

function setContainerItems(btn: HTMLButtonElement) {
  actualBtn = btn;
  actualContainer = btn.parentElement as HTMLDivElement;
  actualUl = actualContainer.querySelector('ul') as HTMLUListElement;
  actualForm = actualContainer.querySelector('form') as HTMLFormElement;
  actualTextInput = actualContainer.querySelector('input') as HTMLInputElement;
  actualValidation = actualContainer.querySelector('.validation-msg') as HTMLSpanElement;

}