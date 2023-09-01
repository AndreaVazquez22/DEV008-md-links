const functions = require("./functions.js");

const mdLinks = () => {
  const filepath = "C:\\Users\\Lenovo ThinkPad E580\\Documents\\Laboratoria\\DEV008-md-links\\README.md";
  const isFileExist = functions.fileExist(filepath);
  if (isFileExist) {
    console.log("El archivo existe");

    const isPathAbsolute = functions.pathAbsolute(filepath);
    let finalPath = filepath;
    if (isPathAbsolute) {
      console.log("La ruta es Absoluta");
    } else {
      const routeAbsolut = functions.covertPath(filepath);
      console.log("La ruta NO es absoluta");
      console.log(functions.covertPath(filepath));
      finalPath = routeAbsolut;
    }

    const pathIsFile = functions.pathFile(finalPath);
    if (pathIsFile) {
      console.log("Es un archivo");
    } else {
      console.log("NO es un archivo");
    }

    const isExtMd = functions.pathExt(finalPath);
    if (isExtMd === ".md") {
      console.log("El archivo es MD");

      functions.readFileMd(finalPath, (err, data) => {
        if (err) {
          console.log("error: ", err);
        } else {
          const getLinks = functions.readLinks(data);
          console.log(getLinks);
          
        }
      });
    } else {
      console.log("El archivo NO es MD");
    }
  } else {
    console.log("El archivo NO existe");
  }
};
mdLinks();
