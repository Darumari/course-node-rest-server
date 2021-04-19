const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user.model');

const usersGet = async (req = request, res = response) => {
	const { limite = 5, desde = 0 } = req.query;
	const query = { estado: true };
	// Paginación
	// Ejecuta ambas promesas haciendolas de manera simultanea
	const [total, users] = await Promise.all([
		User.countDocuments(query),
		User.find(query).skip(Number(desde)).limit(Number(limite)),
	]);
	res.json({
		total,
		users,
	});
};

const usersPost = async (req = request, res = response) => {
	// const { google, ...resto } = req.body;
	// console.log(resto);
	const { nombre, correo, password, rol } = req.body;
	const user = new User({ nombre, correo, password, rol });

	// Encriptar la contraseña
	const salt = bcryptjs.genSaltSync();
	user.password = bcryptjs.hashSync(user.password, salt);

	// Guardar en BD
	await user.save();
	res.json(user);
};

const usersPut = async (req = request, res = response) => {
	const { id } = req.params;
	// TODO validar la parte del correo, si llega el correo, detecta que ya esta registrado y no debería ser así
	const { _id, password, google, correo, ...userData } = req.body;

	if (password) {
		// Encriptar la contraseña
		const salt = bcryptjs.genSaltSync();
		userData.password = bcryptjs.hashSync(password, salt);
	}

	const userUpdated = await User.findByIdAndUpdate(id, userData);

	res.json(userUpdated);
};

const usersDelete = async (req = request, res = response) => {
	const { id } = req.params;

	// Fisicamente se borra
	// const user = await User.findByIdAndDelete(id);

	// Logicamente se borra
	const user = await User.findByIdAndUpdate(id, { estado: false });

	res.json({
		user,
	});
};

const usersPatch = (req = request, res = response) => {
	res.json({
		msg: 'Patch API desde controlador',
	});
};

module.exports = {
	usersGet,
	usersPut,
	usersPost,
	usersDelete,
	usersPatch,
};
