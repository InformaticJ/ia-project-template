# CLAUDE.md — Diario de Estudio

Web estática para registrar sesiones de estudio y motivarse viendo la racha de días seguidos. Proyecto didáctico: el código debe poder entenderlo alguien que empieza a programar.

## Stack y estructura

- HTML, CSS y JavaScript puros: sin frameworks, librerías, npm, bundler ni build.
- `index.html` (estructura), `styles.css` (estilos), `app.js` (lógica y datos).
- Debe funcionar abriendo `index.html` con doble clic (`file://`): nada de módulos ES (`type="module"`), `fetch` a archivos locales ni nada que requiera servidor.

## Comandos

- Tests: `node --test`

## Convenciones

- Textos de la interfaz en español.
- Código simple, nombres descriptivos y comentarios solo donde aporten.
- Diseño limpio y responsive; cualquier pantalla nueva debe verse bien en el móvil.

## Datos

- localStorage, clave `diario-estudio-sesiones`: array de `{ date: "AAAA-MM-DD", topic, minutes }`.
- Si cambias la forma de los datos, mantén la compatibilidad con lo ya guardado o el usuario perderá sus sesiones.

## Fechas y racha (fácil equivocarse)

- Trabaja siempre con la fecha local del usuario. Nunca uses `toISOString()` ni `new Date("AAAA-MM-DD")`: se interpretan en UTC y desplazan el día.
- Racha = días consecutivos con al menos 1 sesión que terminan hoy. Si hoy no hay sesión pero ayer sí, la racha sigue viva y se cuenta desde ayer.
- Varias sesiones el mismo día cuentan como un solo día. Las fechas futuras no suman.

## Forma de trabajar

- Haz solo lo que se pide: no añadas funcionalidades por tu cuenta.
- Cambios pequeños y enfocados; no reescribas lo que ya funciona.
- Lee `docs/constitucion.md` y la especificación activa (`especificaciones/NNN-*/`) antes de tocar código.
- Al terminar, resume qué has cambiado y cualquier decisión que deba revisar.

## Memoria

- Estado del proyecto: @MEMORIA.md
- Al terminar una tarea, actualízala: estado actual, decisiones importantes (con su porqué) y errores a evitar. Máximo ~50 líneas.
- Si algo se convierte en una regla permanente, propón moverlo a este archivo. Nunca guardes datos sensibles.

## Límites

- ✅ Siempre: respetar las reglas de fechas y racha, mantener los textos en español y actualizar `MEMORIA.md` al terminar cada tarea.
- ⚠️ Pregunta antes: crear archivos nuevos o cambiar el formato de los datos guardados.
- 🚫 Nunca: añadir dependencias, frameworks o un paso de build.

## Verificación

- Lógica: `node --test`. Nunca des una tarea por terminada con tests en rojo.
- Interfaz: después de cada cambio, verifica con el MCP de Chrome DevTools: abre `index.html`, prueba la funcionalidad, revisa la consola y comprueba la vista móvil.
- Para empezar de cero: DevTools → Application → Local Storage → borrar la clave `diario-estudio-sesiones`.
