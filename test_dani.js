 //let daniClient = req.body;
 //let daniCl = JSON.stringify(daniClient);
  // fs.writeFileSync('daniClient.txt',daniCl,{flag:'a'},(err)=>{console.log(err)});
   // console.log(daniCl);
  // console.log(daniClient);

  let daniBtn = JSON.stringify(btnFlag);
  console.log(daniBtn);
  console.log(typeof(daniBtn));
  console.log(typeof(btnFlag));
  console.log(req.body);

  //
  app.get('/usersid/:id',(req,res)=>{
    let userid = req.param.id;
    console.log(userid);
    let user = db.find(us=>us.id==userid)
    console.log(user);
    res.json(user);
})
app.get('/admin',(req,res)=>{
    res.sendFile(path.join(__dirname,'index_admin.html'));
  })
  app.post('/admin',(req,res)=>{
    res.sendFile(path.join(__dirname,'index_admin.html'));
  })