let express = require('express');
let path= require('path');
let fs= require('fs');
let app = express();
//let admin = require('./admin');
let db =[];
let daniRegister = '';
var daniRegisterArrFull=[]; // масив що буде містити всі дані про користувачів що зареєструвались
// підключення статичних файлів - .css , .js, .jpg 
app.use('/db',express.static(path.join(__dirname, 'db')));
app.use('/js',express.static(path.join(__dirname, 'js')));
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use('/img',express.static(path.join(__dirname, 'img')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.get('/',(req,res)=>{
   res.sendFile(path.join(__dirname,'index.html'));
   //  res.end('main...')

});
app.post('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
    //  res.end('main...')
    let btnFlag = req.body;
    let btnName='';
    for (const key in btnFlag) {
        btnName = key;
    }
   if (btnName =='btn_register'){
    res.redirect('/register')
   }
   if (btnName =='btn_input'){
    res.redirect('/user');
    
   }
 });
 app.get('/register',(req,res)=>{
    res.sendFile(path.join(__dirname,'index_register.html'));
  //  res.end('User...');
});
app.post('/register',(req,res)=>{
    res.sendFile(path.join(__dirname,'index_register.html'));
    const {firstname , lastname, emeil,login, password } = req.body;
    const dbDani = {
        firstname,
        lastname,
        emeil,
        login,
        password,
        id: db.length+1
    }
    db.push(dbDani);
    // перевіряємо чи файл в якому містяться дані про користувачів пустий чи в ньому є якась інформація , якщо так то визначаємо кількість користувачів про яких є дані
    let daniControl = fs.readFileSync('./db/db_data.txt','utf8', function(err) {
      console.log(err);});
      if (daniControl !=' '){
        daniControlReg = daniControl.split('&');
        daniControlReg.pop();
        dbDani.id = daniControlReg.length;
      }
    // записуємо дані користувача до файлу де зберігаються дані всіх зареєстрованих користувачів
    fs.writeFileSync('./db/db_data.txt',dbDani.id+' '+dbDani.firstname+' '+dbDani.lastname+' '+dbDani.emeil+' '+dbDani.login+' '+dbDani.password+'&',{flag:'a'},function(err){
      console.log(err);
    });
})
app.get('/user',(req,res)=>{
    res.sendFile(path.join(__dirname,'index_user.html'));
  //  res.end('User...');
})
app.post('/user',(req,res)=>{
    //  res.sendFile(path.join(__dirname,'index_user.html'));
    const {login, password } = req.body;
    const dbDaniInput = {
        login,
        password
    }
    console.log('req.body = ',req.body);
    // зчитуємо дані що знаходяться в файлі db_data.txt
    daniRegister = fs.readFileSync('./db/db_data.txt','utf8', function(err) {
      console.log(err);});
      // обробка даних користувача що знаходяться в файлі db_data.txt
    let daniRegisterArr = daniRegister.split('&');
    daniRegisterArr.forEach((value)=>{
      daniRegisterArrFull.push(value.split(' '));
    });
    daniRegisterArrFull.pop();
    if (login == 'admin' && password == 'admin'){
      res.redirect('/admin');
    } else { 
      for(let value = 0; value<daniRegisterArrFull.length;value++){
          if (daniRegisterArrFull[value][4] == login && daniRegisterArrFull[value][5] == password){
            res.redirect('/network');
             break;
             };
    console.log(value[4]+' '+value[5]);
    }};
    console.log(dbDaniInput);
    console.log(daniRegisterArrFull);
});

app.get('/network',(req,res)=>{
  res.sendFile(path.join(__dirname,'index_network.html'));
})
app.get('/admin',(req,res)=>{
  res.sendFile(path.join(__dirname,'index_admin.html'));
});

app.listen(3000,(err)=>{
    if (err) console.log('Error Server listen port 3000');
    console.log('Listening express ...');
})
