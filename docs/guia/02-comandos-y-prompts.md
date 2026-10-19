# 2. Comandos personalizados y prompts

> Curso, día 1 (prompt engineering) y día 2 (comandos personalizados).

Un **comando** es un prompt reutilizable que lanzas escribiendo `/<nombre>`. Sirve para repetir tareas habituales sin volver a escribir las instrucciones. A diferencia de una skill, **el agente nunca lo ejecuta por iniciativa propia**: solo lo lanzas tú.

## Comandos de la plantilla

Están en [`.claude/commands/`](../../.claude/commands/funcionalidad.md), un archivo `.md` por comando.

| Comando | Para qué | Ejemplo |
|---|---|---|
| `/funcionalidad` | Planificar una funcionalidad antes de tocar código | `/funcionalidad mostrar el total de minutos estudiados esta semana` |
| `/sdd-constitucion` | Proponer la constitución del proyecto | `/sdd-constitucion` |
| `/sdd-especificar` | Entrevista + especificación en EARS | `/sdd-especificar 002-objetivo-semanal fijar minutos de estudio por semana` |
| `/sdd-clarificar` | Revisar la especificación como un QA | `/sdd-clarificar 002-objetivo-semanal` |
| `/sdd-planificar` | Plan técnico | `/sdd-planificar 002-objetivo-semanal` |
| `/sdd-tareas` | Dividir el plan en tareas | `/sdd-tareas 002-objetivo-semanal` |
| `/sdd-implementar` | Implementar UNA tarea, tests primero | `/sdd-implementar 002-objetivo-semanal T3` |
| `/sdd-validar` | Validar RF por RF | `/sdd-validar 002-objetivo-semanal` |
| `/sdd-cambiar` | Nuevo requisito: primero la especificación | `/sdd-cambiar 002-objetivo-semanal avisar al llegar al 100 %` |
| `/sdd-estado` | Fase actual y siguiente paso | `/sdd-estado 002-objetivo-semanal` |
| `/sdd-flujo` | Flujo SDD completo con subagentes (VS Code) | `/sdd-flujo quiero un objetivo semanal de estudio` |

Los comandos `/sdd-*` se explican en la [guía 5](05-sdd.md), y `/sdd-flujo`, en la [guía 6](06-multiagente.md).

## `/funcionalidad`

Es el `/feature` del curso. Pide a Claude un plan (cómo lo hará, qué archivos cambiará, los casos límite y las dudas que debes decidir tú, y qué actualizará en `CLAUDE.md` y `MEMORIA.md`) y le prohíbe modificar archivos hasta que lo apruebes. Si además quieres una garantía técnica, lánzalo en **modo Plan** ([guía 1](01-instrucciones-y-memoria.md#modo-plan)).

## Anatomía de un comando

[`.claude/commands/sdd-implementar.md`](../../.claude/commands/sdd-implementar.md):

```markdown
---
description: SDD · Implementa UNA tarea, tests primero (uso - /sdd-implementar NNN-nombre T3)
argument-hint: <NNN-nombre> <Tn>
arguments: carpeta tarea
disable-model-invocation: true
---

Implementa SOLO la tarea $tarea de `especificaciones/$carpeta/tareas.md`, ...
```

| Campo | Qué hace |
|---|---|
| `description` | El texto que ves en el menú `/` |
| `argument-hint` | La pista de argumentos al autocompletar |
| `arguments` | Da nombre a los argumentos por posición: `/sdd-implementar 002-x T3` → `$carpeta` = `002-x`, `$tarea` = `T3` |
| `disable-model-invocation: true` | Claude no puede lanzarlo por su cuenta (es lo que el curso llama «comando») |

En el cuerpo puedes usar:
- `$ARGUMENTS`: todo lo que escribes después del comando.
- `$nombre`: un argumento con nombre (campo `arguments`).
- `$0`, `$1`…: argumentos por posición. **Ojo: en Claude Code empiezan en `$0`**; en OpenCode, el primero era `$1`.

> **Diferencia con el curso**: en OpenCode cada comando elegía su agente con `agent: plan` o `agent: build`. En Claude Code un comando no cambia el modo de la sesión: los comandos «de planificación» lo indican en el propio prompt («NO escribas código»), y puedes lanzarlos en modo Plan cuando no deban escribir ningún archivo.

## Crear un comando nuevo

1. Crea `.claude/commands/<nombre>.md`. El nombre del archivo es el comando.
2. Añade el frontmatter: `description`, `disable-model-invocation: true` y, si recibe argumentos, `argument-hint` y `arguments`.
3. Escribe el prompt (ver la estructura de abajo).
4. Escribe `/` en Claude Code y búscalo. Si no aparece, abre una conversación nueva.

## Escribir buenos prompts

Estructura del curso (prompt engineering clásico):
1. **Rol** (¿quién soy?): el nivel de experiencia y la especialidad que debe asumir.
2. **Contexto** (¿dónde estamos?): de qué va el proyecto, las tecnologías y el problema general.
3. **Tarea exacta** (¿qué necesitas?): algo concreto, no «un sistema».
4. **Restricciones o reglas** (¿qué límites hay?): convenciones y estándares.
5. **Formato de salida** (¿cómo lo quieres?): cómo quieres recibir el resultado.

Plantilla lista para copiar, en Markdown como en el curso (el prompt completo con el que el curso crea el Diario de Estudio está en el [README del ejemplo](../../ejemplos/diario-de-estudio/README.md#prompt-de-creación-día-1)):

```markdown
## Rol
Actúa como <perfil> que <cómo debe trabajar>.

## Contexto
<Qué es el proyecto, en qué punto está y qué problema hay que resolver.>

## Tarea
<Qué hay que hacer, numerado y concreto.>

## Restricciones y reglas
- <Reglas de negocio y casos límite.>
- <Restricciones técnicas.>
- No añadas nada que no aparezca en este mensaje.

## Formato de salida
1. <Qué archivos crear o modificar.>
2. Al terminar, responde con un resumen de 3-4 líneas, los pasos para probarlo y cualquier decisión que hayas tomado por tu cuenta y que yo deba revisar.
```

Un consejo que recoge el curso (Andrej Karpathy): cuando el modelo necesita más contexto del que te apetece escribir, **divaga en voz alta** unos minutos con el dictado por voz, en flujo de conciencia. Los LLM reconstruyen bien las ideas desordenadas y tendrás que corregir menos después. También puedes pedirle que te entreviste antes de empezar, como hace `/sdd-especificar` o la skill `grill-me`.
