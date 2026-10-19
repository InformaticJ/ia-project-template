# 6. Agentes, subagentes y sistema multiagente

> Curso, día 3: multiagentes y subagentes.

- **Agente personalizado**: un asistente configurado para una función concreta, con sus propias instrucciones, herramientas y, opcionalmente, modelo. Por ejemplo, un revisor de código.
- **Subagente**: un agente especializado en el que el agente principal delega una tarea. Trabaja en un contexto separado (no ve tu conversación) y devuelve el resultado.

En Claude Code los dos se definen igual, con un archivo `.claude/agents/<nombre>.md`. Funciona como **subagente** cuando Claude le delega trabajo, y como **agente principal** cuando arrancas la sesión con `claude --agent <nombre>`.

## Agentes de serie de Claude Code

| Curso (OpenCode) | Claude Code |
|---|---|
| `build` (agente por defecto) | La sesión normal |
| `plan` | El modo Plan ([guía 1](01-instrucciones-y-memoria.md#modo-plan)); también existe el subagente `Plan` |
| `general` | Subagente `general-purpose` |
| `explore` | Subagente `Explore` (solo lectura) |

Para usarlos, pídelo con naturalidad («usa el subagente Explore para ver dónde se calcula X») o menciónalos con `@`, por ejemplo `@agent-Explore ¿dónde y cómo se calcula X en este proyecto?`. Con `/agents` ves y gestionas todos los agentes.

## El sistema multiagente de la plantilla

```
petición ──► coordinador ──┬──► planificador    especificación, plan y tareas
                           ├──► implementador   una tarea cada vez
                           └──► revisor         clarificación y validación
                    │
                    ▼
        resultado: ¿pasa? sí / no
```

| Agente | Archivo | Papel | Herramientas |
|---|---|---|---|
| coordinador | [`coordinador.md`](../../.claude/agents/coordinador.md) | Organiza las fases, transmite el contexto y habla contigo. No edita ni ejecuta nada | Solo puede delegar en los otros tres, leer y preguntarte |
| planificador | [`planificador.md`](../../.claude/agents/planificador.md) | Redacta la especificación, el plan y las tareas | Leer y escribir, **solo dentro de `especificaciones/`** (lo impone un hook); sin terminal ni web |
| implementador | [`implementador.md`](../../.claude/agents/implementador.md) | Implementa una tarea, tests primero | Todas menos web y subagentes |
| revisor | [`revisor.md`](../../.claude/agents/revisor.md) | Revisa la especificación como QA y valida la implementación RF por RF. Empieza siempre con `VEREDICTO: APROBADO` o `VEREDICTO: CAMBIOS NECESARIOS` | Todas menos editar, web y subagentes |

Los cuatro precargan la skill `sdd`. El flujo del coordinador es: especificación → clarificación → **tu aprobación** → plan y tareas → **tu aprobación** → implementación tarea a tarea → validación → correcciones (máximo 2 vueltas) → cierre.

### Cómo lanzarlo

**En el panel de VS Code** (lo habitual si usas la extensión):

```text
/sdd-flujo Quiero añadir un objetivo semanal de estudio: poder fijar cuántos minutos quiero estudiar cada semana y ver cuánto llevo, para motivarme a cumplirlo.
```

El comando hace que la sesión actúe como coordinador. Aquí sus límites son instrucciones, no permisos: si intenta editar algo por su cuenta, recházalo.

**En la terminal, con límites reales** (fiel al curso):

```bash
claude --agent coordinador
```

Así la sesión principal solo tiene las herramientas del coordinador: no puede editar ni ejecutar comandos, y solo puede delegar en `planificador`, `implementador` y `revisor`. Escribe tu petición y añade «Sigue el flujo SDD completo».

Necesita la CLI de Claude Code (la extensión de VS Code no la instala). En Windows, desde PowerShell:

```powershell
irm https://claude.ai/install.ps1 | iex
```

En macOS, Linux o WSL: `curl -fsSL https://claude.ai/install.sh | bash`. Puedes usarla en la terminal integrada de VS Code (`` Ctrl+` ``).

Mientras trabajan los subagentes, en VS Code verás su progreso bajo la llamada que los lanzó. El contador de agentes, bajo la caja de texto, abre el mapa de agentes.

### Revisores en paralelo

Varios subagentes pueden trabajar a la vez. Prompt del curso, adaptado:

```text
Lanza en paralelo tres subagentes revisor sobre la especificación 002, cada uno con un foco distinto:
1. Constitución y reglas del proyecto (las skills que apliquen).
2. Interfaz: accesibilidad y vista móvil con Chrome DevTools.
3. Tests: qué RF están cubiertos por los tests y cuáles no.
Cuando terminen los tres, junta sus resultados en un único informe, sin duplicados, con un veredicto final.
```

## Crear tus propios agentes

1. Crea `.claude/agents/<nombre>.md`:

   ```markdown
   ---
   name: <nombre>
   description: <cuándo debe delegarse en este agente>
   tools: Read, Grep, Glob
   model: sonnet
   skills:
     - <skill que se precarga>
   ---

   <Instrucciones: rol, cómo trabaja y qué devuelve.>
   ```

   - `tools` es la lista de herramientas permitidas; si la omites, hereda todas. Para quitar solo algunas, usa `disallowedTools`.
   - `model` es opcional: `sonnet`, `opus`, `haiku`, un ID completo o `inherit`.
2. Comprueba con `/agents` que aparece (o abre una conversación nueva).

**Modelo por agente**: los agentes de la plantilla heredan el modelo de la sesión. Si quieres aplicar el criterio del curso (modelo potente para pensar y planificar, medio para el día a día, rápido y barato para tareas mecánicas), añade `model:` a cada uno; por ejemplo, `opus` en `planificador` y `sonnet` en `implementador`.

> **Diferencia con el curso**: OpenCode usa `mode: primary | subagent` y una lista `permissions` (acción, recurso, efecto). En Claude Code las herramientas de cada agente se fijan con `tools` o `disallowedTools`, y los límites por ruta (el «solo `specs/**`» del planificador del curso) se imponen con un hook ([guía 7](07-guardarrailes.md)). Para limitar en qué subagentes puede delegar el coordinador se usa `Agent(planificador, implementador, revisor)` en `tools`, que solo tiene efecto con `claude --agent`.
