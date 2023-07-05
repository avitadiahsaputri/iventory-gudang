document.querySelector(".btn.btn-primary").onclick = ((e) => {
    e.preventDefault(); // perbaikan typo pada bagian ini
    const nama_jenis = document.getElementById("jenis").value;

    if (!nama_jenis) {
        alert("data harus diisi");
        location.href = '/iventory-project/jenis-barang.html'

    }

    fetch("/api/jenis_barang", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // perbaikan whitespace pada bagian ini
        },
        body: JSON.stringify({
            nama_jenis,
        })

    })
    alert("data berhasil disimpan");
    location.href = '/iventory-project/jenis-barang.html'
})

///tabel
const data = document.querySelector(".activity");
fetch("/api/jenis_barang")
    .then((response) => response.json())
    .then((data) => {
        // console.log(data);
        for (let i = 0; i < data.data.length; i++) {
            const table = document.querySelector("#table-body")

            const tr = document.createElement("tr");

            const tdNomor = document.createElement("td");
            tdNomor.textContent = i + 1;
            tr.appendChild(tdNomor);

            const tdJenis = document.createElement("td");
            tdJenis.textContent = data.data[i].nama_jenis;
            tr.appendChild(tdJenis);

            const tdDelete = document.createElement("td");
            const buttonDelete = document.createElement("a");
            buttonDelete.textContent = "Hapus";
            buttonDelete.className = "delete";

            buttonDelete.onclick = (e) => {
                e.preventDefault();
                if (
                    confirm(
                        `Apakah Anda yakin ingin menghapus  ${data.data[i].nama_jenis}?`
                    )
                ) {
                    fetch(`/api/jenis_barang/${data.data[i].id_jenis}`, {
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

            // 
            table.appendChild(tr);
            editLink.href = `../tambah/edit-jenis.html?jenis=${data.data[i].id_jenis}`;

        }
    });




