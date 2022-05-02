const { Post } = require('../models/models')
const path = require('path')
const uuid = require('uuid')

module.exports.posts = async (req, res) => {
   try{

    const posts = await Post.findAll({order: [ ['id', 'DESC'] ]})

    return res.json({
        posts
    })

   }catch(error){
       res.status(500).json({
        message:"Что-то пошло не так",
        error
       })
   }    
}



module.exports.update = async(req, res) => {
    try{

        const {content} = req.body
        
        const userId = req.user.id
        const {id} = req.params

        const data = { content, userId }

        if(req.files){

            const {image} = req.files
            const fileName = uuid.v4() + '.jpg'
    
            image.mv(path.resolve(__dirname, '..', 'static', fileName))  

            data.photo = fileName
        }
        
        const post = await Post.update(data, {where:{id, userId}})


        return res.status(201).json({
            message: 'Запись успешна обновлена'
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            error, 
            message: 'Что-то пошло не так'
        })
    }
}



module.exports.deletePost = async (req, res) => {
    try{

        const {id} = req.params
        const userId = req.user.id

        await Post.destroy({where: {id, userId}})

        return res.status(200).json({
            message: "Запись удалена"
        })

    }catch(error){
        return res.status(500).json({
            error,
            message: "Что-то пошло не так"
        })
    }
}


module.exports.create = async (req, res) => {
    
    try{

        const {content} = req.body
        const userId = req.user.id
        const data = { content, userId }

        if(req.files){

            const {image} = req.files
            const fileName = uuid.v4() + '.jpg'
    
            image.mv(path.resolve(__dirname, '..', 'static', fileName))  

            data.photo = fileName
        }
        
        const post = await Post.create(data)


        return res.status(201).json({
            post,
            message: 'Запись успешна создана'
        })

    }catch(error){
        return res.status(500).json({
            error, 
            message: 'Что-то пошло не так'
        })
    }



}



module.exports.getPost = async (req, res) => {
    try{

        const {id} = req.params

        const post = await Post.findOne({where: {id}})

        return res.json({
            post
        })

    }catch(error){
        return res.status(500).json({
            message: 'Что-то пошло не так',
            error
        })
    }
}