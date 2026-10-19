# Especificación 001 — Mapa de calor de estudio

Estado: aprobada

## Contexto y objetivo
La racha solo dice cuántos días seguidos llevo estudiando: no enseña la constancia de las últimas semanas ni cuánto estudié cada día. Un mapa de calor tipo GitHub permite ver de un vistazo los huecos y los días fuertes, y motiva a «rellenar» la cuadrícula. Cuantos más minutos estudiados en un día, más intenso es su color.

## Usuarios
La persona que usa el Diario de Estudio para registrar sus sesiones (un único usuario, en su navegador).

## Historias de usuario
- HU-1. Como estudiante, quiero ver de un vistazo qué días de las últimas semanas he estudiado para detectar huecos en mi constancia.
- HU-2. Como estudiante, quiero distinguir los días en que estudié mucho de los días en que estudié poco para motivarme a mantener sesiones largas.

## Definiciones
- **Día**: fecha local del usuario, en formato AAAA-MM-DD.
- **Semana**: de lunes a domingo.
- **Minutos de un día**: la suma de los minutos de todas las sesiones de ese día.
- **Nivel**: intensidad del color de un día, de 0 (sin estudio) a 4 (máxima).

## Requisitos funcionales
- RF-1: EL SISTEMA mostrará un mapa de calor de las últimas 12 semanas, con una columna por semana (filas de lunes a domingo) y la semana actual a la derecha.
- RF-2: EL SISTEMA asignará a cada día un nivel según sus minutos: 0 minutos → nivel 0; de 1 a 29 → nivel 1; de 30 a 59 → nivel 2; de 60 a 119 → nivel 3; 120 o más → nivel 4.
- RF-3: CUANDO el usuario registre una sesión, EL SISTEMA actualizará el mapa sin recargar la página.
- RF-4: CUANDO el usuario pase el puntero por un día o lo toque, EL SISTEMA mostrará su fecha y sus minutos totales (p. ej., «lunes, 3 de marzo: 45 min»).
- RF-5: SI una sesión tiene una fecha posterior a hoy, ENTONCES EL SISTEMA no la contará en el mapa.
- RF-6: SI una sesión guardada tiene una fecha no válida o unos minutos que no son un número mayor que 0, ENTONCES EL SISTEMA la ignorará en el mapa y el resto de la página seguirá funcionando.
- RF-7: MIENTRAS no haya ninguna sesión en las últimas 12 semanas, EL SISTEMA mostrará el mapa vacío (todos los días a nivel 0) y el texto «Aún no hay sesiones en las últimas 12 semanas».
- RF-8: EL SISTEMA mostrará los días de la semana actual posteriores a hoy como no disponibles, con un aspecto distinto del nivel 0.
- RF-9: EL SISTEMA mostrará una leyenda con los 5 niveles y sus rangos de minutos.

## Requisitos no funcionales
- Cumple la constitución: sin dependencias ni build; funciona abriendo `index.html` con doble clic.
- Con 375 px de ancho, el mapa se ve completo sin desplazamiento horizontal de la página.
- Cada día tiene una etiqueta accesible con su fecha y sus minutos; el nivel no se comunica solo con el color.
- Todos los textos, en español.

## Casos límite
- Sesión registrada a las 00:30: cuenta para ese día local, no para el anterior.
- Semana del cambio de hora (último domingo de marzo y de octubre): no se duplica ni se salta ningún día.
- Varias sesiones el mismo día: se suman sus minutos.
- Sesiones de hace más de 12 semanas: no aparecen en el mapa, pero se conservan.
- Hoy sin sesiones: el día de hoy aparece a nivel 0.
- Datos guardados corruptos o con otro formato: ver RF-6.

## Fuera de alcance
- Hacer clic en un día para filtrar la lista de sesiones.
- Vista anual o cambiar el número de semanas.
- Umbrales o colores configurables.

## Criterios de finalización
- RF-1, RF-2, RF-5, RF-6 y RF-8 (lógica) con tests en verde con `node --test`.
- RF-3, RF-4, RF-7 y RF-9 (interfaz) verificados con Chrome DevTools, incluida la vista móvil de 375 px y sin errores en la consola.
- `MEMORIA.md` actualizada.

## Dudas abiertas
- Ninguna: se resolvieron en la entrevista de `/sdd-especificar`.
