import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import { TEXTOS, IDIOMAS, VERSION_LEGAL, URL_POLITICA_WEB, detectarIdioma } from './textos'

// Paleta de marca de docs/diseño web y etiquetas/guia_estilo.html.
const LLUM = '#FFF8E7'
const BRASA = '#D94F2B'
const NIT = '#1A1410'

const TIPOS_NEGOCIO = ['TIENDA', 'RESTAURANTE', 'CATERING', 'DISTRIBUIDOR', 'OTRO']

const FORM_VACIO = {
  tipo: 'PARTICULAR',
  nombre: '',
  empresa: '',
  tipoNegocio: '',
  tipoNegocioOtro: '',
  direccion: '',
  codigoPostal: '',
  poblacion: '',
  email: '',
  telefono: '',
  mensaje: '',
  consentimiento: false,
  consentimientoComercial: false,
  web: '', // campo trampa anti-bots: las personas no lo ven
}

const CAMPO = 'w-full h-12 px-3 text-base bg-white border border-black/15 focus:outline-none focus:border-[#D94F2B]'
const ETIQUETA = 'block text-[11px] uppercase tracking-[0.18em] mb-1.5 opacity-70'

function urlImagen(path) {
  if (!path) return null
  return supabase.storage.from('eventos-publico').getPublicUrl(path).data.publicUrl
}

