# 7. Guardarraíles y permisos

> Curso, día 1 (arnés, guardarraíles y contexto) y día 3 (permisos por agente).

- **Arnés (harness)**: el sistema que rodea al modelo y le permite actuar como agente: gestiona el contexto, las herramientas y la ejecución de tareas. Aquí, Claude Code más esta plantilla.
- **Guardarraíles**: reglas y controles que limitan sus acciones y validan sus resultados: permisos, aprobaciones y comprobaciones de seguridad.

> Criterio: la potencia sin control no sirve de nada. La IA ejecuta, pero el responsable del proyecto eres tú.

## Capas de la plantilla, de blandas a duras

| Capa | Dónde | Tipo |
|---|---|---|
| Instrucciones y límites (✅ ⚠️ 🚫) | `CLAUDE.md`, reglas, skills y comandos | Blanda: Claude intenta seguirlas, pero no hay garantía |
| Aprobaciones humanas | Fases de SDD y modo Plan | Tú decides en cada punto de control |
| Herramientas por agente | `tools` y `disallowedTools` en `.claude/agents/` | Dura: el agente no tiene la herramienta |
| Permisos compartidos | [`.claude/settings.json`](../../.claude/settings.json) | Dura: Claude Code los aplica siempre |
| Hook `limitar-rutas.mjs` | [`.claude/hooks/`](../../.claude/hooks/limitar-rutas.mjs), lo usa el planificador | Dura: bloquea la acción antes de que ocurra |

## Permisos compartidos (`.claude/settings.json`)

```json
{
  "permissions": {
    "ask": ["Bash(git push *)", "Bash(git reset --hard *)", "Bash(rm -rf *)"],
    "deny": ["Read(.env)", "Read(.env.*)"]
  },
  "claudeMdExcludes": ["**/ejemplos/**/CLAUDE.md"]
}
```

- **deny**: Claude no puede leer `.env` ni `.env.*` en ninguna carpeta.
- **ask**: Claude te pregunta siempre antes de publicar (`git push`), descartar cambios (`git reset --hard`) o borrar carpetas (`rm -rf`), incluso en modo auto.
- **allow** (no hay ninguna todavía): lo que Claude puede hacer sin preguntar. Cuando rellenes el stack, añade tu comando de tests para que los agentes lo ejecuten sin interrupciones:

  ```json
  "allow": ["Bash(npm test *)"]
  ```

  Si quieres aprobar a mano la instalación de dependencias (el ⚠️ del curso), añade a `ask` algo como `"Bash(npm install *)"`.
- **claudeMdExcludes**: evita que el `CLAUDE.md` de `ejemplos/` se cargue cuando Claude lee archivos del ejemplo.

Las reglas se evalúan en este orden: deny → ask → allow, y gana la primera que encaja. Sintaxis: `Bash(comando *)` (el `*` va después del subcomando), `Read(ruta)` y `Edit(ruta)` con patrones tipo gitignore, `WebFetch(domain:ejemplo.com)` y `mcp__servidor__herramienta`. Con `/permissions` ves todas las reglas activas.

Tus excepciones personales van en `.claude/settings.local.json`, que no se versiona.

> Las reglas de `Bash` comparan el texto del comando, así que no son una barrera de seguridad absoluta: `Bash(rm -rf *)` no cubre `rm -fr` ni un borrado hecho con PowerShell. Para eso están el sandbox de Claude Code y los hooks.

## Herramientas por agente

Cada agente de `.claude/agents/` declara sus herramientas con `tools` (lista de permitidas) o `disallowedTools` (las que se le quitan). Ver la tabla de la [guía 6](06-multiagente.md#el-sistema-multiagente-de-la-plantilla).

## Hook `limitar-rutas.mjs`

Un **hook** es un comando que Claude Code ejecuta en un momento fijo (antes de usar una herramienta, después, al terminar…), decida lo que decida el modelo.

El planificador solo debe escribir especificaciones. Su frontmatter registra un hook `PreToolUse` que se ejecuta antes de cada `Write` o `Edit`:

```yaml
hooks:
  PreToolUse:
    - matcher: "Write|Edit"
      hooks:
        - type: command
          command: node
          args: ["${CLAUDE_PROJECT_DIR}/.claude/hooks/limitar-rutas.mjs", "especificaciones"]
```

El script recibe la llamada en JSON y comprueba la ruta:
- Si está dentro de `especificaciones/`, sale con código 0 y la escritura sigue su curso.
- Si está fuera, o no puede leer la entrada, sale con código 2 y Claude recibe el motivo: `Bloqueado por limitar-rutas: solo puedes escribir dentro de especificaciones/…`.

Es reutilizable: pásale como argumentos las carpetas permitidas (`"src", "tests"`…) y úsalo en otros agentes o en `.claude/settings.json`.

Para probarlo a mano desde la raíz del proyecto:

```powershell
# PowerShell
'{"tool_name":"Write","tool_input":{"file_path":"src/app.js"}}' | node .claude/hooks/limitar-rutas.mjs especificaciones; "código: $LASTEXITCODE"
```

```bash
# bash
echo '{"tool_name":"Write","tool_input":{"file_path":"src/app.js"}}' | node .claude/hooks/limitar-rutas.mjs especificaciones; echo "código: $?"
```

Las dos deben mostrar el mensaje de bloqueo y `código: 2`. Con una ruta dentro de `especificaciones/`, el código es 0.

## Modos de permiso

| Modo | Qué hace sin preguntar |
|---|---|
| Manual (`default`) | Solo leer |
| `acceptEdits` | Leer y editar archivos |
| `plan` | Solo leer y planificar: no edita hasta que apruebes el plan |
| `auto` | Casi todo: un clasificador revisa las acciones en lugar de preguntarte. **Es el modo inicial desde la v2.1.283** |

Cambia de modo con el indicador bajo la caja de texto (VS Code) o con `Shift+Tab` (CLI). Las reglas `deny` y `ask` y los hooks se aplican en todos los modos.

## Confiar en la carpeta

La primera vez que abres un proyecto, Claude Code te pide confirmar que confías en la carpeta. Hasta que lo haces, **no se ejecutan los hooks de los agentes ni se aplican las reglas `allow`** del proyecto; las `deny` y `ask` sí se aplican. Confía en la carpeta de tu proyecto para que la plantilla funcione completa.
