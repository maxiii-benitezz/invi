/* =====================================================
   NAVEGACION.JS – Perfiles y cambio de pantallas
   ===================================================== */

var pantallaActual = "s0";   /* pantalla que se está viendo (empieza en la portada) */

/* ---------- MENÚ DE SECCIONES ----------
   ORDEN = las pantallas del menú, de la primera a la última.
   maxAlcanzada = hasta qué pantalla llegó la persona (0 = solo Inicio).
   Solo se pueden tocar las secciones hasta esa: se puede volver atrás,
   pero no saltearse una que todavía no visitó. */
var ORDEN = ["s1","s2","s3","s4","s5"];
var maxAlcanzada = 0;

/* Muestra/oculta el menú y marca qué botones están activos o bloqueados */
function actualizarMenu(){
  /* No se muestra en la portada ni en la elección de perfil (no hay a dónde volver) ni en el panel de Cony */
  $("#nav").hidden = (pantallaActual === "s0" || pantallaActual === "s1" || pantallaActual === "s6");
  document.querySelectorAll("#nav button").forEach(function(b){
    var i = ORDEN.indexOf(b.dataset.nav);
    b.disabled = i > maxAlcanzada;                              /* bloqueada si todavía no llegó */
    b.classList.toggle("on", b.dataset.nav === pantallaActual); /* resalta la actual */
  });
}

/* Al tocar un botón del menú, va a esa sección */
document.querySelectorAll("#nav button").forEach(function(b){
  b.onclick = function(){ ir(b.dataset.nav); };
});
$("#np").textContent = "🎵 " + PISTAS.s0[1];

/* Muestra una pantalla por su id ("s1", "s2"...).
   Si "forzarMusica" es true, arranca la música (pasa al elegir perfil). */
function ir(id, forzarMusica){
  document.querySelectorAll(".screen").forEach(function(s){ s.classList.remove("on"); });
  $("#" + id).classList.add("on");
  pantallaActual = id;
  window.scrollTo(0, 0);

  /* Desbloquea esta sección en el menú si es la más avanzada hasta ahora */
  var pos = ORDEN.indexOf(id);
  if (pos > maxAlcanzada) maxAlcanzada = pos;
  actualizarMenu();

  /* Actualiza el nombre de la canción en el reproductor */
  $("#np").textContent = "🎵 " + PISTAS[id][1];

  /* Si ya estaba sonando música (o se fuerza), pone la canción de esta pantalla */
  var estabaSonando = audioActivo && !audioActivo.paused;
  if (estabaSonando || forzarMusica) {
    var audioNuevo = $("#" + PISTAS[id][0]);
    if (audioNuevo !== audioActivo || audioNuevo.paused) reproducirActual();
  }

  /* Al entrar a la trivia por primera vez, empieza de cero.
     Si ya la había hecho y vuelve desde el menú, la ve como la dejó (no se puede repetir). */
  if (id === "s4" && !triviaIniciada) iniciarTrivia();
}

/* Botón "Comenzar" de la portada: arranca la música y pasa a elegir perfil.
   ir("s1", true) -> el "true" fuerza el play, y como viene de un toque
   de la persona, Chrome y Safari lo permiten. */
$("#comenzar").onclick = function(){ ir("s1", true); };

/* Botones con data-go="sX": llevan a esa pantalla */
document.querySelectorAll("[data-go]").forEach(function(b){
  b.onclick = function(){ ir(b.dataset.go); };
});

/* ---------- Crear los botones de perfil ---------- */
var grilla = $("#grid");
NOMBRES.forEach(function(nombre, i){
  var b = document.createElement("button");
  b.className = "profile";
  b.innerHTML = '<span class="av">' + ICONOS[i % ICONOS.length] + '</span>' + nombre;
  b.onclick = function(){
    /* Si elige a otra persona distinta, se reinicia todo el recorrido */
    if (nombre !== quien){
      maxAlcanzada = 0;
      triviaIniciada = false;
      reiniciarConfirmacion();
    }
    quien = nombre;                                           /* guarda el nombre */
    try { sessionStorage.setItem("cony_who", nombre); } catch (e) {}
    mostrarNombre();
    ir("s2", true);                                           /* pasa a la pantalla 2 y arranca música */
  };
  grilla.appendChild(b);
});

mostrarNombre();
