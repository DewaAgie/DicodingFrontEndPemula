document.addEventListener("DOMContentLoaded", function(){
  const form = document.getElementById("form");

  form.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();
  })
})