document.userr.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name_user = document.userr.user.value;
    const password = document.userr.password.value;
    const email = document.userr.email.value;
    const status = document.querySelector("#status").value;


    await fetch("/api/username", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // perbaikan whitespace pada bagian ini
        },
        body: JSON.stringify({
            name_user,
            password,
            email,
            status
        })
    })
    alert("data berhasil disimpan");
    location.href = '/iventory-project/user.html'
})

const data = document.querySelector(".activity");
fetch("/api/username")

    .then((response) => response.json())
    .then((data) => {
        // console.log(data);
        const table = document.querySelector("table");
        for (let i = 0; i < data.length; i++) {
            const tr = document.createElement("tr");

            const tdNomor = document.createElement("td");
            tdNomor.textContent = i + 1;
            tr.appendChild(tdNomor);

            const tdUser = document.createElement("td");
            tdUser.textContent = data[i].name_user;
            tr.appendChild(tdUser);

            const tdEmail = document.createElement("td");
            tdEmail.textContent = data[i].email;
            tr.appendChild(tdEmail);

            const tdStatus = document.createElement("td");
            tdStatus.textContent = data[i].status;
            tr.appendChild(tdStatus);


            const tdDelete = document.createElement("td");
            const buttonDelete = document.createElement("a");
            buttonDelete.textContent = "hapus";
            buttonDelete.className = "delete";

            buttonDelete.onclick = (e) => {
                e.preventDefault();
                if (
                    confirm(
                        `Apakah Anda yakin ingin menghapus ${data[i].user_id
                        } ?`
                    )
                ) {
                    fetch(`/api/username/${data[i].user_id}`, {
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
            // console.log(data[i].user_id)
            editLink.href = `../tambah/edit-user.html?user=${data[i].user_id}`;
            table.appendChild(tr);
        }
    });