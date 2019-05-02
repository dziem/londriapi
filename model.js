//SIGNIN
const jwt = require('jsonwebtoken');

function IDGenerator() {	 
	this.length = 8;
	this.timestamp = +new Date;
	var _getRandomInt = function( min, max ) {
		return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
	}
	this.generate = function() {
		var ts = this.timestamp.toString();
		var parts = ts.split( "" ).reverse();
		var id = "";
		for( var i = 0; i < this.length; ++i ) {
			var index = _getRandomInt( 0, parts.length - 1 );
			id += parts[index];	 
		}
		return id;
	}
}
var generator = new IDGenerator();

exports.login = (req, res) => {

    var username = req.body.username;
    var password = req.body.password;

    connection.query('SELECT * FROM pegawai WHERE username = ? AND password = ?',[username , password], (error, rows, fields)=>{
        if(error){
            response.gagal(error,res)
        } else{
            if(rows.length == 0){
				response.ok({'message' : 'username atau password salah'}, res)
			}else{
				var time = new Date().toLocaleString();
				var aidi = rows[0].id_pegawai;
				connection.query('UPDATE pegawai SET last_login = ? where id_pegawai = ?',[time , aidi], (error2, rows2, fields2)=>{
					if(error){
						response.gagal(error2,res)
					} else{
						var token = jwt.sign({ id: rows[0].id_pegawai, nama: rows[0].nama, last_login: rows[0].last_login }, 'a key');
						response.ok(token,res)
					}
				});
			}			
        }
    });
};

//INSERT MEMBER
exports.tambah_member = (req, res) => {
    var nama = req.body.nama;
    var alamat = req.body.alamat;
    var no_tel = req.body.no_tel;
    connection.query('INSERT INTO member (nama , alamat, no_tel) vaLues (?,?,?)',[nama , alamat, no_tel], (error, rows, fields)=>{
        if(error){
            response.gagal(error,res)
        } else{
            response.ok({'message' : 'berhasil tambah member'}, res)
        }
    });
};

//GET ALL MEMBER
exports.get_member = (req, res) => {
    connection.query('SELECT * FROM member', (error, rows, fields)=>{
        if(error){
            response.gagal(error,res)
        } else{
            response.ok(rows, res)
        }
    });
};

//GET MEMBER BY ID
exports.cari_member = (req, res) => {
    var id_member = req.params.id;

    connection.query('SELECT * FROM member where id_member = ?',[id_member],(error,rows,fields)=>{
        if(error){
            response.gagal(error,res)
        } else{
            response.ok(rows, res)
        }
    })
};

//UPDATE MEMBER
exports.update_member = (req, res) => {

    var id_member = req.body.id;
    var nama = req.body.nama;
    var alamat = req.body.alamat;
    var no_tel = req.body.no_tel;

    connection.query('UPDATE member SET nama = ? , alamat = ?, no_tel = ? where id_member = ?',[nama , alamat, no_tel, id_member], (error, rows, fields)=>{
        if(error){
            response.gagal(error,res)
        } else{
            response.ok({'message' : 'berhasil update member'}, res)
        }
    });
};

//DELETE MEMBER
exports.delete_member  = (req, res) => {

    var id_member = req.params.id;

    connection.query('DELETE FROM member where id_member = ?',[id_member], (error, rows, fields)=>{
        if(error){
            response.gagal(error,res)
        } else{
            response.ok({'message' : 'berhasil hapus member'}, res)
        }
    });
};


//INSERT NEW TYPE
exports.tambah_tipe = (req, res) => {
    var nama = req.body.nama;
    var harga = req.body.harga;
    connection.query('INSERT INTO tipe (nama_tipe , harga_per_qty) vaLues (?,?)',[nama , harga], (error, rows, fields)=>{
        if(error){
            response.gagal(error,res)
        } else{
            response.ok({'message' : 'berhasil tambah tipe'}, res)
        }
    });
};

//GET ALL TYPE
exports.get_type = (req, res) => {
    connection.query('SELECT * FROM tipe', (error, rows, fields)=>{
        if(error){
            response.gagal(error,res)
        } else{
            response.ok(rows, res)
        }
    });
};

//GET TYPE BY ID
exports.cari_tipe = (req, res) => {
    var id_tipe = req.params.id;

    connection.query('SELECT * FROM tipe where id_tipe = ?',[id_tipe],(error,rows,fields)=>{
        if(error){
            response.gagal(error,res)
        } else{
            response.ok(rows, res)
        }
    })
};

