const form = document.getElementById("formKeuangan");
const tabel = document.getElementById("dataKeuangan");

let dataKeuangan =
JSON.parse(localStorage.getItem("keuangan")) || [];

tampilkanData();

form.addEventListener("submit", function(e){

    e.preventDefault();

    const transaksi = {
        id: Date.now(),
        tanggal: document.getElementById("tanggal").value,
        jenis: document.getElementById("jenis").value,
        keterangan:
            document.getElementById("keterangan").value,
        nominal:
            Number(document.getElementById("nominal").value)
    };

    dataKeuangan.push(transaksi);

    localStorage.setItem(
        "keuangan",
        JSON.stringify(dataKeuangan)
    );

    form.reset();

    tampilkanData();
});

function tampilkanData(){

    tabel.innerHTML = "";

    let pemasukan = 0;
    let pengeluaran = 0;

    dataKeuangan.forEach(item => {

        if(item.jenis === "Pemasukan"){
            pemasukan += item.nominal;
        }else{
            pengeluaran += item.nominal;
        }

        tabel.innerHTML += `
        <tr>
            <td>${item.tanggal}</td>
            <td>${item.jenis}</td>
            <td>${item.keterangan}</td>
            <td>Rp ${item.nominal.toLocaleString()}</td>
            <td>
                <button class="hapus"
                onclick="hapusData(${item.id})">
                Hapus
                </button>
            </td>
        </tr>
        `;
    });

    document.getElementById("totalPemasukan")
    .textContent =
    "Rp " + pemasukan.toLocaleString();

    document.getElementById("totalPengeluaran")
    .textContent =
    "Rp " + pengeluaran.toLocaleString();

    document.getElementById("saldo")
    .textContent =
    "Rp " + (pemasukan - pengeluaran)
    .toLocaleString();
}

function hapusData(id){

    dataKeuangan =
    dataKeuangan.filter(item => item.id !== id);

    localStorage.setItem(
        "keuangan",
        JSON.stringify(dataKeuangan)
    );

    tampilkanData();
}