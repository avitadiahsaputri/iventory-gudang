const searchParams = new URLSearchParams(location.search);

document.querySelector(".btn.btn-primary").onclick = (e) => {
    e.preventDefault();
    const name_user = document.userr.user.value;
    const password = document.userr.password.value;
    const email = document.userr.email.value;
    const status = document.userr.status.value;

    fetch(`/api/username/${searchParams.get("user")}`, {
        method: "PUT",
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
    document.getElementById("userr").value;
    document.getElementById("pass").value;
    document.getElementById("email").value;
    document.getElementById("status").value;
    alert("data user berhasil di update");
    location.href = "../iventory-project/user.html"

}