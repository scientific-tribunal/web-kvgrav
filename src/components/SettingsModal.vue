<template>
  <div class="modal fade" id="info-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
       aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div v-if="modalData" class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-start" id="staticBackdropLabel"><i class="fa-solid fa-info mx-3"></i>Настройки</h5>
          <button v-if="modalData.close" type="button" class="btn-close" data-bs-_dismiss="modal" aria-label="Close" @click="onClose"></button>
        </div>
        <div class="modal-body">
          <label for="customRange3" class="form-label">Радиус внешнего поля {{ funRange4 }}</label>
          <input type="range" v-model="range4" class="form-range" min="500" max="10000" step="1" id="customRange3">
          <label for="customRange3" class="form-label">Сила внешнего поле {{ funRange3 }}</label>
          <input type="range" v-model="range3" class="form-range" min="1" max="1000" step="1" id="customRange3">
          <label for="customRange3" class="form-label">Сила воздействия поля {{ funRange2 }} %</label>
          <input type="range" v-model="range2" class="form-range" min="1" max="100" step="1" id="customRange3">

          <label for="customRange3" class="form-label">Скорость {{ funRange1 }} %</label>
          <input type="range" v-model="range1" class="form-range" min="1" max="100" step="1" id="customRange3">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-_dismiss="modal" @click="onClose">Close</button>
<!--          <button v-if="modalData.ok" type="button" class="btn btn-primary" @click="onOk">-->
<!--            Ok-->
<!--          </button>-->
          <button type="button" class="btn btn-primary" @click="onOk">
            Применить
          </button>
          <button v-if="modalData.confirm" type="button" class="btn btn-primary" @click="onSubmit">
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Modal } from "bootstrap";
import SettingsModalType from "@/ts/types/SettingsModalType";
// import KvgOptionsType from "../../libs/kvgrav/src/types/KvgOptionsType";
import { KvgOptionsType } from "kvgrav";

@Options({
  components: {},
  props: {
    modalData: Object,
    kvgOptions: Object,
  },
  watch: {
    modalData(value: SettingsModalType) {
      this.thisModalObj.show();
    },
    kvgOptions(value: KvgOptionsType) {
      this.setByKvgOptions(value);
    },
  },
})
export default class SettingsModal extends Vue {
  private thisModalObj!: Modal;
  modalData!: SettingsModalType;
  kvgOptions!: KvgOptionsType;
  range1!: number;
  range2!: number;
  range3!: number;
  range4!: number;
  data() {
    return {
      range1: 10,
      range2: 10,
      range3: 100,
      range4: 1000,
    };
  }

  setByKvgOptions(value: KvgOptionsType) {
    // console.info(value);
    this.range2 = Math.sqrt(value.transferStrength*100);
    this.range3 = Math.sqrt(value.powerExtGravitation);
    this.range4 = value.radiusExtGravitation;
  }

  mounted(): void {
    this.thisModalObj = new Modal("#info-modal");
    // console.info(this.kvgOptions);
  }

  changeFun(){
    console.info(this.range1);
  }

  get funRange1(): number {
    return Math.pow(this.range1,2)
  }
  get funRange2(): number {
    return Math.pow(this.range2,2)
  }
  get funRange3(): number {
    return Math.pow(this.range3,2)
  }
  get funRange4(): number {
    return this.range4
  }

  getOptions(): KvgOptionsType {
    return {
      transferStrength: this.funRange2/100,
        radiusExtGravitation: this.funRange4,
      powerExtGravitation: this.funRange3,
    }
  }

  onOk(): void {
    // this.modalData?.ok?.(true);
/*    const a: KvgOptionsType = {
      transferStrength: 1,
      radiusExtGravitation: this.funRange2,
      powerExtGravitation: this.funRange3
    }*/
    this.$emit("settings", this.getOptions());
    this.thisModalObj.hide();
  }

  onClose(): void {
    // this.modalData?.ok?.(false);
    this.modalData?.confirm?.(false);
    this.thisModalObj.hide();
  }

  onSubmit(): void {
    this.modalData?.confirm?.(true);
    this.thisModalObj.hide();
  }
}
</script>
