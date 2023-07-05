// editBarang()
jenisBarang()
satuanBarang()
const searchParams = new URLSearchParams(location.search);

// async function editBarang() {
//     const res = await fetch(`/api/barang/${searchParams.get("barang")}`);
// }

document.querySelector(".btn.btn-primary").onclick = async (e) => {
    e.preventDefault();
    const nama_barang = document.getElementById("nama_barang").value
    const id_jenis = document.getElementById("jenis_barang").value
    const id_satuan = document.getElementById("satuan_barang").value
    fetch(`/api/barang/${searchParams.get("barang")}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nama_barang,
            id_jenis,
            id_satuan
        })
    })
    // .then((response)=>response.json())
    // .then((res)=>{
    document.getElementById("nama_barang").value
    document.getElementById("jenis_barang").value
    document.getElementById("satuan_barang").value
    alert("Data barang berhasil di update")
    location.href = "../iventory-project/data-barang.html"
    // })
}


//tampilim option jenis & satuan barang
function jenisBarang() {
    fetch("/api/jenis_barang")
        .then((response) => response.json())
        .then((res) => {
            jenis(res.data)
        })
}


function jenis(barang) {
    const option = document.getElementById("jenis_barang")
    barang.map((b) => {
        const jenis = document.createElement("option")
        jenis.value = b.id_jenis
        jenis.text = b.nama_jenis
        option.appendChild(jenis)
    })
}

function satuanBarang() {
    fetch("/api/satuan")
        .then((response) => response.json())
        .then((res) => {
            if (!res.data || !Array.isArray(res.data)) {
                console.error("Response data is not an array.")
                return
            }
            satuan(res.data)
        })
}

function satuan(satuann) {
    if (!satuann || !Array.isArray(satuann)) {
        console.error("Input parameter is not an array.")
        return
    }
    const option = document.getElementById("satuan_barang")
    satuann.map((b) => {
        const jenis = document.createElement("option")
        jenis.value = b.id_satuan
        jenis.text = b.nama_satuan
        option.appendChild(jenis)
    })
}
