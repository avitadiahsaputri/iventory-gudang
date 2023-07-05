import dotenv from "dotenv";
dotenv.config();

import express from "express";

import { client } from "./db.js";

import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";

const app = express();

// MIDDLEWARE

// Untuk mengelola cookie
app.use(cookieParser());

// Untuk memeriksa otorisasi
app.use((req, res, next) => {
     if (req.path === "/api/login" || req.path.startsWith("/asset")) {
          next();
     } else {
          let authorized = false;
          if (req.cookies.token) {
               try {
                    jwt.verify(req.cookies.token, process.env.SECRET_KEY);
                    authorized = true;
               } catch (err) {
                    res.setHeader("Cache-Control", "no-store"); // khusus Vercel
                    res.clearCookie("token");
               }
          }
          if (authorized) {
               if (req.path.startsWith("/login")) {
                    res.redirect("/iventory-project/dasboard.html");
               } else {
                    next();
               }
          } else {
               if (req.path.startsWith("/login")) {
                    next();
               } else {
                    if (req.path.startsWith("/api")) {
                         res.status(401);
                         res.send("Anda harus login terlebih dahulu.");
                    } else {
                         res.redirect("/login");
                    }
               }
          }
     }
});

// Untuk mengakses file statis
// app.use(express.static("public"));

// Untuk mengakses file statis (khusus Vercel)
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// Untuk membaca body berformat JSON
app.use(express.json());

// ROUTE OTORISASI111111

// Login (dapatkan token)
app.post("/api/login", async (req, res) => {
     const results = await client.query(
          `SELECT * FROM username WHERE name_user = '${req.body.user}'`
     );
     if (results.rows.length > 0) {
          if (await bcrypt.compare(req.body.pass, results.rows[0].password)) {
               const token = jwt.sign(results.rows[0], process.env.SECRET_KEY);
               res.cookie("token", token);
               res.send("Login berhasil.");
          } else {
               res.status(401);
               res.send("Kata sandi salah.");
          }
     } else {
          res.status(401);
          res.send("username tidak terdaftar");
     }
});

// Dapatkan mahasiswa saat ini (yang sedang login)
app.get("/api/me", (req, res) => {
     const me = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
     res.json(me);
});

// Logout (hapus token)
app.get("/api/logout", (_req, res) => {
     res.setHeader("Cache-Control", "no-store"); // khusus Vercel
     res.clearCookie("token");
     res.send("Logout berhasil.");
});

//root login
// app.post("/api/login", async (req, res) => {
//      console.log(req.body);
//      const request = await client.query(`SELECT * from login where = '${req, body, user}'`)
//      console.log(request);
// })


//route
//data barang
app.get("/api/barang", async (_req, res) => {
     const result = await client.query(
          `SELECT barang.id_barang,barang.kode_barang,barang.nama_barang,jenis_barang.nama_jenis,barang.stok,satuan.nama_satuan
           from barang join jenis_barang on barang.id_jenis = jenis_barang.id_jenis 
           join satuan on barang.id_satuan = satuan.id_satuan`);
     res.send(result.rows);
});

app.get("/api/barang/:id_barang", async (req, res) => {
     console.log(req.params.id_barang);
     const result = await client.query(`SELECT barang.id_barang,barang.kode_barang,barang.nama_barang,jenis_barang.nama_jenis,barang.stok,satuan.nama_satuan
           from barang join jenis_barang on barang.id_jenis = jenis_barang.id_jenis 
           join satuan on barang.id_satuan = satuan.id_satuan where id_barang = '${req.params.id_barang}'`)
     res.send(result.rows)
})

//jenis barang
app.get("/api/jenis_barang", async (_req, res) => {
     const result = await client.query("SELECT * from jenis_barang");
     res.json({ data: result.rows })
     // res.send(result.rows);
})

//satuan
app.get("/api/satuan", async (_req, res) => {
     const result = await client.query("SELECT * from satuan");
     res.json({ data: result.rows })
})


