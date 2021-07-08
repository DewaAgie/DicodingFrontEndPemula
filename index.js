// const gambar = document.getElementById("gambar")

// gambar.setAttribute("width", "300px")
// gambar.setAttribute("height", "215px")

// const buttons = document.getElementsByClassName("button");
// buttons[3].childNodes[0].setAttribute('disabled', 'disabled')


document.body.onload = () => {
  welcome();
  console.log(document.querySelector("#incrementButton"));
  document.querySelector("#incrementButton").onclick = () => {
    increment();
  }
};

function welcome(){
  alert("Sim salabim muncullah elemen-elemen HTML!")
  const content = document.querySelector('.contents');
  content.removeAttribute('hidden');
}

function increment (){
  document.getElementById('count').innerHTML++

  if(document.getElementById('count').innerText == 7){
    const hiddenMessage = document.createElement("h4");
    hiddenMessage.innerText = "Selamat! Anda menemukan hadiah tersembunyi..."
    const image = document.createElement("img");
    image.setAttribute("src", "https://i.ibb.co/0V49VRZ/catto.jpg");
    const contents = document.querySelector(".contents");
    contents.appendChild(hiddenMessage).appendChild(image);
  }
}