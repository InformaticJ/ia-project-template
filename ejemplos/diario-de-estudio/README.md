# Ejemplo: Diario de Estudio

La aplicación de ejemplo del curso: una web para registrar sesiones de estudio y motivarse viendo la racha de días seguidos. Esta carpeta contiene **la plantilla rellena para ese proyecto**, adaptada a Claude Code, para que veas cómo queda cada archivo con contenido real.

| Archivo | Equivale en la plantilla a | Qué muestra |
|---|---|---|
| [`CLAUDE.md`](CLAUDE.md) | `CLAUDE.md` | El `AGENTS.md` que genera `/init` en el curso, con las secciones de memoria, SDD y verificación con Chrome DevTools |
| [`MEMORIA.md`](MEMORIA.md) | `MEMORIA.md` | Una memoria con estado y decisiones reales |
| [`docs/constitucion.md`](docs/constitucion.md) | `docs/constitucion.md` | Los 6 principios del Diario de Estudio |
| [`.claude/skills/fechas-locales/SKILL.md`](.claude/skills/fechas-locales/SKILL.md) | `.claude/skills/<nombre>/SKILL.md` | Una skill de dominio: reglas y checklist para trabajar con fechas locales |
| [`especificaciones/001-mapa-de-calor/especificacion.md`](especificaciones/001-mapa-de-calor/especificacion.md) | `especificaciones/NNN-nombre/especificacion.md` | Una especificación completa en EARS (contenido ilustrativo) |

La aplicación en sí (`index.html`, `styles.css` y `app.js`) no se incluye: se crea con el prompt de abajo.

## Para que no interfiera con tu proyecto

- El `CLAUDE.md` de esta carpeta está excluido en `.claude/settings.json` (`claudeMdExcludes`), así que Claude no lo carga aunque lea archivos del ejemplo.
- La skill `fechas-locales` solo se carga si Claude trabaja con archivos de esta carpeta, y su descripción la limita al Diario de Estudio.
- Cuando ya no te sirva como referencia, borra `ejemplos/` (y, si quieres, la entrada de `claudeMdExcludes`).

## Prompt de creación (día 1)

El prompt con el que el curso crea la primera versión de la aplicación. Sigue la estructura rol → contexto → tarea → restricciones → formato de salida ([guía 2](../../docs/guia/02-comandos-y-prompts.md#escribir-buenos-prompts)):

```markdown
## Rol
Actúa como desarrollador frontend senior que escribe código simple, claro y fácil de entender para alguien que está empezando a programar.

## Contexto
Quiero crear desde cero "Diario de Estudio", una web para registrar mis sesiones de estudio y motivarme viendo mi racha de días seguidos estudiando. Esta es la primera versión y tiene que ser muy simple. La web se construirá poco a poco, así que ahora solo necesito una base limpia que funcione a la primera.

## Tarea
Crea la web con estas funcionalidades:
1. Un formulario para registrar una sesión con:
   - Fecha (por defecto hoy, pero editable para poder apuntar días anteriores)
   - Tema (texto, obligatorio)
   - Minutos (número mayor que 0, obligatorio)
2. La racha actual en grande, con un 🔥.
3. La lista de sesiones, de la más reciente a la más antigua.
4. Los datos guardados en localStorage para que no se pierdan al recargar.

## Restricciones y reglas
Racha:
- Un día cuenta si tiene al menos una sesión.
- La racha son los días consecutivos con sesión que terminan hoy.
- Si hoy todavía no he estudiado pero ayer sí, la racha sigue viva: no se rompe hasta que termina el día.
- Usa siempre la fecha local del usuario, nunca UTC.

Técnicas:
- HTML, CSS y JavaScript, sin frameworks, sin librerías y sin compilar nada.
- Solo tres archivos: index.html, styles.css y app.js.
- Tiene que funcionar abriendo index.html con doble clic, sin servidor ni instalación.
- No añadas nada que no aparezca en este mensaje.
- Diseño limpio y moderno, que se vea bien en el móvil.
- Todos los textos de la interfaz en español.

## Formato de salida
1. Crea los tres archivos directamente en la carpeta del proyecto.
2. Al terminar, responde con:
   - Un resumen de 3-4 líneas de lo que has creado.
   - Los pasos para probarlo.
   - Cualquier decisión que hayas tomado por tu cuenta y que yo deba revisar.
```

## Cómo evoluciona en el curso

1. **Día 1**: se crea la app con el prompt anterior, `/init` genera el `AGENTS.md` (aquí, `CLAUDE.md`) y se añade la memoria. La «mejor racha» se planifica en modo Plan.
2. **Día 2**: se añaden `/feature` (aquí, `/funcionalidad`), la skill de fechas, los MCP de Chrome DevTools y Context7, la constitución y la primera especificación (el mapa de calor).
3. **Día 3**: el sistema multiagente implementa un objetivo semanal de estudio con el flujo SDD completo (`/sdd-flujo` o `claude --agent coordinador`).
