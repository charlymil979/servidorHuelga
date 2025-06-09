import { Octokit } from "https://esm.sh/@octokit/core";

/* const octokit = new Octokit({
  //   auth: "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",
  auth: "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",
}); */

let datosJson = "";
const $container = document.querySelector(".container");
const objeto = {};
let datosGuardados = "";

export async function llamarDb() {
  try {
	  const getResponse = await fetch("https://charlymil979.github.io/servidorHuelga/BIN-db.json")
    // 1. Leer el archivo actual
    /* const getResponse = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner: "charlymil979",
        repo: "Huelga-menu",
        path: "docs/BIN-db.json",
      }
    ); */

	  
    // Decodificar el contenido desde Base64 (usando atob)
    // console.log(getResponse);
    // const content = atob(getResponse.data.content); 

     // const data = JSON.parse(content);
const data = await getResponse.json();
    console.log(data);
   //  const dataCruda = await getResponse.json();
   //  console.log("Contenido decodificado:", dataCruda);
   //  const data = dataCruda.menu;

    // console.log("Contenido:", data);

    let datos = {};

    let $seccion = "",
      $info = "",
      $tipos,
      $precio1,
      $precio2,
      $hh1,
      $hh2,
      $uno,
      clase = "A",
      datosGuardados,
      $dos;

    for (const key in data) {
      // console.log("key", key);
      if (key != "id") {
        for (const articulo in data[key]) {
          datos = data[key][articulo];
          $tipos = "";
          $precio1 = "";
          $precio2 = "";
          $hh1 = "";
          $hh2 = "";
          // console.log(datos[2])
          datos[2].forEach((element) => {
            // console.log(element);
            $tipos += `
            <textarea>${element[0]}</textarea></br>
            `;
            $precio1 += `<textarea>${element[1]}</textarea></br>`;
            $precio2 += `<textarea>${element[2]}</textarea></br>`;
            $hh1 += `<textarea>${element[3]}</textarea></br>`;
            $hh2 += `<textarea>${element[4]}</textarea></br>`;
          });
          let clase = datos[0].replaceAll(/[ *]/g, "");
          // console.log($tipos);
          // console.log(datos[0]);
          // console.log(datos[1]);
          // console.log(datos[2][0][0]);
          // console.log(datos[2][0][1]);
          $info += `
            <tr>
            <td class="${clase}"><textarea>${key}</textarea></td>
            <td class="${clase}"><textarea>${datos[0]}</textarea></td>
            <td class="${clase}"><textarea>${datos[1]}</textarea></td>
            <td class="${clase} ${clase}_tipo">${$tipos}</td>
            <td class="${clase} ${clase}_precio1">${$precio1}</td>
            <td class="${clase} ${clase}_precio2">${$precio2}</td>
            <td class="${clase} ${clase}_hh1">${$hh1}</td>
            <td class="${clase} ${clase}_hh2">${$hh2}</td>
            <td class = "boton"><button class="nuevotipo ${clase}">nuevo tipo</button></td>
            </tr>
            `;
        }
      }
    }
    $container.innerHTML = $info;
    return getResponse;
  } catch (error) {
    console.error("Error al actualizar el archivo:", error);
  }
}

export function nuevo(clase) {
  let $nuevo = document.createElement("tr");
  $nuevo.innerHTML = `
            <td class="${clase}"><textarea></textarea></td>
            <td class="${clase}"><textarea></textarea></td>
            <td class="${clase}"><textarea></textarea></td>
            <td class="${clase} ${clase}_tipo"><textarea></textarea></td>
            <td class="${clase} ${clase}_precio1"><textarea></textarea></td>
            <td class="${clase} ${clase}_precio2"><textarea></textarea></td>
            <td class="${clase} ${clase}_hh1"><textarea></textarea></td>
            <td class="${clase} ${clase}_hh2"><textarea></textarea></td>
            <td><button class="nuevotipo ${clase}">nuevo tipo</button></td>
            `;
  // console.log($nuevo);
  $container.appendChild($nuevo);
  clase = clase + "A";
  // console.log("clase", clase);
  window.scrollTo(0, document.documentElement.scrollHeight);
}

