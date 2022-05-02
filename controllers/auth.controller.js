const { User } = require('../models/models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')


module.exports.register = async (req, res) => {
    const { name, lastname, email, password } = req.body

    try{

        if(!email || !password){
            return res.status(400).json({
                message: "Введите все данные"
            })
        }

        const candidate = await User.findOne({where: {email}})

        console.log(User)
        if(candidate){
            return res.status(409).json({
                message: "Такой email уже существует, попробуйте другой"
            })
        }


        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({name,lastname,email, password: hashedPassword})

        const token = jwt.sign(
            {user_id: user.id, name: user.name, email: user.email},
            config.get('hash'),
            {expiresIn: '12h'}
        )

        return res.status(201).json({
            token: `Bearer ${token}`,
            user,
            message: 'Регистрация прошла успешно'
        })


    }catch(error){
        console.log(error)
        return res.status(500).json({
            error,
            message: "Что-то пошло не так..."
        })
    }
}


module.exports.login = async (req, res) => {

    const { email, password } = req.body
    console.log(email)

    try {
        if(!email || !password){
            return res.status(400).json({
                message: "Введите все данные"
            })
        }

        const user = await User.findOne({where: {email}})



        if(!user){
            return res.status(400).json({
                message: 'Вы ввели неверный email'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({
                message: 'Вы ввели неверный пароль'
            })
        }

        const token = jwt.sign(
            {user_id: user.id, name: user.name},
            config.get('hash'),
            {expiresIn: '12h'}
        )


        return res.json({token:`Bearer ${token}`, message: 'Вы успешно вошли', userId: user.id})

    }catch (error){
        return res.status(500).json({
            message: 'Что-то пошло не так'
        })
    }
}