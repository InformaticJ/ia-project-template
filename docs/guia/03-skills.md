# 3. Skills

> Curso, día 2: Agent Skills y skills de terceros.

Una **skill** es un conjunto de instrucciones reutilizables que enseña al agente a hacer una tarea concreta. Claude ve el nombre y la descripción de cada skill y **carga las instrucciones completas solo cuando las necesita**, así que mientras tanto no ocupan contexto. Tú también puedes lanzarla con `/<nombre>`.

| | Comando | Skill |
|---|---|---|
| ¿Quién lo lanza? | Solo tú | Tú, o Claude cuando la descripción encaja con la tarea |
| Dónde vive | `.claude/commands/<nombre>.md` | `.claude/skills/<nombre>/SKILL.md` (+ archivos de apoyo) |
| Para qué | Repetir un prompt | Enseñar cómo se hace algo: reglas, checklists, plantillas |

## Skill incluida: `sdd`

[`.claude/skills/sdd/SKILL.md`](../../.claude/skills/sdd/SKILL.md) contiene el método Spec-Driven Development: fases y aprobaciones, formato EARS, qué va en el plan y en las tareas, y cómo implementar y validar. Las plantillas de especificación, plan y tareas están en [`plantillas/`](../../.claude/skills/sdd/plantillas/especificacion.md) y solo se leen cuando hacen falta. La usan todos los comandos `/sdd-*` y la precargan los cuatro agentes.

## Crear una skill propia

1. Crea la carpeta `.claude/skills/<nombre>/` y dentro un `SKILL.md`:

   ```markdown
   ---
   name: <nombre>
   description: Úsala siempre que <situación concreta, con las palabras que usarías al pedirlo>.
   ---

   # <Título>

   ## Reglas
   - ...

   ## Checklist de revisión
   - [ ] ...

   ## Al terminar
   Indica qué puntos del checklist has comprobado y cómo.
   ```

2. La `description` es lo que Claude usa para decidir cuándo cargarla: pon primero el caso de uso y las palabras clave reales.
3. Mantén `SKILL.md` por debajo de 500 líneas; el material largo va en archivos de apoyo enlazados desde él.
4. Escribe `/` (o `/skills`) en Claude Code para comprobar que aparece. Si no, abre una conversación nueva.

Ejemplo completo del curso: la skill de fechas del Diario de Estudio, en [`ejemplos/diario-de-estudio/.claude/skills/fechas-locales/SKILL.md`](../../ejemplos/diario-de-estudio/.claude/skills/fechas-locales/SKILL.md). Para comprobar que Claude la tiene en cuenta: `/funcionalidad mostrar cuántos días he estudiado este mes. ¿Vas a utilizar alguna skill?`

Opciones útiles del frontmatter: `paths:` hace que la skill solo se active al trabajar con ciertos archivos, y `disable-model-invocation: true` impide que Claude la cargue por su cuenta.

## Skills de terceros (starter pack del curso)

Plataformas como [skills.sh](https://skills.sh) permiten añadir skills de otros de forma modular, sin ensuciar el contexto principal. Se instalan con la CLI `skills` (necesita Node.js). Con `-a claude-code` se instalan solo para Claude Code, en la carpeta `.claude/skills/` del proyecto; añade `-g` para instalarlas en `~/.claude/skills/` y tenerlas en todos tus proyectos.

| Skill | Autor | Qué hace | Instalación |
|---|---|---|---|
| find-skills | Vercel | Busca e instala skills del ecosistema cuando necesitas una capacidad nueva | `npx skills add https://github.com/vercel-labs/skills --skill find-skills -a claude-code` |
| grill-me | Matt Pocock | Te hace preguntas sobre tu plan hasta cubrir todos los casos antes de implementar | `npx skills add https://github.com/mattpocock/skills --skill grill-me -a claude-code` |
| frontend-design | Anthropic | Crea interfaces con un diseño cuidado y profesional | `npx skills add https://github.com/anthropics/skills --skill frontend-design -a claude-code` |
| web-design-guidelines | Vercel | Revisa la interfaz y detecta problemas de accesibilidad, UX y diseño | `npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines -a claude-code` |
| systematic-debugging | Jesse Vincent (obra) | Depura con método: reproducir, aislar, formular hipótesis y verificar | `npx skills add https://github.com/obra/superpowers --skill systematic-debugging -a claude-code` |

Uso: pídelo con naturalidad o lánzala por su nombre, p. ej. `/frontend-design con lo que sabes mejora el diseño de la web` (en OpenCode era `@frontend-design`).

Otros comandos de la CLI: `npx skills list` (instaladas), `npx skills update` (actualizar), `npx skills remove <skill>` (quitar) y `npx skills find <tema>` (buscar).

> **Seguridad**: una skill son instrucciones que Claude seguirá (y, a veces, scripts que ejecutará). Antes de instalar una de terceros, lee su `SKILL.md`, y revisa el diff antes de versionarla en el proyecto.
