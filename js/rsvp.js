/* =====================================================
   RSVP.JS – Confirmación de asistencia, el juego del
   "¿estás seguro/a?" y la carta de Cony
   ===================================================== */

var vuelta = 0;   /* cuántas veces dijo "No puedo" (0 a 3) */

/* Deja la confirmación como nueva (se usa cuando otra persona elige su perfil) */
function reiniciarConfirmacion(){
  vuelta = 0;
  $("#form").hidden = false;
  $("#done").hidden = true;
  $("#ask").hidden = true;
  $("#msg").value = "";
}

/* Muestra el cuadro de "¿estás seguro/a?" según la vuelta */
function mostrarSeguro(){
  var texto = PREGUNTAS_SEGURO[vuelta - 1];
  $("#at").textContent = texto[0];
  $("#ap").textContent = texto[1];
  /* "Mejor sí voy" crece y "No puedo" se achica en cada vuelta (cambiá 0.15 y 0.2 si querés) */
  $("#ay").style.transform = "scale(" + (1 + 0.15 * vuelta) + ")";
  $("#an").style.transform = "scale(" + (1 - 0.2 * vuelta) + ")";
  $("#ask").hidden = false;
  $("#ask").scrollIntoView({ behavior: "smooth", block: "center" });
}

/* ¡Voy! -> confirma directo */
$("#yes").onclick = function(){ terminar("yes"); };

/* No puedo -> empieza el juego */
$("#no").onclick = function(){ vuelta = 1; mostrarSeguro(); };

/* "Mejor sí voy" (dentro del cuadro) -> confirma que va */
$("#ay").onclick = function(){ $("#ask").hidden = true; terminar("yes"); };

/* "No puedo" (dentro del cuadro) -> pregunta de nuevo, y la 3ra vez es de verdad */
$("#an").onclick = function(){
  if (vuelta < PREGUNTAS_SEGURO.length){ vuelta++; mostrarSeguro(); }
  else { $("#ask").hidden = true; terminar("no"); }
};

/* Cierra el formulario, muestra el resultado y guarda la respuesta.
   respuesta = "yes" (va) o "no" (no va) */
function terminar(respuesta){
  var mensaje = $("#msg").value.trim();
  $("#form").hidden = true;
  $("#done").hidden = false;
  var aviso = '<p class="note" id="sv"></p>';   /* lugar para avisar si falló el guardado */

  if (respuesta === "yes"){
    /* Sobre cerrado; al tocarlo se abre la carta */
    $("#done").innerHTML =
      '<p class="big">🎉👑🎉</p><h2>¡Lugar guardado!</h2>' +
      '<p class="sub">Tenés una carta esperándote 💌</p>' +
      '<button class="env" id="env" aria-label="Abrir carta">💌</button><div id="lt"></div>' + aviso;
    $("#env").onclick = function(){
      this.hidden = true;
      var parrafos = CARTA.map(function(p){ return "<p>" + p + "</p>"; }).join("");
      $("#lt").innerHTML = '<div class="letter">' + parrafos + '<div class="sig">' + FIRMA + '</div></div>';
    };
  } else {
    $("#done").innerHTML =
      '<p class="big">💔</p><h2>Te voy a extrañar…</h2>' +
      '<p class="sub">Gracias por avisar, ' + esc(quien) + '. ¡Te quiero igual! 💞</p>' + aviso;
  }

  /* Guardar la respuesta para que Cony la vea en su panel */
  var falla = "No pude registrar tu respuesta 🥲 avisale a Cony por otro medio.";
  if (!db){ $("#sv").textContent = falla; return; }
  db.collection("rsvps").doc(slug(quien))
    .set({ name: quien, answer: respuesta, msg: mensaje, at: Date.now() })
    .catch(function(){ $("#sv").textContent = falla; });
}
