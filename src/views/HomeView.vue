<template>
  <AppInterface></AppInterface>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AppInterface from "@/views/AppInterface.vue";

@Options({
  components: {
    AppInterface
  },
})
export default class HomeView extends Vue {}
</script>
