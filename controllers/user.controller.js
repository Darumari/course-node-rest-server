const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user.model');

const usersGet = (req = request, res = response) => {
	const { q, nombre = 'no name', apikey } = req.query;
	res.json({
		msg: 'Get API desde controlador',
		query: { q, nombre, apikey },
	});
};

const usersPost = async (req = request, res = response) => {
	// const { google, ...resto } = req.body;
	// console.log(resto);
	const { nombre, correo, password, rol } = req.body;
	const user = new User({ nombre, correo, password, rol });

	// Verificar si el correo existe
	const emailExists = await User.findOne({ correo });
	if (emailExists) {
		return res.status(400).json({
			msg: 'El correo ya esta registrado',
		});
	}
	// Encriptar la contraseña
	const salt = bcryptjs.genSaltSync();
	user.password = bcryptjs.hashSync(user.password, salt);

	// Guardar en BD
	await user.save();
	res.json({
		msg: 'Post API desde controlador',
		user,
	});
};

const usersPut = (req = request, res = response) => {
	const { id } = req.params;
	res.json({
		msg: 'Put API desde controlador',
		id,
	});
};

const usersDelete = (req = request, res = response) => {
	res.json({
		msg: 'Delete API desde controlador',
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
