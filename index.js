const express = require('express')
const {body,validationResult, check} = require('express-validator')
const app = express()
const port = 3000
const {loadContact,findContact,addContact,checkDuplicate} = require('./utils/contact.js')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

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
    const data = [
        {
            nama : 'ade',
            noHp : '324923',
            email : "adeoktaviano@gmail.com"
        }
    ]
    res.render('index',data)
})

app.get('/contact',(req,res) => {
    const data = loadContact() 
    res.render('contact',{data,msg : req.flash('msg')})
})

app.get('/contact/add', (req,res) => {
    res.render('addContact')
})

app.post('/contact',[
    body('nama').custom((value) => {
        const duplikat = checkDuplicate(value)
        if(duplikat){
            throw new Error('Nama Sudah Digunakan')
        }
        return true
    }),
    check('email','Email tidak valid!').isEmail(),
    check('noHp','Nomor hp tidak valid!').isMobilePhone('id-ID'),
],(req,res) => {
    const errors = validationResult(req)
    console.log();
    if (!errors.isEmpty()) {
        res.render('addContact',{errors : errors.array()})
        return 
    }else{
        addContact(req.body)
        req.flash('msg','Data contact berhasil ditambahkan')
        res.redirect('/contact')
    }
})

app.get('/contact/:nama',(req,res) => {
    const data = findContact(req.params.nama)
    res.render('detail',{data})
})

app.listen(port)