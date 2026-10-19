<!--
  PLANTILLA: instrucciones del proyecto para Claude Code (equivale al AGENTS.md del curso).
  - Rellena cada [COMPLETAR] y borra las líneas que no apliquen. Objetivo: 30-40 líneas útiles.
  - Si ya tienes código, ejecuta /init: Claude propondrá mejoras sobre este archivo.
  - Los comentarios HTML como este no se envían a Claude: úsalos para notas de mantenimiento.
  - Guía: docs/guia/01-instrucciones-y-memoria.md · Ejemplo relleno: ejemplos/diario-de-estudio/CLAUDE.md
-->
# CLAUDE.md — [COMPLETAR: nombre del proyecto]

[COMPLETAR: una o dos frases: qué es, para quién y cuál es su objetivo.]

## Stack y estructura

- [COMPLETAR: tecnologías y versiones clave.]
- [COMPLETAR: qué hay en cada carpeta o archivo importante (solo lo que no es obvio).]

## Comandos

- Ejecutar: `[COMPLETAR]`
- Tests: `[COMPLETAR]`
- Lint / compilar: `[COMPLETAR]`

## Convenciones

- Idioma: [COMPLETAR: idioma del código, de los comentarios y de los textos de la interfaz].
- [COMPLETAR: estilo de código, nombres y patrones a seguir (con su archivo de referencia).]

## Reglas de dominio / trampas conocidas

- [COMPLETAR: lo que es fácil hacer mal y no se deduce leyendo el código.]

## Forma de trabajar

- Haz solo lo que se pide: no añadas funcionalidades por tu cuenta.
- Cambios pequeños y enfocados; no reescribas lo que ya funciona.
- Tareas grandes o refactors: propón un plan antes de tocar código (modo Plan o `/funcionalidad`).
- Funcionalidades con SDD: lee `docs/constitucion.md` y la especificación activa (`especificaciones/NNN-*/`) antes de tocar código.
- Si un `[COMPLETAR]` de este archivo afecta a la tarea, pregunta en lugar de suponer.
- Al terminar, resume qué has cambiado y cualquier decisión que deba revisar.

## Memoria

- Estado del proyecto: @MEMORIA.md
- Al terminar una tarea, actualiza `MEMORIA.md`: estado actual, decisiones importantes (con su porqué) y errores a evitar. Máximo ~50 líneas.
- Si algo se convierte en una regla permanente, propón moverlo a este archivo. Nunca guardes datos sensibles (claves, tokens, datos personales).

## Límites

- ✅ Siempre: actualizar `MEMORIA.md` al terminar cada tarea · [COMPLETAR]
- ⚠️ Pregunta antes: añadir dependencias, crear archivos nuevos, cambiar el formato de los datos guardados · [COMPLETAR]
- 🚫 Nunca: leer ni mostrar secretos (`.env`) · [COMPLETAR: lo que no debe tocar bajo ningún concepto]

## Verificación

- Ejecuta los tests (ver «Comandos») antes de dar un cambio por terminado. Nunca lo des por terminado con tests en rojo.
- [COMPLETAR: si hay interfaz web, verifica con el MCP de Chrome DevTools: funcionalidad, consola y vista móvil.]
