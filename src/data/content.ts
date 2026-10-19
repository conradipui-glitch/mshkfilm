export const TG_CONTACT = "https://t.me/mmushkachev";
export const TG_CHANNEL = "https://t.me/mushkachev";

/* ------------------------------------------------------------------ */
/*  Работы. Все публикации — из открытого канала @mushkachev.          */
/*  Даты, роли и хронометраж сверены с постами и файлами: цифры есть   */
/*  только там, где они реально известны.                              */
/*  video — ролик, который играет прямо на сайте. Если файла нет,      */
/*  работа открывается карточкой с кадром и описанием.                 */
/* ------------------------------------------------------------------ */

export type WorkCategory = "staged" | "ad" | "mood" | "backstage";

export interface WorkMedia {
  video?: string;
  poster: string;
  orientation: "landscape" | "portrait";
}

export interface Work {
  id: string;
  code: string;
  title: string;
  partner?: string;
  role: string;
  roleKind: "solo" | "edit" | "team";
  category: WorkCategory;
  description: string;
  duration?: string;
  date: string;
  url: string;
  accent: string; // hex for typographic poster
  media?: WorkMedia;
}

export const CATEGORY_LABELS: Record<WorkCategory | "all", string> = {
  all: "Все работы",
  staged: "Постановка",
  ad: "Реклама",
  mood: "Атмосфера",
  backstage: "Бэкстейдж",
};

