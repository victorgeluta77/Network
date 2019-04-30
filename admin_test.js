//function inputRegister(a){
//   console.log('a=',a); }
//module.exports.inputRegister = inputRegister;

// fetch('/db/db_data.txt')
 // .then(response => response.text())
 // .then(text => console.log(text))
  // outputs the content of the text file
let daniRegistre = '';
  const logFileText = async file => {
    const response = await fetch(file)
    const text = await response.text()
    console.log(text);
    daniRegistre = text;
}
console.log(daniRegistre);
   logFileText('/db/db_data.txt')

   let daniRegistre = '';
   let logFileText = async file => {
   const response = await fetch(file)
   const text = await response.text()
   console.log(text);
   return text;
}
    let daniRegister =logFileText('/db/db_data.txt');
    console.log(daniRegistre);