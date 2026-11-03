import { POLITICA } from './politica'

const BRASA = '#D94F2B'

function Parrafo({ etiqueta, texto }) {
  return (
    <p>
      {etiqueta && <strong className="font-semibold">{etiqueta} </strong>}
      {texto}
    </p>
  )
}

// Capa 1 (resumen) y, desplegable, capa 2 (detalle). Lo usan la página /privacidad y la ventana del formulario.
export default function ContenidoPolitica({ idioma }) {
  const p = POLITICA[idioma]
  return (
    <div className="space-y-3 text-[14px] leading-snug">
      <h2 className="text-2xl font-light tracking-tight" style={{ color: BRASA }}>{p.resumenTitulo}</h2>
      {p.resumen.map(([etiqueta, texto]) => <Parrafo key={etiqueta} etiqueta={etiqueta} texto={texto} />)}

      <details className="pt-2">
        <summary
          className="cursor-pointer text-[11px] uppercase tracking-[0.18em] font-semibold underline underline-offset-4"
        >
          {p.verDetalle}
        </summary>
        <div className="space-y-3 pt-4">
          {p.secciones.map(s => (
            <section key={s.titulo} className="space-y-3 pb-2">
              <h3 className="text-base font-semibold pt-2">{s.titulo}</h3>
              {s.parrafos.map(([etiqueta, texto]) => <Parrafo key={etiqueta + texto} etiqueta={etiqueta} texto={texto} />)}
            </section>
          ))}
          <section className="space-y-3">
            <h3 className="text-base font-semibold pt-2">{p.comunTitulo}</h3>
            <div className="p-3 border-l-4" style={{ borderColor: BRASA, background: 'rgba(217,79,43,0.08)' }}>
              <p className="font-semibold mb-1">{p.oposicion.titulo}</p>
              <p>{p.oposicion.texto}</p>
            </div>
            {p.comun.map(([etiqueta, texto]) => <Parrafo key={etiqueta} etiqueta={etiqueta} texto={texto} />)}
          </section>
        </div>
      </details>
    </div>
  )
}
