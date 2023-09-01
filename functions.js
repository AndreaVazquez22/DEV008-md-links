const fs = require("fs");
const path = require("path");

const fileExist = (filepath) => {
  return fs.existsSync(filepath);
};

const pathAbsolute = (filepath) => {
  return path.isAbsolute(filepath);
};
const covertPath = (filepath) => {
  return path.resolve(filepath);
};
const pathExt = (filepath) => {
  return path.extname(filepath);
};

const pathFile = (filepath) => {
  return fs.statSync(filepath).isFile();
};

const directoryPath = (filepath) => {
  return fs.statSync(filepath).isDirectory();
};

const readFileMd = (filepath, callback) => {
  return fs.readFile(filepath, "utf-8", callback);
};

const readLinks = (textData) => {
  const fullLinkOnlyRegex = /\[[^\[\]]*\]\((http|https):\/\/[^\(\)]+\)/g;
  const allLinks = textData.match(fullLinkOnlyRegex);
  const singleMatch = /\[([^\[]+)\]\((.*)\)/;
  const result = [];

  for (let i = 0; i < allLinks.length; i++) {
    let text = singleMatch.exec(allLinks[i]);
    if (text) {
      result.push({
        completeLink: text[0],
        textLink: text[1],
        url: text[2],
      });
    }
  }

  let output = [];
  result.forEach((link) => {
    output += "Texto: " + link.textLink + "\n";
    output += "URL: " + link.url + "\n\n";
  });

  return output;
};

module.exports = {
  fileExist,
  pathAbsolute,
  pathExt,
  pathFile,
  directoryPath,
  covertPath,
  readFileMd,
  readLinks,
};