function previsualizar() {
  let datosFinales = [];
  let $rows = document.querySelector("table");
  let filas = $rows.querySelectorAll("tr");
  filas.forEach((fila) => {
    let celdas2 = [];
    const celdas = fila.querySelectorAll("textarea");
    celdas.forEach((celda) => {
      // console.log(celda)
      celdas2.push(celda.value);
    });
    datosFinales.push(celdas2);
  });
  //   console.log("datosFinales", datosFinales);

  for (const key in datosFinales) {
    //  console.log(datosFinales[key]);
    if (datosFinales[key].length > 0) {
      let seccion = datosFinales[key][0];
      let long = datosFinales[key].length;

      let tipos = (long - 3) / 5;
      // Long-3 xq key0=grupo, key1=nombre, key2=descripcion
      // /5 xq son 5 valores= tipo, precio1, precio2, hh1, hh2

      let arreglo = [];
      for (let index = 1; index < 3; index++) {
        arreglo.push(datosFinales[key][index]);
      }
      // console.log("arreglo",arreglo)

      let arreglo2 = [];
      for (let ind = 3; ind < long - 4 * tipos; ind++) {
        /*   console.log(
				datosFinales[key][ind],
				datosFinales[key][ind + tipos],
				datosFinales[key][ind + 2 * tipos]
				); */
        if (datosFinales[key][ind] != "") {
          arreglo2.push([
            datosFinales[key][ind],
            datosFinales[key][ind + tipos],
            datosFinales[key][ind + 2 * tipos],
            datosFinales[key][ind + 3 * tipos],
            datosFinales[key][ind + 4 * tipos],
          ]);
          // console.log("arreglo2",arreglo2)
        }
        //   console.log(arreglo2);
      }
      arreglo.push(arreglo2);
      // console.log(arreglo);
      // console.log(arreglo);
      // console.log(seccion);
      let vacio = false;
      if (!objeto[seccion]) {
        objeto[seccion] = [];
      }
      arreglo.forEach((e) => {
        if (e === "") return (vacio = true);
      });
      if (!vacio) {
        objeto[seccion].push(arreglo);
      }
    }
  }
  return datosJson=objeto
//   console.log(objeto);
}

/* export async function guardar() {
  try {
    previsualizar();
    datosGuardados = objeto;
     console.log(datosGuardados);
    const response = await fetch("http://localhost:3000/menu", {
      method: "POST", // Usamos POST para enviar datos
      headers: {
        "Content-Type": "application/json", // Le decimos al servidor que enviamos JSON
      },
      body: JSON.stringify(datosGuardados), // Convertimos el objeto JS a una cadena JSON
    });
    const result = await response.json();

	 if (result.success) {
     mensajeDiv.textContent =
       result.message + " Datos actualizados: " + JSON.stringify(result.data);
     mensajeDiv.className = "success";
     nuevoMensajeInput.value = ""; // Limpiar el campo
     nuevaVersionInput.value = ""; // Limpiar el campo
 
   } else {
     mensajeDiv.textContent = "Error: " + result.message;
     mensajeDiv.className = "error";
   }
    jsonData = datosGuardados; // Cambia esto según tus necesidades
    console.log("Contenido modificado:", jsonData);

    // 3. Subir el archivo actualizado

    console.log("Archivo actualizado con éxito:", updateResponse.data);
   //  location.reload();
  } catch (error) {
    console.error("Error al actualizar el archivo:", error);
  }
} */
export async function guardar() {
  try {
    previsualizar();
    datosGuardados = objeto;
    //  console.log(datosGuardados);
    // 1. Leer el archivo actual
    const getResponse = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner: "charlymil979",
        repo: "Huelga-menu",
        path: "docs/BIN-db.json",
      }
    );
    // Decodificar el contenido desde Base64 (usando atob)
    const content = atob(getResponse.data.content);
    let jsonData = JSON.parse(content);
    console.log(jsonData);

    // 2. Modificar el contenido
    jsonData = datosGuardados; // Cambia esto según tus necesidades
    console.log("Contenido modificado:", jsonData);

    // 3. Subir el archivo actualizado
    const updateResponse = await octokit.request(
      "PUT /repos/{owner}/{repo}/contents/{path}",
      {
        owner: "charlymil979",
        repo: "Huelga-menu",
        path: "docs/BIN-db.json",
        message: "Actualizar archivo JSON",
        content: btoa(JSON.stringify(jsonData, null, 2)), // Codifica el nuevo contenido en Base64
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
        sha: getResponse.data.sha, // Necesario para actualizar el archivo
      }
    );

    console.log("Archivo actualizado con éxito:", updateResponse.data);
    location.reload();
  } catch (error) {
    console.error("Error al actualizar el archivo:", error);
  }
}
