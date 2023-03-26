<template>
  <div class="modal _modal-xl fade" id="io-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
       aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div v-if="modalData" class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-start" id="staticBackdropLabel"><i class="fa-solid fa-info mx-3"></i>Импорт/Экспорт</h5>
          <button v-if="modalData.close" type="button" class="btn-close" data-bs-_dismiss="modal" aria-label="Close" @click="onClose"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">JSON данные</label>
            <button type="button" class="btn btn-sm btn-outline-secondary mx-2" @click="toClipboard(json)" id="button-copy-json"><i class="fa-solid fa-copy"></i></button>
            <textarea :value="json" @input="json = $event.target.value" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-_dismiss="modal" @click="onClose">Close</button>
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
import IoOptionsType from "@/ts/types/IoOptionsType";
import useClipboard from 'vue-clipboard3'

@Options({
  components: {},
  props: {
    modalData: Object,
    ioOptions: Object,
    json: String,
  },
  watch: {
    modalData(value: SettingsModalType) {
      this.thisModalObj.show();
    },
    ioOptions(value: IoOptionsType) {
      // console.info(value.json);
      this.json = value.json;
    },
  },
})
export default class IoModal extends Vue {
  private thisModalObj!: Modal;
  modalData!: SettingsModalType;
  ioOptions!: IoOptionsType;
  json!: string;
  data() {
    return {
      json: "",
    };
  }

/*  setByKvgOptions(value: IoOptionsType) {
    console.info(value);
    this.range2 = Math.sqrt(value.transferStrength*100);
    this.range3 = Math.sqrt(value.powerExtGravitation);
    this.range4 = value.radiusExtGravitation;
  }*/

  mounted(): void {
    this.thisModalObj = new Modal("#io-modal");
    // console.info(this.ioOptions);
  }

/*  get json(): string {
    return this.ioOptions.json;
  }*/

/*  getOptions(): IoOptionsType {
    return {
      json: this.json,
    }
  }*/

  onOk(): void {
    const value: IoOptionsType = {
      json: this.json,
      callback: (status: boolean)=>{
        if (status) this.thisModalObj.hide();
      },
    }
    // console.info(this.json);
    this.$emit("settings", value);

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

  async toClipboard (text: string) {
    // console.log(`clipboard: ${text}`)
    const { toClipboard } = useClipboard()
    try {
      await toClipboard(text)
      console.log(`Copied to clipboard, length ${text.length}`)
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
