const functions = require("./functions.js");

const mdLinks = (filepath, options) => {
  return new Promise((resolve, reject) => {
    //El archivo existe
    const isFileExist = functions.fileExist(filepath);
    if (isFileExist) {
      // console.log("El archivo existe");

      //Mi ruta es relavita o absoluta
      const isPathAbsolute = functions.pathAbsolute(filepath);
      let finalPath = filepath;
      if (isPathAbsolute) {
        console.log("La ruta es Absoluta");
      } else {
        //Convierte ruta relativa en absoluta
        const routeAbsolut = functions.convertPath(filepath);
        console.log("La ruta NO es absoluta");
        console.log(functions.convertPath(filepath));
        finalPath = routeAbsolut;
      }
      //Es un archivo o no
      const pathIsFile = functions.pathFile(finalPath);
      if (pathIsFile) {
        console.log("Es un archivo");
      } else {
        console.log("NO es un archivo");
      }
      //Identifica la extension md
      const isExtMd = functions.pathExt(finalPath);
      if (isExtMd === ".md") {
        console.log("El archivo es MD");
        //Lee el archivo md
        functions.readFileMd(finalPath, (err, data) => {
          if (err) {
            reject("error: ", err);
            // Recorre archivo md y extrae links con su texto y url
          } else {
            const getLinks = functions.readLinks(data, finalPath);
            //console.log(getLinks);
            //let validLinks = [];
            //let invalidLinks = [];
            if (options.validate === false){
              resolve(getLinks)
            }else {
              const linksValidate = functions.validateLinks(getLinks);
            linksValidate
              .then((results) => {
                resolve(results);
                console.log(linksValidate);
              })
              .catch((error) => {
                console.error("Error al validar los enlaces:", error);
              });
            }
            
              /*  results.forEach((result) => {
                 /* let infoAdditional = `
                text: ${result.text},
                href: ${result.href},
                status: ${result.status},
                message: ${result.message},
                file: ${result.file},
              `;*/
                //  if (result.status === 200) {
                    //console.log(
                     // `El enlace "${result.text}" es válido. Estado: ${result.status}-${result.message}\n ${infoAdditional}`
                  //  );
                  //  validLinks.push(result);
                //  } else {
                    //console.log(
                      //`El enlace "${result.text}" no es válido. Estado: ${result.status} - ${result.message}\n ${infoAdditional}`
                   // );
                   // invalidLinks.push(result);
               //   }
               // });
               // console.log("Enlaces validos:", validLinks);
               // console.log("Enlaces invalidos:", invalidLinks); 
                
                
          }
        });
      } else {
       reject("El archivo NO es MD");
      }
    } else {
      reject("El archivo NO existe");
    }
  });
};

mdLinks("./README.md", { validate: true })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log("error", error);
  });
