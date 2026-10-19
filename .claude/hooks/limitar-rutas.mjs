#!/usr/bin/env node
// Hook PreToolUse de Claude Code: bloquea las escrituras fuera de las carpetas permitidas.
//
// Uso (en el frontmatter de un agente o en .claude/settings.json):
//   command: node
//   args: ["${CLAUDE_PROJECT_DIR}/.claude/hooks/limitar-rutas.mjs", "especificaciones"]
//
// Claude Code envía por stdin un JSON con tool_name y tool_input (file_path en Write y Edit).
// Código de salida 0: se permite (la llamada sigue el flujo normal de permisos).
// Código de salida 2: se bloquea; el mensaje de stderr le llega a Claude como motivo.

import path from 'node:path';

const carpetasPermitidas = process.argv.slice(2);
const esWindows = process.platform === 'win32';

function bloquear(motivo) {
  console.error(`Bloqueado por limitar-rutas: ${motivo}`);
  process.exit(2);
}

// En Windows, convierte las rutas al estilo Git Bash (/c/Users/...) en rutas nativas (c:/Users/...).
function aRutaNativa(ruta) {
  const unidad = esWindows && /^\/([a-zA-Z])(\/|$)/.exec(ruta);
  return unidad ? `${unidad[1]}:/${ruta.slice(3)}` : ruta;
}

const raizProyecto = aRutaNativa(process.env.CLAUDE_PROJECT_DIR || process.cwd());

// Ruta absoluta y normalizada; en Windows se compara sin distinguir mayúsculas.
function resolver(ruta) {
  const absoluta = path.resolve(raizProyecto, aRutaNativa(ruta));
  return esWindows ? absoluta.toLowerCase() : absoluta;
}

function estaDentro(destino, carpeta) {
  const relativa = path.relative(resolver(carpeta), destino);
  return relativa === '' || (relativa.split(path.sep)[0] !== '..' && !path.isAbsolute(relativa));
}

async function leerEntrada() {
  let texto = '';
  for await (const trozo of process.stdin) texto += trozo;
  return JSON.parse(texto);
}

if (carpetasPermitidas.length === 0) {
  bloquear('no se ha indicado ninguna carpeta permitida en los argumentos del hook.');
}

let entrada;
try {
  entrada = await leerEntrada();
} catch {
  bloquear('no se ha podido leer la entrada del hook (JSON no válido).');
}

const ruta = entrada?.tool_input?.file_path ?? entrada?.tool_input?.notebook_path;
if (!ruta) process.exit(0); // La herramienta no escribe en un archivo: no hay nada que comprobar.

if (carpetasPermitidas.some((carpeta) => estaDentro(resolver(ruta), carpeta))) process.exit(0);

const permitidas = carpetasPermitidas.map((carpeta) => `${carpeta}/`).join(', ');
bloquear(`solo puedes escribir dentro de ${permitidas}. Ruta solicitada: ${ruta}`);
