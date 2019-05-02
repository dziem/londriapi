'use strict';
const auth = require('./auth.js');
var models = require('./model.js');

module.exports = (app) => {
    //halaman index
	app.get('/', auth.isAuth ,models.index);
	app.get('/get_all_member', auth.isAuth ,models.get_member);
	app.get('/get_all_type', auth.isAuth ,models.get_type);
	app.get('/find_member/:id', auth.isAuth ,models.cari_member);
	app.get('/find_type/:id', auth.isAuth ,models.cari_tipe);
	app.get('/delete_member/:id', auth.isAuth ,models.delete_member);
	app.get('/delete_type/:id', auth.isAuth ,models.delete_type);
	app.get('/get_all_laundry', auth.isAuth ,models.all_order);
	app.get('/get_detail_laundry/:id', auth.isAuth ,models.detail_order);
	app.get('/get_laundry_by_month/:month', auth.isAuth ,models.order_by_month);
	app.patch('/update_laundry/',auth.isAuth, models.laundry_picked);
	app.post('/login', models.login);
	app.post('/update_member', auth.isAuth ,models.update_member);
	app.post('/update_type', auth.isAuth ,models.update_type);
	app.post('/add_member',auth.isAuth, models.tambah_member);
	app.post('/add_type',auth.isAuth, models.tambah_tipe);
	app.post('/add_laundry',auth.isAuth, models.tambah_laundry);
	app.post('/update_laundry',auth.isAuth, models.laundry_done);
	app.get('*', models.nopage);
};