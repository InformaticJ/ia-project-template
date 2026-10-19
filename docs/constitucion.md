<!--
  PLANTILLA: constitución del proyecto (paso 1 de SDD).
  - Genérala o revísala con /sdd-constitucion: Claude propondrá los principios a partir de tu código y de CLAUDE.md.
  - Máximo 15 líneas. Cada principio debe ser corto y verificable.
  - Guía: docs/guia/05-sdd.md · Ejemplo relleno: ejemplos/diario-de-estudio/docs/constitucion.md
-->
# Constitución — [COMPLETAR: nombre del proyecto]

Principios innegociables. Toda especificación, plan y tarea debe cumplirlos.

1. **Simplicidad primero**: [COMPLETAR: stack permitido y lo que está prohibido (dependencias, build, servicios…).]
2. **La especificación manda**: nada se implementa si no está en la especificación activa. Si falta una decisión, se para y se pregunta.
3. **Lógica separada de la interfaz**: [COMPLETAR: p. ej. «los cálculos son funciones puras, sin acceso a la interfaz ni al almacenamiento, que reciben "hoy" como parámetro».]
4. **Tests como puerta**: la lógica se prueba con `[COMPLETAR: comando de tests]`. Prohibido avanzar con tests en rojo.
5. **Los datos del usuario son sagrados**: [COMPLETAR: dónde se guardan y cómo se mantiene la compatibilidad hacia atrás.] Nunca se pierden datos.
6. **Idioma**: [COMPLETAR: idioma del código; idioma de la interfaz y de la documentación.]
