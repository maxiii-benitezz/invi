/* =====================================================
   MUSICA.JS – Reproductor de la barra de abajo
   ===================================================== */

var silenciado = false;     /* ¿está en mute? */
var audioActivo = null;     /* el <audio> que está sonando ahora */
var audios = ["a1","a2","a3"].map(function(id){ return $("#" + id); });

/* Cambia el botón (▶ / ⏸) y activa/desactiva las barritas animadas */
function actualizarBoton(sonando){
  $("#pp").textContent = sonando ? "⏸" : "▶";
  $("#player").classList.toggle("playing", sonando);
}

/* Reproduce la canción que corresponde a la pantalla actual y frena las otras */
function reproducirActual(){
  var pista = PISTAS[pantallaActual];
  var audio = $("#" + pista[0]);
  audios.forEach(function(a){ if (a !== audio) a.pause(); });
  audioActivo = audio;
  audio.muted = silenciado;
  $("#np").textContent = "🎵 " + pista[1];
  var p = audio.play();
  /* Si el navegador bloquea el audio o falta el mp3, el botón queda en ▶ sin romper nada */
  if (p && p.then) p.then(function(){ actualizarBoton(true); }).catch(function(){ actualizarBoton(false); });
}

/* Botón ▶ / ⏸ */
$("#pp").onclick = function(){
  var audio = audioActivo || $("#" + PISTAS[pantallaActual][0]);
  if (audio.paused) reproducirActual();
  else { audio.pause(); actualizarBoton(false); }
};

/* Botón 🔊 / 🔇 */
$("#nx").onclick = function(){
  silenciado = !silenciado;
  audios.forEach(function(a){ a.muted = silenciado; });
  this.textContent = silenciado ? "🔇" : "🔊";
};
