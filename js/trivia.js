/* =====================================================
   TRIVIA.JS – Preguntas, nota del 1 al 10 y ranking
   ===================================================== */

var preguntaActual = 0;   /* número de pregunta (0 = primera) */
var aciertos = 0;         /* cuántas lleva bien */
var triviaIniciada = false;   /* true una vez que empezó (para no reiniciarla al volver desde el menú) */

function iniciarTrivia(){
  triviaIniciada = true;
  preguntaActual = 0;
  aciertos = 0;
  dibujarPregunta();
}

/* Nota final del 1 al 10 según los aciertos (mínimo 1) */
function calcularNota(){
  return Math.max(1, Math.round(aciertos / PREGUNTAS.length * 10));
}

/* Dibuja la pregunta actual, o el resultado si ya terminó */
function dibujarPregunta(){
  var cont = $("#quiz");
  $("#qn").textContent = Math.min(preguntaActual + 1, PREGUNTAS.length) + "/" + PREGUNTAS.length;
  $("#pb").style.width = (preguntaActual / PREGUNTAS.length * 100) + "%";

  /* ---- Ya respondió todo: mostrar resultado ---- */
  if (preguntaActual >= PREGUNTAS.length){
    var nota = calcularNota();
    /* Mensaje según la nota: cambiá los textos o los números si querés */
    var mensaje = nota >= 9 ? "¡Sos más CONY que yo! 👑"
                : nota >= 6 ? "¡Muy bien, nos conocemos! 💕"
                :             "Hay que ponerse al día… ¡la fiesta te va a enseñar! 🪄";
    cont.innerHTML =
      '<p class="big">🏆✨</p><h2>' + nota + ' / 10</h2><p class="sub">' + mensaje + '</p>' +
      '<h2 style="font-size:1.2rem">Ranking 🌟</h2><ul class="rank" id="rk"><li>Cargando…</li></ul>' +
      '<p class="note" id="rn"></p>' +
      '<button class="btn" id="irConfirmar">Guardar mi lugar 💌</button>';
    $("#irConfirmar").onclick = function(){ ir("s5"); };
    guardarNota(nota);
    return;
  }

  /* ---- Mostrar una pregunta con sus 3 botones ---- */
  cont.innerHTML = '<p class="q">' + (preguntaActual + 1) + '. ' + PREGUNTAS[preguntaActual][0] + '</p>';
  PREGUNTAS[preguntaActual][1].forEach(function(texto, i){
    var b = document.createElement("button");
    b.className = "opt";
    b.textContent = "abc"[i] + ") " + texto;
    b.onclick = function(){
      var correcta = RESPUESTAS_CORRECTAS[preguntaActual];
      if (correcta === null || correcta === i) aciertos++;   /* null = cualquier respuesta suma */
      preguntaActual++;
      dibujarPregunta();
    };
    cont.appendChild(b);
  });
}

/* Guarda la nota en la base compartida y muestra el ranking de todos */
function guardarNota(nota){
  /* Sin base de datos: muestra solo tu nota */
  if (!db){
    $("#rn").textContent = "El ranking compartido no está disponible en este momento 🥲";
    $("#rk").innerHTML = "<li><span>" + esc(quien) + "</span><b>" + nota + "</b></li>";
    return;
  }
  db.collection("scores").doc(slug(quien)).set({ name: quien, score: nota, at: Date.now() })
    .then(function(){
      /* onSnapshot = se actualiza solo cuando alguien más termina la trivia */
      db.collection("scores").orderBy("score", "desc").onSnapshot(function(snap){
        var html = "";
        snap.docs.forEach(function(d){
          var v = d.data();
          html += '<li class="' + (d.id === slug(quien) ? "me" : "") + '"><span>' + esc(v.name) + '</span><b>' + v.score + '/10</b></li>';
        });
        $("#rk").innerHTML = html || "<li>Sin datos</li>";
      }, function(){});
    })
    .catch(function(){
      $("#rn").textContent = "No pude guardar tu puntaje 🥲";
      $("#rk").innerHTML = "<li><span>" + esc(quien) + "</span><b>" + nota + "</b></li>";
    });
}
