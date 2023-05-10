const DB_URL = 'mongodb://127.0.0.1:27017/Chairs'
const mongoose = require('mongoose');

const connectDataBase = ()=>{
  mongoose.set('strictQuery',true);
  mongoose.connect(DB_URL,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err))
}
module.exports = connectDataBase