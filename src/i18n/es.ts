import type { Copy } from "./types";

/**
 * Español neutro — sirve para España y Latinoamérica.
 * Se usa "tú" (nunca "vosotros") y se evitan regionalismos.
 * La voz es la misma: una esteticista que prepara la piel de los idols entre bastidores.
 */
export const es: Copy = {
  lang: "es",
  htmlLang: "es",
  label: "ES",

  meta: {
    tagline: "El diagnóstico de piel que reciben los idols antes del comeback",
    description:
      "Diagnóstico de piel K-beauty en diez preguntas. Cuatro ejes clínicos, dieciséis tipos de piel y las fórmulas coreanas que le corresponden a la tuya — además de las rutinas que usan los idols del K-pop.",
    keywords: [
      "tipo de piel coreano", "test tipo de piel", "rutina coreana piel", "k-beauty",
      "cosmetica coreana", "piel de cristal", "glass skin", "rutina idols kpop",
      "diagnostico de piel", "productos coreanos piel",
    ],
  },

  nav: { test: "Hacer el test", types: "Los 16 tipos", about: "Quiénes somos" },

  footer: {
    disclaimer:
      "ofrece orientación cosmética, no consejo médico. El acné persistente, el eccema o las manchas que cambian son cosa de un dermatólogo.",
    affiliate:
      "Algunos enlaces de producto son enlaces de afiliado: si compras a través de ellos ganamos una pequeña comisión sin coste adicional para ti. Nunca cambia qué producto se recomienda.",
    idols:
      "Las rutinas de los idols están descritas a partir de entrevistas publicadas. Ningún artista, agencia o sello está afiliado a este sitio ni lo respalda, y no se usa ninguna imagen de artistas.",
    contact: "Dudas o correcciones:",
    links: { about: "Quiénes somos", types: "Los tipos", privacy: "Privacidad", terms: "Términos", contact: "Contacto" },
  },

  intro: {
    eyebrow: "Consulta de piel entre bastidores · Seúl",
    h1: ["Preparo la piel de los idols para la ", "semana del comeback", ". Déjame leer la tuya."],
    lede:
      "Soy la que está entre bastidores con la nevera llena de mascarillas, diez minutos antes de las cámaras. Responde las mismas diez preguntas que te haría en la camilla y te diré qué está pidiendo tu piel de verdad — y qué fórmulas coreanas se lo dan.",
    cta: "Leer mi piel",
    meta: "Gratis · unos 90 segundos · sin registro ni correo",
    cred: [
      { n: "16", t: "tipos, leídos como se lee la piel en una cabina de Seúl: cuatro ejes, no cuatro etiquetas vagas" },
      { n: "90s", t: "las mismas preguntas que te haría en la camilla, sin esperar una cita" },
      { n: "AM/PM", t: "un orden de capas que puedes seguir esta noche, en el orden en que lo hacen ellas" },
    ],
    face: { tzone: "ZONA T", cheeks: "MEJILLAS", jaw: "MANDÍBULA" },
  },

  quiz: {
    back: "← Atrás",
    oneMoment: "Un momento",
    loading: [
      "Leyendo tu barrera cutánea",
      "Midiendo cómo retienes el pigmento",
      "Revisando tu historial de sol",
      "Sacando fórmulas del estante de Seúl",
      "Escribiendo tu informe",
    ],
  },

  questions: [
    {
      theme: "Hidratación",
      q: "Dos horas después de limpiarte la cara, sin nada puesto. Dime cómo la notas.",
      hint: "Es lo primero que compruebo en la camilla. Hazlo un día normal, no después de un vuelo.",
      a: [
        { label: "Tirante, y se descama cuando sonrío", sub: "Sobre todo nariz y mejillas" },
        { label: "Cómoda, quizá algo tirante", sub: "Sin descamación ni brillo" },
        { label: "Cómoda, con un brillo suave en la nariz", sub: "El resto se nota parejo" },
        { label: "Ya brilla en frente y nariz", sub: "Podría secarla con un papel ahora mismo" },
      ],
    },
    {
      theme: "Control de grasa",
      q: "Son las cuatro de la tarde. ¿Cómo está tu zona T?",
      hint: "La zona T es frente, nariz y barbilla. Entre bastidores, es la hora en que todo se nota.",
      a: [
        { label: "Sigue mate, quizá algo apagada", sub: "Los polvos se me cuartearían" },
        { label: "Un brillo suave, nada llamativo", sub: "Se lee como luminosidad, no como grasa" },
        { label: "Brilla claramente y el maquillaje se ha movido", sub: "Un papel matificante lo arregla" },
        { label: "Resbala, y los poros se ven más grandes", sub: "Dos o tres papeles" },
      ],
    },
    {
      theme: "Granitos",
      q: "¿Con qué frecuencia te salen granos en realidad?",
      hint: "Cuenta también los bultitos que notas al tacto pero apenas se ven. Esos cuentan.",
      a: [
        { label: "Casi nunca", sub: "Una vez al año como mucho" },
        { label: "Con la regla, y se van rápido", sub: "Aparecen cuando toca" },
        { label: "Unos cuantos al mes, en barbilla o mandíbula", sub: "Algunos dejan marca" },
        { label: "Siempre hay algo congestionado en alguna parte", sub: "Puntos negros más granos inflamados" },
      ],
    },
    {
      theme: "Reactividad",
      q: "Te pones un sérum nuevo esta noche. ¿Qué suele pasar?",
      hint: "Piensa en las tres últimas cosas nuevas que probaste, no en el mejor caso.",
      a: [
        { label: "Nada — mi piel aguanta lo que sea", sub: "Nunca he hecho una prueba de parche" },
        { label: "Un hormigueo de vez en cuando, y se pasa", sub: "Por la mañana ya está bien" },
        { label: "Escuece o se enrojece bastante a menudo", sub: "He aprendido a ir despacio" },
        { label: "Ardor, picor o bultitos, siempre", sub: "El perfume y el alcohol están descartados" },
      ],
    },
    {
      theme: "Reactividad",
      q: "Viento frío, ducha caliente, comida picante. ¿Cómo lo lleva tu cara?",
      hint: "Estoy mirando el enrojecimiento y cuánto tarda en bajar.",
      a: [
        { label: "No cambia nada", sub: "Nunca me salen manchas rojas" },
        { label: "Un rubor que baja en minutos", sub: "Solo con clima extremo" },
        { label: "Me enrojezco con facilidad y tarda en irse", sub: "Sobre todo las mejillas" },
        { label: "Rojez permanente, capilares visibles", sub: "A veces calor y escozor" },
      ],
    },
    {
      theme: "Pigmento",
      q: "Cuando un grano por fin se cura, ¿qué deja atrás?",
      hint: "Esta respuesta me dice más sobre tu melanina que ninguna otra de la lista.",
      a: [
        { label: "Nada — se va en una semana" },
        { label: "Una marca rosada que se va en unas semanas" },
        { label: "Una marca marrón que dura meses" },
        { label: "Casi no me salen granos, no sabría decir" },
      ],
    },
    {
      theme: "Pigmento",
      q: "Ponte junto a una ventana. Con luz de día, ¿qué ves?",
      hint: "Los pómulos, el labio superior y la frente son donde aparece primero.",
      a: [
        { label: "Tono parejo, sin manchas", sub: "Sin pecas" },
        { label: "Algunas pecas, siempre las mismas", sub: "Se oscurecen un poco en verano" },
        { label: "Manchas solares o zonas desiguales en aumento", sub: "Más cada año" },
        { label: "Manchas tipo melasma", sub: "Simétricas, en mejillas o labio superior" },
      ],
    },
    {
      theme: "Historial de sol",
      q: "En toda tu vida hasta hoy, ¿cuánto sol ha recibido esta cara?",
      hint: "Sé sincera sobre tu adolescencia. Casi todo el fotodaño se acumula antes de los veinte.",
      a: [
        { label: "Protector solar a diario desde adolescente", sub: "Busco la sombra sin pensarlo" },
        { label: "Protector casi todos los días ahora, antes a ratos", sub: "Un par de quemaduras de vacaciones" },
        { label: "Protector solo cuando hace un sol evidente", sub: "Me he puesto morena a propósito" },
        { label: "Años de sol, quemaduras de verdad, cabinas de bronceado", sub: "Ahora intento recuperar" },
      ],
    },
    {
      theme: "Firmeza",
      q: "Relaja la cara del todo. ¿Hay líneas alrededor de ojos o boca?",
      hint: "Relajada significa sin sonreír y sin entrecerrar los ojos. Casi todo el mundo hace trampa aquí.",
      a: [
        { label: "Ninguna", sub: "Solo aparecen al sonreír" },
        { label: "Una o dos muy tenues con luz dura", sub: "Nada fijado" },
        { label: "Sí, líneas finas que se quedan", sub: "Sobre todo bajo los ojos" },
        { label: "Líneas marcadas y algo de flacidez", sub: "Mandíbula y surcos nasogenianos" },
      ],
    },
    {
      theme: "Estilo de vida",
      q: "Últimos seis meses. ¿Cuál se parece más a la verdad?",
      hint: "El sueño, el estrés y el humo mueven la piel más que cualquier sérum de mi estante.",
      a: [
        { label: "Siete horas o más, poco estrés, sin tabaco", sub: "Estable" },
        { label: "Duermo bien, estrés normal de trabajo", sub: "Nada extremo" },
        { label: "Duermo mal o mucho estrés casi todas las semanas", sub: "Mi cara se ha enterado" },
        { label: "Trasnochar, mucho estrés, alcohol o humo", sub: "Tirando de reservas" },
      ],
    },
  ],

  axisMeta: {
    D: {
      left: "Seca", right: "Grasa", title: "Producción de grasa",
      copy: {
        neg: "Tu barrera no fabrica suficientes lípidos propios, así que el agua se va más rápido de lo que llega. En tu caso sellar importa más que tratar.",
        mid: "Estás en la franja mixta: zona T más grasa sobre mejillas cómodas. Trata las zonas por separado en vez de tratar toda la cara igual.",
        pos: "Produces sebo de sobra. A largo plazo eso te protege, pero necesita una limpieza suave y constante o los poros se cierran.",
      },
    },
    S: {
      left: "Sensible", right: "Resistente", title: "Reactividad",
      copy: {
        neg: "Tu barrera reacciona antes de tolerar. Un producto nuevo cada vez, con catorce días de margen, y trata el perfume añadido como un principio activo más.",
        mid: "Bastante tolerante. Puedes usar casi cualquier activo, solo reparte los fuertes en noches distintas en lugar de apilarlos.",
        pos: "Una barrera resistente. Puedes llegar a los retinoides y los ácidos más rápido que la mayoría. Tu riesgo es hacer de más precisamente porque puedes.",
      },
    },
    P: {
      left: "Propensa a manchas", right: "Tono parejo", title: "Respuesta al pigmento",
      copy: {
        neg: "Tus melanocitos se disparan ante cualquier estímulo: un grano, un arañazo, diez minutos de sol. Aquí prevenir gana a corregir, y el protector solar es el tratamiento.",
        mid: "Te marcas, pero se aclara. Mantén un activo iluminador en rotación y le llevarás ventaja.",
        pos: "Tu tono se mantiene parejo y las marcas se van rápido. Invierte tu presupuesto en textura y firmeza en lugar de en iluminar.",
      },
    },
    W: {
      left: "Propensa a líneas", right: "Firme", title: "Envejecimiento estructural",
      copy: {
        neg: "El sol y el ritmo de vida ya se ven como líneas. Solo dos palancas mueven esto: colágeno por la noche y un protector solar que no te saltas nunca.",
        mid: "Fase temprana: esta es la ventana en la que prevenir sale barato. Protector solar a diario más un activo nocturno de fuerza media es suficiente.",
        pos: "Piel firme y bien protegida. No hay nada que corregir todavía. Sigue haciendo exactamente lo que haces.",
      },
    },
  },
  balanced: "Equilibrada",

  typeNames: {
    DSPW: "La Porcelana Frágil", DSPT: "La Reactiva Silenciosa", DSNW: "El Velo Fino", DSNT: "La Calma Delicada",
    DRPW: "El Mate Marcado por el Sol", DRPT: "El Pergamino Firme", DRNW: "La Seda Curtida", DRNT: "El Mate Limpio",
    OSPW: "El Brillo Inquieto", OSPT: "El Rocío Reactivo", OSNW: "El Brillo Cansado", OSNT: "El Lustre Sensible",
    ORPW: "La Luminosa Marcada", ORPT: "El Rocío Resistente", ORNW: "El Brillo Relajado", ORNT: "El Estándar de Cristal",
  },

  letterPhrase: {
    D: "tiende a la sequedad", O: "produce grasa", S: "reacciona rápido", R: "tolera bien",
    P: "retiene el pigmento", N: "mantiene el tono", W: "marca líneas", T: "se mantiene firme",
  },
  typeLine: (a, b, c, d) =>
    `Una piel que ${a}, ${b}, ${c} y ${d}. Uno de dieciséis tipos — y esas cuatro letras deciden cada producto que te pongo delante aquí abajo.`,

  rarity: {
    rare: "Alrededor de 1 de cada 14 personas da este resultado",
    demanding: "Uno de los tipos más exigentes que vemos",
    common: "Lo comparte cerca del 6% de quienes hacen el test",
  },

  sections: {
    resultEyebrow: "Tu resultado en Idol Skin Lab",
    pageEyebrow: "Idol Skin Lab · tipo de piel",
    axesTitle: "Tus cuatro ejes",
    axesNoteQuiz:
      "Toda cara que veo cae en algún punto de estos cuatro deslizadores. Aquí está el tuyo: cuanto más lejos del centro, más debe inclinarse tu rutina hacia ese lado.",
    axesNotePage:
      "Toda cara que veo cae en algún punto de estos cuatro deslizadores. Aquí está el de este tipo: cuanto más lejos del centro, más debe inclinarse la rutina hacia ese lado.",
    cardsTitle: "Qué significa en el día a día",
    cardsNote: "Las cuatro cosas que te diría antes de que te levantaras de la camilla.",
    routineTitle: "Tu orden de capas",
    routineNote:
      "Las rutinas coreanas van de orden y densidad, no de número de productos. Lo más ligero primero, siempre. Este es el orden en que trabajo.",
    morning: "Mañana", morningSub: "Proteger y sellar — de 5 a 7 minutos",
    evening: "Noche", eveningSub: "Limpiar y reparar — de 8 a 10 minutos",
    productsTitle: "Elegidos para ti",
    productsNote:
      "Ocho productos escogidos según tus cuatro letras, no una lista de más vendidos. Cada uno de los otros quince tipos recibe un estante distinto, y cada ficha te dice qué letra tuya lo puso ahí. Precios orientativos.",
    affiliateNote: "Algunos enlaces son de afiliado. Tu precio es el mismo en cualquier caso.",
    idolsTitle: "Tomado de los idols",
    idolsNote:
      "Hábitos que artistas del K-pop han contado en entrevistas y reportajes de belleza, filtrados a los que tienen sentido para este tipo. Solo el método: sin fotos, sin patrocinio.",
  },

  cards: {
    dry: { tag: "Textura", head: "Se descama antes de comer", body: "La piel seca pierde agua a lo largo del día, así que a mediodía la base se agarra a las zonas descamadas. Hidrata en capas finas en vez de recurrir a una crema más pesada." },
    oily: { tag: "Textura", head: "El brillo vuelve rápido", body: "La grasa se rehace en horas. Usa papel matificante, no más polvos: los polvos sobre sebo son justo lo que se convierte en textura visible por la tarde." },
    sensitive: { tag: "Tolerancia", head: "El perfume es un activo", body: "En una barrera reactiva, el perfume añadido se comporta como un ingrediente con dosis. Quítalo antes que ninguna otra cosa." },
    resistant: { tag: "Tolerancia", head: "Puedes avanzar más rápido", body: "Una barrera resistente llega antes a los retinoides y los ácidos. Aun así, añade uno cada vez para saber cuál funcionó." },
    pigment: { tag: "Tono", head: "No te toques nunca un grano", body: "Tu piel responde a la inflamación con pigmento. Un grano tocado es una marca de cuatro meses. Uno sin tocar, de dos semanas." },
    even: { tag: "Tono", head: "Gasta el dinero en otra cosa", body: "Las marcas se te van solas, así que los séums iluminadores son opcionales para ti. Pon ese dinero en textura, firmeza y protector solar." },
    wrinkle: { tag: "Estructura", head: "Las noches son para el colágeno", body: "Las líneas que siguen ahí con la cara relajada responden a activos nocturnos constantes, nunca a activos fuertes de vez en cuando." },
    tight: { tag: "Estructura", head: "Ventana de prevención", body: "No hay nada que corregir todavía, y eso convierte al protector solar en el producto más rentable de tu rutina con diferencia." },
  },

  routine: {
    amCleanse: "Aclarado con agua o limpieza suave",
    amCleanseOily: "Un gel de pH bajo: el sebo de la noche hay que levantarlo.",
    amCleanseDry: "Solo agua templada. Nada ha ensuciado tu piel durante la noche.",
    amToner: "Tónico hidratante", amTonerSub: "Dos capas finas a palmadas, con las palmas planas, hasta que quede pegajoso.",
    amVitc: "Vitamina C o niacinamida", amVitcSub: "Los antioxidantes por la mañana son prevención del pigmento, no corrección.",
    amSerum: "Sérum hidratante", amSerumSub: "Lo que tu piel te pida ese día.",
    amCream: "Hidratante", amCreamDry: "Textura crema: necesitas el sellado lipídico.", amCreamOily: "Solo textura gel o loción.",
    amSpf: "SPF 50, dos dedos de producto", amSpfSub: "El paso que rinde más que todo lo anterior. Reaplica si vas a estar fuera.",
    pmOil: "Limpieza con aceite", pmOilSub: "Masajea sobre piel seca durante 60 segundos. El protector solar no se disuelve en agua.",
    pmSecond: "Segunda limpieza", pmSecondSub: "Espuma o gel de pH bajo. La cara debe quedar limpia, nunca chirriante.",
    pmSkipAcid: "Sáltate los ácidos si los usaste ayer", pmSkipAcidSub: "Alterna. La piel reactiva necesita noches de recuperación entre activos.",
    pmExfo: "Tónico exfoliante, 2–3 noches por semana", pmExfoSub: "Químico, nunca un exfoliante de grano.",
    pmRetinal: "Retinal o ampolla fermentada", pmRetinalSub: "Empieza dos veces por semana y sube a diario en seis semanas.",
    pmBarrier: "Sérum reparador de barrera", pmBarrierSub: "Mantén la barrera alimentada mientras duermes.",
    pmSeal: "Sellado",
    pmSealDry: "Crema y, sobre las zonas secas, una capa fina de mascarilla de noche.",
    pmSealOily: "Gel-crema. No te lo saltes por tener piel grasa: la piel grasa deshidratada fabrica más grasa.",
  },

  productStep: {
    cleanse: "Limpieza", toner: "Tónico", serum: "Sérum", night: "Activo de noche",
    moisturiser: "Hidratante", spf: "Protector solar", weekly: "Tratamiento semanal",
  },

  productStepNote: {
    cleanse: "Todo lo que viene después depende de que este paso encaje con tu barrera.",
    toner: "En una rutina coreana el tónico es una capa de tratamiento, no un desmaquillante.",
    serum: "El único paso apuntado directamente a tu preocupación principal.",
    night: "La reparación ocurre mientras duermes. De aquí sale el cambio de verdad.",
    moisturiser: "Aquí pesa más la textura que la marca: demasiado densa congestiona, demasiado ligera no sella.",
    spf: "El producto más rentable de tu rutina, en los dieciséis tipos sin excepción.",
    weekly: "Una o dos veces por semana, para que los pasos diarios sigan funcionando.",
  },

  productReason: {
    D: "Porque tu barrera tiende a la sequedad",
    O: "Porque produces sebo de verdad",
    S: "Porque tu piel reacciona antes de tolerar",
    R: "Porque tu barrera lo aguanta",
    P: "Porque retienes el pigmento",
    N: "Porque tu tono se mantiene parejo",
    W: "Porque las líneas ya se están fijando",
    T: "Porque aún estás en la ventana de prevención",
    all: "Para todo el mundo. Todos los tipos.",
  },

  productWhy: {
    cleanse_dry:
      "Tu barrera ya va corta de lípidos, así que el limpiador equivocado deshace la rutina entera antes de empezar. Este trabaja al pH de la piel y levanta el día sin llevarse las grasas: sales del baño con la cara cómoda en vez de tirante, y eso es lo primero que cambia en una piel seca.",
    cleanse_oil:
      "Si arrasas una piel grasa, responde fabricando más grasa una hora después. Esta textura de leche disuelve el sebo y el protector solar y ahí se para, así que quedas limpia de verdad sin el chirrido que dispara el rebote. El brillo de las cuatro de la tarde baja en unas semanas, no de un día para otro.",
    toner_hydra:
      "Una piel reactiva va mejor con un tónico que trate que con uno que tense. El extracto de Houttuynia al 77% le quita el calor a la rojez de fondo mientras hidrata, así puedes poner activos encima de una base calmada y no sobre una piel ya irritada.",
    toner_exfo:
      "Tu barrera tolera los ácidos, así que una mezcla suave a diario es la forma más barata de evitar que la congestión se convierta en grano. Tres tipos de ácido trabajan a tres profundidades a la vez: mantiene el poro limpio sin el escozor de un peeling fuerte semanal, y la textura se alisa en un mes aproximadamente.",
    serum_hydra:
      "La hidratación es el paso que casi todo el mundo falla por poner una sola capa densa. Cinco pesos moleculares de ácido hialurónico llegan a profundidades distintas al mismo tiempo, así el agua va donde de verdad falta en lugar de quedarse arriba y evaporarse.",
    serum_cica:
      "Cuando una piel se irrita antes de tolerar, la solución no es una versión más suave de lo mismo: es centella, que calma la reacción en sí. Este es el sérum que por fin le permite a una piel sensible construir una rutina, porque corta el ciclo de reaccionar, retirarse y volver a empezar.",
    serum_bright:
      "Tu piel responde a la inflamación con pigmento, y una vez que la marca se fija tarda meses. La niacinamida al 2% interrumpe el traspaso antes de que ocurra: estás evitando marcas, no borrándolas. El propóleo se ocupa de la cicatrización en paralelo.",
    serum_vitc:
      "Te marcas con fuerza, así que necesitas el extremo correctivo de la gama, no el suave. Es un derivado estabilizado de vitamina C: hace el trabajo iluminador del ácido ascórbico puro sin el escozor ni la oxidación, y eso significa que podrás usarlo el tiempo suficiente para ver el cambio.",
    serum_retinal:
      "El retinal se convierte en ácido retinoico en un solo paso en vez de dos, así que actúa bastante más rápido que el retinol con el mismo coste en irritación. Tu barrera lo aguanta, o sea que puedes ir directa al ingrediente eficaz en lugar de pasar seis meses subiendo escalones.",
    serum_ferment:
      "Necesitas apoyo de colágeno pero tu piel reacciona a los retinoides de siempre. El fermento de levadura filtrado es la respuesta coreana de toda la vida a exactamente ese problema: firmeza sin purga, aplicado cada noche en lugar de dos veces por semana con miedo.",
    cream_rich:
      "Una barrera seca no necesita más agua, necesita los lípidos que retienen esa agua. Esta es rica en ceramidas y sin perfume, y es a la que recurren las esteticistas cuando una cara se descama bajo el maquillaje: el cambio se nota en unos cuatro días.",
    cream_light:
      "Saltarte la hidratante por tener piel grasa es justo lo que te vuelve más grasa: la piel deshidratada compensa con sebo. Esta textura gel sella sin sumar ni un punto de brillo, que es el equilibrio que la piel grasa normalmente no encuentra.",
    cream_barrier:
      "A la piel sensible se la suele empujar hacia cremas densas que congestionan. Esta es de base de agua mineral con un sellado lipídico ligero: calma sin peso, así mantienes la barrera alimentada sin darte algo nuevo a lo que reaccionar.",
    spf_all:
      "Este es el producto que rinde más que ningún otro de tu rutina, así que tiene que ser uno que te vayas a poner de verdad todos los días. Sin velo blanco, sin película, sin apelmazarse bajo el maquillaje: por eso es el filtro coreano más usado.",
    spf_oily:
      "La mayoría de protectores fallan en piel grasa apelmazándose o resbalando al mediodía. Este tiene un acabado acuoso que fija y se queda bajo el maquillaje, lo que convierte el protector solar de una negociación diaria en algo en lo que dejas de pensar.",
    mask_sheet:
      "Lo que separa la piel de las idols de la del resto no es un producto, es la frecuencia. Guárdalas frías en la nevera y los diez minutos dejan de costar: ese es todo el truco, y funciona en tu tipo porque tu barrera quiere volumen de hidratación, no peso.",
    mask_clay:
      "Tu combinación de grasa y barrera resistente es exactamente para lo que existe la arcilla. La arcilla volcánica de Jeju saca la congestión del poro sin resecar el resto de la cara, una o dos veces por semana: lo justo para que el poro no se cierre, sin llegar a disparar el rebote de grasa.",
  },

  idolCopy: {
    hydration: {
      habit: "Ha contado varias veces que se pone mascarilla casi todas las noches y que las guarda frías — dice que lo hace mientras ve algo, así los diez minutos nunca pesan.",
      pull: "La rutina que sobrevive es la que puedes hacer tumbada.",
    },
    gentle: {
      habit: "Conocida por ir sin maquillaje en sus días libres y por mantener la limpieza deliberadamente suave: la idea es que la piel necesita recuperarse entre jornadas de maquillaje completo.",
      pull: "Los días de descanso son un paso de la rutina, no un hueco en ella.",
    },
    spf: {
      habit: "Ha hablado del protector solar como lo innegociable, reaplicado a lo largo de las jornadas al aire libre en vez de puesto una vez por la mañana y olvidado.",
      pull: "Todo lo demás es opcional. Esto no.",
    },
    layering: {
      habit: "Su método, copiadísimo, son capas finas de esencia acuosa a palmadas hasta que absorben, y después sellar: volumen de hidratación sin peso sobre la piel.",
      pull: "Siete capas finas ganan a una gruesa.",
    },
    cleansing: {
      habit: "Ha insistido en retirar hasta el último resto del maquillaje de escenario — un aceite que lo disuelve y después un limpiador de pH bajo, antes de cualquier paso de tratamiento.",
      pull: "Nada de lo que te apliques importa si el día sigue en tu cara.",
    },
    depuff: {
      habit: "Agua fría y hielo para deshinchar antes de las llamadas de madrugada, junto a una filosofía de pocos productos: menos cosas, usadas de forma constante.",
      pull: "Primero el frío, después el producto.",
    },
  },

  share: {
    prompt: (code) => `Eres ${code}. Publícalo — tus amigas van a querer saber el suyo.`,
    text: (code, name) =>
      `Acabo de sacar ${code} — «${name}» — en Idol Skin Lab. Diez preguntas y me leyó la piel mejor que los últimos tres productos que compré. Descubre tu tipo: `,
    tags: (code) => `#TipoDePiel #KBeauty #CosmeticaCoreana #TipoDePiel${code}`,
    copied: "Texto copiado — pégalo",
    linkCopied: "Enlace copiado",
    manualCopy: "Pulsa ⌘C para copiar",
    copyLink: "Copiar enlace",
  },

  callout: {
    title: "¿Quieres que te guíe la primera semana?",
    body: "Te mando un plan de cuatro semanas para tu tipo: qué añadir, en qué noche añadirlo y un aviso cuando tus activos estén a punto de acabarse.",
    placeholder: "tu@correo.com",
    button: "Enviármelo",
    sent: "Enviado ✓",
  },
  restart: "Volver a leer mi piel",

  typeIndex: {
    eyebrow: "El mapa completo",
    title: "Los dieciséis tipos",
    lede: "Cuatro ejes, dos resultados cada uno: dieciséis maneras de ser una cara. Casi todos los tests te dan cuatro etiquetas y lo llaman diagnóstico. Este es el mapa con el que trabajo de verdad.",
    howTitle: "Cómo leer las letras",
    how: [
      "**D / O** — Seca (Dry) o Grasa (Oily). Cuántos lípidos fabrica tu barrera por su cuenta.",
      "**S / R** — Sensible o Resistente. Si tu piel reacciona antes de tolerar.",
      "**P / N** — Propensa al pigmento o tono parejo. Qué deja atrás un grano curado.",
      "**W / T** — Propensa a líneas (Wrinkle) o firme (Tight). Dónde estás en envejecimiento estructural.",
    ],
    listTitle: "Los dieciséis",
    unsureTitle: "¿No sabes cuál es el tuyo?",
    unsureBody:
      "Diez preguntas lo resuelven — incluidas las dos que casi todo el mundo falla sobre su propia cara. Tarda unos noventa segundos y no pide nada a cambio.",
    credit:
      "El planteamiento de cuatro ejes sigue la convención dermatológica popularizada por la Dra. Leslie Baumann. La selección de productos, las rutinas y los textos son nuestros.",
    metaTitle: "Los 16 tipos de piel",
    metaDescription:
      "El mapa completo: dieciséis tipos de piel en cuatro ejes — grasa, reactividad, pigmento y firmeza. Encuentra el tuyo y la rutina coreana que le corresponde.",
  },

  typePage: {
    notYouTitle: "¿No estás segura de que sea el tuyo?",
    notYouBody: "Diez preguntas lo deciden bien, incluidas las dos que casi todo el mundo falla sobre su propia cara.",
    cta: "Leer mi piel",
  },
};
