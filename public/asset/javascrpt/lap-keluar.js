const data = document.querySelector("table-body");
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

            const tdNama = document.createElement("td");
            tdNama.textContent = data[i].nama_barang;
            tr.appendChild(tdNama);

            const tdJumlah = document.createElement("td");
            tdJumlah.textContent = data[i].jumlah_keluar;
            tr.appendChild(tdJumlah);

            table.appendChild(tr);
        }
    });
