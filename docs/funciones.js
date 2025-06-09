import {llamarDb/* , agregarTipo */, nuevo, guardar } from "./servidorGH.js"

const $container = document.querySelector(".container");
const objeto = {};


llamarDb()

function agregarTipo(clase){
  console.log(clase)
  let tipo = document.querySelector("."+ clase + "_tipo");
  let precio1 = document.querySelector("." + clase + "_precio1");
  let precio2 = document.querySelector("." + clase + "_precio2");
  let hh1 = document.querySelector("." + clase + "_hh1");
  let hh2 = document.querySelector("." + clase + "_hh2");
  let area = document.createElement("textarea");
  let area2 = document.createElement("textarea");
  let area3 = document.createElement("textarea");
  let area4 = document.createElement("textarea");
  let area5 = document.createElement("textarea");
  let br = document.createElement("br");
  let br2 = document.createElement("br");
  let br3 = document.createElement("br");
  let br4 = document.createElement("br");
  let br5 = document.createElement("br");

  tipo.appendChild(area);
  tipo.appendChild(br);
  precio1.appendChild(area2);
  precio1.appendChild(br2);
  precio2.appendChild(area3);
  precio2.appendChild(br3);
  hh1.appendChild(area4);
  hh1.appendChild(br4);
  hh2.appendChild(area5);
  hh2.appendChild(br5);
};


const $nuevoGrupo = document.querySelector("#nuevo");
const $guardarInfo = document.querySelector("#guardar");
let clase = "";
document.addEventListener("click", (e) => {

  if(e.target.classList.contains("nuevotipo")) {
    clase = e.target.classList[1] ||"";
    console.log(e.target, clase+"_tipo");  
	 agregarTipo(clase);
  }
  // console.log(e.target);
  switch (e.target) {
    case $nuevoGrupo:
      nuevo(clase);
      break;
    case $guardarInfo:
      guardar();
      break;
  }
});

/*
const $nuevoGrupo = document.querySelector("#nuevo");
const $guardarInfo = document.querySelector("#guardar");
const $nuevoTipo = document.querySelector("#nuevotipo");
let clas = "";

document.addEventListener("click", (e) => {
  
    if (e.target === $nuevoGrupo) {
      nuevo();
    } else if (e.target === $guardarInfo) {
      guardar();
    } else if (e.target === $nuevoTipo) {
    clas = e.target.classList[0];
    console.log(e.target);  
      agregarTipo(clas);
    }
 
}); */