//barang masuk 
app.get("/api/barang_masuk", async (_req, res) => {
     const result = await client.query(
          `SELECT transaksi_masuk.id_transaksi_masuk,transaksi_masuk.tanggal,transaksi_masuk.kode_barang,barang.nama_barang,transaksi_masuk.jumlah_masuk
          from transaksi_masuk join barang on transaksi_masuk.kode_barang = barang.kode_barang`
     );
     res.json(result.rows)
})

//barang_keluar 
app.get("/api/barang_keluar", async (_req, res) => {
     const result = await client.query(
          `SELECT transaksi_keluar.id_transaksi_keluar,transaksi_keluar.tanggal,transaksi_keluar.kode_barang,barang.nama_barang,transaksi_keluar.jumlah_keluar
          from transaksi_keluar join barang on transaksi_keluar.kode_barang = barang.kode_barang`
     );
     res.json(result.rows)
})

//stok
// app.get("/api/stok", async (_req, res) => {
//      const result = await client.query(
//           `SELECT barang.id_barang,barang.kode_barang,barang.nama_barang,barang.id_jenis,barang.id_satuan,barang.stok
//           from barang join jenis_barang on barang.id_jenis = jenis_barang.id_jenis
//           join satuan on barang.id_satuan = satuan.id_satuan `
//      );
//      res.send(result.rows)

// })

//views
app.get('/api/views/dbarang', async (req, res) => {
     try {
          const result = await client.query('SELECT * FROM dbarang');
          res.json(result.rows);
     } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
     }
});

app.get("/api/views/keluarr", async (req, res) => {
     try {
          const result = await client.query(
               "SELECT * FROM keluarr"
          );
          res.json(result.rows);
     } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Internal server error" });
     }
});


app.get("/api/views/dbarang-with-stok", (req, res) => {
     db.any(`
    SELECT d.kode_barang, d.nama_barang, d.nama_jenis, d.stok, d.nama_satuan, COALESCE(k.stok_keluar, 0) as jumlah_keluar,
    (d.stok - COALESCE(k.stok_keluar, 0)) as stok_tersedia
    FROM dbarang d
    LEFT JOIN keluar k ON d.kode_barang = k.kode_barang;
  `)
          .then(data => {
               res.status(200).json(data);
          })
          .catch(error => {
               console.log('Error:', error);
               res.status(500).send('Internal server error');
          });
});



//user
app.get("/api/username", async (_req, res) => {
     const result = await client.query(`SELECT * FROM username `);
     res.send(result.rows);
})



//nambah data
//data barang
app.post("/api/barang", async (req, res) => {
     try {
          const query = `
          INSERT INTO barang(nama_barang,id_jenis,id_satuan)
          SELECT '${req.body.nama_barang}',jenis_barang.Id_jenis,satuan.id_satuan
          FROM jenis_barang,satuan
          WHERE jenis_barang.id_jenis ='${req.body.id_jenis}'
          AND satuan.id_satuan = '${req.body.id_satuan}'
          `;
          await client.query(query);
          res.status(200).send("data barang berhasil ditambahkan");
     } catch (err) {
          console.error(err);
          res.status(500).send("terjadi kesalahan server");
     }
});

//jenis barang
app.post("/api/jenis_barang", async (req, res) => {
     await client.query(
          `INSERT INTO jenis_barang(nama_jenis) VALUES ('${req.body.nama_jenis}')`
     );
     res.send("jenis barang berhasil ditambahkan");
});

//satuan
app.post("/api/satuan", async (req, res) => {
     await client.query(
          `INSERT INTO satuan(nama_satuan) VALUES ('${req.body.nama_satuan}')`
     );
     res.send("data satuan berhasil ditambahkan")
})

//////////////////////////////////////////////////////////////////////////////////////
//transaksi masuk   
app.post("/api/barang_masuk", async (req, res) => {
     try {
          const query = `
          INSERT INTO transaksi_masuk (tanggal, kode_barang, jumlah_masuk)
          VALUES ('${req.body.tanggal}','${req.body.kode_barang}',' ${req.body.jumlah_masuk}')
          `;
          await client.query(query);
          res.status(200).send("Data barang berhasil ditambahkan ke dalam tabel barang_masuk.");
     } catch (err) {
          console.error(err);
          res.status(500).send("Terjadi kesalahan server.");
     }
});

