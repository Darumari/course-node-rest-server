const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.usersPath = '/api/users';

		// Conectar a base de datos
		this.conectarDB();

		// Middlewares
		this.middlewares();

		// Rutas de la aplicación
		this.routes();
	}

	async conectarDB() {
		await dbConnection();
	}

	middlewares() {
		// CORS
		this.app.use(cors());

		// Lectura y parseo del body
		this.app.use(express.json());

		// Directorio público
		this.app.use(express.static('public'));
	}

	routes() {
		this.app.use(this.usersPath, require('../routes/user.routes'));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log('Servidor corriendo en el puerto:', this.port);
		});
	}
}

module.exports = Server;
