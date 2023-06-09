# Web-приложение KVGrav

KVGrav представляет собой 2D эмулятор гравитации.

Приложение является сайтом-приложением работающим в любом современно браузере с возможностью установки на Windows, Linux и macOS (PWA). Приложению не требуется доступ в интернет для его функционирования.

Для обмена состояниями объектов, для добавления, удаления и редактирования используйте функцию [импорт/экспорт](ImportExport.md)

### Текущие возможности:

- Эмуляция физики (взаимодействие объектов друг с другом и с внешним полем). Подробнее [тут](https://github.com/scientific-tribunal/kvgrav#kvgrav)
- Настройка параметров (скорость, радиус и сила внешнего поля)
- Включение и отключение физики Ньютона
- Запуск и пауза кнопкой
- Импорт и экспорт объектов с текущим состоянием
- Уничтожение объекта с меньшей массой при столкновении

### Планируемые возможности:

- Поддержка энерции (после добавления в библиотеку KVGrav)
- Уничтожение объектов при выходе за рамки внешнего поля
- Загрузка объектов предложенных сообществом (вы можете уже предлагать) свои файлы экспорта)
- Добавление параметров физики (сила поля и т.д.) в файл импорта и экспорта
- Изменение объектов по клику на него, перемещение мышкой и т.д.
- Отображение сил для выбранного объекта
- Адаптивный размер отображения

При возникновении подозрений что что-то не так, ознакомьтесь с серией фильмов «Гравитация»

## Импорт и Экспорт
[подробнее](ImportExport.md)


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
