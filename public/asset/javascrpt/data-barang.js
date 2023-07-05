//tampilim option jenis & satuan barang
function jj() {
    fetch("/api/jenis_barang")
        .then((response) => response.json())
        .then((res) => {
            j(res.data)
        })
}



function j(barang) {
    const option = document.getElementById("jenis")
    barang.map((b) => {
        const jenis = document.createElement("option")
        jenis.value = b.id_jenis
        jenis.text = b.nama_jenis
        option.appendChild(jenis)
    })
}

function ss() {
    fetch("/api/satuan")
        .then((response) => response.json())
        .then((res) => {
            if (!res.data || !Array.isArray(res.data)) {
                console.error("Response data is not an array.")
                return
            }
            s(res.data)
        })
}

function s(satuann) {
    if (!satuann || !Array.isArray(satuann)) {
        console.error("Input parameter is not an array.")
        return
    }
    const option = document.getElementById("satuan")
    satuann.map((b) => {
        const jenis = document.createElement("option")
        jenis.value = b.id_satuan
        jenis.text = b.nama_satuan
        option.appendChild(jenis)
    })
}

jj();
ss();



///Tambah dta
document.querySelector(".btn.btn-primary").onclick = (e) => {
    e.preventDefault();
    const nama_barang = document.getElementById("nama_barang").value;
    const id_jenis = document.getElementById("jenis").value;
    const id_satuan = document.getElementById("satuan").value;
    if (!nama_barang || !id_jenis || !id_satuan) {

    }
    fetch("/api/barang", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nama_barang,
            id_jenis,
            id_satuan
        })
    })
    alert("Data berhasil ditambahkan")
    location.href = '/iventory-project/data-barang.html'
}


// edit

//tabel data

const data = document.querySelector(".activity");
fetch("/api/barang")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        const table = document.querySelector("table");

        for (let i = 0; i < data.length; i++) {
            
            const tr = document.createElement("tr");

            const tdNomor = document.createElement("td");
            tdNomor.textContent = i + 1;
            tr.appendChild(tdNomor);

            const tdBarang = document.createElement("td");
            tdBarang.textContent = data[i].kode_barang;
            tr.appendChild(tdBarang);

            const tdNama = document.createElement("td");
            tdNama.textContent = data[i].nama_barang;
            tr.appendChild(tdNama);

            const tdJenis = document.createElement("td");
            tdJenis.textContent = data[i].nama_jenis;
            tr.appendChild(tdJenis);

            const tdStok = document.createElement("td");
            tdStok.textContent = data[i].stok;
            tr.appendChild(tdStok);

            const tdSatuan = document.createElement("td");
            tdSatuan.textContent = data[i].nama_satuan;
            tr.appendChild(tdSatuan);

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
                    fetch(`/api/barang/${data[i].id_barang}`, {
                        method: "DELETE",
                        headers: {}
                    });
                    location.reload();
                }
            };
            tdDelete.appendChild(buttonDelete);
            tr.appendChild(tdDelete);

            const tdEdit = document.createElement("td");
            const editLink = document.createElement("a");
            editLink.textContent = "Edit";
            tdEdit.appendChild(editLink);
            tr.appendChild(tdEdit);

            editLink.href = `../tambah/edit-barang.html?barang=${data[i].id_barang}`;
            table.appendChild(tr);
        }
    });

