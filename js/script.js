$(document).ready(() => {
  $(".date").datepicker( {
    format: " yyyy", // Notice the Extra space at the beginning
    viewMode: "years", 
    minViewMode: "years",
    autoclose: true
  });

  document.getElementById('tambahBuku').addEventListener('submit', function(e){
    e.preventDefault();
    Swal.fire({
      title: 'Tambah Buku !',
      text: "Yakin ingin menambahkan buku baru!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        const judul = document.getElementById('inputJudul').value;
        const penulis = document.getElementById('inputPenulis').value;
        const tahun = document.getElementById('inputTahun').value;
        const sudahDibaca = document.getElementById('sudahDibaca').checked;
        const id = `buku`+generateIdBuku();
        
        let param = {
          id: id,
          judul: judul,
          penulis: penulis,
          tahun: tahun,
          sudahDibaca: sudahDibaca
        }
    
        createList(param);

        Swal.fire(
          'Berhasil',
          'Tambah Buku Berhasil.',
          'success'
        )
      }
    })
  })

  document.getElementById('btnUbahDataBuku').addEventListener('click', function(e){
    Swal.fire({
      title: 'Ubah Data Buku?',
      text: "Yakin ingin mengubah data buku?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        const tampungIdBuku = document.getElementById('tampungIdBuku').value
        document.getElementById(tampungIdBuku).remove()
        const judulModal = document.getElementById('modalInputJudul').value;
        const penulisModal = document.getElementById('modalInputPenulis').value;
        const tahunModal = document.getElementById('modalInputTahun').value;
        const sudahDibacaModal = document.getElementById('modalSudahDibaca').checked;
        
        let param = {
          id: tampungIdBuku,
          judul: judulModal,
          penulis: penulisModal,
          tahun: tahunModal,
          sudahDibaca: sudahDibacaModal
        }
        console.log(param);
        localStorage.setItem(param.id, JSON.stringify(param))
        createElement(param);
        $('#modalEdit').modal('toggle')
        Swal.fire(
          'Berhasil!',
          'Ubah Data Buku Berhasil.',
          'success'
        )
      }
    })
  })

  loadBuku();

})

function generateIdBuku(){
  const str = Date.now().toString();
  return str.slice(-6)
}

function checkStorage(){
  if(typeof(Storage) !== "undefined"){
    return true
  } else{
    return false;
  }
}

function createList(param){
  const storage = checkStorage();
  if(storage){
    createBookList(param) 
  } else{
    Swal.fire({
      icon: 'error',
      title: 'Maaf !',
      text: 'Browser kamu tidak mendukung Local Storage!'
    })
  }
}

function createBookList(param){
  if(localStorage.getItem('idBuku') === null){
    // klo datanya blm ada
    let data = [`${param.id}`];
    localStorage.setItem("idBuku", JSON.stringify(data))
    localStorage.setItem(param.id, JSON.stringify(param))
    createElement(param)
  } else{
    let data = JSON.parse(localStorage.getItem('idBuku'));
    data.push(`${param.id}`)
    localStorage.setItem("idBuku", JSON.stringify(data))
    localStorage.setItem(param.id, JSON.stringify(param))
    createElement(param)
  }
}

