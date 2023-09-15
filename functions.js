const fs = require("fs");
const path = require("path");
const http = require("http");

const fileExist = (filepath) => {
  return fs.existsSync(filepath);
};

//Saber si la ruta es absoluta
const pathAbsolute = (filepath) => {
  return path.isAbsolute(filepath);
};

//Convierte ruta relativa en absoluta
const convertPath = (filepath) => {
  return path.resolve(filepath);
};

//Funcion para sacar extensión
const pathExt = (filepath) => {
  return path.extname(filepath);
};

//Saber si es un archivo
const pathFile = (filepath) => {
  return fs.statSync(filepath).isFile();
};

//Saber si es un directivo
/*const directoryPath = (filepath) => {
  return fs.statSync(filepath).isDirectory();
};*/

//Lee el archivo md
const readFileMd = (filepath, callback) => {
  return fs.readFile(filepath, "utf-8", callback);
};

//Lee los links que hacen match con la expresión regular creando un array (allLinks)
const readLinks = (textData, filepath) => {
  const fullLinkOnlyRegex = /\[[^\[\]]*\]\((http|https):\/\/[^\(\)]+\)/g;
  const allLinks = textData.match(fullLinkOnlyRegex);
  //Recorre array allLinks y con método exec busca coincidencia sobre singleMatch
  const singleMatch = /\[([^\[]+)\]\((.*)\)/;
  const result = [];

  for (let i = 0; i < allLinks.length; i++) {
    let text = singleMatch.exec(allLinks[i]);
    if (text) {
      result.push({
        //completeLink: text[0],
        textLink: text[1],
        url: text[2],
        file: filepath,
      });
    }
  }
  return result;
};

const validateLinks = (links) => {
    /*map es un método que itera sobre un arreglo y aplica la función a cada elemento del arreglo
    para crear un nuevo arreglo con los nuevos elementos obtenidos*/
const linkPromise = links.map((link) => {
     //fetch metodo para solicitud HTTP GET por defecto a cada URL especifica 
     // RESPONSE objeto que contiene info de la respuesta del servidor//
    return fetch(link.url).then((response) => {
      return {
        text: link.textLink,
        href: link.url,
        status: response.status,
        message: response.statusText,
        file: link.file,
      };
    })  .catch(error => {
        // Captura y maneja errores de conexión u otros errores
        return {
          text: link.textLink,
          href: link.url,
          status: error.status, // Puedes establecer un estado personalizado en caso de error
          message: error.message,
          file: link.file,
        };
      });
  });
  return Promise.all(linkPromise);
};

module.exports = {
  fileExist,
  pathAbsolute,
  pathExt,
  pathFile,
  //directoryPath,
  convertPath,
  readFileMd,
  readLinks,
  validateLinks,
};
