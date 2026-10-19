# Plantilla de proyecto para desarrollar con IA (Claude Code)

Plantilla para empezar proyectos de software dirigiendo a **Claude Code** con criterio profesional. Convierte en archivos listos para usar lo que enseña el curso **«Desarrollo con IA – El Nuevo Programador»** (BIG school, días 1-3): instrucciones y memoria del proyecto, comandos, skills, MCP, Spec-Driven Development y un sistema multiagente con guardarraíles.

> **Las claves del curso**: crear software no es programar · los fundamentos importan más que nunca · tú diriges, la IA ejecuta · la potencia sin control no sirve de nada.

Es **agnóstica del stack**: los huecos `[COMPLETAR]` se rellenan con el lenguaje, los comandos y las reglas de tu proyecto.

## Requisitos

- [Claude Code](https://code.claude.com/docs) (extensión de VS Code o CLI) con una cuenta de pago.
- [Node.js](https://nodejs.org) LTS: lo usan el MCP de Chrome DevTools, las skills de terceros y el hook del planificador.
- Google Chrome, para el MCP de Chrome DevTools.
- Git.
- Opcional: la CLI de Claude Code, para lanzar `claude --agent coordinador` ([guía 6](docs/guia/06-multiagente.md#cómo-lanzarlo)).

## Empezar un proyecto

1. **Copia la plantilla** en la carpeta de tu proyecto (o úsala como *template repository* en GitHub).
2. **Rellena `CLAUDE.md`**: sustituye cada `[COMPLETAR]` (stack, comandos, convenciones y límites). Si ya tienes código, ejecuta `/init` para que Claude proponga los valores.
3. **Crea la constitución** con `/sdd-constitucion`, y revisa y aprueba `docs/constitucion.md`.
4. **Permite el comando de tests** en `.claude/settings.json`, con `"allow": ["Bash(<tu comando> *)"]` ([guía 7](docs/guia/07-guardarrailes.md#permisos-compartidos-claudesettingsjson)).
5. **Configura Context7**: crea una API key gratuita y guárdala en la variable de entorno `CONTEXT7_API_KEY` ([guía 4](docs/guia/04-mcp.md#context7)). En macOS o Linux, ajusta también `chrome-devtools` en `.mcp.json`.
6. **Abre Claude Code en la carpeta**: confía en ella y aprueba los servidores MCP. Comprueba con `/mcp` que aparecen como *Connected*.
7. **Instala las skills de terceros** que quieras ([guía 3](docs/guia/03-skills.md#skills-de-terceros-starter-pack-del-curso)).
8. **Borra `ejemplos/`** cuando ya no lo necesites como referencia.

## Qué uso en cada caso

| Quiero… | Uso |
|---|---|
| Un cambio pequeño u obvio | Pedirlo directamente |
| Una funcionalidad mediana o un refactor | `/funcionalidad <descripción>`, en modo Plan |
| Una funcionalidad grande, paso a paso | `/sdd-especificar` → `/sdd-clarificar` → `/sdd-planificar` → `/sdd-tareas` → `/sdd-implementar` → `/sdd-validar` |
| Una funcionalidad grande, delegando en agentes | `/sdd-flujo <petición>` (VS Code) o `claude --agent coordinador` (terminal) |
| Cambiar un requisito ya especificado | `/sdd-cambiar <NNN-nombre> <requisito>` |
| Saber en qué punto estoy | `/sdd-estado <NNN-nombre>` |
| Explorar el código sin tocarlo | El modo Plan o el subagente `Explore` |

## Mapa de archivos

| Archivo o carpeta | Qué hace | Guía |
|---|---|---|
| [`CLAUDE.md`](CLAUDE.md) | Instrucciones del proyecto que Claude lee en cada sesión (el `AGENTS.md` del curso) | [1](docs/guia/01-instrucciones-y-memoria.md#claudemd) |
| [`MEMORIA.md`](MEMORIA.md) | Memoria compartida: estado, decisiones, aprendizajes y próximos pasos | [1](docs/guia/01-instrucciones-y-memoria.md#memoriamd) |
| [`.claude/rules/especificaciones.md`](.claude/rules/especificaciones.md) | Reglas que solo se cargan al tocar especificaciones | [1](docs/guia/01-instrucciones-y-memoria.md#reglas-en-clauderules) |
| [`.claude/commands/`](.claude/commands/funcionalidad.md) | Los comandos `/funcionalidad`, `/sdd-*` y `/sdd-flujo` | [2](docs/guia/02-comandos-y-prompts.md) |
| [`.claude/skills/sdd/`](.claude/skills/sdd/SKILL.md) | Skill con el método SDD y sus plantillas | [3](docs/guia/03-skills.md), [5](docs/guia/05-sdd.md) |
| [`.mcp.json`](.mcp.json) | Servidores MCP: Chrome DevTools y Context7 | [4](docs/guia/04-mcp.md) |
| [`docs/constitucion.md`](docs/constitucion.md) | Principios innegociables del proyecto | [5](docs/guia/05-sdd.md) |
| [`especificaciones/`](especificaciones/README.md) | Una carpeta por funcionalidad, con su especificación, plan y tareas | [5](docs/guia/05-sdd.md) |
| [`.claude/agents/`](.claude/agents/coordinador.md) | Coordinador, planificador, implementador y revisor | [6](docs/guia/06-multiagente.md) |
| [`.claude/settings.json`](.claude/settings.json) | Permisos compartidos por el equipo | [7](docs/guia/07-guardarrailes.md) |
| [`.claude/hooks/limitar-rutas.mjs`](.claude/hooks/limitar-rutas.mjs) | Hook que impide al planificador escribir fuera de `especificaciones/` | [7](docs/guia/07-guardarrailes.md#hook-limitar-rutasmjs) |
| [`.gitignore`](.gitignore) | Excluye la configuración personal y los secretos | [7](docs/guia/07-guardarrailes.md) |
| [`ejemplos/diario-de-estudio/`](ejemplos/diario-de-estudio/README.md) | La app de ejemplo del curso, con todo relleno | — |

## Guía

1. [Instrucciones, memoria y modo Plan](docs/guia/01-instrucciones-y-memoria.md)
2. [Comandos personalizados y prompts](docs/guia/02-comandos-y-prompts.md)
3. [Skills](docs/guia/03-skills.md)
4. [MCP](docs/guia/04-mcp.md)
5. [Spec-Driven Development](docs/guia/05-sdd.md)
6. [Agentes y sistema multiagente](docs/guia/06-multiagente.md)
7. [Guardarraíles y permisos](docs/guia/07-guardarrailes.md)

## Del curso (OpenCode) a esta plantilla (Claude Code)

| Curso | Plantilla |
|---|---|
| `AGENTS.md` | `CLAUDE.md` |
| `MEMORY.md` («al empezar, léelo») | `MEMORIA.md`, importada desde `CLAUDE.md` (siempre en contexto) |
| Reglas y documentación | `.claude/rules/` (con `paths`) y `docs/` |
| Modo Plan (`Tab` entre los agentes *Build* y *Plan*) | Modo Plan (`Shift+Tab` en la CLI; indicador de modo o `/plan` en VS Code) |
| `.opencode/commands/*.md` con `agent: plan` o `agent: build` | `.claude/commands/*.md` con `disable-model-invocation: true` |
| Argumentos `$1`, `$2` | `$0`, `$1`… o argumentos con nombre (`$carpeta`, `$tarea`) |
| `.agents/skills/<nombre>/SKILL.md` | `.claude/skills/<nombre>/SKILL.md` |
| `opencode.json` → `mcp` | `.mcp.json` → `mcpServers` |
| `/feature` | `/funcionalidad` |
| `/sdd-spec`, `/sdd-plan`, `/sdd-tasks`… | `/sdd-especificar`, `/sdd-planificar`, `/sdd-tareas`… |
| `docs/constitution.md` | `docs/constitucion.md` |
| `specs/NNN/` con `spec.md`, `plan.md` y `tasks.md` | `especificaciones/NNN/` con `especificacion.md`, `plan.md` y `tareas.md` |
| `.opencode/agents/` con `mode: primary/subagent` y `permissions` | `.claude/agents/` con `tools` o `disallowedTools`; agente principal con `claude --agent` |
| `coordinator`, `planner`, `implementer`, `reviewer` | `coordinador`, `planificador`, `implementador`, `revisor` |
| Permiso «edit solo `specs/**`» del planificador | Hook `limitar-rutas.mjs` |
| `node --test` | El comando de tests de `CLAUDE.md` (agnóstico del stack) |
