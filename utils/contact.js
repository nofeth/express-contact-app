// const fs = require('fs')


// const dirPath = './data'

// if (!fs.existsSync(dirPath)) {
//     fs.mkdirSync(dirPath)
// }

// const dataPath = './data/contacts.json'

// if (!fs.existsSync(dataPath)) {
//     fs.writeFileSync(dataPath,'[]','utf-8');
// }

// const loadContact = () => {
//     const fileBuffer = fs.readFileSync(dataPath,'utf-8')
//     const contacts = JSON.parse(fileBuffer)
//     return contacts
// }

// const findContact = (nama) => {
//     const datas = loadContact();
//     const data = datas.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())
//     return data    
// }

// const addContact = (item) => {
//     const datas = loadContact()
//     datas.push(item)
//     fs.writeFileSync(dataPath,JSON.stringify(datas),'utf-8')
// }

// const checkDuplicate = (nama) => {
//     const contacts = loadContact();
//     return contacts.find( contact => contact.nama === nama)
// }

// const deleteContact = (nama) => {
//     const contacts = loadContact()
//     const filterContact = contacts.filter((e) => e.nama !== nama)
//     fs.writeFileSync(dataPath,JSON.stringify(filterContact))
// }

// const updateContact = (contact) => {
//     const contacts = loadContact()
//     const filterContact = contacts.findIndex((data) => data.nama === contact.oldnama)
//     const copyContact = [...contacts]
//     delete contact.oldnama
//     copyContact[filterContact] = contact
//     fs.writeFileSync(dataPath,JSON.stringify(copyContact)) 
    
// }

// module.exports = {loadContact,findContact,addContact,checkDuplicate,deleteContact,updateContact}
