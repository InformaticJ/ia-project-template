---
description: SDD · Implementa UNA tarea, tests primero (uso - /sdd-implementar NNN-nombre T3)
argument-hint: <NNN-nombre> <Tn>
arguments: carpeta tarea
disable-model-invocation: true
---

Implementa SOLO la tarea $tarea de `especificaciones/$carpeta/tareas.md`, siguiendo `especificaciones/$carpeta/plan.md`, `docs/constitucion.md` y la skill sdd.
Si no te he indicado la carpeta o la tarea, pregúntamelas antes de seguir.

1. Escribe primero los tests y comprueba que fallan.
2. Escribe el código hasta que pasen.
3. Ejecuta el comando de tests de CLAUDE.md y muéstrame el resultado.
4. Marca $tarea como hecha en `tareas.md` e indica qué RF cubre.

Después PÁRATE. No empieces la siguiente tarea.
