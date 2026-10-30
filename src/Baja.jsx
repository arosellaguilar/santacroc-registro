import { useState } from 'react'
import { supabase } from './supabase'
import { TEXTOS_BAJA, IDIOMAS, detectarIdioma } from './textos'

// Misma paleta de marca que el formulario (docs/diseño web y etiquetas/guia_estilo.html)
const LLUM = '#FFF8E7'
const BRASA = '#D94F2B'
const NIT = '#1A1410'
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function idiomaInicial() {
  const l = new URLSearchParams(window.location.search).get('l')
  return IDIOMAS.includes(l) ? l : detectarIdioma()
}

export default function Baja({ token }) {
  const [idioma, setIdioma] = useState(idiomaInicial)
  const [estado, setEstado] = useState(UUID.test(token || '') ? 'pregunta' : 'invalido') // pregunta | enviando | hecho | invalido | error
  const t = TEXTOS_BAJA[idioma]

  async function confirmar() {
    setEstado('enviando')
    const { data, error } = await supabase.rpc('baja_lead', { p_token: token })
    if (error) setEstado('error')
    else setEstado(data?.ok ? 'hecho' : 'invalido')
  }

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

        {(estado === 'pregunta' || estado === 'enviando' || estado === 'error') && (
          <>
            <h1 className="text-3xl font-light leading-tight tracking-tight mb-4">{t.titulo}</h1>
            <p className="font-light opacity-80 mb-8">{t.texto}</p>
            {estado === 'error' && <p className="mb-4 text-sm font-semibold" style={{ color: BRASA }}>{t.error}</p>}
            <button
              type="button" onClick={confirmar} disabled={estado === 'enviando'}
              className="w-full h-14 text-sm uppercase tracking-[0.2em] font-semibold disabled:opacity-60"
              style={{ background: BRASA, color: LLUM }}
            >
              {estado === 'enviando' ? t.enviando : t.boton}
            </button>
          </>
        )}
        {estado === 'hecho' && <p className="text-2xl font-light" style={{ color: BRASA }}>{t.hecho}</p>}
        {estado === 'invalido' && <p className="font-light">{t.invalido}</p>}
      </div>
    </div>
  )
}