//transaksi keluar 
app.post("/api/barang_keluar", async (req, res) => {
     try {
          const query = `
          INSERT INTO transaksi_keluar (tanggal, kode_barang, jumlah_keluar)
          VALUES ('${req.body.tanggal}','${req.body.kode_barang}',' ${req.body.jumlah_keluar}')
          `;
          await client.query(query);
          res.status(200).send("Data barang berhasil ditambahkan ke dalam tabel barang_masuk.");
     } catch (err) {
          console.error(err);
          res.status(500).send("Terjadi kesalahan server.");
     }
});

//user
app.post("/api/username", async (req, res) => {
     const salt = await bcrypt.genSalt();
     const hash = await bcrypt.hash(req.body.password, salt);
     await client.query(
          `INSERT INTO username(name_user,password,email,status) VALUES ('${req.body.name_user}','${hash}','${req.body.email}','${req.body.status}')`
     );
     res.send("data berhasil ditambahkan");
});


//update
//data barang
app.put("/api/barang/:id_barang", async (req, res) => {
     console.log(req.body)
     await client.query(
          `UPDATE barang SET nama_barang ='${req.body.nama_barang}', id_jenis ='${req.body.id_jenis}',id_satuan ='${req.body.id_satuan}'  WHERE id_barang = ${req.params.id_barang} `
     );
     res.send("data_barang berhasil diupdate")
})

//jenis barang
app.put("/api/jenis_barang/:id_jenis", async (req, res) => {
     await client.query(
          `UPDATE jenis_barang SET nama_jenis = '${req.body.nama_jenis}' WHERE id_jenis = ${req.params.id_jenis}`
     );
     res.send("jenis barang berhasil diupdate");
});

//satuan
app.put("/api/satuan/:id_satuan", async (req, res) => {
     console.log(req.body);
     console.log(req.params.id_satuan);

     await client.query(
          `UPDATE satuan SET nama_satuan = '${req.body.nama_satuan}' WHERE id_satuan = ${req.params.id_satuan} `
     );
     res.send("satuan berhasil diupdate");
});

//user
app.put("/api/username/:user_id", async (req, res) => {
     console.log(req.body);
     console.log(req.params.user_id);
     await client.query(
          `UPDATE username SET name_user = '${req.body.name_user}' , password ='${req.body.password}' , email='${req.body.email}' WHERE user_id = '${req.params.user_id}'`
     )
          ;
     res.sendStatus(200);
})



//delete
//user
app.delete("/api/username/:user_id", async (req, res) => {
     await client.query(`DELETE FROM username WHERE user_id=${req.params.user_id}`);
     res.send("user berhasil dihapus");
});

//data barang
app.delete("/api/barang/:id_barang", async (req, res) => {
     await client.query(`DELETE FROM barang WHERE id_barang = ${req.params.id_barang}`);
     res.send("data barang berhasil dihapus");
});


//jenis_barang
app.delete("/api/jenis_barang/:id_jenis", async (req, res) => {
     await client.query(`DELETE FROM jenis_barang WHERE id_jenis = ${req.params.id_jenis}`);
     res.send("jenis barang berhasil dihapus");
});

//satuan
app.delete("/api/satuan/:id_satuan", async (req, res) => {
     await client.query(`DELETE FROM satuan WHERE id_satuan = ${req.params.id_satuan}`);
     res.send("satuan barang berhasil dihapus");
});

//transaksi keluar
app.delete("/api/barang_keluar/:id_transaksi_keluar", async (req, res) => {
     await client.query(`DELETE FROM transaksi_keluar where id_transaksi_keluar = ${req.params.id_transaksi_keluar}`)
     res.send("data berhasil dihapus");
});

//transaksi masuk
app.delete("/api/barang_masuk/:id_transaksi_masuk", async (req, res) => {
     await client.query(`DELETE FROM transaksi_masuk   where id_transaksi_masuk = ${req.params.id_transaksi_masuk}`)
     res.send("data berhasil dihapus");
});





app.listen(3000, () => {
     console.log("server berhasil berjalan");
});
