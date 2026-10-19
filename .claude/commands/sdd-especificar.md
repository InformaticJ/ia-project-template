---
description: SDD · Entrevista y genera la especificación (uso - /sdd-especificar NNN-nombre idea inicial)
argument-hint: <NNN-nombre> <idea inicial>
arguments: carpeta
disable-model-invocation: true
---

NO escribas código en ningún momento. Usa la skill sdd y ten en cuenta `docs/constitucion.md` y MEMORIA.md.

Carpeta de la especificación: `especificaciones/$carpeta/`
Idea inicial (el texto que va después del nombre de la carpeta): $ARGUMENTS

Si no te he indicado la carpeta, propón el siguiente número libre y un nombre corto, y espera mi confirmación.

Tu trabajo:

1. Hazme preguntas de UNA en UNA para eliminar ambigüedades (casos límite, errores, qué queda fuera de esta versión). Máximo 5 preguntas.
2. Con mis respuestas, genera `especificaciones/$carpeta/especificacion.md` siguiendo la plantilla de la skill sdd, con los requisitos en EARS y "Estado: borrador".
3. Solo el QUÉ y el POR QUÉ: nada de stack, arquitectura ni nombres de archivos.
