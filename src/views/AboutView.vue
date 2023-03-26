<template>
  <div class="container header-page">
    <h1>Приложение KVGrav</h1>
    <p>KVGrav представляет собой 2D эмулятор гравитации.</p>
    <p>Приложение является сайтом-приложением работающим в любом современно браузере с возможностью установки на Windows, Linux и macOS (PWA). Приложению не требуется доступ в интернет для его функционирования.<br>
      Приложение полностью бесплатно, код открыт и доступен на <a class="text-reset" target="_blank" href="https://github.com/scientific-tribunal/">github</a> по лицензии Apache-2.0
    </p>
    <p>Версия приложения: {{ versionApp() }} <a type="button" @click="reload" class="btn _btn-outline-secondary btn-sm"
                                                data-bs-toggle="tooltip" data-bs-title="App update"><i
      class="fa-solid fa-arrows-rotate"></i></a></p>
    <p>Текущие возможности:</p>
    <ul>
      <li>Эмуляция физики (взаимодействие объектов друг с другом и с внешним полем). Подробнее <a class="text-reset" target="_blank"
                                                                                                     href="https://github.com/scientific-tribunal/kvgrav#kvgrav">тут</a>
      </li>
      <li>Настройка параметров (скорость, радиус и сила внешнего поля)</li>
      <li>Включение и отключение физики Ньютона</li>
      <li>Запуск и пауза кнопкой</li>
      <li>Импорт и экспорт объектов с текущим состоянием</li>
      <li>Уничтожение объекта с меньшей массой при столкновении</li>
    </ul>

    <p>Планируемые возможности:</p>
    <ul>
      <li>Поддержка энерции (после добавления в библиотеку <a class="text-reset" target="_blank" href="https://github.com/scientific-tribunal/kvgrav">KVGrav</a>)</li>
      <li>Уничтожение объектов при выходе за рамки внешнего поля</li>
      <li>Загрузка объектов предложенных сообществом (вы можете уже предлагать свои файлы экспорта)</li>
      <li>Добавление параметров физики (сила поля и т.д.) в файл импорта и экспорта</li>
      <li>Изменение объектов по клику на него, перемещение мышкой и т.д.</li>
      <li>Отображение сил для выбранного объекта</li>
      <li>Адаптивный размер отображения</li>
    </ul>
    <p>При возникновении подозрений что что-то не так, ознакомьтесь с <a class="text-reset" target="_blank"
                                                                       href="https://www.youtube.com/watch?v=HETcwoDKr4g&list=PL_0JNvLqzOHR8SB8lKERj9LLOWpEjqJAL">серией
      фильмов «Гравитация»</a></p>
<!--    <p class="">Приложение создано на основе <a target="_blank" href="https://github.com/scientific-tribunal/kvgrav">движка KVGrav</a>.</p>-->

  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { versionApp } from "@/ts/Config";

@Options({
  methods: {
    versionApp() {
      return versionApp;
    }
  },
  props: {}
})
export default class About extends Vue {
  data() {
    return {};
  }

  reload() {
    this.$router.go(0);
    // this.$forceUpdate();
    // window.location.reload(true);
  }

  mounted(): void {
    document.title = "О проекте — KVGrav";
  }
}
</script>
