/* =====================================================
   PANEL.JS – Panel de Cony: quién confirmó y quién falta
   Se abre agregando  #lista  al final del link de la invitación.
   ===================================================== */

/* Dibuja el panel y lo mantiene actualizado en vivo */
function mostrarPanel(){
  document.querySelectorAll(".screen").forEach(function(s){ s.classList.remove("on"); });
  $("#s6").classList.add("on");
  $("#nav").hidden = true;   /* el menú no se usa en el panel */

  if (!db){
    $("#admin").innerHTML = '<p class="sub">Abrí este link logueada en tu cuenta de Claude 🔒</p>';
    return;
  }

  db.collection("rsvps").orderBy("at", "desc").onSnapshot(function(snap){
    var van = [], noVan = [], respondieron = {};
    snap.docs.forEach(function(d){
      var v = d.data();
      respondieron[d.id] = true;
      (v.answer === "yes" ? van : noVan).push(v);
    });
    /* Perfiles de la lista que todavía no respondieron */
    var faltan = NOMBRES.filter(function(n){ return !respondieron[slug(n)]; });

    /* Una fila por persona, con su mensaje si dejó uno */
    function fila(v){
      return '<li><span><b>' + esc(v.name) + '</b>' +
        (v.msg ? '<br><small>💌 ' + esc(v.msg) + '</small>' : '') + '</span>' +
        '<span class="tag ' + (v.answer === "yes" ? "y" : "n") + '">' + (v.answer === "yes" ? "Va" : "No va") + '</span></li>';
    }

    $("#admin").innerHTML =
      '<h2>Confirmaciones 👑</h2>' +
      '<p class="sub">✅ ' + van.length + ' · ❌ ' + noVan.length + ' · ⏳ ' + faltan.length + '</p>' +
      '<ul class="rank">' + van.map(fila).join("") + noVan.map(fila).join("") + '</ul>' +
      '<div class="card"><h3>Faltan responder ⏳</h3><p>' + (faltan.map(esc).join(", ") || "¡Nadie! 🎉") + '</p></div>';
  }, function(){
    $("#admin").innerHTML = '<p class="sub">Solo Cony puede ver esta lista 🔒</p>';
  });
}

/* db.js llama a esta función cuando la conexión está lista */
function alConectarDb(){ if (location.hash === "#lista") mostrarPanel(); }

/* Si cambia el link a #lista estando ya abierta la página */
window.addEventListener("hashchange", function(){ if (location.hash === "#lista") mostrarPanel(); });
