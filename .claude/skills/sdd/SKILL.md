---
name: sdd
description: Úsala siempre que trabajes con Spec-Driven Development en este proyecto (docs/constitucion.md o cualquier archivo dentro de especificaciones/) - redactar, revisar o cambiar especificaciones, planes y tareas, o implementar y validar tareas de una especificación.
---

# Spec-Driven Development (SDD)

## Flujo
Constitución → Especificación → Clarificación → Plan → Tareas → Implementación → Validación → Cambio.

- Nunca pases a la siguiente fase sin la aprobación explícita del usuario.
- La especificación manda: si algo no está en ella, no se implementa. Si falta una decisión, para y pregunta.
- Un cambio de requisitos se hace primero en la especificación, luego en el plan y las tareas, y por último en el código.
- Cada especificación vive en su carpeta: `especificaciones/NNN-nombre/` con `especificacion.md`, `plan.md` y `tareas.md`. NNN es el siguiente número libre, con tres cifras (001, 002…).
- Toda especificación, plan y tarea cumple `docs/constitucion.md`.
- Al terminar cada fase, actualiza `MEMORIA.md`.

## Especificación (`especificacion.md`)
- Usa la plantilla [plantillas/especificacion.md](plantillas/especificacion.md). Estado: borrador | aprobada | implementada.
- Describe el QUÉ y el POR QUÉ. Nada de stack, arquitectura ni nombres de archivos: eso va en el plan.
- Las dudas que no puedas resolver se marcan como `[NECESITA ACLARACIÓN]` en «Dudas abiertas».

## Requisitos en EARS (en español)
- RF-x: CUANDO <evento>, EL SISTEMA <respuesta>.
- RF-x: SI <condición no deseada>, ENTONCES EL SISTEMA <respuesta>.
- RF-x: MIENTRAS <estado>, EL SISTEMA <respuesta>.
- RF-x: EL SISTEMA <comportamiento permanente>.

Una frase = un comportamiento. Cada RF debe ser verificable: nada de "rápido", "intenso" o "bonito" sin un criterio medible. El SI… ENTONCES obliga a pensar en los errores.

## Plan (`plan.md`)
Usa [plantillas/plan.md](plantillas/plan.md): archivos y responsabilidades · funciones puras (las dependencias, como la fecha de hoy, se reciben como parámetro) · algoritmo en pseudocódigo · interfaz · decisiones justificadas con su alternativa descartada · estrategia de tests con el comando de tests de CLAUDE.md. Indica qué RF cubre cada parte.

## Tareas (`tareas.md`)
Usa [plantillas/tareas.md](plantillas/tareas.md):

```
- [ ] **Tn. <Descripción>.** RF-x, RF-y
  - Hecho cuando: <comprobación verificable>.
```

Máximo 20-30 min por tarea, en orden de dependencia. Si salen más de 10, propón dividir la especificación.

## Implementación
Una sola tarea cada vez: tests primero (en rojo), después el código, tests en verde, marcar la tarea y parar.

## Validación
RF por RF: qué test lo cubre y su resultado. Los RF de interfaz se verifican con el MCP de Chrome DevTools (incluida la vista móvil de 375 px). Termina con un veredicto: ¿la especificación está cumplida?
