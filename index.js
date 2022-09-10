const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const {body,validationResult, check} = require('express-validator')
const methodOverride = require('method-override')
require('./utils/db')

const Contact = require('./models/contact')

const app = express()
const port = 3000

app.use(methodOverride('_method'))

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))

app.use(cookieParser('secret'))
app.use(session({
    cookie : {maxAge : 6000},
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}))

app.use(flash())

app.get('/',(req,res) => {

    res.render('index')
})

app.get('/contact',async (req,res) => {
    const data = await Contact.find()
    res.header(404)
    res.render('contact',{data,msg : req.flash('msg')})
})

app.get('/contact/add', (req,res) => {
    res.render('addContact')
})

app.post('/contact',[
    body('nama').custom( async (value) => {
        const duplikat = await Contact.findOne({nama : value})
        if(duplikat){
            throw new Error('Nama Sudah Digunakan')
        }
        return true
    }),
    check('email','Email tidak valid!').isEmail(),
    check('noHp','Nomor hp tidak valid!').isMobilePhone('id-ID'),
],(req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render('addContact',{errors : errors.array()})
        return 
    }else{
        Contact.insertMany(req.body, (error,result) => {
            req.flash('msg','Data contact berhasil ditambahkan')
            res.redirect('/contact')
        })
    }
})

app.get('/contact/edit/:nama', (req,res) => {
    const data = Contact.findOne({nama : req.params.nama})
    res.render('editContact',{data})
})

app.get('/contact/:nama',async (req,res) => {
    const data = await Contact.findOne({ nama : req.params.nama})
    res.render('detail',{data})
})
app.delete('/contact/delete',async (req,res) => {
    const contact = await Contact.findOne({nama : req.body.nama})
    if (!contact) {
        res.status(404)
        res.send('<h1>Not Found</h1>')
    }else{
        Contact.deleteOne({_id: contact._id}).then((result) => {
        req.flash('msg',"Data Berhasil Dihapus ")
        res.redirect('/contact')
        })
    }
})


app.listen(port, () => {
    console.log('Terkoneksi');
})