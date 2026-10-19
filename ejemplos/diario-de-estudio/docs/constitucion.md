# Constitución — Diario de Estudio

Principios innegociables. Toda especificación, plan y tarea debe cumplirlos.

1. **Simplicidad primero**: HTML, CSS y JS puros. Sin dependencias ni build. Funciona abriendo index.html con doble clic.
2. **La especificación manda**: nada se implementa si no está en la especificación activa. Si falta una decisión, se para y se pregunta.
3. **Lógica separada de la interfaz**: los cálculos (fechas, rachas, estadísticas) son funciones puras, sin DOM ni localStorage, que reciben "hoy" como parámetro.
4. **Tests como puerta**: la lógica se prueba con `node --test`, sin instalar paquetes. Prohibido avanzar con tests en rojo.
5. **Los datos del usuario son sagrados**: localStorage con compatibilidad hacia atrás y fechas siempre en hora local. Nunca se pierde una sesión.
6. **Idioma**: código en inglés; interfaz y documentación en español.
