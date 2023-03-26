<template>
  <div>
    <h3>{{ msg }}</h3>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    msg: String,
  },
})
export default class TemplateTs extends Vue {
  msg!: string;
  data() {
    return {
      test: "",
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
</style>
