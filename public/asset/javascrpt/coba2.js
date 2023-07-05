const book = document.querySelector(".activity");
fetch("/api/barang")
    .then((response) => response.json())
    .then((data) => {
        const table = document.querySelector("table");

        for (let i = 0; i < data.length; i++) {
            const tr = document.createElement("tr");

            const tdNomor = document.createElement("td")
            tdNomor.textContent = i + 1
            tr.appendChild(tdNomor)

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

            const tdEdit = document.createElement("td");
            const editLink = document.createElement("a");
            editLink.textContent = "Edit";
            editLink.href = `../inventory/data_barang.html?barang=${data[i].kode_barang}`;
            tdEdit.appendChild(editLink);
            tr.appendChild(tdEdit);

            const tdDelete = document.createElement("td");
            const buttonDelete = document.createElement("button");
            buttonDelete.textContent = "Hapus";
            buttonDelete.className = "delete";

            buttonDelete.onclick = (e) => {
                e.preventDefault();
                if (
                    confirm(
                        `Apakah Anda yakin ingin menghapus  (${data[i].nama_barang})?`
                    )
                ) {
                    fetch(
                        `/api/barang/${data[i].id_barang}`, {
                        method: "DELETE",
                        headers: {

                        },
                    });
                    location.reload();
                }
            };
        }
    });





//
    let currentPage = 1;
    const rowsPerPage = 5;
    const totalPageElement = document.getElementById("total-pages");
    const currentPageElement = document.getElementById("current-page");

    // Generasi tabel dan paginasi awal
    generateTableRows();
    updatePaginationButtons();
    totalPageElement.textContent = getTotalPages();

    // Event listener untuk tombol "Prev"
    document.getElementById("prev-btn").addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            generateTableRows();
            updatePaginationButtons();
        }
    });

    // Event listener untuk tombol "Next"
    document.getElementById("next-btn").addEventListener("click", function () {
        if (currentPage < getTotalPages()) {
            currentPage++;
            generateTableRows();
            updatePaginationButtons();
        }
    });

    // Fungsi untuk menghasilkan baris tabel
    function generateTableRows() {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const tableBody = document.getElementById("table-body");
        // Hapus semua baris yang ada pada tabel
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
        }
        for (var i = start; i < end && i < book.length; i++) {
        const row = document.createElement("tr");
        const cell1 = document.createElement("td");
        const cell2 = document.createElement("td");
        const cell3 = document.createElement("td");
            cell1.textContent = book[i].name;
            cell2.textContent = book[i].age;
            cell3.textContent = book[i].gender;
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);
            tableBody.appendChild(row);
        }
    }

    // Fungsi untuk meng-update tombol paginasi
    function updatePaginationButtons() {
    const prevButton = document.getElementById("prev-btn");
    const nextButton = document.getElementById("next-btn");
        prevButton.disabled = (currentPage === 1);
        nextButton.disabled = (currentPage === getTotalPages());
        currentPageElement.textContent = currentPage;
    }

    // Fungsi untuk menghitung total halaman yang dibutuhkan
    function getTotalPages() {
        return Math.ceil(data.length / rowsPerPage);
    }

