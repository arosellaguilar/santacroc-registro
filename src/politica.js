// Política de privacidad única en capas (formulario de registro y portal de clientes).
// Texto aprobado por el responsable el 03/11/2026; fuente: santacroc-wiki/docs/tratamiento de datos/politica-privacidad-v0.1.md
// Cada vez que cambie este texto, cambiar VERSION_LEGAL en textos.js (v6-2026-11 desde la política única).
// «oposicion» es el recuadro del art. 21.1 RGPD del texto v5 del 02/11/2026, conservado tal cual.
//
// Estructura por idioma: resumen (capa 1), secciones (capa 2) y bloque común.
// Cada párrafo es [etiqueta en negrita, texto]. Apartado 4 («Web corporativa») reservado: se añade aquí
// cuando exista la web nueva; no se muestra hasta que tenga contenido.

export const POLITICA = {
  ca: {
    titulo: 'Política de privadesa',
    resumenTitulo: 'La teva privadesa a SåntåCroc',
    resumen: [
      ['Qui tracta les teves dades.', 'La Singular Gourmet, S.L.U. (marca SåntåCroc), NIF B56736515, carrer La Fita, 7, 08800 Vilanova i la Geltrú. Escriu-nos a hola@santacroc.com.'],
      ['Quines dades demanem i per a què.', "Les dades de contacte que ens dónes (nom, empresa, correu electrònic, telèfon, adreça i el teu missatge) per atendre la teva sol·licitud i, si ets client, per gestionar comandes, lliuraments, facturació i l'accés al portal de clients. Només t'enviem informació comercial si marques la casella corresponent."],
      ["El teu dret d'oposició.", "Pots deixar de rebre comunicacions comercials en qualsevol moment, i ens ho pots demanar sense donar cap motiu. Prem l'enllaç de baixa de qualsevol correu nostre o escriu-nos a hola@santacroc.com."],
      ['Els teus drets.', "Accedir a les teves dades, rectificar-les, suprimir-les, limitar-ne el tractament o demanar-ne la portabilitat. Si creus que no les tractem bé, pots reclamar davant l'Agència Espanyola de Protecció de Dades (aepd.es)."],
      ['Galetes.', "Aquesta pàgina no fa servir galetes d'analítica ni de publicitat."],
    ],
    verDetalle: 'Veure el detall complet',
    secciones: [
      {
        titulo: '1. Si et registres al nostre formulari o ens coneixem en una fira o esdeveniment',
        parrafos: [
          ['Dades.', "Nom, nom de l'empresa i tipus de negoci (si ets empresa), adreça, codi postal, població, correu electrònic, telèfon, el missatge opcional que ens deixis i l'idioma que has fet servir. Et demanem que no incloguis al missatge dades de salut, religió o altres dades delicades, ni dades d'altres persones. Si ho fas, les eliminem."],
          ['Per a què.', "(1) Atendre la teva sol·licitud d'informació i contactar-te per respondre-la; si ets a la nostra zona de repartiment proper, valorar donar-te accés a la botiga en línia. (2) Enviar-te informació comercial sobre els nostres productes per mitjans electrònics, només si marques la casella, que és opcional. (3) Enviar-te mostres de producte quan ho acordem."],
          ['Per què podem tractar-les.', "Per atendre la teva sol·licitud: si ets particular, les mesures precontractuals a petició teva (art. 6.1.b RGPD); si ets persona de contacte d'una empresa, l'interès legítim a atendre consultes i mantenir relacions comercials amb empreses interessades (art. 6.1.f RGPD i art. 19 LOPDGDD). Per a la informació comercial: el teu consentiment (art. 6.1.a RGPD i art. 21 LSSI), que és voluntari, independent de la teva sol·licitud i que pots retirar en qualsevol moment. Atendre la teva sol·licitud no depèn que acceptis les comunicacions comercials."],
          ['Quant de temps.', "Conservem les teves dades mentre hi hagi una relació amb nosaltres i mentre siguin útils per atendre la teva sol·licitud. Revisem periòdicament els contactes. Si passa un temps sense activitat, t'avisem per correu electrònic abans d'eliminar-les i ens pots dir que les conservem. Si et dónes de baixa, deixem d'escriure't i, per respectar la teva decisió, guardem una empremta xifrada del teu correu que no permet conèixer-lo, durant el temps necessari per acreditar que vam atendre la teva petició."],
          ['Com oposar-te o donar-te de baixa.', "Amb l'enllaç «Donar-me de baixa» de qualsevol correu, o escrivint a hola@santacroc.com. Atenem la teva petició com a màxim en un mes."],
        ],
      },
      {
        titulo: '2. Si ets client o fas servir el portal de clients',
        parrafos: [
          ['Dades.', "Nom o raó social, NIF/CIF, domicili i adreces de lliurament, correu electrònic, telèfon i persona de contacte, idioma, forma de pagament i condicions comercials acordades. Si fas servir el portal: el teu nom, el teu correu, el centre de cost que t'assigni la teva empresa, les teves preferències d'avís i la data dels teus accessos (no guardem la teva adreça IP). Si la teva empresa t'ha donat d'alta al portal, ha estat ella qui ens ha facilitat les teves dades."],
          ['Per a què.', "Gestionar la relació comercial (comandes, lliuraments, mostres, facturació i cobrament); donar-te accés al portal; avisar-te per correu de l'estat de les teves comandes; i complir les nostres obligacions fiscals i comptables."],
          ['Per què podem tractar-les.', "Per a la relació comercial, si ets particular o autònom, l'execució del contracte (art. 6.1.b RGPD); si ets persona de contacte d'una empresa, l'interès legítim en la relació amb els nostres clients (art. 6.1.f RGPD i art. 19 LOPDGDD). Per a fiscalitat i comptabilitat, una obligació legal (art. 6.1.c RGPD)."],
          ['Comunicacions comercials.', "No t'enviem informació comercial per correu electrònic tret que ho hagis consentit. Pots oposar-t'hi en qualsevol moment (vegeu «El teu dret d'oposició»)."],
          ['Quant de temps.', "Mentre duri la relació amb nosaltres. Després, només el temps que exigeixin les normes fiscals i comptables per a les factures i la comptabilitat; passat aquest temps, les eliminem o les anonimitzem."],
        ],
      },
      {
        titulo: "3. Galetes i emmagatzematge al teu dispositiu",
        parrafos: [
          ['Formulari de registre:', 'no fa servir galetes d\'analítica ni de publicitat ni desa cap dada al teu dispositiu.'],
          ['Portal de clients:', "no fa servir galetes d'analítica ni de publicitat. Desa al teu dispositiu només el que és imprescindible per mantenir la teva sessió iniciada mentre el fas servir; no necessita el teu consentiment perquè sense això el portal no funcionaria."],
          ['', "Si en el futur afegim eines de mesurament, actualitzarem aquesta política i et demanarem el consentiment abans d'activar-les quan la llei ho exigeixi."],
        ],
      },
      {
        titulo: "4. Ús de sistemes d'intel·ligència artificial",
        parrafos: [
          ['', "LA SINGULAR GOURMET, S.L.U. (SåntåCroc) podrà utilitzar eines i sistemes d'intel·ligència artificial en el desenvolupament de la seva activitat empresarial, incloent-hi tasques de creació i revisió de continguts, gestió administrativa, atenció al client, anàlisi d'informació, màrqueting i millora dels seus serveis."],
          ['', "La utilització d'aquestes tecnologies es farà d'acord amb la normativa aplicable, en particular el Reglament (UE) 2024/1689, relatiu a la intel·ligència artificial, el Reglament (UE) 2016/679 (RGPD) i la Llei orgànica 3/2018 (LOPDGDD)."],
          ['', "L'empresa adoptarà les mesures necessàries per garantir un ús responsable, segur i transparent d'aquestes eines, incloent-hi la supervisió humana dels resultats quan sigui necessari."],
          ['', "Les dades personals de clients i usuaris només es podran introduir en sistemes d'intel·ligència artificial quan existeixi una finalitat legítima, una base jurídica adequada i garanties suficients de confidencialitat, seguretat i protecció de dades."],
          ['', "L'empresa no utilitzarà sistemes d'intel·ligència artificial per adoptar decisions automatitzades que produeixin efectes jurídics o afectin significativament els usuaris sense complir les garanties i obligacions legalment exigibles."],
          ['', "Quan sigui legalment obligatori, s'informarà els usuaris de la seva interacció amb sistemes d'intel·ligència artificial i s'identificarà el contingut generat o manipulat artificialment en els supòsits previstos per la normativa."],
          ['', "LA SINGULAR GOURMET, S.L.U. es compromet a revisar periòdicament l'ús d'aquestes tecnologies per garantir-ne l'adequació a la legislació vigent i protegir els drets de clients, treballadors i col·laboradors."],
        ],
      },
    ],
    oposicion: {
      titulo: "Dret d'oposició",
      texto: "Tens dret a oposar-te en qualsevol moment al tractament de les teves dades basat en el nostre interès legítim, per motius relacionats amb la teva situació particular (art. 21.1 RGPD). Deixarem de tractar-les, tret que acreditem motius legítims imperiosos que prevalguin sobre els teus interessos, drets i llibertats, o que el tractament sigui necessari per formular, exercir o defensar reclamacions. Si el tractament té per finalitat el màrqueting directe, t'hi pots oposar en qualsevol moment i deixarem de tractar les teves dades amb aquesta finalitat. Per exercir aquest dret, escriu a hola@santacroc.com indicant que vols exercir el dret d'oposició.",
    },
    comunTitulo: 'Per a tots els apartats',
    comun: [
      ['Qui més tracta les teves dades.', "Per prestar els nostres serveis fem servir proveïdors que tracten dades per compte nostre: Supabase (base de dades, amb infraestructura a la Unió Europea), Vercel (allotjament de l'aplicació web), Resend (enviament de correus) i Google Workspace (correu corporatiu). Si ets client, també Holded (facturació i comptabilitat) i la nostra assessoria, i les administracions públiques quan la llei ens hi obligui. No cedim les teves dades a altres tercers, tret d'obligació legal."],
      ['Transferències fora de la Unió Europea.', "Alguns d'aquests proveïdors poden tractar dades als Estats Units o a altres països. Ho fan amb les garanties del capítol V del RGPD: la decisió d'adequació del Marc de Privadesa de Dades UE-EUA, quan el proveïdor estigui certificat, o les clàusules contractuals tipus de la Comissió Europea. Pots demanar-nos informació sobre aquestes garanties i una còpia escrivint a hola@santacroc.com."],
      ['Els teus drets.', "Pots accedir a les teves dades, rectificar-les, suprimir-les, oposar-te al seu tractament, limitar-lo i demanar-ne la portabilitat escrivint a hola@santacroc.com. Et responem com a màxim en un mes. Si creus que no tractem bé les teves dades, pots reclamar davant l'Agència Espanyola de Protecció de Dades (aepd.es)."],
    ],
  },

  es: {
    titulo: 'Política de privacidad',
    resumenTitulo: 'Tu privacidad en SåntåCroc',
    resumen: [
      ['Quién trata tus datos.', 'La Singular Gourmet, S.L.U. (marca SåntåCroc), NIF B56736515, Calle La Fita, 7, 08800 Vilanova i la Geltrú. Escríbenos a hola@santacroc.com.'],
      ['Qué datos pedimos y para qué.', 'Los datos de contacto que nos das (nombre, empresa, email, teléfono, dirección y tu mensaje) para atender tu solicitud y, si eres cliente, para gestionar pedidos, entregas, facturación y el acceso al portal de clientes. Solo te enviamos información comercial si marcas la casilla correspondiente.'],
      ['Tu derecho a oponerte.', 'Puedes dejar de recibir comunicaciones comerciales en cualquier momento, y nos lo puedes pedir sin dar motivo. Pulsa el enlace de baja de cualquier email nuestro o escríbenos a hola@santacroc.com.'],
      ['Tus derechos.', 'Acceder a tus datos, rectificarlos, suprimirlos, limitar el tratamiento o pedir su portabilidad. Si crees que no los tratamos bien, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).'],
      ['Cookies.', 'Esta página no usa cookies de analítica ni de publicidad.'],
    ],
    verDetalle: 'Ver el detalle completo',
    secciones: [
      {
        titulo: '1. Si te registras en nuestro formulario o nos conocemos en una feria o evento',
        parrafos: [
          ['Datos.', 'Nombre, nombre de la empresa y tipo de negocio (si eres empresa), dirección, código postal, población, email, teléfono, el mensaje opcional que nos dejes y el idioma que has usado. Te pedimos que no incluyas en el mensaje datos de salud, religión u otros datos delicados, ni datos de otras personas. Si lo haces, los eliminamos.'],
          ['Para qué.', '(1) Atender tu solicitud de información y contactarte para responderla; si estás en nuestra zona de reparto cercano, valorar darte acceso a la tienda online. (2) Enviarte información comercial sobre nuestros productos por medios electrónicos, solo si marcas la casilla, que es opcional. (3) Enviarte muestras de producto cuando lo acordemos.'],
          ['Por qué podemos tratarlos.', 'Para atender tu solicitud: si eres particular, tus medidas precontractuales a petición tuya (art. 6.1.b RGPD); si eres persona de contacto de una empresa, el interés legítimo en atender consultas y mantener relaciones comerciales con empresas interesadas (art. 6.1.f RGPD y art. 19 LOPDGDD). Para la información comercial: tu consentimiento (art. 6.1.a RGPD y art. 21 LSSI), que es voluntario, independiente de tu solicitud y que puedes retirar en cualquier momento. Atender tu solicitud no depende de que aceptes las comunicaciones comerciales.'],
          ['Cuánto tiempo.', 'Conservamos tus datos mientras haya una relación con nosotros y mientras sean útiles para atender tu solicitud. Revisamos periódicamente los contactos. Si pasa un tiempo sin actividad, te avisamos por email antes de eliminarlos y puedes decirnos que los conservemos. Si te das de baja, dejamos de escribirte y, para respetar tu decisión, guardamos una huella cifrada de tu email que no permite conocerlo, durante el tiempo necesario para acreditar que atendimos tu petición.'],
          ['Cómo oponerte o darte de baja.', 'Con el enlace «Darme de baja» de cualquier email, o escribiendo a hola@santacroc.com. Atendemos tu petición como máximo en un mes.'],
        ],
      },
      {
        titulo: '2. Si eres cliente o usas el portal de clientes',
        parrafos: [
          ['Datos.', 'Nombre o razón social, NIF/CIF, domicilio y direcciones de entrega, email, teléfono y persona de contacto, idioma, forma de pago y condiciones comerciales acordadas. Si usas el portal: tu nombre, tu email, el centro de coste que te asigne tu empresa, tus preferencias de aviso y la fecha de tus accesos (no guardamos tu dirección IP). Si tu empresa te ha dado de alta en el portal, ha sido ella quien nos ha facilitado tus datos.'],
          ['Para qué.', 'Gestionar la relación comercial (pedidos, entregas, muestras, facturación y cobro); darte acceso al portal; avisarte por email del estado de tus pedidos; y cumplir nuestras obligaciones fiscales y contables.'],
          ['Por qué podemos tratarlos.', 'Para la relación comercial, si eres particular o autónomo, la ejecución del contrato (art. 6.1.b RGPD); si eres persona de contacto de una empresa, el interés legítimo en la relación con nuestros clientes (art. 6.1.f RGPD y art. 19 LOPDGDD). Para fiscalidad y contabilidad, una obligación legal (art. 6.1.c RGPD).'],
          ['Comunicaciones comerciales.', 'No te enviamos información comercial por email salvo que lo hayas consentido. Puedes oponerte en cualquier momento (ver «Tu derecho a oponerte»).'],
          ['Cuánto tiempo.', 'Mientras dure la relación con nosotros. Después, solo el tiempo que exijan las normas fiscales y contables para las facturas y la contabilidad; pasado ese tiempo, los eliminamos o los anonimizamos.'],
        ],
      },
      {
        titulo: '3. Cookies y almacenamiento en tu dispositivo',
        parrafos: [
          ['Formulario de registro:', 'no usa cookies de analítica ni de publicidad ni guarda ningún dato en tu dispositivo.'],
          ['Portal de clientes:', 'no usa cookies de analítica ni de publicidad. Guarda en tu dispositivo únicamente lo imprescindible para mantener tu sesión iniciada mientras lo usas; no necesita tu consentimiento porque sin ello el portal no funcionaría.'],
          ['', 'Si en el futuro añadimos herramientas de medición, actualizaremos esta política y te pediremos tu consentimiento antes de activarlas cuando la ley lo exija.'],
        ],
      },
      {
        titulo: "4. Uso de sistemas de inteligencia artificial",
        parrafos: [
          ['', "LA SINGULAR GOURMET, S.L.U. (SåntåCroc) podrá utilizar herramientas y sistemas de inteligencia artificial en el desarrollo de su actividad empresarial, incluyendo tareas de creación y revisión de contenidos, gestión administrativa, atención al cliente, análisis de información, marketing y mejora de sus servicios."],
          ['', "La utilización de estas tecnologías se realizará de conformidad con la normativa aplicable, en particular el Reglamento (UE) 2024/1689, relativo a la inteligencia artificial, el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD)."],
          ['', "La empresa adoptará las medidas necesarias para garantizar un uso responsable, seguro y transparente de estas herramientas, incluyendo la supervisión humana de los resultados cuando resulte necesario."],
          ['', "Los datos personales de clientes y usuarios únicamente podrán introducirse en sistemas de inteligencia artificial cuando exista una finalidad legítima, una base jurídica adecuada y garantías suficientes de confidencialidad, seguridad y protección de datos."],
          ['', "La empresa no utilizará sistemas de inteligencia artificial para adoptar decisiones automatizadas que produzcan efectos jurídicos o afecten significativamente a los usuarios sin cumplir las garantías y obligaciones legalmente exigibles."],
          ['', "Cuando resulte legalmente obligatorio, se informará a los usuarios de su interacción con sistemas de inteligencia artificial y se identificará el contenido generado o manipulado artificialmente en los supuestos previstos por la normativa."],
          ['', "LA SINGULAR GOURMET, S.L.U. se compromete a revisar periódicamente el uso de estas tecnologías para garantizar su adecuación a la legislación vigente y proteger los derechos de clientes, trabajadores y colaboradores."],
        ],
      },
    ],
    oposicion: {
      titulo: "Derecho de oposición",
      texto: "Tienes derecho a oponerte en cualquier momento al tratamiento de tus datos basado en nuestro interés legítimo, por motivos relacionados con tu situación particular (art. 21.1 RGPD). Dejaremos de tratarlos, salvo que acreditemos motivos legítimos imperiosos que prevalezcan sobre tus intereses, derechos y libertades, o que el tratamiento sea necesario para formular, ejercer o defender reclamaciones. Si el tratamiento tiene por finalidad el marketing directo, puedes oponerte en cualquier momento y dejaremos de tratar tus datos con esa finalidad. Para ejercer este derecho, escribe a hola@santacroc.com indicando que quieres ejercer el derecho de oposición.",
    },
    comunTitulo: 'Para todos los apartados',
    comun: [
      ['Quién más trata tus datos.', 'Para prestar nuestros servicios usamos proveedores que tratan datos por cuenta nuestra: Supabase (base de datos, con infraestructura en la Unión Europea), Vercel (alojamiento de la aplicación web), Resend (envío de correos) y Google Workspace (correo corporativo). Si eres cliente, también Holded (facturación y contabilidad) y nuestra asesoría, y las administraciones públicas cuando la ley nos obligue. No cedemos tus datos a otros terceros, salvo obligación legal.'],
      ['Transferencias fuera de la Unión Europea.', 'Algunos de estos proveedores pueden tratar datos en Estados Unidos u otros países. Lo hacen con las garantías del capítulo V del RGPD: la decisión de adecuación del Marco de Privacidad de Datos UE-EE. UU., cuando el proveedor esté certificado, o las cláusulas contractuales tipo de la Comisión Europea. Puedes pedirnos información sobre estas garantías y una copia escribiendo a hola@santacroc.com.'],
      ['Tus derechos.', 'Puedes acceder a tus datos, rectificarlos, suprimirlos, oponerte a su tratamiento, limitarlo y pedir su portabilidad escribiendo a hola@santacroc.com. Te contestamos como máximo en un mes. Si crees que no tratamos bien tus datos, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).'],
    ],
  },

  en: {
    titulo: 'Privacy policy',
    resumenTitulo: 'Your privacy at SåntåCroc',
    resumen: [
      ['Who processes your data.', 'La Singular Gourmet, S.L.U. (SåntåCroc brand), tax ID B56736515, Calle La Fita, 7, 08800 Vilanova i la Geltrú, Spain. Write to us at hola@santacroc.com.'],
      ['What data we ask for and why.', 'The contact details you give us (name, company, email, phone, address and your message) to deal with your request and, if you are a customer, to manage orders, deliveries, invoicing and access to the customer portal. We only send you commercial information if you tick the corresponding box.'],
      ['Your right to object.', 'You can stop receiving commercial communications at any time, and you can ask us without giving a reason. Click the unsubscribe link in any of our emails or write to hola@santacroc.com.'],
      ['Your rights.', 'You can access your data, correct it, delete it, restrict its processing or request its portability. If you think we are not handling your data properly, you can lodge a complaint with the Spanish Data Protection Agency (aepd.es).'],
      ['Cookies.', 'This page does not use analytics or advertising cookies.'],
    ],
    verDetalle: 'See the full details',
    secciones: [
      {
        titulo: '1. If you register on our form or we meet at a trade fair or event',
        parrafos: [
          ['Data.', 'Name, company name and type of business (if you are a company), address, postcode, town, email, phone, the optional message you leave us and the language you used. Please do not include health data, religion or other sensitive data, or data about other people, in the message. If you do, we will delete it.'],
          ['Why.', '(1) To deal with your request for information and contact you to answer it; if you are in our nearby delivery area, to consider giving you access to the online shop. (2) To send you commercial information about our products by electronic means, only if you tick the box, which is optional. (3) To send you product samples when we agree to do so.'],
          ['Why we can process it.', 'To deal with your request: if you are an individual, pre-contractual measures at your request (art. 6.1.b GDPR); if you are a contact person at a company, the legitimate interest in answering enquiries and maintaining commercial relationships with interested companies (art. 6.1.f GDPR and art. 19 of the Spanish LOPDGDD). For commercial information: your consent (art. 6.1.a GDPR and art. 21 of the Spanish LSSI), which is voluntary, independent of your request and which you can withdraw at any time. Dealing with your request does not depend on you accepting commercial communications.'],
          ['How long.', 'We keep your data while there is a relationship with us and while it is useful for dealing with your request. We review contacts periodically. If a period passes without activity, we email you before deleting them and you can tell us to keep them. If you unsubscribe, we stop writing to you and, to respect your decision, we keep an encrypted fingerprint of your email that does not allow it to be read, for as long as necessary to show that we handled your request.'],
          ['How to object or unsubscribe.', 'With the "Unsubscribe" link in any email, or by writing to hola@santacroc.com. We handle your request within one month at most.'],
        ],
      },
      {
        titulo: '2. If you are a customer or use the customer portal',
        parrafos: [
          ['Data.', 'Name or company name, tax ID, address and delivery addresses, email, phone and contact person, language, payment method and agreed commercial terms. If you use the portal: your name, your email, the cost centre your company assigns you, your notification preferences and the date of your logins (we do not store your IP address). If your company registered you on the portal, it was your company that gave us your data.'],
          ['Why.', 'To manage the commercial relationship (orders, deliveries, samples, invoicing and payment); to give you access to the portal; to notify you by email about the status of your orders; and to meet our tax and accounting obligations.'],
          ['Why we can process it.', 'For the commercial relationship, if you are an individual or self-employed, performance of the contract (art. 6.1.b GDPR); if you are a contact person at a company, the legitimate interest in dealing with our customers (art. 6.1.f GDPR and art. 19 LOPDGDD). For tax and accounting, a legal obligation (art. 6.1.c GDPR).'],
          ['Commercial communications.', 'We do not send you commercial information by email unless you have consented. You can object at any time (see "Your right to object").'],
          ['How long.', 'As long as the relationship with us lasts. Afterwards, only as long as tax and accounting rules require for invoices and accounts; after that, we delete or anonymise them.'],
        ],
      },
      {
        titulo: '3. Cookies and storage on your device',
        parrafos: [
          ['Registration form:', 'it does not use analytics or advertising cookies and does not store any data on your device.'],
          ['Customer portal:', 'it does not use analytics or advertising cookies. It stores on your device only what is essential to keep you logged in while you use it; this does not need your consent because the portal would not work without it.'],
          ['', 'If in future we add measurement tools, we will update this policy and ask for your consent before activating them where the law requires it.'],
        ],
      },
      {
        titulo: "4. Use of artificial intelligence systems",
        parrafos: [
          ['', "LA SINGULAR GOURMET, S.L.U. (SåntåCroc) may use artificial intelligence tools and systems in carrying out its business, including content creation and review, administrative management, customer service, information analysis, marketing and improvement of its services."],
          ['', "These technologies will be used in accordance with applicable law, in particular Regulation (EU) 2024/1689 on artificial intelligence, Regulation (EU) 2016/679 (GDPR) and Organic Law 3/2018 (LOPDGDD)."],
          ['', "The company will take the measures needed to ensure a responsible, secure and transparent use of these tools, including human oversight of the results where necessary."],
          ['', "Customers' and users' personal data may only be entered into artificial intelligence systems where there is a legitimate purpose, an appropriate legal basis and sufficient guarantees of confidentiality, security and data protection."],
          ['', "The company will not use artificial intelligence systems to make automated decisions that produce legal effects or significantly affect users without complying with the guarantees and obligations required by law."],
          ['', "Where legally required, users will be informed that they are interacting with artificial intelligence systems, and content generated or manipulated artificially will be identified in the cases provided for by law."],
          ['', "LA SINGULAR GOURMET, S.L.U. undertakes to review its use of these technologies periodically to ensure they comply with current legislation and to protect the rights of customers, employees and partners."],
        ],
      },
    ],
    oposicion: {
      titulo: "Right to object",
      texto: "You have the right to object at any time to the processing of your data based on our legitimate interest, on grounds relating to your particular situation (Art. 21(1) GDPR). We will stop processing it unless we demonstrate compelling legitimate grounds that override your interests, rights and freedoms, or the processing is needed to establish, exercise or defend legal claims. Where the processing is for direct marketing, you may object at any time and we will stop processing your data for that purpose. To exercise this right, write to hola@santacroc.com stating that you wish to object.",
    },
    comunTitulo: 'For all sections',
    comun: [
      ['Who else processes your data.', 'To provide our services we use providers that process data on our behalf: Supabase (database, with infrastructure in the European Union), Vercel (hosting of the web application), Resend (email sending) and Google Workspace (corporate email). If you are a customer, also Holded (invoicing and accounting) and our tax adviser, and public authorities when the law requires it. We do not share your data with other third parties, except where legally required.'],
      ['Transfers outside the European Union.', 'Some of these providers may process data in the United States or other countries. They do so with the safeguards of Chapter V of the GDPR: the adequacy decision for the EU-US Data Privacy Framework, where the provider is certified, or the standard contractual clauses of the European Commission. You can ask us for information about these safeguards and a copy by writing to hola@santacroc.com.'],
      ['Your rights.', 'You can access your data, correct it, delete it, object to its processing, restrict it and request its portability by writing to hola@santacroc.com. We reply within one month at most. If you think we are not handling your data properly, you can lodge a complaint with the Spanish Data Protection Agency (aepd.es).'],
    ],
  },
}
