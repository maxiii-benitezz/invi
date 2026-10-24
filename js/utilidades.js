/* =====================================================
   UTILIDADES.JS – Funciones chiquitas que usan los demás archivos
   ===================================================== */

/* $("#id") = atajo para buscar un elemento de la página */
function $(selector){ return document.querySelector(selector); }

/* Convierte un nombre en un código simple: "Rochi" -> "rochi".
   Se usa como identificador al guardar datos (así cada persona tiene un solo registro). */
function slug(nombre){ return nombre.toLowerCase().replace(/[^a-z0-9]/g, ""); }

/* Escapa texto antes de mostrarlo como HTML (evita que alguien meta código raro en su mensaje) */
function esc(texto){
  var d = document.createElement("span");
  d.textContent = (texto == null ? "" : texto);
  return d.innerHTML;
}

/* Perfil elegido (se recuerda mientras la pestaña esté abierta) */
var quien = "";
try { quien = sessionStorage.getItem("cony_who") || ""; } catch (e) {}

/* Escribe el nombre elegido en todos los lugares con class="who" */
function mostrarNombre(){
  document.querySelectorAll(".who").forEach(function(el){ el.textContent = quien; });
}
