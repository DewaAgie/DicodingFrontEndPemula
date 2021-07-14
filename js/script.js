document.addEventListener("DOMContentLoaded", function(){
  const form = document.getElementById("form");

  form.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();
  })

  if(isStorageExist()){
    loadDataFromStorage();
  }
})

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil disimpan.");
});
document.addEventListener("ondataloaded", () => {
  refreshDataFromTodos();
});