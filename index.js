// membuat custom event
const changeCaption = new Event("changeCaption");

window.addEventListener('load', function(){
  const element = document.getElementById('tombol');
  element.addEventListener('changeCaption', customEventHandler);
  element.addEventListener('click', function(){
    element.dispatchEvent(changeCaption);
  })
})
function customEventHandler(ev){
  console.log(`Event ${ev.type} telah dijalankan`);
  const caption = document.getElementById('caption');
  caption.innerText = "Anda telah membangkitkan custom event";
}