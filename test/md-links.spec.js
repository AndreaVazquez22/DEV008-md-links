const { fileExist, pathAbsolute, convertPath, pathExt, pathFile } = require("../functions.js");
const functions = require("../functions.js");

describe("fileExist", () => {
  it("should return true if the file exists", () => {
    expect(functions.fileExist("./README.md")).toBe(true);
  });

  it("should return false if the file does not exist", () => {
    expect(functions.fileExist("./READMEE.md")).toBe(false);
  });
});

describe("pathAbsolute", () => {
  it("should return true if the path is absolute", () => {
    expect(functions.pathAbsolute("C:\\Users\\Lenovo ThinkPad E580\\Documents\\Laboratoria\\DEV008-md-links\\README.md")).toBe(true);
  });
  
  it("should return false if the path is relative", () => {
    expect(functions.pathAbsolute(".README.md")).toBe(false);
  });
});

describe("convertPath", () => {
  it("should convert a relative path to an absolte path", () => {
    const relativePath = "./README.md";
    const absolutePath = functions.convertPath(relativePath);
    expect(absolutePath).toMatch(/^[A-Z]:\\.*\\/i);
    expect(absolutePath).toContain("C:\\Users\\Lenovo ThinkPad E580\\Documents\\Laboratoria\\DEV008-md-links\\README.md");
  });
});


describe("pathExt",  () => {
  it("should return the extension of a file", () => {
    expect(functions.pathExt("./README.txt")).toBe(".txt");
    expect(functions.pathExt("./README.md")).toBe(".md");
  });
});

describe("pathFile", () => {
  it("should return true if the path is a file", () => {
    expect(functions.pathFile("./README.md")).toBe(true);
  });

  it("should return false if the path is not a file", () => {
    expect(functions.pathFile("C:\\Users\\Lenovo ThinkPad E580\\Documents\\Laboratoria\\DEV008-md-links\\")).toBe(false);
  });
});

 describe("readFileMd", () => {
  it("should read a md file", () => {
    functions.readFileMd("C:\\Users\\Lenovo ThinkPad E580\\Documents\\Laboratoria\\DEV008-md-links\\test\\Prueba.md", (_, data) => {
    expect(data).toBe("* [Crear módulos en Node.js](https://docs.npmjs.com/getting-started/publishing-npm-packages)");
    
    });
  });
 });

 describe("readLinks", () => {
  it("should return an array", () => {
    const path = "C:\\Users\\Lenovo ThinkPad E580\\Documents\\Laboratoria\\DEV008-md-links\\test\\Prueba.md";
    functions.readFileMd(path, (_, data) => {
     expect(Array.isArray(functions.readLinks(data, path))).toBe(true)
    });
  
  });
 });
