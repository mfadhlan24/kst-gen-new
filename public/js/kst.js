document.getElementById("generateBtn").addEventListener("click", generateKST);

const matkulList = [
  { nama: "Metode Penelitian dan Penulisan Ilmiah", sks: 3, praktek: true },
  { nama: "Entrepreneurship", sks: 3, praktek: true },
  { nama: "Database Management System (DBMS)", sks: 3, praktek: true },
  { nama: "Pemrograman II", sks: 3, praktek: true },
  { nama: "Mikroprosesor", sks: 3, praktek: true },
  { nama: "Machine Learning", sks: 2, praktek: false },
  { nama: "Fisika II", sks: 2, praktek: false },
  { nama: "Algoritma dan Pemrograman", sks: 3, praktek: true },
  { nama: "Sistem Operasi", sks: 3, praktek: true },
  { nama: "Jaringan Komputer", sks: 3, praktek: true },
  { nama: "Struktur Data", sks: 3, praktek: true },
  { nama: "Kalkulus", sks: 3, praktek: false },
  { nama: "Statistika", sks: 2, praktek: false },
  { nama: "Pemrograman Web", sks: 3, praktek: true },
  { nama: "Keamanan Sistem Informasi", sks: 3, praktek: true },
];

const hariList = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
const ruangList = ["L-205", "L-206", "L-209", "L-312", "M-106", "K-101", "K-102", "A-201"];
const waktuList = [
  "08:00 - 09:40", "09:40 - 10:30", "10:30 - 12:10",
  "12:10 - 13:00", "13:00 - 14:40", "14:40 - 15:30", "15:30 - 17:10"
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateDosenName() {
  const gelar1 = ["S.Kom.", "S.T.", "S.Si.", "Ir.", "Dr.", "Drs.", "Dra."];
  const gelar2 = ["M.T.I.", "M.Kom.", "M.M.", "M.T.", "M.Si.", "Ph.D.", "M.Sc."];
  const namaAcak = "Dosen " + Math.floor(Math.random() * 100); // lebih stabil offline
  return `${namaAcak}, ${getRandom(gelar1)}, ${getRandom(gelar2)}`;
}

function generateRandomPhone() {
  return "08" + Math.floor(Math.random() * 900000000 + 100000000);
}

function generateKST() {
  const nama = document.getElementById("nama").value;
  const nim = document.getElementById("nim").value;
  const strata = document.getElementById("strata").value;
  const prodi = document.getElementById("prodi").value;
  const konsentrasi = document.getElementById("konsentrasi").value;

  document.getElementById("outNama").innerText = nama;
  document.getElementById("outNIM").innerText = nim;
  document.getElementById("outStrata").innerText = strata;
  document.getElementById("outProdi").innerText = prodi;
  document.getElementById("outKonsentrasi").innerText = konsentrasi;

  const tbody = document.getElementById("tableBody");
  const dosenBody = document.getElementById("dosenTable");
  tbody.innerHTML = "";
  dosenBody.innerHTML = "";

  let totalSKS = 0;
  let rowIndex = 1;
  let dosenIndex = 1;
  const shuffledMatkul = [...matkulList].sort(() => Math.random() - 0.5);

  for (let i = 0; i < Math.min(7, shuffledMatkul.length); i++) {
    const matkul = shuffledMatkul[i];
    const hari = getRandom(hariList);
    const ruang = getRandom(ruangList);
    const waktu = getRandom(waktuList);
    const kelas = "KST" + Math.floor(Math.random() * 100);

    tbody.innerHTML += `
      <tr>
        <td class='border border-black p-2 text-center'>${rowIndex}</td>
        <td class='border border-black p-2'>${matkul.nama}</td>
        <td class='border border-black p-2 text-center'>${kelas}</td>
        <td class='border border-black p-2 text-center'>${matkul.sks}</td>
        <td class='border border-black p-2 text-center'>${hari}</td>
        <td class='border border-black p-2 text-center'>${ruang}</td>
        <td class='border border-black p-2 text-center'>${waktu}</td>
      </tr>`;

    dosenBody.innerHTML += `
      <tr>
        <td class='border border-black p-2 text-center'>${dosenIndex}</td>
        <td class='border border-black p-2 text-center'>${kelas}</td>
        <td class='border border-black p-2'>${generateDosenName()}</td>
        <td class='border border-black p-2 text-center'>${generateRandomPhone()}</td>
      </tr>`;

    totalSKS += matkul.sks;
    rowIndex++;
    dosenIndex++;

    if (matkul.praktek) {
      tbody.innerHTML += `
        <tr>
          <td class='border border-black p-2 text-center'>${rowIndex}</td>
          <td class='border border-black p-2'>${matkul.nama} (Praktek)</td>
          <td class='border border-black p-2 text-center'>${kelas}P</td>
          <td class='border border-black p-2 text-center'>0</td>
          <td class='border border-black p-2 text-center'>${hari}</td>
          <td class='border border-black p-2 text-center'>${getRandom(ruangList)}</td>
          <td class='border border-black p-2 text-center'>${getRandom(waktuList)}</td>
        </tr>`;

      dosenBody.innerHTML += `
        <tr>
          <td class='border border-black p-2 text-center'>${dosenIndex}</td>
          <td class='border border-black p-2 text-center'>${kelas}P</td>
          <td class='border border-black p-2'>${generateDosenName()}</td>
          <td class='border border-black p-2 text-center'>${generateRandomPhone()}</td>
        </tr>`;

      rowIndex++;
      dosenIndex++;
    }
    if (totalSKS >= 18) break;
  }

  document.getElementById("totalSKS").innerText = totalSKS;
  document.getElementById("tanggalSekarang").innerText = new Date().toLocaleDateString("id-ID");
  document.getElementById("kst").classList.remove("hidden");
  document.getElementById("pdfBtn").classList.remove("hidden");
}

document.getElementById("pdfBtn").addEventListener("click", () => {
  const nim = document.getElementById("nim").value;
  const nama = document.getElementById("nama").value;
  const filename = `KST - ${nim} ${nama}.pdf`;
  html2pdf().from(document.getElementById("kst")).set({
    margin: 10,
    filename: filename,
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  }).save();
});
