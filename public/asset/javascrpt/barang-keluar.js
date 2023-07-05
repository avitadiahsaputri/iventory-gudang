//nampilim option nama barang
function jj() {
    fetch("/api/barang")
        .then((response) => response.json())
        .then((res) => {
            j(res)

        })
}
function j(barang) {
    const option = document.getElementById("namaa")
    barang.forEach((b) => {
        const nama = document.createElement("option")
        nama.value = b.id_barang
        nama.text = b.nama_barang
        option.appendChild(nama)
    })
}



jj();

// nambah barang
document.querySelector(".btn.btn-primary").onclick = ((e) => {
    e.preventDefault(); // perbaikan typo pada bagian ini
    const tanggal = document.getElementById("tanggal").value;
    const kode_barang = document.getElementById("namaa").value;
    const jumlah_keluar = document.getElementById("jumlah").value;

    if (!tanggal || !kode_barang || !jumlah_keluar) {
        alert("data harus diisi");
    }
    // location.href = '/iventory-project/barang-masuk.html'

    fetch("/api/barang_keluar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // perbaikan whitespace pada bagian ini
        },
        body: JSON.stringify({
            tanggal,
            kode_barang,
            jumlah_keluar

        })

    })
    // then((response) => response.json())
    // .then((res) => {
    alert("data berhasil disimpan");
    location.href = '/iventory-project/barang-keluar.html'
    // })
})
//tabel data

const data = document.querySelector("#table-body");
fetch("/api/barang_keluar")
    .then((response) => response.json())
    .then((data) => {
        const table = document.querySelector("tbody");

        for (let i = 0; i < data.length; i++) {
            const tr = document.createElement("tr");

            const tdNomor = document.createElement("td");
            tdNomor.textContent = i + 1;
            tr.appendChild(tdNomor);

            const tdTanggal = document.createElement("td");
            const date = new Date(data[i].tanggal);
            tdTanggal.textContent = date.toLocaleDateString('id-ID');
            tr.appendChild(tdTanggal);

            const tdBarang = document.createElement("td");
            tdBarang.textContent = data[i].kode_barang;
            tr.appendChild(tdBarang);

            const tdNama = document.createElement("td");
            tdNama.textContent = data[i].nama_barang;
            tr.appendChild(tdNama);

            const tdJumlah = document.createElement("td");
            tdJumlah.textContent = data[i].jumlah_keluar;
            tr.appendChild(tdJumlah);

            const tdDelete = document.createElement("td");
            const buttonDelete = document.createElement("a");
            buttonDelete.textContent = "hapus";
            buttonDelete.className = "delete";

            buttonDelete.onclick = (e) => {
                e.preventDefault();
                if (
                    confirm(
                        `Apakah Anda yakin ingin menghapus ${data[i].nama_barang} ?`
                    )
                ) {
                    fetch(`/api/barang_keluar/${data[i].id_transaksi_keluar}`, {
                        method: "DELETE",
                        headers: {}
                    });
                    location.reload();
                }
            };
            tdDelete.appendChild(buttonDelete);
            tr.appendChild(tdDelete);


            table.appendChild(tr);
        }
    });


// document.querySelector('push').onsubmit = async (e) => {
//     e.preventDefault();
//     fetch("/api/jenis_barang", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             nama_jenis: document.push.nama_jenis.value,
//         })

//     });
//     location.reload();
// };

// fetch("/api/barang_masuk", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//         tanggal,
//         nama_barang,
//         jumlah
//     })
// }).then(() => {
//     // Mengambil data barang berdasarkan nama_barang
//     fetch(`/api/barang?nama_barang=${nama_barang}`)
//         .then((response) => response.json())
//         .then((res) => {
//             const barang = res[0];
//             const stok = barang.stok + parseInt(jumlah); // Menambahkan stok
//             const jumlah_masuk = barang.jumlah_masuk + parseInt(jumlah); // Menambahkan jumlah_masuk

//             // Update data barang pada tabel barang
//             fetch(`/api/barang/${barang.id_barang}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     stok,
//                     jumlah_masuk
//                 })
//             }).then(() => {
//                 alert("data berhasil disimpan");
//                 location.href = '/iventory-project/barang-masuk.html';
//             }).catch((err) => {
//                 console.error(err);
//             });
//         })
// }).catch((err) => {
//     console.error(err);
// });



