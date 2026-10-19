# 5. Spec-Driven Development (SDD)

> Curso, día 2: SDD, taxonomía, EARS, estructura y paso a paso.

**SDD** es una forma de desarrollar en la que primero defines **qué** debe hacer el sistema (requisitos, límites y criterios de aceptación) y usas esa especificación para guiar la implementación y comprobar el resultado.

- Flujo clásico: Análisis → Diseño → Implementación (se repite) → Validación → Despliegue y mantenimiento.
- Flujo SDD: **Especificación → Planificación → Implementación (se repite) → Validación → Despliegue y mantenimiento**.

## Taxonomía

- **Spec-first**: escribes la especificación, generas el código una vez y a partir de ahí editas el código. La especificación fue el punto de partida y muere.
- **Spec-anchored**: la especificación se mantiene viva y se actualiza para guiar la evolución del código. Es la que usa esta plantilla y la más recomendable para empezar.
- **Spec-as-source**: solo editas la especificación; el código se genera a partir de ella y nunca se toca a mano.

## EARS: requisitos sin ambigüedad

EARS (*Easy Approach to Requirements Syntax*) escribe cada requisito funcional con una plantilla fija:

| Tipo | Plantilla |
|---|---|
| Evento | `RF-x: CUANDO <evento>, EL SISTEMA <respuesta>.` |
| No deseado | `RF-x: SI <condición no deseada>, ENTONCES EL SISTEMA <respuesta>.` |
| Estado | `RF-x: MIENTRAS <estado>, EL SISTEMA <respuesta>.` |
| Permanente | `RF-x: EL SISTEMA <comportamiento permanente>.` |

Funciona tan bien con IA porque:
- Cada requisito se puede verificar, así que casi se convierte en un test.
- El SI… ENTONCES obliga a pensar en los errores, que es justo lo que la IA suele olvidar.
- Una frase es un comportamiento: no hay párrafos que el agente tenga que interpretar.

## Estructura

```
proyecto/
├── CLAUDE.md, MEMORIA.md
├── .claude/               comandos /sdd-*, skill sdd, agentes y regla de especificaciones
├── docs/constitucion.md   principios innegociables
├── especificaciones/
│   └── NNN-nombre/
│       ├── especificacion.md
│       ├── plan.md
│       └── tareas.md
└── <código y tests del proyecto>
```

## Paso a paso

| Paso | Comando | Qué hace | Escribe |
|---|---|---|---|
| 1. Constitución (una vez por proyecto) | `/sdd-constitucion` | Propone 6 principios innegociables y espera tu aprobación | `docs/constitucion.md` |
| 2. Especificación | `/sdd-especificar NNN-nombre idea` | Te entrevista (máximo 5 preguntas, de una en una) y redacta el QUÉ y el POR QUÉ en EARS | `especificacion.md` |
| 3. Clarificación | `/sdd-clarificar NNN-nombre` | Revisa como un QA: ambigüedades, contradicciones, casos límite y conflictos con la constitución. Solo detecta | — |
| 4. Planificación | `/sdd-planificar NNN-nombre` | Archivos, funciones puras, pseudocódigo, interfaz, decisiones y estrategia de tests, indicando qué RF cubre cada parte | `plan.md` |
| 5. Tareas | `/sdd-tareas NNN-nombre` | Tareas de 20-30 minutos, en orden, con sus RF y «Hecho cuando:» | `tareas.md` |
| 6. Implementación | `/sdd-implementar NNN-nombre T1` | UNA tarea: tests primero (en rojo), código, tests en verde, marcar la tarea y parar | Código y tests |
| 7. Validación | `/sdd-validar NNN-nombre` | RF por RF: qué test lo cubre y su resultado; la interfaz, con Chrome DevTools; veredicto final | — |
| Mantenimiento | `/sdd-cambiar NNN-nombre requisito` | Nuevo requisito: primero la especificación (con diff), luego el plan y las tareas, y por último el código | `especificacion.md` |
| En cualquier momento | `/sdd-estado NNN-nombre` | Fase actual, tareas hechas y pendientes, y el siguiente comando | — |

Notas:
- Entre fases, **revisa y aprueba** lo que se ha generado: es la clave del método. Cuando la especificación esté lista, cambia su `Estado:` a `aprobada`.
- La clarificación (paso 3) se puede repetir después de los pasos 4 y 5 si algo no está claro.
- Repite el paso 6 con T2, T3…, revisando cada tarea antes de pasar a la siguiente.
- Al terminar cada fase se actualiza `MEMORIA.md`.
- Antes de implementar, asegúrate de que la sección «Comandos» de `CLAUDE.md` tiene el comando de tests: los pasos 6 y 7 lo usan.

## Con agentes

Todo el flujo se puede delegar en el sistema multiagente (coordinador, planificador, implementador y revisor): ver la [guía 6](06-multiagente.md).

## Ejemplo

[`ejemplos/diario-de-estudio/`](../../ejemplos/diario-de-estudio/README.md) tiene una constitución y una especificación rellenas: el mapa de calor del Diario de Estudio.
