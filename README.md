# Markdown Links

## Índice

* [1. Introducción](#1-introducción)
* [2. Diagrama de Flujo  ](#2-diagrama-de-flujo)
* [3. Resumen del programa](#3-resumen-del-programa)
* [4. Consideraciones generales](#4-consideraciones-generales)
* [5. Criterios de aceptación mínimos del proyecto](#5-criterios-de-aceptación-mínimos-del-proyecto)
* [6. Entregables](#6-entregables)
* [7. Hacker edition](#7-hacker-edition)
* [8. Pistas, tips y lecturas complementarias](#8-pistas-tips-y-lecturas-complementarias)
* [9. Checklist](#9-checklist)
* [10. Achicando el problema](#10-achicando-el-problema)

***

## 1. Introducción


[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).


MDLinks es un programa que se ejecuta a través de Node.js para poder leer archivos en formato Markdown el cual a su vez contiene links (vínculos/ligas) , este programa es capaz de identificar cada uno de los links encontrados y poder verificar el status de cada uno para que el usuario pueda saber si este se encuentra roto o sigue siendo valido. Esto es de suma importancia para no restarle valor a la información.


## 2. Diagrama de Flujo 


![Diagrama de Flujo](/images/diagrama-flujo-mdlinks.jpg)<br>

## 3. Resumen del programa

MDLinks es una libreria en JavaScript la cual permite al usuario ejecutarla a través de Node.js esto quiere decir que el usuario va interactuar con el sistema de archivos y realizar consultas de red entre otras.

API

Contiene la función mdLinks y sus opciones son *validate: true* o *validate: false* cada que se ejecuta el programa en consola se retorna un objeto que contiene información de detalla sobre los links y sus status, este objeto varia dependiendo si las opción cambia entre *true* y *false*.

*1.- Validate:false* 

href: URL encontrada.<br>
text: Texto que aparecía dentro del link (<a>).<br>
file: Ruta del archivo donde se encontró el link.<br>

![Validate False](/images/validate-false.png)


*2.-Validate:true*

href: URL encontrada.<br>
text: Texto que aparecía dentro del link (<a>).<br>
file: Ruta del archivo donde se encontró el link.<br>
status: Código de respuesta HTTP.<br>
statusText: Mensaje fail,Not Found,Internal Server Error,Bad Request,Forbidden,etc en caso de fallo u ok,No Content,etc en caso de éxito. <br>

![Validate False](/images/validate-true.png)

