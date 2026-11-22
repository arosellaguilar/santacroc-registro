import { useEffect, useState } from 'react'
import { IDIOMAS, detectarIdioma } from './textos'
import { TEXTOS_ALTA } from './textosAlta'
import ContenidoPolitica from './ContenidoPolitica'

// Formulario de alta de cliente (registro.santacroc.com/alta/<token>).
// Habla solo con la función pública lead-alta-recibir: el token personal del enlace es la única llave.
// Las respuestas van por correo a gestor@; no se guardan en la base de datos del ERP.
const LLUM = '#FFF8E7'
const BRASA = '#D94F2B'
const NIT = '#1A1410'

const FUNCION = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/lead-alta-recibir`
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const MAX_ADJUNTO = 5 * 1024 * 1024
const MAX_PERSONAS = 5

const CAMPO = 'w-full h-12 px-3 text-base bg-white border border-black/15 focus:outline-none focus:border-[#D94F2B]'
const ETIQUETA = 'block text-[11px] uppercase tracking-[0.18em] mb-1.5 opacity-70'

async function llamar(cuerpo) {
  const r = await fetch(FUNCION, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cuerpo),
  })
  return r.json()
}

// IBAN: dígitos de control (módulo 97). El servidor lo vuelve a comprobar.
function ibanValido(v) {
  const s = v.toUpperCase().replace(/[\s-]/g, '')
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(s)) return false
  if (s.startsWith('ES') && s.length !== 24) return false
  const movido = s.slice(4) + s.slice(0, 4)
  let resto = 0
  for (const ch of movido) {
    const val = ch >= 'A' ? String(ch.charCodeAt(0) - 55) : ch
    for (const d of val) resto = (resto * 10 + Number(d)) % 97
  }
  return resto === 1
}

function aBase64(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader()
    lector.onload = () => resolve(String(lector.result).split(',')[1] ?? '')
    lector.onerror = reject
    lector.readAsDataURL(archivo)
  })
}

function Campo({ etiqueta, error, children }) {
  return (
    <label className="block">
      <span className={ETIQUETA}>{etiqueta}</span>
      {children}
      {error && <span role="alert" className="block mt-1 text-xs font-semibold" style={{ color: BRASA }}>{error}</span>}
    </label>
  )
}

function Seccion({ titulo, children }) {
  return (
    <section className="space-y-4 pt-6">
      <h2 className="text-[11px] uppercase tracking-[0.22em] font-semibold pb-2 border-b" style={{ color: BRASA, borderColor: 'rgba(0,0,0,0.12)' }}>
        {titulo}
      </h2>
      {children}
    </section>
  )
}

const PERSONA_VACIA = { nombre: '', doc: '', movil: '' }
const CONTACTO_VACIO = { nombre: '', cargo: '', email: '', movil: '' }

function idiomaInicial() {
  const l = new URLSearchParams(window.location.search).get('l')
  return IDIOMAS.includes(l) ? l : null
}

export default function AltaCliente({ token }) {
  const [idioma, setIdioma] = useState(() => idiomaInicial() ?? detectarIdioma())
  const [idiomaFijado, setIdiomaFijado] = useState(() => idiomaInicial() !== null)
  const [estado, setEstado] = useState(UUID.test(token || '') ? 'cargando' : 'invalido') // cargando | listo | invalido | error | enviado
  const [formas, setFormas] = useState([])
  const [form, setForm] = useState(null)
  const [archivo, setArchivo] = useState(null)
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [verPolitica, setVerPolitica] = useState(false)
  const t = TEXTOS_ALTA[idioma]

  useEffect(() => {
    document.documentElement.lang = idioma
    document.title = t.titulo
  }, [idioma, t.titulo])

  useEffect(() => {
    if (estado !== 'cargando') return undefined
    let cancelado = false
    llamar({ accion: 'cargar', token }).then(res => {
      if (cancelado) return
      if (!res?.ok) { setEstado(res?.motivo === 'INVALIDO' ? 'invalido' : 'error'); return }
      const l = res.lead
      const tel = (l.telefono ?? '').replace(/[\s.-]/g, '').replace(/^\+34/, '')
      const esMovil = /^[67]/.test(tel)
      setFormas(res.formas_pago ?? [])
      if (!idiomaFijado && IDIOMAS.includes(res.idioma)) setIdioma(res.idioma)
      setForm({
        tipo_titular: 'SOCIEDAD',
        razon_social: '',
        nombre_comercial: l.nombre ?? '',
        nif: l.nif ?? '',
        direccion: l.direccion ?? '',
        cp: l.codigo_postal ?? '',
        municipio: l.poblacion ?? '',
        provincia: '',
        pais: 'España',
        tel_fijo: !esMovil ? (l.telefono ?? '') : '',
        tel_movil: esMovil ? (l.telefono ?? '') : '',
        email_contacto: l.email ?? '',
        representantes: [{ ...PERSONA_VACIA }],
        forma_pago_id: '',
        iban: '',
        email_facturacion: '',
        facturacion_igual: true,
        entrega_distinta: false,
        entrega: { direccion: '', cp: '', municipio: '', provincia: '', horario: '' },
        contactos: l.persona_contacto
          ? [{ nombre: l.persona_contacto, cargo: '', email: l.email ?? '', movil: '' }]
          : [],
        actividad: '',
        conocio: '',
        observaciones: '',
        acepta_info: false,
        declara: false,
        web: '',
      })
      setEstado('listo')
    }).catch(() => { if (!cancelado) setEstado('error') })
    return () => { cancelado = true }
  }, [estado, token, idiomaFijado])

  function cambiar(campo, valor) {
    setForm(f => ({ ...f, [campo]: valor }))
    if (errores[campo]) setErrores(e => ({ ...e, [campo]: undefined }))
  }

  function cambiarLista(lista, i, campo, valor) {
    setForm(f => ({ ...f, [lista]: f[lista].map((p, k) => (k === i ? { ...p, [campo]: valor } : p)) }))
  }

  function elegirArchivo(e) {
    const f = e.target.files?.[0]
    e.target.value = ''
    if (!f) return
    if (f.size > MAX_ADJUNTO) { setErrores(er => ({ ...er, mandato: 'ARCHIVO_GRANDE' })); return }
    setArchivo(f)
    setErrores(er => ({ ...er, mandato: undefined }))
  }

  const forma = formas.find(f => f.id === form?.forma_pago_id)
  const esRemesa = forma?.tipo_cobro === 'giro'
  const autonomo = form?.tipo_titular === 'AUTONOMO'

  async function enviar(e) {
    e.preventDefault()
    if (enviando) return
    setErrorGeneral('')

    // Comprobaciones locales de lo que el navegador no valida solo; el servidor repite todas
    const locales = {}
    if (esRemesa) {
      if (!form.iban.trim()) locales.iban = 'REQUERIDO'
      else if (!ibanValido(form.iban)) locales.iban = 'NO_VALIDO'
      if (!archivo) locales.mandato = 'REQUERIDO'
    }
    if (!form.tel_fijo.trim() && !form.tel_movil.trim()) locales.telefono = 'REQUERIDO'
    if (!autonomo && !form.representantes.some(r => r.nombre.trim() && r.doc.trim())) locales.representantes = 'REQUERIDO'
    if (Object.keys(locales).length > 0) {
      setErrores(locales)
      setErrorGeneral(t.revisa)
      return
    }

    setEnviando(true)
    setErrores({})
    try {
      const mandato = esRemesa && archivo ? { nombre: archivo.name, base64: await aBase64(archivo) } : undefined
      const { facturacion_igual: igual, ...resto } = form
      const res = await llamar({
        accion: 'enviar',
        token,
        datos: { ...resto, email_facturacion: igual ? form.email_contacto : form.email_facturacion },
        mandato,
      })
      if (res?.ok) { setEstado('enviado'); window.scrollTo(0, 0); return }
      if (res?.motivo === 'INVALIDO') { setEstado('invalido'); return }
      if (res?.motivo === 'VALIDACION') {
        setErrores(res.errores ?? {})
        setErrorGeneral(t.revisa)
      } else if (res?.motivo === 'ARCHIVO_GRANDE') {
        setErrores({ mandato: 'ARCHIVO_GRANDE' })
        setErrorGeneral(t.revisa)
      } else {
        setErrorGeneral(t.errorEnvio)
      }
    } catch {
      setErrorGeneral(t.errorEnvio)
    } finally {
      setEnviando(false)
    }
  }

  const msg = c => (errores[c] ? (t.errores[errores[c]] ?? t.errores.NO_VALIDO) : null)

  return (
    <div className="min-h-screen" style={{ background: LLUM, color: NIT, fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      <div className="max-w-xl mx-auto px-4 py-6">
        <header className="p-5 mb-3">
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="text-[11px] uppercase tracking-[0.25em]" style={{ color: BRASA }}>SåntåCroc</span>
            <div className="flex gap-1">
              {IDIOMAS.map(i => (
                <button
                  key={i} type="button" onClick={() => { setIdioma(i); setIdiomaFijado(true) }}
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
          <h1 className="text-4xl font-light leading-[0.98] tracking-tight mb-3">{t.titulo}</h1>
          {estado === 'listo' && <p className="text-base font-light opacity-80">{t.subtitulo}</p>}
        </header>

        <main className="px-5 pb-8">
          {estado === 'cargando' && <p className="py-8 text-center opacity-60">{t.cargando}</p>}
          {estado === 'invalido' && <p className="py-8 font-light">{t.invalido}</p>}
          {estado === 'error' && <p className="py-8 font-light">{t.errorCarga}</p>}
          {estado === 'enviado' && (
            <div className="py-6">
              <h2 className="text-3xl font-light mb-3" style={{ color: BRASA }}>{t.graciasTitulo}</h2>
              <p className="font-light">{t.graciasTexto}</p>
            </div>
          )}

          {estado === 'listo' && form && (
            <form onSubmit={enviar} className="space-y-4" noValidate={false}>
              <Seccion titulo={t.secDatos}>
                <div>
                  <span className={ETIQUETA}>{t.quien}</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[['SOCIEDAD', t.sociedad], ['AUTONOMO', t.autonomo]].map(([valor, texto]) => (
                      <button
                        key={valor} type="button" onClick={() => cambiar('tipo_titular', valor)}
                        className="h-12 text-sm uppercase tracking-[0.12em] font-semibold"
                        style={form.tipo_titular === valor
                          ? { background: BRASA, color: LLUM }
                          : { background: 'white', color: NIT, border: '1px solid rgba(0,0,0,0.15)' }}
                      >
                        {texto}
                      </button>
                    ))}
                  </div>
                </div>
                <Campo etiqueta={`${autonomo ? t.nombreApellidos : t.razonSocial} *`} error={msg('razon_social')}>
                  <input required maxLength={150} value={form.razon_social} onChange={e => cambiar('razon_social', e.target.value)} className={CAMPO} />
                </Campo>
                <Campo etiqueta={`${t.nombreComercial} *`} error={msg('nombre_comercial')}>
                  <input required maxLength={150} value={form.nombre_comercial} onChange={e => cambiar('nombre_comercial', e.target.value)} className={CAMPO} />
                </Campo>
                <Campo etiqueta={`${t.nif} *`} error={msg('nif')}>
                  <input required maxLength={20} value={form.nif} onChange={e => cambiar('nif', e.target.value)} className={CAMPO} />
                </Campo>
                <Campo etiqueta={`${t.direccion} *`} error={msg('direccion')}>
                  <input required maxLength={200} autoComplete="street-address" value={form.direccion} onChange={e => cambiar('direccion', e.target.value)} className={CAMPO} />
                </Campo>
                <div className="grid grid-cols-3 gap-3">
                  <Campo etiqueta={`${t.cp} *`} error={msg('cp')}>
                    <input required maxLength={10} autoComplete="postal-code" value={form.cp} onChange={e => cambiar('cp', e.target.value)} className={CAMPO} />
                  </Campo>
                  <div className="col-span-2">
                    <Campo etiqueta={`${t.municipio} *`} error={msg('municipio')}>
                      <input required maxLength={100} autoComplete="address-level2" value={form.municipio} onChange={e => cambiar('municipio', e.target.value)} className={CAMPO} />
                    </Campo>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Campo etiqueta={`${t.provincia} *`} error={msg('provincia')}>
                    <input required maxLength={100} autoComplete="address-level1" value={form.provincia} onChange={e => cambiar('provincia', e.target.value)} className={CAMPO} />
                  </Campo>
                  <Campo etiqueta={`${t.pais} *`}>
                    <input required maxLength={60} autoComplete="country-name" value={form.pais} onChange={e => cambiar('pais', e.target.value)} className={CAMPO} />
                  </Campo>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Campo etiqueta={t.telFijo} error={msg('tel_fijo')}>
                    <input type="tel" inputMode="tel" maxLength={25} value={form.tel_fijo} onChange={e => cambiar('tel_fijo', e.target.value)} className={CAMPO} />
                  </Campo>
                  <Campo etiqueta={t.telMovil} error={msg('tel_movil')}>
                    <input type="tel" inputMode="tel" maxLength={25} autoComplete="tel" value={form.tel_movil} onChange={e => cambiar('tel_movil', e.target.value)} className={CAMPO} />
                  </Campo>
                </div>
                <p className="text-xs -mt-2" style={errores.telefono ? { color: BRASA, fontWeight: 600 } : { opacity: 0.7 }}>* {t.avisoTelefono}</p>
                <Campo etiqueta={`${t.emailContacto} *`} error={msg('email_contacto')}>
                  <input required type="email" inputMode="email" maxLength={120} autoComplete="email" value={form.email_contacto} onChange={e => cambiar('email_contacto', e.target.value)} className={CAMPO} />
                </Campo>
              </Seccion>

              {!autonomo && (
                <Seccion titulo={t.secRepresentantes}>
                  <p className="text-xs opacity-70 -mt-2">{t.avisoRepresentantes}</p>
                  {errores.representantes && (
                    <p role="alert" className="text-xs font-semibold" style={{ color: BRASA }}>{t.errores[errores.representantes] ?? t.errores.NO_VALIDO}</p>
                  )}
                  {form.representantes.map((r, i) => (
                    <div key={i} className="space-y-3 p-3 bg-white border border-black/10">
                      <Campo etiqueta={`${t.repNombre} *`}>
                        <input maxLength={120} value={r.nombre} onChange={e => cambiarLista('representantes', i, 'nombre', e.target.value)} className={CAMPO} />
                      </Campo>
                      <div className="grid grid-cols-2 gap-3">
                        <Campo etiqueta={`${t.repDoc} *`}>
                          <input maxLength={20} value={r.doc} onChange={e => cambiarLista('representantes', i, 'doc', e.target.value)} className={CAMPO} />
                        </Campo>
                        <Campo etiqueta={t.repMovil}>
                          <input type="tel" inputMode="tel" maxLength={25} value={r.movil} onChange={e => cambiarLista('representantes', i, 'movil', e.target.value)} className={CAMPO} />
                        </Campo>
                      </div>
                      {form.representantes.length > 1 && (
                        <button type="button" onClick={() => setForm(f => ({ ...f, representantes: f.representantes.filter((_, k) => k !== i) }))}
                          className="text-[11px] uppercase tracking-[0.18em] underline underline-offset-4 opacity-70">{t.quitar}</button>
                      )}
                    </div>
                  ))}
                  {form.representantes.length < MAX_PERSONAS && (
                    <button type="button" onClick={() => setForm(f => ({ ...f, representantes: [...f.representantes, { ...PERSONA_VACIA }] }))}
                      className="text-[11px] uppercase tracking-[0.18em] underline underline-offset-4">{t.anadir}</button>
                  )}
                </Seccion>
              )}

              <Seccion titulo={t.secFacturacion}>
                <Campo etiqueta={`${t.formaPago} *`} error={msg('forma_pago_id')}>
                  <select required value={form.forma_pago_id} onChange={e => cambiar('forma_pago_id', e.target.value)} className={CAMPO}>
                    <option value="" disabled>{t.elige}</option>
                    {formas.map(f => <option key={f.id} value={f.id}>{f.nombre}</option>)}
                  </select>
                </Campo>
                <p className="text-xs opacity-70 -mt-2">{t.avisoFormaPago}</p>

                {esRemesa && (
                  <div className="space-y-4 p-4 bg-white border border-black/10">
                    <Campo etiqueta={`${t.iban} *`} error={msg('iban')}>
                      <input maxLength={50} autoComplete="off" inputMode="text" value={form.iban} onChange={e => cambiar('iban', e.target.value)} className={CAMPO} />
                    </Campo>
                    <div className="space-y-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] font-semibold">{t.mandatoTitulo}</p>
                      <p className="text-sm leading-snug">{t.mandatoTexto}</p>
                      <a href="/mandato-sepa.pdf" target="_blank" rel="noopener noreferrer"
                         className="inline-block text-sm font-semibold underline underline-offset-4" style={{ color: BRASA }}>
                        {t.descargarMandato}
                      </a>
                      <div>
                        <span className={ETIQUETA}>{t.subirMandato}</span>
                        {archivo ? (
                          <div className="flex items-center justify-between gap-3 p-3 border border-black/15 text-sm">
                            <span className="truncate">{archivo.name}</span>
                            <button type="button" onClick={() => setArchivo(null)} className="text-[11px] uppercase tracking-[0.18em] underline underline-offset-4 shrink-0">{t.quitarArchivo}</button>
                          </div>
                        ) : (
                          <input type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" onChange={elegirArchivo} className="block w-full text-sm" />
                        )}
                        {msg('mandato') && <span role="alert" className="block mt-1 text-xs font-semibold" style={{ color: BRASA }}>{msg('mandato')}</span>}
                      </div>
                    </div>
                  </div>
                )}

                <label className="flex items-start gap-3">
                  <input type="checkbox" checked={form.facturacion_igual} onChange={e => cambiar('facturacion_igual', e.target.checked)}
                    className="mt-1 h-5 w-5 shrink-0 accent-[#D94F2B]" />
                  <span className="text-sm leading-snug">{t.igualContacto}</span>
                </label>
                {!form.facturacion_igual && (
                  <Campo etiqueta={`${t.emailFacturacion} *`} error={msg('email_facturacion')}>
                    <input required type="email" inputMode="email" maxLength={120} value={form.email_facturacion} onChange={e => cambiar('email_facturacion', e.target.value)} className={CAMPO} />
                  </Campo>
                )}
              </Seccion>

              <Seccion titulo={t.secEntrega}>
                <label className="flex items-start gap-3">
                  <input type="checkbox" checked={form.entrega_distinta} onChange={e => cambiar('entrega_distinta', e.target.checked)}
                    className="mt-1 h-5 w-5 shrink-0 accent-[#D94F2B]" />
                  <span className="text-sm leading-snug">{t.entregaDistinta}</span>
                </label>
                {form.entrega_distinta && (
                  <div className="space-y-4">
                    {errores.entrega && <p role="alert" className="text-xs font-semibold" style={{ color: BRASA }}>{t.errores[errores.entrega] ?? t.errores.NO_VALIDO}</p>}
                    <Campo etiqueta={`${t.entregaDireccion} *`}>
                      <input required maxLength={200} value={form.entrega.direccion} onChange={e => setForm(f => ({ ...f, entrega: { ...f.entrega, direccion: e.target.value } }))} className={CAMPO} />
                    </Campo>
                    <div className="grid grid-cols-3 gap-3">
                      <Campo etiqueta={`${t.cp} *`}>
                        <input required maxLength={10} value={form.entrega.cp} onChange={e => setForm(f => ({ ...f, entrega: { ...f.entrega, cp: e.target.value } }))} className={CAMPO} />
                      </Campo>
                      <div className="col-span-2">
                        <Campo etiqueta={`${t.municipio} *`}>
                          <input required maxLength={100} value={form.entrega.municipio} onChange={e => setForm(f => ({ ...f, entrega: { ...f.entrega, municipio: e.target.value } }))} className={CAMPO} />
                        </Campo>
                      </div>
                    </div>
                    <Campo etiqueta={t.provincia}>
                      <input maxLength={100} value={form.entrega.provincia} onChange={e => setForm(f => ({ ...f, entrega: { ...f.entrega, provincia: e.target.value } }))} className={CAMPO} />
                    </Campo>
                    <Campo etiqueta={t.horario}>
                      <input maxLength={200} value={form.entrega.horario} onChange={e => setForm(f => ({ ...f, entrega: { ...f.entrega, horario: e.target.value } }))} className={CAMPO} />
                    </Campo>
                  </div>
                )}
              </Seccion>

              <Seccion titulo={t.secContactos}>
                {errores.contactos && <p role="alert" className="text-xs font-semibold" style={{ color: BRASA }}>{t.errores[errores.contactos] ?? t.errores.NO_VALIDO}</p>}
                {form.contactos.map((c, i) => (
                  <div key={i} className="space-y-3 p-3 bg-white border border-black/10">
                    <Campo etiqueta={t.contNombre}>
                      <input maxLength={120} value={c.nombre} onChange={e => cambiarLista('contactos', i, 'nombre', e.target.value)} className={CAMPO} />
                    </Campo>
                    <div className="grid grid-cols-2 gap-3">
                      <Campo etiqueta={t.contCargo}>
                        <input maxLength={80} value={c.cargo} onChange={e => cambiarLista('contactos', i, 'cargo', e.target.value)} className={CAMPO} />
                      </Campo>
                      <Campo etiqueta={t.contMovil}>
                        <input type="tel" inputMode="tel" maxLength={25} value={c.movil} onChange={e => cambiarLista('contactos', i, 'movil', e.target.value)} className={CAMPO} />
                      </Campo>
                    </div>
                    <Campo etiqueta={t.contEmail}>
                      <input type="email" inputMode="email" maxLength={120} value={c.email} onChange={e => cambiarLista('contactos', i, 'email', e.target.value)} className={CAMPO} />
                    </Campo>
                    <button type="button" onClick={() => setForm(f => ({ ...f, contactos: f.contactos.filter((_, k) => k !== i) }))}
                      className="text-[11px] uppercase tracking-[0.18em] underline underline-offset-4 opacity-70">{t.quitar}</button>
                  </div>
                ))}
                {form.contactos.length < MAX_PERSONAS && (
                  <button type="button" onClick={() => setForm(f => ({ ...f, contactos: [...f.contactos, { ...CONTACTO_VACIO }] }))}
                    className="text-[11px] uppercase tracking-[0.18em] underline underline-offset-4">{t.anadir}</button>
                )}
              </Seccion>

              <Seccion titulo={t.secOtros}>
                <Campo etiqueta={t.actividad}>
                  <input maxLength={200} value={form.actividad} onChange={e => cambiar('actividad', e.target.value)} className={CAMPO} />
                </Campo>
                <Campo etiqueta={t.conocio}>
                  <input maxLength={200} value={form.conocio} onChange={e => cambiar('conocio', e.target.value)} className={CAMPO} />
                </Campo>
                <Campo etiqueta={t.observaciones}>
                  <textarea rows={3} maxLength={1500} value={form.observaciones} onChange={e => cambiar('observaciones', e.target.value)}
                    className="w-full px-3 py-2 text-base bg-white border border-black/15 focus:outline-none focus:border-[#D94F2B]" />
                </Campo>
              </Seccion>

              {/* Trampa anti-bots */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                <label>
                  Web
                  <input type="text" name="web" tabIndex={-1} autoComplete="off" value={form.web} onChange={e => cambiar('web', e.target.value)} />
                </label>
              </div>

              <Seccion titulo={t.legalTitulo}>
                <div className="p-4 space-y-2 text-[13px] leading-snug bg-white border border-black/10">
                  {t.legal.map(([etiqueta, texto]) => (
                    <p key={etiqueta}><strong className="font-semibold">{etiqueta} </strong>{texto}</p>
                  ))}
                </div>
                <button type="button" onClick={() => setVerPolitica(true)}
                  className="text-[11px] uppercase tracking-[0.18em] underline underline-offset-4">{t.leerPolitica}</button>

                <label className="flex items-start gap-3">
                  <input type="checkbox" required checked={form.acepta_info} onChange={e => cambiar('acepta_info', e.target.checked)}
                    className="mt-1 h-5 w-5 shrink-0 accent-[#D94F2B]" />
                  <span className="text-sm leading-snug">{t.legalAcepto}</span>
                </label>
                <label className="flex items-start gap-3">
                  <input type="checkbox" required checked={form.declara} onChange={e => cambiar('declara', e.target.checked)}
                    className="mt-1 h-5 w-5 shrink-0 accent-[#D94F2B]" />
                  <span className="text-sm leading-snug">{t.declaro}</span>
                </label>
              </Seccion>

              {errorGeneral && <p role="alert" className="text-sm font-semibold" style={{ color: BRASA }}>{errorGeneral}</p>}

              <button type="submit" disabled={enviando}
                className="w-full h-14 text-sm uppercase tracking-[0.22em] font-semibold disabled:opacity-60"
                style={{ background: BRASA, color: LLUM }}>
                {enviando ? t.enviando : t.enviar}
              </button>
            </form>
          )}
        </main>

        {verPolitica && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
               style={{ background: 'rgba(26,20,16,0.75)' }} role="dialog" aria-modal="true" aria-label={t.legalTitulo}>
            <div className="w-full sm:max-w-lg max-h-[92vh] flex flex-col" style={{ background: LLUM, color: NIT }}>
              <div className="p-5 pb-3 text-[11px] uppercase tracking-[0.2em] font-semibold" style={{ color: BRASA }}>{t.legalTitulo}</div>
              <div className="px-5 overflow-y-auto"><ContenidoPolitica idioma={idioma} /></div>
              <div className="p-5 pt-4">
                <button type="button" onClick={() => setVerPolitica(false)}
                  className="w-full h-12 text-sm uppercase tracking-[0.2em] font-semibold" style={{ background: BRASA, color: LLUM }}>
                  {t.cerrarPolitica}
                </button>
              </div>
            </div>
          </div>
        )}

        <p className="mt-3 text-center text-[11px] tracking-wide" style={{ color: NIT, opacity: 0.6 }}>
          La Singular Gourmet, S.L.U.
          {' · '}
          <a href={`/aviso-legal?l=${idioma}`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{t.enlaceAviso}</a>
          {' · '}
          <a href={`/privacidad?l=${idioma}`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{t.enlacePolitica}</a>
        </p>
      </div>
    </div>
  )
}
