const tbody = document.querySelector('#tabel-body');
const form = document.querySelector('#form-mahasiswa');
const inputCari = document.querySelector('#cari');
const pesan = document.querySelector('#pesan');

let semuaData = [];

async function muatData() {
  try {
    const daftar = await ambilMahasiswa();
    semuaData = buatRekap(daftar);
    tampilkan();
  } catch (err) {
    tampilkanPesan(`Gagal memuat data: ${err.message}`, 'error');
  }
}

function tampilkan() {
  const hasilCari = cariMahasiswa(semuaData, inputCari.value);
  renderTabel(hasilCari);
  renderStatistik(semuaData);
}

function renderTabel(data) {
  tbody.replaceChildren();

  if (data.length === 0) {
    const trKosong = document.createElement('tr');
    const tdKosong = document.createElement('td');
    tdKosong.colSpan = 8;
    tdKosong.className = 'kosong';
    tdKosong.textContent = 'Tidak ada data';
    trKosong.append(tdKosong);
    tbody.append(trKosong);
    return;
  }

  for (const m of data) {
    const tr = document.createElement('tr');
    tr.classList.add(m.lulus ? 'lulus' : 'tidak-lulus');

    const kolomNilai = [m.nim, m.nama, m.tugas, m.uts, m.uas, m.nilaiAkhir, m.grade];
    for (const nilai of kolomNilai) {
      const td = document.createElement('td');
      td.textContent = nilai;
      tr.append(td);
    }

    const tdAksi = document.createElement('td');
    tr.append(tdAksi);

    tbody.append(tr);
  }
}

function renderStatistik(data) {
}

function tampilkanPesan(teks, jenis) {
  pesan.textContent = teks;
  pesan.className = jenis;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const f = new FormData(form);
  const baru = {
    nim: f.get('nim').trim(),
    nama: f.get('nama').trim(),
    tugas: f.get('tugas') === '' ? NaN : Number(f.get('tugas')),
    uts: f.get('uts') === '' ? NaN : Number(f.get('uts')),
    uas: f.get('uas') === '' ? NaN : Number(f.get('uas')),
  };
});

muatData();