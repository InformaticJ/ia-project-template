# 4. MCP (Model Context Protocol)

> Curso, día 2: MCP y MCP esenciales.

**MCP** es un protocolo abierto que conecta al agente con herramientas y datos externos. Cada servidor MCP aporta capacidades nuevas: abrir un navegador, consultar documentación, acceder a servicios… Es un estándar abierto, reutilizable entre herramientas y con un ecosistema creciente.

## Servidores incluidos

Están en [`.mcp.json`](../../.mcp.json):

| Servidor | Qué aporta | Requisitos | Lo usan |
|---|---|---|---|
| `chrome-devtools` (Google) | Claude abre tu web en Chrome, la prueba, lee la consola y hace capturas | Node.js LTS y Google Chrome | `/sdd-validar`, `implementador`, `revisor` |
| `context7` (Upstash) | Documentación actualizada de cualquier librería o framework | API key gratuita | Cualquier tarea con librerías |

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "type": "stdio",
      "command": "cmd",
      "args": ["/c", "npx", "-y", "chrome-devtools-mcp@latest", "--no-usage-statistics"]
    },
    "context7": {
      "type": "http",
      "url": "https://mcp.context7.com/mcp",
      "headers": { "Authorization": "Bearer ${CONTEXT7_API_KEY}" }
    }
  }
}
```

### Chrome DevTools

- `--no-usage-statistics` desactiva el envío de estadísticas de uso a Google.
- **Windows**: está configurado como `cmd /c npx …` porque en Windows nativo `npx` es un script `.cmd` y Claude Code no lo arranca directamente.
- **macOS, Linux o WSL**: cambia esas dos líneas por:

  ```json
  "command": "npx",
  "args": ["-y", "chrome-devtools-mcp@latest", "--no-usage-statistics"]
  ```

### Context7

1. Crea una API key gratuita en [context7.com/dashboard](https://context7.com/dashboard).
2. Guárdala en la variable de entorno `CONTEXT7_API_KEY`, nunca en el repositorio:
   - **PowerShell** (permanente para tu usuario):

     ```powershell
     [Environment]::SetEnvironmentVariable("CONTEXT7_API_KEY", "tu-clave", "User")
     ```

   - **bash o zsh**: añade `export CONTEXT7_API_KEY="tu-clave"` a `~/.bashrc` o `~/.zshrc`.
3. Cierra y vuelve a abrir VS Code (o la terminal) para que Claude Code vea la variable.

Para que Claude la use, pídelo con naturalidad («consulta la documentación actualizada de X») o añade «use context7» al prompt.

> **Diferencia con el curso**: el curso ponía la clave directamente en `opencode.json`, en la cabecera `CONTEXT7_API_KEY`. Aquí se lee de una variable de entorno (`${CONTEXT7_API_KEY}`), así que el archivo se puede versionar sin exponer secretos. La cabecera `Authorization: Bearer` es la que indica hoy la documentación de Context7 para Claude Code.

## Aprobar y gestionar los servidores

- La primera vez que abras el proyecto, Claude Code te pedirá **aprobar** los servidores de `.mcp.json`. Es una medida de seguridad: un repositorio no puede aprobar sus propios servidores.
- `/mcp`, en VS Code o en la terminal, muestra el estado de cada servidor (*Connected* o *Failed*) y permite activarlos, desactivarlos, reconectarlos y autenticarlos.
- Si `chrome-devtools` aparece como *Failed*, comprueba que tienes Node.js y Chrome, y que usas la variante de tu sistema operativo (arriba).

## Probarlo (prompt del curso, adaptado)

```text
Usa Chrome DevTools para probar la aplicación:
1. Abre <URL o index.html> en Chrome.
2. <Pasos para probar la funcionalidad.>
3. Comprueba que <resultado esperado>.
4. Revisa la consola por si hay errores.
5. Haz una captura en tamaño móvil (375 px de ancho).

Dime qué has comprobado y si has encontrado algún problema.
```

Para que Claude verifique así después de cada cambio, rellena la sección «Verificación» de `CLAUDE.md`. Por ejemplo: «Después de cada cambio, verifica con el MCP de Chrome DevTools: abre la aplicación, prueba la funcionalidad, revisa la consola y comprueba la vista móvil».

## Añadir más servidores

- Edita `.mcp.json` con el formato de arriba y usa `${VARIABLE}` para cualquier secreto, o
- usa la CLI: `claude mcp add --scope project --transport http <nombre> <url>`.

Otros MCP esenciales del curso: **GitHub** (repositorios, issues y pull requests), **Figma** (convertir diseños en código) y **Supabase** (bases de datos). Directorios para encontrar más:
- https://registry.modelcontextprotocol.io
- https://mcp.directory
- https://mcpservers.org/es