function createElement(param){
  let element = `
    <div class="col-lg-11 m-auto card p-3 jarakAtas" id="${param.id}">
      <h4 class="judulBuku">${param.judul}</h4>
      <hr>
      <p>Penulis : <span class="penulis"> ${param.penulis} </span></p>
      <p>Tahun Terbit : <span class="tahun"> ${param.tahun} </span> </p>

      <div class="row">
      <input type="hidden" class="tampungId" value="${param.id}">
        <div class="col-lg-3">
          <button type="button" class="btn btn-primary ${!param.sudahDibaca ? "btnSelesaiDibaca" : "btnBlmSelesaiDibaca"}">
          ${!param.sudahDibaca ? "Selesai Dibaca" : "Belum Selesai Dibaca"}
          </button>
        </div>
        <div class="col-lg-2">
          <button type="button" class="btn btn-success btnUbahBuku">Ubah Data</button>
        </div>
        <div class="col-lg-2">
          <button type="button" class="btn btn-danger btnHapusBuku">
            Hapus Buku
          </button>
        </div>
      </div>
    </div>
  `

  if(param.sudahDibaca){
    // kalau sudah dibaca
    $("#listSudahDibaca").append(element)
  } else{
    // kalau belum dibaca
    $("#listBlmDibaca").append(element)
  }

  document.querySelectorAll('.btnUbahBuku').forEach(function(val, key){
    val.addEventListener('click', function (e) {
        const idBuku = $(this).parent().parent().find('.tampungId').val()
        let detailBuku = JSON.parse(localStorage.getItem(idBuku))
        document.getElementById('tampungIdBuku').value = detailBuku.id
        document.getElementById('modalInputJudul').value = detailBuku.judul
        document.getElementById('modalInputPenulis').value = detailBuku.penulis
        document.getElementById('modalInputTahun').value = detailBuku.tahun
        document.getElementById('modalSudahDibaca').checked = detailBuku.sudahDibaca;
        $('#modalEdit').modal('show')
    })
  })
  
  document.querySelectorAll('.btnHapusBuku').forEach(function(val, key){
    val.addEventListener('click', function (e) {
      const idBuku = $(this).parent().parent().find('.tampungId').val()
      hapusBuku(idBuku)
    })
  })

  document.querySelectorAll('.btnSelesaiDibaca').forEach(function(val, key){
    val.addEventListener('click', function (e) {
      const idBuku = $(this).parent().parent().find('.tampungId').val()
      pindahBuku(idBuku, true)
    })
  })

  document.querySelectorAll('.btnBlmSelesaiDibaca').forEach(function(val, key){
    val.addEventListener('click', function (e) {
      const idBuku = $(this).parent().parent().find('.tampungId').val()
      pindahBuku(idBuku, false)
    })
  })
}

function loadBuku(){
  clearBuku()
  if(checkStorage()){
    if(localStorage.getItem('idBuku') !== null){
      const idBuku = JSON.parse(localStorage.getItem('idBuku'))
      for (let i = 0; i < idBuku.length; i++) {
        let detailBuku = JSON.parse(localStorage.getItem(idBuku[i]));
        createElement(detailBuku)
      }
    }
  }
}

function clearBuku(){
  $("#listSudahDibaca").html('')
  $("#listBlmDibaca").html('')
}

function hapusBuku(idBuku){
  Swal.fire({
    title: 'Apakah anda yakin?',
    text: "Data yang dihapus tidak dapat dikembalikan!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes!'
  }).then((result) => {
    if (result.isConfirmed) {
      const hapusBuku = document.getElementById(idBuku)
      const listBuku = JSON.parse(localStorage.getItem('idBuku'));
      let kodeBaru = [];
      for (let i = 0; i < listBuku.length; i++) {
        if(idBuku != listBuku[i]){
          kodeBaru.push(listBuku[i])
        }
      } 
      localStorage.setItem('idBuku', JSON.stringify(kodeBaru));
      localStorage.removeItem(idBuku)
      hapusBuku.remove()

      Swal.fire(
        'Terhapus!',
        'Data berhasil dihapus.',
        'success'
      )
    }
  })
}

function pindahBuku(idBuku, status){
  Swal.fire({
    title: 'Pindahkan Buku !',
    text: `Yakin ingin memindahkan buku menjadi ${status ? "Sudah Selesai Dibaca" : "Belum Selesai Dibaca"}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes!'
  }).then((result) => {
    if (result.isConfirmed) {
      const hapusBuku = document.getElementById(idBuku)
      const detailBuku = JSON.parse(localStorage.getItem(idBuku))
      const dataBaru = {
        id: detailBuku.id,
        judul: detailBuku.judul,
        penulis: detailBuku.penulis,
        tahun: detailBuku.tahun,
        sudahDibaca: status
      }
    
      localStorage.setItem(idBuku, JSON.stringify(dataBaru));
      hapusBuku.remove()
      createElement(dataBaru)
      Swal.fire(
        'Berhasil!',
        'Buku Berhasil Dipindahkan.',
        'success'
      )
    }
  })
}