export const WORKS: Work[] = [
  {
    id: "sebero",
    code: "ТК-01",
    title: "«Мелкий бес» — эпизод 3",
    partner: "SEBERO",
    role: "в команде проекта",
    roleKind: "team",
    category: "staged",
    description:
      "Третий эпизод игрового проекта вместе с компанией SEBERO. Постановочная сцена с репликами и светом — не репортаж, а история с началом и концом.",
    duration: "2:45",
    date: "22 марта 2026",
    url: "https://t.me/mushkachev/232",
    accent: "#ff4d00",
    media: {
      video: "assets/video/sebero.mp4",
      poster: "assets/img/poster-sebero.webp",
      orientation: "portrait",
    },
  },
  {
    id: "krc",
    code: "ТК-02",
    title: "«Обломов» и Герасим",
    partner: "КРЦ",
    role: "в команде проекта",
    roleKind: "team",
    category: "staged",
    description:
      "Сцена по мотивам русской классики — вместе с командой КРЦ из Набережных Челнов. Диалоги, паузы, актёрская игра: то, что смотришь, а не листаешь.",
    duration: "3:00",
    date: "24 мая 2026",
    url: "https://t.me/mushkachev/233",
    accent: "#ffb000",
    media: {
      video: "assets/video/krc.mp4",
      poster: "assets/img/poster-krc.webp",
      orientation: "portrait",
    },
  },
  {
    id: "airplane",
    code: "ТК-03",
    title: "Ужин на борту самолёта",
    role: "в команде проекта",
    roleKind: "team",
    category: "staged",
    description:
      "Короткая история в салоне самолёта: бытовая сцена, снятая как киноэпизод. Из тех работ, где важна не картинка, а интонация.",
    duration: "2:50",
    date: "8 июля 2025",
    url: "https://t.me/mushkachev/222",
    accent: "#e7dcc4",
    media: {
      video: "assets/video/airplane.mp4",
      poster: "assets/img/poster-airplane.webp",
      orientation: "portrait",
    },
  },
  {
    id: "staff-brothers",
    code: "ТК-04",
    title: "Staff Brothers × Gastreet",
    partner: "Staff Brothers",
    role: "монтаж",
    roleKind: "edit",
    category: "ad",
    description:
      "Ролик с кампейна мерча Staff Brothers / Gastreet. Материал снимали не я — моя работа здесь монтаж: собрать из кадров рекламный ролик с ритмом.",
    duration: "0:57",
    date: "4 июня 2025",
    url: "https://t.me/mushkachev/219",
    accent: "#ffb000",
    media: {
      video: "assets/video/staff.mp4",
      poster: "assets/img/poster-staff.webp",
      orientation: "landscape",
    },
  },
  {
    id: "alone",
    code: "ТК-05",
    title: "Наедине с самим собой",
    role: "снял и смонтировал",
    roleKind: "solo",
    category: "mood",
    description:
      "Ночная постановочная сцена: фонарь, машина, один человек. Десять секунд, в которых есть настроение, а не просто кадр.",
    duration: "0:10",
    date: "11 июня 2025",
    url: "https://t.me/mushkachev/220",
    accent: "#ff7847",
    media: {
      video: "assets/video/alone.mp4",
      poster: "assets/img/poster-alone.webp",
      orientation: "portrait",
    },
  },
  {
    id: "summer-frames",
    code: "ТК-06",
    title: "Летние кадры",
    role: "снял и смонтировал",
    roleKind: "solo",
    category: "mood",
    description:
      "Нашёл на диске летние кадры и собрал из них мини-ролик перед удалением. Про вайб, тепло и монтаж ради настроения.",
    duration: "0:24",
    date: "6 декабря 2025",
    url: "https://t.me/mushkachev/228",
    accent: "#ff4d00",
    media: {
      video: "assets/video/summer.mp4",
      poster: "assets/img/poster-summer.webp",
      orientation: "landscape",
    },
  },
  {
    id: "primorye",
    code: "ТК-07",
    title: "Приморье. Бухта Муравьиная",
    role: "снял",
    roleKind: "solo",
    category: "mood",
    description:
      "Поездка в Приморский край: сосны, Японское море, тишина. Снимал в поездке с Мишей Шульцем — из тех дней, когда камера просто рядом.",
    duration: "0:43",
    date: "3 июля 2025",
    url: "https://t.me/mushkachev/221",
    accent: "#ffb000",
    media: {
      video: "assets/video/primorye.mp4",
      poster: "assets/img/poster-primorye.webp",
      orientation: "portrait",
    },
  },
  {
    id: "vlog-backstage",
    code: "ТК-08",
    title: "Бэкстейдж влога для YouTube",
    role: "съёмка в команде",
    roleKind: "team",
    category: "backstage",
    description:
      "Как выглядит съёмка влога для @t_nanikashvili до того, как материал попадёт на канал: два коротких фрагмента с площадки.",
    duration: "0:07 + 0:07",
    date: "3 июня 2025",
    url: "https://t.me/mushkachev/217",
    accent: "#e7dcc4",
    media: {
      video: "assets/video/backstage.mp4",
      poster: "assets/img/poster-backstage.webp",
      orientation: "portrait",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Услуги                                                             */
/* ------------------------------------------------------------------ */

export interface Service {
  id: string;
  num: string;
  title: string;
  short: string;
  forWhom: string;
  details: string;
  deliverables: string[];
}

export const SERVICES: Service[] = [
  {
    id: "staged",
    num: "01",
    title: "Постановочные ролики",
    short: "Ваша история в формате фильма",
    forWhom: "Для брендов и людей, которым есть что рассказать",
    details:
      "Мой конёк. Придумываем историю, раскадровку и свет, снимаем как сцену — чтобы даже тридцать секунд про продукт смотрелись как фрагмент кино, а не как отчёт о съёмке.",
    deliverables: [
      "Идея, сценарий и раскадровка",
      "Постановочная съёмка со светом",
      "Монтаж, цвет и звук",
    ],
  },
  {
    id: "ad",
    num: "02",
    title: "Реклама и кампании",
    short: "Продукт как герой, а не как товар на витрине",
    forWhom: "Для запусков, кампейнов и мерча",
    details:
      "Ролики для рекламных кампаний — от концепции до финального файла. С кампейном Staff Brothers × Gastreet я делал монтаж: собрать из снятого материала ролик с ритмом.",
    deliverables: [
      "Рекламный ролик 15–60 секунд",
      "Версии под площадки",
      "Кадры для соцсетей",
    ],
  },
  {
    id: "bloggers",
    num: "03",
    title: "Контент для блогеров",
    short: "Кино в вашем канале",
    forWhom: "Для авторов, блогеров и их продюсеров",
    details:
      "Влоги, рекламные вставки, короткометражки. Снимаю так, чтобы даже обычный день выглядел как эпизод: свет, движение, монтаж под ваш голос.",
    deliverables: [
      "Съёмка влогов и коротких форматов",
      "Выездные съёмки в поездках",
      "Монтаж под стиль канала",
    ],
  },
  {
    id: "editing",
    num: "04",
    title: "Монтаж и цвет",
    short: "Собрать из снятого — и спасти то, что кажется слабым",
    forWhom: "Для всех, у кого уже есть материал",
    details:
      "Отбираю кадры, собираю ритм, делаю цвет и звук в DaVinci Resolve. Так собран ролик для Staff Brothers. Если материал снят слабо, честно скажу, что из него реально получить.",
    deliverables: [
      "Монтаж и цветокоррекция",
      "Звуковое оформление",
      "Версии под разные площадки",
    ],
  },
  {
    id: "operator",
    num: "05",
    title: "Оператор в команду",
    short: "На постановочный проект",
    forWhom: "Для режиссёров, продюсеров и съёмочных групп",
    details:
      "Приезжаю со своей техникой и работаю по вашему плану: свет, камера, движение. Fujifilm X-H2S и X-T4, стабилизатор, беспроводная запись звука.",
    deliverables: [
      "Работа по брифу и раскадровке",
      "Своя техника, готовность к выезду",
      "Материал в нужном кодеке и профиле",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Процесс                                                            */
/* ------------------------------------------------------------------ */

export const PROCESS = [
  {
    take: "Дубль 0",
    title: "Разговор",
    text: "Вы пишете в Telegram. Выясняем, какую историю рассказываем, для кого и в каком формате. Парой сообщений, без анкет на десять страниц.",
  },
  {
    take: "Дубль 1",
    title: "Подготовка",
    text: "Идея, референсы, раскадровка, локация и свет. Стоимость и сроки называю здесь же — до съёмки, а не после.",
  },
  {
    take: "Дубль 2",
    title: "Съёмка",
    text: "Один-два съёмочных дня. Постановка, свет, дубли — как на площадке, только команда маленькая и решения принимаются быстро.",
  },
  {
    take: "Дубль 3",
    title: "Монтаж и сдача",
    text: "Сборка, цвет, звук, титры. Отдаю файлы под большой экран и под соцсети, показываю правки до финала.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

export const FAQ = [
  {
    q: "Сколько стоит постановочный ролик?",
    a: "Зависит от сценария, локаций, числа смен и графики. Называю стоимость после короткого разговора и до съёмки — без «уточним потом».",
  },
  {
    q: "Вы правда работаете один?",
    a: "MSHK.FILM — личный бренд, а не студия: вы всегда знаете, кто за камерой и кто монтирует. Но постановочные проекты часто делаю в команде — с актёрами, вторым оператором, стилистом. Состав собираем под задачу.",
  },
  {
    q: "Можно ли заказать только монтаж?",
    a: "Да. Так собран ролик для Staff Brothers × Gastreet: материал снимали не я, монтаж — мой.",
  },
  {
    q: "А мероприятия снимаете?",
    a: "Да, но по-своему: не только репортаж, а фильм о событии — с постановочными кадрами и монтажом, а не часовой записью.",
  },
  {
    q: "Выезжаете ли вы из Омска?",
    a: "Да, по договорённости. Снимал в Приморском крае, работаю с командами из других городов — условия выезда обсуждаем заранее.",
  },
  {
    q: "Как быстро будет готово?",
    a: "Срок обсуждаем до съёмки, под конкретную задачу и текущую загрузку. Не обещаю «завтра» то, что честно делается дольше.",
  },
];

/* ------------------------------------------------------------------ */
/*  Бриф-хлопушка                                                      */
/* ------------------------------------------------------------------ */

export const BRIEF_TYPES = [
  "Постановочный ролик",
  "Реклама / кампейн",
  "Контент для блогера",
  "Только монтаж",
  "Оператор в команду",
  "Другое",
];

export const BRIEF_RESULTS = [
  "Ролик-история, 1–3 минуты",
  "Рекламный ролик",
  "Вертикальные клипы",
  "Монтаж из моих исходников",
  "Пока не знаю — посоветуйте",
];
