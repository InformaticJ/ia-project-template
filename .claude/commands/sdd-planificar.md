---
description: SDD · Genera el plan técnico de una especificación aprobada
argument-hint: <NNN-nombre>
arguments: carpeta
disable-model-invocation: true
---

Lee `docs/constitucion.md`, CLAUDE.md y `especificaciones/$carpeta/especificacion.md`. Usa la skill sdd. NO escribas código.
Si no te he indicado la carpeta, pregúntamela antes de seguir.

Genera `especificaciones/$carpeta/plan.md` con la plantilla de la skill sdd: archivos que se crean o modifican y la responsabilidad de cada uno, funciones puras de lógica (con sus dependencias, como la fecha de hoy, recibidas como parámetro), algoritmo en pseudocódigo, cómo se pinta en la interfaz, decisiones técnicas justificadas (con su alternativa descartada) y estrategia de tests con el comando de tests de CLAUDE.md.

Todo debe respetar la constitución y cubrir todos los RF. Marca qué RF cubre cada parte. Si la especificación no está aprobada o tiene dudas abiertas, para y avísame.
