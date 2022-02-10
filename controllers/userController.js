const User = require('../models/user');
const Rol = require('../models/rol');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = {

    async getAll(req, res, next) {
        try {
            const data = await User.getAll();  //await -> espera a que se realice la consulta, para así continuar con la siguientes consulta
            console.log(`Usuarios: ${data}`);
            return res.status(200).json(data)
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los usuarios'
            });
        }
    },

    async register(req, res, next) {
        try{
            
            const user = req.body;
            const data = await User.create(user);

            await Rol.create(data.id, 1);
            const token = jwt.sign({
                id: data.id,
                email: user.email,
            }, keys.secretOrKey, {
                // expiresIn:
            })

            const myData = {
                id: data.id,
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                phone: data.phone,
                image: data.image,
                session_toke: `JWT ${token}`
            };

            return res.status(201).json({
                success: true,
                message: 'El registro se realizó correctamente',
                data: myData
            });

        } catch (error) {
            console.log(`Error: ${error}`)
            return res.status(500).json({
                success: false,
                message: 'Error al registrar un usuario',
                error: error
            })
        }
    },

    async login(req, res, next) {
        try{
            
            const email = req.body.email;
            const password = req.body.password;

            const myUser = await User.findByEmail(email);

            if(!myUser) {
                return res.status(401).json({
                    success: false,
                    message: 'El email no fue encontrado'
                });
            };

            const isPasswordValid = await bcrypt.compare(password, myUser.password);

            if (isPasswordValid) {
                const token = jwt.sign({
                    id: myUser.id,
                    email: myUser.email,
                }, keys.secretOrKey, {
                    // expiresIn:
                })

                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_toke: `JWT ${token}`
                };

                return res.status(201).json({
                    success: true,
                    message: 'El usuario ha sido autenticado',
                    data: data
                });
            }
            else {
                return res.status(201).json({
                    success: false,
                    message: 'La contraseña es incorrecta',
                    data: data
                });
            }

        } catch (error) {
            console.log(`Error: ${error}`)
            return res.status(500).json({
                success: false,
                message: 'Hubo un error con el login del usuario',
                error: error
            })
        }
    }
};