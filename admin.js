
let daniRegistre = fetch('/db/db_data.txt')
.then(response => response.text())
.then(text => {
     let aa = text;
    console.log('aa = ',aa)})
    console.log(daniRegistre);
    console.log(aa);