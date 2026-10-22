/*
 * On-screen text in Portuguese, English, Spanish, German and Russian (the same copy as the Android app).
 * tr(pt, en, es): the text in the current language. The language follows the TV unless set in Home Settings.
 */
var I18N = (function () {
  'use strict';

  var lang = 'en';
  var german = {
    "Live TV": "Live-TV",
    "All Apps": "Alle Apps",
    "Settings": "Einstellungen",
    "Home Settings": "Startbildschirm",
    "TV Settings": "TV-Einstellungen",
    "HDMI Inputs": "HDMI-Eingänge",
    "Light mode": "Heller Modus",
    "Dark mode": "Dunkler Modus",
    "Open": "Öffnen",
    "Move": "Verschieben",
    "Remove from shelf": "Aus der Leiste entfernen",
    "Add to shelf": "Zur Leiste hinzufügen",
    "Cancel": "Abbrechen",
    "Weather location": "Wetterort",
    "From network": "Über das Netzwerk",
    "Time zone": "Zeitzone",
    "Day wallpaper": "Hintergrund (Tag)",
    "Night wallpaper": "Hintergrund (Nacht)",
    "None": "Keiner",
    "Plain background": "Einfarbiger Hintergrund",
    "Wallpaper": "Hintergrund",
    "Undone": "Rückgängig gemacht",
    "Change wallpaper": "Hintergrund wechseln",
    "Each time Home opens": "Bei jedem Öffnen",
    "Every hour": "Stündlich",
    "Never": "Nie",
    "Font": "Schrift",
    "Screensaver": "Bildschirmschoner",
    "Start after": "Starten nach",
    "Photos": "Fotos",
    "Clock": "Uhr",
    "Seconds": "Sekunden",
    "Date": "Datum",
    "Weather now": "Wetter jetzt",
    "Hourly forecast": "Stündliche Vorhersage",
    "Crypto prices": "Kryptokurse",
    "Photo name": "Fotoname",
    "Position": "Position",
    "Bottom left": "Unten links",
    "Bottom right": "Unten rechts",
    "Center": "Mitte",
    "Moving": "Wandernd",
    "Preview": "Vorschau",
    "Off": "Aus",
    "Screensaver shows": "Bildschirmschoner zeigt",
    "This wallpaper": "Diesen Hintergrund",
    "Clock only": "Nur die Uhr",
    "All wallpapers": "Alle Hintergründe",
    "Show screensaver now": "Bildschirmschoner jetzt zeigen",
    "Layout": "Anordnung",
    "List": "Liste",
    "↑ ↓ to move it · OK when done": "↑ ↓ zum Verschieben · OK, wenn fertig",
    "Undo last change": "Letzte Änderung rückgängig",
    "Leave Free My TV?": "Free My TV verlassen?",
    "Stay here": "Hierbleiben",
    "Open Samsung Home": "Samsung-Startseite öffnen",
    "Recently removed": "Kürzlich entfernt",
    "Good morning": "Guten Morgen",
    "Good afternoon": "Guten Tag",
    "Good evening": "Guten Abend",
    "← → to move it · OK when done": "← → zum Verschieben · OK, wenn fertig",
    "Inputs": "Eingänge",
    "Shortcuts": "Verknüpfungen",
    "Weather": "Wetter",
    "No weather data right now.": "Gerade keine Wetterdaten.",
    "Sunrise ": "Sonnenaufgang ",
    "Sunset ": "Sonnenuntergang ",
    "Crypto": "Krypto",
    "24h change": "Änderung in 24 h",
    "For You": "Für dich",
    "Couldn't open ": "Konnte nicht öffnen: ",
    "Couldn't open TV Settings": "Die TV-Einstellungen ließen sich nicht öffnen",
    "Dollar": "Dollar",
    "Series": "Serie",
    "Language": "Sprache",
    "Temperature": "Temperatur",
    "Theme": "Design",
    "Automatic": "Automatisch",
    "Light": "Hell",
    "Dark": "Dunkel",
    "Weather widget": "Wetter-Widget",
    "Quotes widget": "Kurs-Widget",
    "On": "An",
    "Off": "Aus",
    "Shelf": "Leiste",
    "On · ": "In der Leiste · ",
    "OK or the arrows change the value.": "OK oder die Pfeiltasten ändern den Wert.",
    "OK adds or removes · ← → change the order": "OK fügt hinzu oder entfernt · ← → verschieben",
    "Explore": "Entdecken",
    "Movies": "Filme",
    "Shows": "Serien",
    "Clear": "Klar",
    "Mostly Sunny": "Überwiegend sonnig",
    "Mostly Clear": "Überwiegend klar",
    "Partly Cloudy": "Teilweise bewölkt",
    "Cloudy": "Bewölkt",
    "Fog": "Nebel",
    "Drizzle": "Nieselregen",
    "Heavy Rain": "Starker Regen",
    "Snow": "Schnee",
    "Thunderstorms": "Gewitter",
    "Rain": "Regen"
  };

  /** German by the English; text built at runtime by its English pattern. */
  function germanText(en) {
    if (Object.prototype.hasOwnProperty.call(german, en)) return german[en];
    var m = /^(\d+) (min|h) ago$/.exec(en);
    if (m) return 'vor ' + m[1] + (m[2] === 'min' ? ' Min.' : ' Std.');
    m = /^(\d+) seasons?$/.exec(en);
    if (m) return m[1] + (m[1] === '1' ? ' Staffel' : ' Staffeln');
    m = /^H:(\S+)(\s+)L:(\S+)$/.exec(en);
    if (m) return 'H:' + m[1] + m[2] + 'T:' + m[3];
    m = /^The shelf holds up to (\d+) apps\.$/.exec(en);
    if (m) return 'In die Leiste passen bis zu ' + m[1] + ' Apps.';
    return en;
  }

  var russian = {
    "Live TV": "Телеканалы",
    "All Apps": "Приложения",
    "Settings": "Настройки",
    "Home Settings": "Главный экран",
    "TV Settings": "Настройки ТВ",
    "HDMI Inputs": "Входы HDMI",
    "Light mode": "Светлая тема",
    "Dark mode": "Тёмная тема",
    "Open": "Открыть",
    "Move": "Переместить",
    "Remove from shelf": "Убрать из избранных",
    "Add to shelf": "Добавить в избранные",
    "Cancel": "Отмена",
    "Weather location": "Место для погоды",
    "From network": "По сети",
    "Time zone": "Часовой пояс",
    "Day wallpaper": "Обои (день)",
    "Night wallpaper": "Обои (ночь)",
    "None": "Нет",
    "Plain background": "Однотонный фон",
    "Wallpaper": "Обои",
    "Undone": "Отменено",
    "Change wallpaper": "Менять обои",
    "Each time Home opens": "При каждом открытии",
    "Every hour": "Каждый час",
    "Never": "Никогда",
    "Font": "Шрифт",
    "Screensaver": "Заставка",
    "Start after": "Включать через",
    "Photos": "Фото",
    "Clock": "Часы",
    "Seconds": "Секунды",
    "Date": "Дата",
    "Weather now": "Погода сейчас",
    "Hourly forecast": "Почасовой прогноз",
    "Crypto prices": "Курсы криптовалют",
    "Photo name": "Название фото",
    "Position": "Положение",
    "Bottom left": "Внизу слева",
    "Bottom right": "Внизу справа",
    "Center": "По центру",
    "Moving": "Перемещается",
    "Preview": "Просмотр",
    "Off": "Выкл.",
    "Screensaver shows": "На заставке",
    "This wallpaper": "Эти обои",
    "Clock only": "Только часы",
    "All wallpapers": "Все обои",
    "Show screensaver now": "Показать заставку",
    "Layout": "Вид",
    "List": "Список",
    "↑ ↓ to move it · OK when done": "↑ ↓ чтобы переместить · OK — готово",
    "Undo last change": "Отменить последнее изменение",
    "Leave Free My TV?": "Выйти из Free My TV?",
    "Stay here": "Остаться",
    "Open Samsung Home": "Открыть главный экран Samsung",
    "Recently removed": "Недавно убрано",
    "Good morning": "Доброе утро",
    "Good afternoon": "Добрый день",
    "Good evening": "Добрый вечер",
    "← → to move it · OK when done": "← → чтобы переместить · OK — готово",
    "Inputs": "Входы",
    "Shortcuts": "Ярлыки",
    "Weather": "Погода",
    "No weather data right now.": "Сейчас нет данных о погоде.",
    "Sunrise ": "Восход ",
    "Sunset ": "Закат ",
    "Crypto": "Криптовалюты",
    "24h change": "изменение за 24 ч",
    "For You": "Для вас",
    "Couldn't open ": "Не удалось открыть ",
    "Dollar": "Доллар",
    "Series": "Сериал",
    "now": "сейчас",
    "Language": "Язык",
    "Temperature": "Температура",
    "Theme": "Тема",
    "Automatic": "Автоматически",
    "Light": "Светлая",
    "Dark": "Тёмная",
    "Weather widget": "Виджет погоды",
    "Quotes widget": "Виджет котировок",
    "On": "Вкл.",
    "Off": "Выкл.",
    "Shelf": "Избранные приложения",
    "OK or the arrows change the value.": "Нажмите OK или стрелки, чтобы изменить значение.",
    "Explore": "Обзор",
    "Movies": "Фильмы",
    "Shows": "Сериалы",
    "Clear": "Ясно",
    "Mostly Sunny": "Малооблачно",
    "Mostly Clear": "Малооблачно",
    "Partly Cloudy": "Переменная облачность",
    "Cloudy": "Облачно",
    "Fog": "Туман",
    "Drizzle": "Морось",
    "Heavy Rain": "Сильный дождь",
    "Snow": "Снег",
    "Thunderstorms": "Гроза",
    "Rain": "Дождь",
    "On · ": "В избранном · ",
    "OK adds or removes · ← → change the order": "OK — добавить или убрать · ← → — изменить порядок",
    "Couldn't open TV Settings": "Не удалось открыть настройки телевизора",
    "Action & Adventure": "Боевик и приключения",
    "Sci-Fi & Fantasy": "Фантастика и фэнтези",
    "War & Politics": "Война и политика",
    "Kids": "Для детей",
    "News": "Новости",
    "Soap": "Мыльная опера",
    "Talk": "Ток-шоу",
    "": ""
  };

  function russianText(en) {
    if (Object.prototype.hasOwnProperty.call(russian, en)) return russian[en];
    var m = /^(\d+) (min|h) ago$/.exec(en);
    if (m) return m[1] + (m[2] === 'min' ? ' мин назад' : ' ч назад');
    m = /^The shelf holds up to (\d+) apps\.$/.exec(en);
    if (m) return 'В избранное можно добавить не более ' + m[1] + ' приложений.';
    return en;
  }

  function detect(setting) {
    var v = (setting || 'auto').toLowerCase();
    if (v === 'auto') v = (navigator.language || 'en').toLowerCase();
    return v.indexOf('ru') === 0 ? 'ru' : v.indexOf('de') === 0 ? 'de' : v.indexOf('pt') === 0 ? 'pt' : v.indexOf('es') === 0 ? 'es' : 'en';
  }

  return {
    set: function (setting) { lang = detect(setting); document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang; },
    count: function (n, one, few, many) {
      var last = Math.abs(n % 100);
      return n + ' ' + (last >= 11 && last <= 14 ? many : last % 10 === 1 ? one : last % 10 >= 2 && last % 10 <= 4 ? few : many);
    },
    get lang() { return lang; },
    tr: function (pt, en, es) { return lang === 'ru' ? russianText(en) : lang === 'de' ? germanText(en) : lang === 'es' ? (es || en) : lang === 'en' ? en : pt; },
    /** BCP 47 tag for dates, numbers and TMDB. */
    locale: function () { return lang === 'ru' ? 'ru-RU' : lang === 'de' ? 'de-DE' : lang === 'es' ? 'es-MX' : lang === 'en' ? 'en-US' : 'pt-BR'; }
  };
})();

function tr(pt, en, es) {
  return I18N.tr(pt, en, es);
}
