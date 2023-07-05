// const pgp = require('pg-promise')();
// const db = pgp({ database: 'inventory',
//                  user: 'postgres',
//                  password: 'inventory-gudang',
//                  host: 'db.ykbvxohtqvqpnqvnqwkl.supabase.co', 
//                  port: 5432 });


// fetch('/api/keluar')
//     .then(response => response.json())
//     .then(data => {
//         // menghitung stok sisa barang
//         const stok = data.map(item => item.stok).reduce((acc, cur) => acc - cur, 0);
//         console.log(`Stok sisa barang: ${stok}`);
//     })
//     .catch(error => console.error(error));
