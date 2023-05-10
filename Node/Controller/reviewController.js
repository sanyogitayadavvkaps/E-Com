const { postReviewsModel, getReviewsModel } = require("../Model/reviewModel")

const postReviewsController = async(req,res)=>{
    const {body} = req
    try{
        const data = await postReviewsModel({body})
        res.send(data)
    }
    catch(err){
        res.send(err)
    }
}

const getReviewsController = async(req,res)=>{
    try{
        const data = await getReviewsModel()
        console.log("RESponse=>",data);
        res.send(data)
    }
    catch(err){
        res.send(err)
    }
}

module.exports = {getReviewsController,postReviewsController}