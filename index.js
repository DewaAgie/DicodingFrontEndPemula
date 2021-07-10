const submitForm = document.getElementById('formDataDiri');
submitForm.addEventListener('submit', function(e){
  const nama = document.getElementById('nama').value;
  const domisili = document.getElementById('domisili').value;
  const message = `Halo ${nama} bagaimana cuacanya di ${domisili}`

  document.getElementById('messageAfterSubmit').innerText = message
  e.preventDefault();
})