---
description: SDD · Valida la especificación RF por RF (tests + Chrome DevTools)
argument-hint: <NNN-nombre>
arguments: carpeta
disable-model-invocation: true
---

Recorre `especificaciones/$carpeta/especificacion.md` requisito por requisito. Para cada RF indica qué test lo cubre y el resultado de ejecutarlo con el comando de tests de CLAUDE.md.
Si no te he indicado la carpeta, pregúntamela antes de seguir.

Los RF de interfaz que no se puedan comprobar con tests, verifícalos con el MCP de Chrome DevTools (incluida la vista móvil de 375 px).

Si algún RF no está cubierto o falla, dilo claramente. NO arregles nada todavía.
Después comprueba los criterios de finalización y dame un veredicto: ¿la especificación está cumplida?