//UPDATE TYPE
exports.update_type = (req, res) => {

    var id_tipe = req.body.id;
    var nama = req.body.nama;
    var harga = req.body.harga;

    connection.query('UPDATE tipe SET nama_tipe = ? , harga_per_qty = ? where id_tipe = ?',[nama , harga, id_tipe], (error, rows, fields)=>{
        if(error){
            response.gagal(error,res)
        } else{
            response.ok({'message' : 'berhasil update tipe'}, res)
        }
    });
};

//DELETE TYPE
exports.delete_type  = (req, res) => {

    var id_tipe = req.params.id;

    connection.query('DELETE FROM tipe where id_tipe = ?',[id_tipe], (error, rows, fields)=>{
        if(error){
            response.gagal(error,res)
        } else{
            response.ok({'message' : 'berhasil hapus tipe'}, res)
        }
    });
};

//INSERT ORDER LAUNDRY
exports.tambah_laundry = (req, res) => {
    var id_member = req.body.id_member;
	var date = new Date().toLocaleString().slice(0, 9)
	var time = new Date().toLocaleString().slice(10)
    var thestatus = 'Pesanan diterima';
	var item = req.body.id_tipe;
	var qty = req.body.quantity;
	var totalharga = 0;
	var aidi = generator.generate();
	connection.query('SELECT * FROM tipe', (error, rows, fields)=>{
        if(error){
            response.gagal(error,res)
        } else{
			var masuk =[];
            for(var i in item){
				masuk.push([aidi, item[i], qty[i]]);
				for(var j in rows){
					if(rows[j].id_tipe == item[i]){
						totalharga += qty[i] * rows[j].harga_per_qty;
					}
				}
			}
			connection.query('INSERT INTO laundry (id_laundry , id_member, tanggal_terima, waktu_terima, status, total_harga) vaLues (?,?,?,?,?,?)',[aidi , id_member, date,time, thestatus, totalharga], (error, rows, fields)=>{
				if(error){
					response.gagal(error,res)
				} else{
					connection.query('INSERT INTO detail_laundry (id_laundry , id_tipe, quantity) vaLues ?',[masuk], (error, rows, fields)=>{
					if(error){
						response.gagal(error,res)
					} else{
						response.ok({'message' : 'berhasil input laundry'}, res);
					}
				});
				}
			});
        }
    });
};

//READ ALL ORDER
exports.all_order = (req, res) => {

    connection.query('SELECT * FROM laundry ORDER BY tanggal_terima DESC, waktu_terima DESC',(error,rows,fields)=>{
        if(error){
            response.gagal(error,res)
        } else{
            response.ok(rows, res)
        }
    })
};

//READ DETAIL ORDER
exports.detail_order = (req, res) => {
    var id_laundry = req.params.id;
	var resolt = [];
    connection.query('SELECT * FROM laundry WHERE id_laundry = ?',[id_laundry],(error,rows,fields)=>{
        if(error){
            response.gagal(error,res)
        } else{
			resolt.push(rows);
            connection.query('SELECT * FROM detail_laundry WHERE id_laundry = ?',[id_laundry],(error2,rows2,fields2)=>{
			if(error){
				response.gagal(error2,res)
			} else{
				resolt.push(rows2);
				response.ok(resolt, res)
			}
		})
        }
    })
};

//UPDATE STATUS DONE
exports.laundry_done = (req, res) => {
	var thestatus = 'Selesai';
    var no_rak = req.body.no_rak;
    var id_laundry = req.body.id;

    connection.query('UPDATE laundry SET status= ? , nomor_rak = ? where id_laundry = ?',[thestatus , no_rak, id_laundry], (error, rows, fields)=>{
        if(error){
            response.gagal(error,res)
        } else{
            response.ok({'message' : 'berhasil ganti status laundry'}, res)
        }
    });
};

//UPDATE STATUS DIAMBIL
exports.laundry_picked = (req, res) => {
	var thestatus = 'Sudah diambil';
    var date = new Date().toLocaleString().slice(0, 9)
	var time = new Date().toLocaleString().slice(10)
    var id_laundry = req.params.id;

    connection.query('UPDATE laundry SET status= ? , tanggal_ambil = ?, waktu_ambil = ? where id_laundry = ?',[thestatus , date,time, id_laundry], (error, rows, fields)=>{
        if(error){
            response.gagal(error,res)
        } else{
            response.ok({'message' : 'berhasil ganti status laundry'}, res)
        }
    });
};

//INDEX
exports.index = (req,res) => {
    response.ok("index mate" , res)
};

//NOPAGE
exports.nopage = (req,res) => {
    response.ok("no page mate ffs" , res)
};