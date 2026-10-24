/* =====================================================
   DB.JS – Conexión para GUARDAR datos compartidos
   (ranking de trivia y confirmaciones de asistencia)

   ⚠️ Esto SOLO funciona cuando la página está publicada como
   Artifact de Claude (ahí existe "window.claude"). Si abrís los
   archivos en tu compu o en otro hosting, "db" queda en null:
   la invitación funciona igual, pero no guarda ni muestra ranking.
   ===================================================== */

var db = null;   /* null = no hay base de datos disponible */

try {
  if (window.claude && claude.use) {
    claude.use("db").then(function(d){
      db = d;
      /* Avisa a panel.js que ya hay conexión (por si abriste #lista) */
      if (typeof alConectarDb === "function") alConectarDb();
    }).catch(function(){});
  }
} catch (e) {}
