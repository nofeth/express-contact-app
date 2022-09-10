const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.1:27017/contact',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})



//Add data

//  const contact1 = new Contact({
//     nama : 'Ade',
//     noHp : '12332424243',
//     email : 'ade@gmail.com'
//  })

//  contact1.save().then((suc) => console.log(suc))