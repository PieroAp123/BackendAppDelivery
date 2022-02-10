DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	image VARCHAR(255) NULL,
	rout VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

DROP TABLE IF EXISTS user_has_roles CASCADE;
CREATE TABLE user_has_roles(
	id_user BIGSERIAL NOT NULL,
	id_rol BIGSERIAL NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY (id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY(id_user, id_rol)
);

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	name VARCHAR(255) NOT NULL,
	lastname VARCHAR(255) NOT NULL,
	phone VARCHAR(80) NOT NULL UNIQUE,
	image VARCHAR(255) NULL,
	password VARCHAR(255) NOT NULL,
	is_available BOOLEAN NULL,
	session_token VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

SELECT * FROM roles;
INSERT INTO roles(
	name,
	rout,
	image,
	created_at,
	updated_at
) VALUES ('CLIENTE','cliente/home','https://as2.ftcdn.net/v2/jpg/01/18/03/33/1000_F_118033377_JKQA3UFE4joJ1k67dNoSmmoG4EsQf9Ho.jpg','2022-01-05', '2022-01-05');

INSERT INTO roles(	name, rout, image,	created_at,	updated_at) 
VALUES (
	'RESTAURANTE',
	'restaurante/home',
	'https://as1.ftcdn.net/v2/jpg/01/04/81/32/1000_F_104813280_bpD80ASxLMnMuMKDoU8LcgTPWGZ85gSX.jpg',
	'2022-01-05',
	'2022-01-05'
);

INSERT INTO roles(	name, rout, image,	created_at,	updated_at) 
VALUES (
	'REPARTIDOR',
	'delivery/home',
	'https://as2.ftcdn.net/v2/jpg/01/29/48/67/1000_F_129486795_gDtTviQEnlFoMuEvcdUwgm2fy6s8V9D1.jpg',
	'2022-01-05',
	'2022-01-05'
)