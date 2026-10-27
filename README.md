# santacroc-registro

Formulario público de registro de contactos (ferias y eventos) de SåntåCroc.
Se publica en `registro.santacroc.com`. Proyecto independiente del ERP.

- `/` → formulario genérico.
- `/<nombre-del-evento>` → formulario personalizado con el evento (el QR de cada evento apunta aquí).
- Los eventos se configuran en el ERP (Administración → Eventos). Esta página solo lee los datos públicos
  y guarda el registro llamando a las funciones `get_evento_publico` y `registrar_lead_evento` de Supabase.
- No usa cookies ni analítica: no guarda nada en el dispositivo del visitante.
- Variables de entorno: ver `.env.example`.