function aFecha(s) {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function formatearFechas(inicio, fin, idioma) {
  if (!inicio || !fin) return ''
  try {
    const f = new Intl.DateTimeFormat(idioma, { day: 'numeric', month: 'long', year: 'numeric' })
    return inicio === fin ? f.format(aFecha(inicio)) : f.formatRange(aFecha(inicio), aFecha(fin))
  } catch {
    return `${inicio} - ${fin}`
  }
}

function Campo({ etiqueta, children }) {
  return (
    <label className="block">
      <span className={ETIQUETA}>{etiqueta}</span>
      {children}
    </label>
  )
}

export default function RegistroEvento() {
  // registro.santacroc.com/<evento>; la raíz es el formulario genérico
  const slug = window.location.pathname.split('/').filter(Boolean)[0] ?? ''
  const [idioma, setIdioma] = useState(detectarIdioma)
  const [evento, setEvento] = useState(null)
  const [estado, setEstado] = useState('cargando') // cargando | listo | error | enviado
  const [form, setForm] = useState(FORM_VACIO)
  const [enviando, setEnviando] = useState(false)
  const [errorEnvio, setErrorEnvio] = useState('')
  const [enZona, setEnZona] = useState(false)
  const [verPolitica, setVerPolitica] = useState(false)
  const [politicaLeida, setPoliticaLeida] = useState(false)
  const t = TEXTOS[idioma]
  const esEmpresa = form.tipo === 'EMPRESA'

  useEffect(() => {
    let cancelado = false
    setEstado('cargando')
    supabase.rpc('get_evento_publico', { p_slug: slug ?? '' }).then(({ data, error }) => {
      if (cancelado) return
      if (error || !data) {
        setEstado('error')
        return
      }
      setEvento(data)
      setEstado('listo')
      // Contador anónimo de visitas (sin datos personales). No cuenta las pruebas en local.
      if (!['localhost', '127.0.0.1'].includes(window.location.hostname)) {
        supabase.rpc('registrar_visita_evento', { p_slug: slug })
      }
    })
    return () => { cancelado = true }
  }, [slug])

  useEffect(() => {
    document.documentElement.lang = idioma
    if (evento?.nombre) document.title = evento.nombre
  }, [idioma, evento])

  function cambiar(campo, valor) {
    setForm(f => ({ ...f, [campo]: valor }))
  }

  async function enviar(e) {
    e.preventDefault()
    if (enviando) return
    setEnviando(true)
    setErrorEnvio('')
    const { data, error } = await supabase.rpc('registrar_lead_evento', {
      p_slug: evento?.slug ?? '',
      p_tipo_contacto: form.tipo,
      p_nombre: form.nombre,
      p_empresa: esEmpresa ? form.empresa : '',
      p_tipo_negocio: esEmpresa ? form.tipoNegocio : null,
      p_tipo_negocio_otro: esEmpresa && form.tipoNegocio === 'OTRO' ? form.tipoNegocioOtro : null,
      p_direccion: form.direccion,
      p_codigo_postal: form.codigoPostal,
      p_poblacion: form.poblacion,
      p_email: form.email,
      p_telefono: form.telefono,
      p_mensaje: form.mensaje,
      p_idioma: idioma,
      p_consentimiento: form.consentimiento,
      p_consentimiento_comercial: form.consentimientoComercial,
      p_version_legal: VERSION_LEGAL,
      p_trampa: form.web,
    })
    setEnviando(false)
    if (error) {
      const codigo = Object.keys(t.errores).find(c => c !== 'generico' && error.message?.includes(c))
      setErrorEnvio(t.errores[codigo ?? 'generico'])
      return
    }
    setEnZona(data?.en_zona === true)
    setEstado('enviado')
  }

  function abrirPolitica() {
    setVerPolitica(true)
    setPoliticaLeida(true)
  }

  function otraPersona() {
    setPoliticaLeida(false)
    setEnZona(false)
    setForm(FORM_VACIO)
    setErrorEnvio('')
    setEstado('listo')
  }

  const fondo = urlImagen(evento?.fondo_path)
  const logos = [evento?.logo_feria_path, evento?.logo_evento_path].map(urlImagen).filter(Boolean)
  const fechas = evento ? formatearFechas(evento.fecha_inicio, evento.fecha_fin, idioma) : ''
  const lineaEvento = evento?.activo
    ? [evento.nombre, evento.ciudad, fechas].filter(Boolean).join(' · ')
    : ''

  return (
    <div
      className="min-h-screen relative"
      style={{ background: LLUM, color: NIT, fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      {evento?.activo && fondo && (
        <>
          <img src={fondo} alt="" className="fixed inset-0 w-full h-full object-cover" />
          <div className="fixed inset-0" style={{ background: 'rgba(26,20,16,0.55)' }} />
        </>
      )}

      <div className="relative max-w-lg mx-auto px-4 py-6">
        <header className="p-5 mb-3" style={{ background: LLUM }}>
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="text-[11px] uppercase tracking-[0.25em]" style={{ color: BRASA }}>
              SåntåCroc
            </span>
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

          {evento?.activo && logos.length > 0 && (
            <div className="flex items-center gap-5 mb-4">
              {logos.map(src => (
                <img key={src} src={src} alt="" className="h-14 max-w-[45%] object-contain" />
              ))}
            </div>
          )}

          {lineaEvento && (
            <p className="text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: BRASA }}>
              {t.eventoKicker} {lineaEvento}
            </p>
          )}
          <h1 className="text-4xl font-light leading-[0.98] tracking-tight mb-3">{t.titulo}</h1>
          <p className="text-base font-light opacity-80">{t.subtitulo}</p>
        </header>

        <main className="p-5" style={{ background: LLUM }}>
          {estado === 'cargando' && <p className="py-8 text-center opacity-60">{t.cargando}</p>}
          {estado === 'error' && <p className="py-8 text-center">{t.errorCarga}</p>}

          {estado === 'enviado' && (
            <div className="py-6 text-center">
              <h2 className="text-3xl font-light mb-3" style={{ color: BRASA }}>{t.graciasTitulo}</h2>
              <p className="mb-4 font-light">{t.graciasTexto}</p>
              {enZona && (
                <p className="mb-8 p-3 text-sm font-semibold" style={{ background: 'rgba(232,160,32,0.18)' }}>
                  {t.avisoZona}
                </p>
              )}
              {!enZona && <div className="mb-4" />}
              <button
                type="button"
                onClick={otraPersona}
                className="text-[11px] uppercase tracking-[0.2em] border-b border-current pb-0.5 opacity-60"
              >
                {t.otraPersona}
              </button>
            </div>
          )}

          {estado === 'listo' && (
            <form onSubmit={enviar} className="space-y-4">
              <div>
                <span className={ETIQUETA}>{t.quienEres}</span>
                <div className="grid grid-cols-2 gap-2">
                  {[['PARTICULAR', t.particular], ['EMPRESA', t.empresa]].map(([valor, texto]) => (
                    <button
                      key={valor}
                      type="button"
                      onClick={() => cambiar('tipo', valor)}
                      className="h-14 text-sm uppercase tracking-[0.12em] font-semibold"
                      style={form.tipo === valor
                        ? { background: BRASA, color: LLUM }
                        : { background: 'white', color: NIT, border: '1px solid rgba(0,0,0,0.15)' }}
                    >
                      {texto}
                    </button>
                  ))}
                </div>
              </div>

              {esEmpresa && (
                <>
                  <Campo etiqueta={t.nombreEmpresa}>
                    <input
                      required maxLength={150} autoComplete="organization"
                      value={form.empresa} onChange={e => cambiar('empresa', e.target.value)}
                      className={CAMPO}
                    />
                  </Campo>
                  <Campo etiqueta={t.tipoNegocio}>
                    <select
                      required value={form.tipoNegocio}
                      onChange={e => cambiar('tipoNegocio', e.target.value)}
                      className={CAMPO}
                    >
                      <option value="" disabled>{t.elige}</option>
                      {TIPOS_NEGOCIO.map(k => <option key={k} value={k}>{t.tipos[k]}</option>)}
                    </select>
                  </Campo>
                  {form.tipoNegocio === 'OTRO' && (
                    <Campo etiqueta={t.otroTipo}>
                      <input
                        required maxLength={100}
                        value={form.tipoNegocioOtro} onChange={e => cambiar('tipoNegocioOtro', e.target.value)}
                        className={CAMPO}
                      />
                    </Campo>
                  )}
                </>
              )}

              <Campo etiqueta={esEmpresa ? t.nombreContacto : t.nombrePersona}>
                <input
                  required maxLength={120} autoComplete="name"
                  value={form.nombre} onChange={e => cambiar('nombre', e.target.value)}
                  className={CAMPO}
                />
              </Campo>
              <Campo etiqueta={t.direccion}>
                <input
                  required maxLength={200} autoComplete="street-address"
                  value={form.direccion} onChange={e => cambiar('direccion', e.target.value)}
                  className={CAMPO}
                />
              </Campo>
              <Campo etiqueta={t.codigoPostal}>
                <input
                  required maxLength={10} autoComplete="postal-code"
                  value={form.codigoPostal} onChange={e => cambiar('codigoPostal', e.target.value)}
                  className={CAMPO}
                />
              </Campo>
              <Campo etiqueta={t.poblacion}>
                <input
                  required maxLength={100} autoComplete="address-level2"
                  value={form.poblacion} onChange={e => cambiar('poblacion', e.target.value)}
                  className={CAMPO}
                />
              </Campo>
              <Campo etiqueta={t.email}>
                <input
                  required type="email" maxLength={160} autoComplete="email" inputMode="email"
                  value={form.email} onChange={e => cambiar('email', e.target.value)}
                  className={CAMPO}
                />
              </Campo>
              <Campo etiqueta={t.telefono}>
                <input
                  required type="tel" maxLength={30} autoComplete="tel" inputMode="tel"
                  value={form.telefono} onChange={e => cambiar('telefono', e.target.value)}
                  className={CAMPO}
                />
              </Campo>

              <Campo etiqueta={t.mensaje}>
                <textarea
                  rows={3} maxLength={1000}
                  value={form.mensaje} onChange={e => cambiar('mensaje', e.target.value)}
                  className="w-full px-3 py-2 text-base bg-white border border-black/15 focus:outline-none focus:border-[#D94F2B]"
                />
              </Campo>

              {/* Trampa anti-bots */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                <label>
                  Web
                  <input
                    type="text" name="web" tabIndex={-1} autoComplete="off"
                    value={form.web} onChange={e => cambiar('web', e.target.value)}
                  />
                </label>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="button" onClick={abrirPolitica}
                  className="text-[11px] uppercase tracking-[0.18em] underline underline-offset-4"
                >
                  {t.leerPolitica}
                </button>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox" required checked={form.consentimiento}
                    onChange={e => {
                      // Hay que abrir la política antes de poder aceptarla
                      if (!politicaLeida) { abrirPolitica(); return }
                      cambiar('consentimiento', e.target.checked)
                    }}
                    className="mt-1 h-5 w-5 shrink-0 accent-[#D94F2B]"
                  />
                  <span className="text-sm leading-snug">{t.consentimiento}</span>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox" checked={form.consentimientoComercial}
                    onChange={e => cambiar('consentimientoComercial', e.target.checked)}
                    className="mt-1 h-5 w-5 shrink-0 accent-[#D94F2B]"
                  />
                  <span className="text-sm leading-snug">{t.consentimientoComercial}</span>
                </label>
              </div>

              {errorEnvio && (
                <p role="alert" className="text-sm font-semibold" style={{ color: BRASA }}>{errorEnvio}</p>
              )}

              <button
                type="submit" disabled={enviando}
                className="w-full h-14 text-sm uppercase tracking-[0.22em] font-semibold disabled:opacity-60"
                style={{ background: BRASA, color: LLUM }}
              >
                {enviando ? t.enviando : t.enviar}
              </button>
            </form>
          )}
        </main>

        {verPolitica && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
            style={{ background: 'rgba(26,20,16,0.75)' }}
            role="dialog" aria-modal="true" aria-label={t.legalTitulo}
          >
            <div className="w-full sm:max-w-lg max-h-[92vh] flex flex-col" style={{ background: LLUM, color: NIT }}>
              <div className="p-5 pb-3 text-[11px] uppercase tracking-[0.2em] font-semibold" style={{ color: BRASA }}>
                {t.legalTitulo}
              </div>
              <div className="px-5 overflow-y-auto space-y-3 text-[14px] leading-snug">
                {t.legal.map(p => <p key={p}>{p}</p>)}
                <p>
                  <a href={URL_POLITICA_WEB} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                    {t.politicaWeb}
                  </a>
                </p>
              </div>
              <div className="p-5 pt-4">
                <button
                  type="button" onClick={() => setVerPolitica(false)}
                  className="w-full h-12 text-sm uppercase tracking-[0.2em] font-semibold"
                  style={{ background: BRASA, color: LLUM }}
                >
                  {t.cerrarPolitica}
                </button>
              </div>
            </div>
          </div>
        )}

        <p className="mt-3 text-center text-[11px] tracking-wide"
           style={{ color: evento?.activo && fondo ? LLUM : NIT, opacity: 0.6 }}>
          La Singular Gourmet S.L.
        </p>
      </div>
    </div>
  )
}
