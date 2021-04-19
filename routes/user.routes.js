const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const {
	esRoleValido,
	emailExists,
	userByIdExists,
} = require('../helpers/db-validators.helper');
const {
	usersGet,
	usersPost,
	usersPut,
	usersDelete,
	usersPatch,
} = require('../controllers/user.controller');
const router = Router();

router.get('/', usersGet);

router.put(
	'/:id',
	[
		check('id', 'No es un id válido').isMongoId(),
		check('id').custom(userByIdExists),
		check('rol').custom(esRoleValido),
		validateFields,
	],
	usersPut
);

router.post(
	'/',
	[
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		check(
			'password',
			'El password debe de estar formado por más de 6 caracteres'
		).isLength({ min: 6 }),
		check('correo', 'El correo no es válido').isEmail(),
		check('correo').custom(emailExists),
		// check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
		check('rol').custom(esRoleValido),
		validateFields,
	],
	usersPost
);

router.delete(
	'/:id',
	[
		check('id', 'No es un id válido').isMongoId(),
		check('id').custom(userByIdExists),
		validateFields,
	],
	usersDelete
);

router.patch('/', usersPatch);

module.exports = router;
