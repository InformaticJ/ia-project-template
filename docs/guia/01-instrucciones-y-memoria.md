# 1. Instrucciones, memoria y modo Plan

> Curso, día 1: harness engineering (contexto, AGENTS.md, reglas y memoria, modo Plan).

La **ingeniería de contexto** consiste en seleccionar, organizar y actualizar la información que recibe el agente para que tenga lo relevante en cada momento. En esta plantilla esa información se reparte así:

| Archivo | Qué es | Quién lo escribe | ¿Cuándo se carga? |
|---|---|---|---|
| [`CLAUDE.md`](../../CLAUDE.md) | Instrucciones del proyecto (el `AGENTS.md` del curso) | Tú | Al empezar cada sesión |
| [`MEMORIA.md`](../../MEMORIA.md) | Estado, decisiones y aprendizajes del proyecto | Claude (y tú) | Siempre: `CLAUDE.md` la importa con `@MEMORIA.md` |
| [`.claude/rules/*.md`](../../.claude/rules/especificaciones.md) | Reglas extra por tema | Tú | Solo al tocar archivos que encajan con su campo `paths` |
| `CLAUDE.local.md` (opcional) | Tus preferencias personales en este proyecto; no se versiona | Tú | Al empezar cada sesión, solo en tu equipo |

## CLAUDE.md

Claude Code lo lee al empezar cada sesión. Equivale al `AGENTS.md` del curso y tiene sus mismas secciones: stack y estructura, comandos, convenciones, reglas de dominio, forma de trabajar, memoria, límites (✅ siempre · ⚠️ pregunta antes · 🚫 nunca) y verificación.

Cómo rellenarlo:
1. Sustituye cada `[COMPLETAR]`. Si un hueco no aplica, borra la línea.
2. Mantenlo corto (30-40 líneas): cuanto más largo, peor lo sigue el modelo. Lo que solo importa en una parte del código va a una regla de `.claude/rules/`; los procedimientos largos, a una skill.
3. Escribe instrucciones verificables: «Ejecuta `npm test` antes de terminar» funciona; «prueba bien el código», no.
4. Los comentarios HTML (`<!-- ... -->`) no se envían a Claude: úsalos para notas de mantenimiento.

Si el proyecto ya tiene código, ejecuta `/init`: Claude analiza el repositorio y propone mejoras sobre este `CLAUDE.md` (el equivalente del `/init` de OpenCode). Para comprobar qué instrucciones se han cargado, usa `/context` (sección *Memory files*) o `/memory`.

Mientras quede algún `[COMPLETAR]` que afecte a una tarea, Claude tiene instrucciones de preguntarte antes de suponer.

Ejemplo relleno: [`ejemplos/diario-de-estudio/CLAUDE.md`](../../ejemplos/diario-de-estudio/CLAUDE.md).

## MEMORIA.md

La memoria de un agente es limitada: cada sesión empieza de cero. `MEMORIA.md` guarda lo que debe sobrevivir entre sesiones:
- **Estado actual**: qué funciona hoy.
- **Decisiones (y por qué)**: para no volver a discutirlas.
- **Aprendizajes y errores a evitar**.
- **Próximos pasos**.

Las reglas para mantenerla están en la sección «Memoria» de `CLAUDE.md`: Claude la actualiza al terminar cada tarea, la deja por debajo de ~50 líneas, propone mover a `CLAUDE.md` lo que se convierte en regla permanente y nunca guarda datos sensibles.

> **Diferencia con el curso**: en OpenCode había que pedir «al empezar, lee MEMORY.md». Aquí `CLAUDE.md` la importa con `@MEMORIA.md`, así que está siempre en contexto sin pedirlo.

> **No la confundas con la memoria automática de Claude Code.** Claude Code guarda además notas propias en `~/.claude/projects/<proyecto>/memory/` (tus preferencias, tus correcciones…). Esa memoria es personal y solo existe en tu equipo; `MEMORIA.md` está en el repositorio y la comparte todo el equipo.

## Reglas en `.claude/rules/`

Son archivos Markdown con reglas sobre un tema. Sin campo `paths` se cargan siempre; con `paths`, solo cuando Claude lee o edita un archivo que encaja con esos patrones, lo que ahorra contexto.

La plantilla incluye [`.claude/rules/especificaciones.md`](../../.claude/rules/especificaciones.md), que solo se carga al tocar `especificaciones/**` o `docs/constitucion.md`:

```markdown
---
paths:
  - "especificaciones/**"
  - "docs/constitucion.md"
---

# Reglas para especificaciones (SDD)
- Sigue la skill `sdd`: flujo, plantillas y requisitos en EARS.
- ...
```

Para añadir una regla, crea `.claude/rules/<tema>.md` con un tema por archivo; por ejemplo, `pruebas.md` con `paths: ["**/*.test.*"]`.

## Modo Plan

El modo Plan hace que Claude analice la tarea, consulte el proyecto y proponga los pasos **sin modificar archivos** hasta que apruebes el plan. Sirve para aclarar requisitos, detectar riesgos y revisar el enfoque antes de escribir código nuevo o tocar el existente.

| Úsalo para | No lo uses para |
|---|---|
| Tareas grandes | Tareas pequeñas |
| Refactors | Correcciones obvias |
| Supervisar la estrategia | Prototipado rápido |

Cómo activarlo:
- **Extensión de VS Code**: haz clic en el indicador de modo, bajo la caja de texto, o empieza el mensaje con `/plan`.
- **Terminal (CLI)**: `Shift+Tab` recorre los modos (*manual* → *accept edits* → *plan*), o arranca con `claude --permission-mode plan`.

Al aprobar el plan, Claude sale del modo Plan y empieza a editar. En el curso esto era el `Tab` entre los agentes *Build* y *Plan* de OpenCode.

> Desde la versión 2.1.283, Claude Code arranca en **modo auto**: un clasificador aprueba las acciones en lugar de preguntarte cada vez. Por eso los límites importantes de la plantilla también están en permisos y hooks ([guía 7](07-guardarrailes.md)).

Prompt de ejemplo del curso, adaptado (es lo que hace [`/funcionalidad`](02-comandos-y-prompts.md#funcionalidad)):

```text
Quiero añadir <funcionalidad>.

Antes de escribir código, prepárame un plan con:
1. Cómo lo vas a calcular o implementar, respetando las reglas de CLAUDE.md.
2. Qué archivos vas a modificar y qué cambia en cada uno.
3. Los casos límite y las dudas que debo decidir yo antes de empezar.
4. Qué actualizarías en CLAUDE.md y en MEMORIA.md.
```
