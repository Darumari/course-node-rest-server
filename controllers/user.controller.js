const { response, request } = require('express');

const usersGet = (req = request, res = response) => {
	const { q, nombre = 'no name', apikey } = req.query;
	res.json({
		msg: 'Get API desde controlador',
		query: { q, nombre, apikey },
	});
};

const usersPost = (req = request, res = response) => {
	const { nombre, edad } = req.body;
	res.json({
		msg: 'Post API desde controlador',
		body: {
			nombre,
			edad,
		},
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
