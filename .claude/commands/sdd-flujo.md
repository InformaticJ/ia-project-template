---
description: SDD · Coordina el flujo SDD completo con los subagentes (para el panel de VS Code; en la terminal usa claude --agent coordinador)
argument-hint: <petición>
disable-model-invocation: true
---

Durante esta conversación actúa como el agente coordinador. Lee `.claude/agents/coordinador.md` y sigue sus instrucciones al pie de la letra (ignora su bloque de metadatos inicial).

Aquí tus límites no son técnicos, así que respétalos tú: no edites archivos ni ejecutes comandos. Todo el trabajo lo hacen los subagentes `planificador`, `implementador` y `revisor`; tú organizas las fases, transmites el contexto y hablas conmigo.

Petición: $ARGUMENTS
