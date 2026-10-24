/* =====================================================
   CONFIG.JS – TODO LO QUE PODÉS EDITAR SIN TOCAR CÓDIGO
   Acá están los nombres, la trivia, las canciones y la carta.
   ===================================================== */

/* ---------- PERFILES ----------
   Cada nombre es un botón en la primera pantalla.
   Para agregar a alguien: sumá su nombre entre comillas, con coma. */
var NOMBRES = ["Kechu","July","Juan","Máximo","Pili","Vicky","Luci","Celi","Roman","Dari","Benja","Mate","Rochi","Pila","Luli","Delfi","Sofi","Cate"];

/* Emojis que se reparten entre los perfiles (se repiten en orden) */
var ICONOS = ["👑","💓","💞","💕","🥳","🤩","💋","🥂","💌","🪄","🧸","✨","💫","🌟"];

/* ---------- MÚSICA ----------
   Para cada pantalla: [id del <audio> en index.html, texto que se muestra] */
var PISTAS = {
  s0: ["a1", "Welcome to New York – Taylor Swift"],
  s1: ["a1", "Welcome to New York – Taylor Swift"],
  s2: ["a1", "Welcome to New York – Taylor Swift"],
  s3: ["a2", "Comprame un brishito – Lali"],
  s4: ["a2", "Comprame un brishito – Lali"],
  s5: ["a3", "Daylight – Taylor Swift"]
};

/* ---------- TRIVIA ----------
   Cada pregunta: [ "texto", [opción a, opción b, opción c] ] */
var PREGUNTAS = [
  ["Mi cantante favorito es:", ["Taylor Swift","One Direction","Dillom"]],
  ["Mi serie favorita es:", ["Sex and the City","Envidiosa","Rebelde Way"]],
  ["Mi frase favorita de la canción MADISON:", [
    "Pedazos de loro un par se regalan pero yo los decoro",
    "Saludo por el carro y me siento Perón, estoy buscando a mi Evita",
    "Nos reciben con luces, botellas y bengalas, se nos pegan par de nenas malas"]],
  ["Mi frase favorita de Wanda Nara:", [
    "De mi familia me encargo yo, de las putitas… la vida misma.",
    "Otra familia que te cargaste por zorra!",
    "Te habla la mafilia rey (Otra poesía - elegante)"]],
  ["Dentro de la farándula argentina, ¿cuál es mi momento favorito?", [
    "No metas a tu abuela muerta en esto Silvina Escupidero! (Moria Casán contra Silvina Escudero)",
    "Mamá cortaste toda la luz! (Ricky Fort y su mamá)",
    "¡Yo soy Ariana Grande! (El vivo de Anto Pane y Kiara Acosta)"]],
  ["Mi manera favorita de demostrarte amor es…", ["Una carta","Un regalo","Compañía"]],
  ["¿Qué es aquello que mueve mi corazón?", [
    "El amor; en cada faceta, la música, la educación.",
    "La antropología, la escritura y la fe",
    "Todas las anteriores"]]
];

/* ---------- RESPUESTAS CORRECTAS ----------
   Una por pregunta, en el mismo orden: 0 = a, 1 = b, 2 = c.
   null = "cualquier respuesta suma" (completalas con los números reales).
   La nota final se calcula del 1 al 10 según cuántas acierten. */
var RESPUESTAS_CORRECTAS = [0, 2, 1, 0, 0, 0, 2];

/* ---------- "NO PUEDO": LAS 3 VECES QUE SE LO PREGUNTA ---------- */
var PREGUNTAS_SEGURO = [
  ["¿Estás seguro/a? 🥺", "Mirá que va a haber candy bar…"],
  ["¿Pero seguro/a seguro/a? 😭", "Pensalo bien: hay brillos, tacos y mesa dulce 💫"],
  ["Última chance 💔", "¿De verdad no venís? Esta es la definitiva."]
];

/* ---------- CARTA DE CONY ----------
   Cada línea es un párrafo. Se muestra al confirmar que va. */
var CARTA = [
  "Siempre sentí que gran parte de lo que soy se debe a quienes me rodean, aquellos gestos, chistes o costumbres que mi corazón les roba inocentemente. Con el tiempo y mis reflexiones lo afirmo cada vez más.",
  "Hoy cada persona que formó parte de mi vida, construye parte de mi historia y vive en mí.",
  "Todos ustedes en determinada medida y de manera única habitan dentro mío. Por eso me pone muy feliz tu confirmación y no puedo esperar a verte en mi día!",
  "Te espero, Cony."
];
var FIRMA = "Cony 💕";   /* firma al final de la carta */
