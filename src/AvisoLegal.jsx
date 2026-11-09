import { useEffect, useState } from 'react'
import { IDIOMAS, TEXTOS, detectarIdioma } from './textos'
import { AVISO } from './aviso'

// Misma paleta de marca que el formulario y la política (docs/diseño web y etiquetas/guia_estilo.html)
const LLUM = '#FFF8E7'
const BRASA = '#D94F2B'
const NIT = '#1A1410'

function idiomaInicial() {
  const l = new URLSearchParams(window.location.search).get('l')
  return IDIOMAS.includes(l) ? l : detectarIdioma()
}

// registro.santacroc.com/aviso-legal[?l=ca|es|en]. El formulario y el portal de clientes enlazan aquí.
export default function AvisoLegal() {
  const [idioma, setIdioma] = useState(idiomaInicial)
  const a = AVISO[idioma]

  useEffect(() => {
    document.documentElement.lang = idioma
    document.title = `${a.titulo} - SåntåCroc`
  }, [idioma, a.titulo])

  return (
    <div
      className="min-h-screen"
      style={{ background: LLUM, color: NIT, fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      <div className="max-w-lg mx-auto px-4 py-10">
        <div className="flex items-center justify-between gap-3 mb-8">
          <span className="text-[11px] uppercase tracking-[0.25em]" style={{ color: BRASA }}>SåntåCroc</span>
          <div className="flex gap-1">
            {IDIOMAS.map(i => (
              <button
                key={i}
                type="button"
                onClick={() => setIdioma(i)}
                aria-label={TEXTOS[i].nombreIdioma}
                className="h-9 min-w-9 px-2 text-[11px] uppercase tracking-[0.15em]"
                style={i === idioma
                  ? { background: NIT, color: LLUM }
                  : { background: 'transparent', color: NIT, border: '1px solid rgba(0,0,0,0.15)' }}
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 text-[14px] leading-snug">
          <h1 className="text-2xl font-light tracking-tight" style={{ color: BRASA }}>{a.titulo}</h1>
          <p>{a.intro}</p>
          {a.filas.map(([etiqueta, texto]) => (
            <p key={etiqueta}>
              <strong className="font-semibold">{etiqueta} </strong>
              {texto}
            </p>
          ))}
          <p className="pt-2">
            {a.politicaFrase}{' '}
            <a href={`/privacidad?l=${idioma}`} className="underline underline-offset-4">{a.politicaEnlace}</a>.
          </p>
        </div>

        <p className="mt-10 text-center text-[11px] tracking-wide opacity-60">La Singular Gourmet, S.L.U.</p>
      </div>
    </div>
  )
}
