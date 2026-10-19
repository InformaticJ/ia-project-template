---
paths:
  - "especificaciones/**"
  - "docs/constitucion.md"
---

# Reglas para especificaciones (SDD)

- Sigue la skill `sdd`: flujo, plantillas y requisitos en EARS.
- Una especificación describe el QUÉ y el POR QUÉ: nada de stack, arquitectura ni nombres de archivos (eso va en `plan.md`).
- Cada requisito funcional (RF-x) debe ser verificable: nada de "rápido", "intenso" o "bonito" sin un criterio medible.
- No pases de fase (especificación → plan → tareas → implementación) sin la aprobación explícita del usuario.
- Un cambio de requisitos se hace primero en `especificacion.md`, luego en `plan.md` y `tareas.md`, y por último en el código.
