# Especificaciones (SDD)

Cada funcionalidad que se desarrolla con Spec-Driven Development tiene aquí su carpeta:

```
especificaciones/
└── NNN-nombre/             p. ej. 001-mapa-de-calor (NNN = siguiente número libre)
    ├── especificacion.md   QUÉ y POR QUÉ, requisitos en EARS      → /sdd-especificar
    ├── plan.md             CÓMO: archivos, funciones, decisiones   → /sdd-planificar
    └── tareas.md           Tareas pequeñas con «Hecho cuando:»     → /sdd-tareas
```

- Las plantillas están en la skill `sdd`: [`.claude/skills/sdd/plantillas/`](../.claude/skills/sdd/plantillas/especificacion.md).
- La especificación se mantiene viva (enfoque *spec-anchored*): los cambios de requisitos entran primero aquí, con `/sdd-cambiar`.
- Ejemplo relleno: [especificación del mapa de calor del Diario de Estudio](../ejemplos/diario-de-estudio/especificaciones/001-mapa-de-calor/especificacion.md).
- Guía completa: [docs/guia/05-sdd.md](../docs/guia/05-sdd.md).
