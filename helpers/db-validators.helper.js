const Role = require('../models/role.model');
const User = require('../models/user.model');

const esRoleValido = async (rol) => {
	const existeRol = await Role.findOne({ rol });
	if (!existeRol) {
		throw new Error(`El rol ${rol} no está definido en la BD.`);
	}
};

// Verificar si el correo existe
const emailExists = async (correo = '') => {
	const existeCorreo = await User.findOne({ correo });
	if (existeCorreo) {
		throw new Error(`El coreo ${correo} ya esta registrado.`);
	}
};

const userByIdExists = async (id) => {
	const existeUsuario = await User.findById(id);
	if (!existeUsuario) {
		throw new Error(`Èl id: '${id}' no exíste`);
	}
};

module.exports = {
	esRoleValido,
	emailExists,
	userByIdExists,
};
