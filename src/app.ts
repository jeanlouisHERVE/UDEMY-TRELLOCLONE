const itemsContainer = document.querySelectorAll('.items-container') as NodeListOf<HTMLDivElement>
console.log(itemsContainer)

function addContainerListeners(currentContainter : HTMLDivElement) {
  const currentContainerDeletionBtn = currentContainter.querySelector('.delete-container-btn') as HTMLButtonElement; 
  deleteBtnListeners(currentContainerDeletionBtn);
}

itemsContainer.forEach((container: HTMLDivElement) => {
  addContainerListeners(container);
});

function deleteBtnListeners(btn : HTMLButtonElement) {
  btn.addEventListener('click', handleContainerDeletion);
}

function handleContainerDeletion(e: MouseEvent){
  const btn = e.target as HTMLButtonElement; 
  const btnsArray = [...document.querySelectorAll('.delete-container-btn')] as HTMLButtonElement[];
  const containers = [...document.querySelectorAll('.items-container')] as HTMLDivElement[];
  containers[btnsArray.indexOf(btn)].remove();
}