//const {MongoClient} = require('mongodb');

//const url = 'mongodb://vsrnitp:Hello12345@ds257551.mlab.com:57551/react'

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const url = 'mongodb://localhost:27017/mongoose';
mongoose.connect(url);

// schemas and models are used
const carSchema = mongoose.Schema({
    brand:String,
    model:String,
    year:Number,
    avail:Boolean
});
const Car = mongoose.model('car',carSchema);

/*const addCar = new Car({
    brand:'chevy',
    model:'laura',
    year:'2010',
    avail:true
})

addCar.save((err,doc)=>{
if(err) return console.log(err);
console.log(doc);
})*/

/*Car.findOne({brand:'Ford'},(err,doc)=>{
    if(err) return console.log(err);
    console.log(doc)
})*/

// deletion

Car.findOneAndRemove({brand:'Ford'},(err,doc)=>{
    if(err) return console.log(err)
    console.log(doc)
})




























// inserting data

/*MongoClient.connect(url,(err,db)=>{

const cars =[
    {model:'chevy',year:2017},
    {model:'nissan',year:2000}
]

if(err){
    console.log(err);
}
console.log('connected!...')
db.collection('car').insert(cars,(err,res)=>{
if(err){
return console.log('cant insert'+ err);
}
console.log(res.ops);
})
db.close();
});*/

// finding data

/*MongoClient.connect(url,(err,db)=>{
  db.collection('car')
  .find({year:2000})
  .toArray()
  .then(data=>{
      console.log(data);
  })
  db.close()
    
})
*/

// deleting data

/*MongoClient.connect(url,(err,db)=>{
    db.collection('car').deleteMany({year:2000},(err,doc)=>{
        console.log(doc)
    })
    db.close();
})*/

// updating data
/*MongoClient.connect(url,(err,db)=>{
    db.collection('car').findOneAndUpdate({
        name:'francis'
    },
    {
        $set:{
            lastname:"smith"
        }
    },
    {
        returnOriginal:false
    },
    (err,doc)=>{
console.log(doc)
    }
    
    )
    db.close();
})*/

// Mongoose(its an ORM Object relational mapping)


