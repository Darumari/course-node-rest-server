const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const {
	usersGet,
	usersPost,
	usersPut,
	usersDelete,
	usersPatch,
} = require('../controllers/user.controller');
const router = Router();

router.get('/', usersGet);

router.put('/:id', usersPut);

router.post(
	'/',
	[
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		check(
			'password',
			'El password debe de estar formado por más de 6 caracteres'
		).isLength({ min: 6 }),
		check('correo', 'El correo no es válido').isEmail(),
		check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
	],
	validateFields,
	usersPost
);

router.delete('/', usersDelete);

router.patch('/', usersPatch);

module.exports = router;
