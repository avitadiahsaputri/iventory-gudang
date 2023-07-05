document.querySelector(".btn.btn-primary").onclick = (async (e) => {
    e.preventDefault();
    const nama_satuan = document.getElementById("satuan").value;
    if (!nama_satuan) {
        alert("data harus diisi");
        location.href = '/iventory-project/satuan.html'

    }

    fetch("/api/satuan", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // perbaikan whitespace pada bagian ini
        },
        body: JSON.stringify({
            nama_satuan,
        })

    })
    alert("data berhasil disimpan");
    location.href = '/iventory-project/satuan.html'
})


//table
const data = document.querySelector(".activity");
fetch("/api/satuan")
    .then((response) => response.json())
    .then((data) => {
        const table = document.querySelector("table")

        for (let i = 0; i < data.data.length; i++) {
            const tr = document.createElement("tr");

            const tdNomor = document.createElement("td");
            tdNomor.textContent = i + 1;
            tr.appendChild(tdNomor);

            const tdSatuan = document.createElement("td");
            tdSatuan.textContent = data.data[i].nama_satuan;
            tr.appendChild(tdSatuan);

            const tdDelete = document.createElement("td");
            const buttonDelete = document.createElement("a");
            buttonDelete.textContent = "Hapus";
            buttonDelete.className = "delete";

            buttonDelete.onclick = (e) => {
                e.preventDefault();
                if (
                    confirm(
                        `Apakah Anda yakin ingin menghapus  ${data.data[i].nama_satuan}?`
                    )
                ) {
                    fetch(`/api/satuan/${data.data[i].id_satuan}`, {
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

            table.appendChild(tr);
            editLink.href = `../tambah/edit-satuan.html?satuan=${data.data[i].id_satuan}`;
        }
    });
// document.push.onsubmit = async (e) => {
//     e.preventDefault();
//     fetch("/api/satuan", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             nama_satuan: document.push.nama_satuan.value
//         })
//     });
//     location.reload();
// }
