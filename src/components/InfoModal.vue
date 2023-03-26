<template>
  <div class="modal fade" id="info-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
       aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div v-if="modalData" class="modal-content">
        <div v-if="modalData.title" class="modal-header">
          <h5 class="modal-title text-start" id="staticBackdropLabel"><i class="fa-solid fa-info mx-3"></i>{{ modalData.title }}</h5>
          <button v-if="modalData.close" type="button" class="btn-close" data-bs-_dismiss="modal" aria-label="Close" @click="onClose"></button>
        </div>
        <div class="modal-body">
          <div v-if="modalData.html" v-html="modalData.html"></div>
          <p v-else-if="modalData.body">{{ modalData.body }}</p>
        </div>
        <div v-if="modalData.close || modalData.ok || modalData.confirm" class="modal-footer">
          <button v-if="modalData.close" type="button" class="btn btn-secondary" data-bs-_dismiss="modal" @click="onClose">Close</button>
          <button v-if="modalData.ok" type="button" class="btn btn-primary" @click="onOk">
            Ok
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
import InfoModalType from "@/ts/types/InfoModalType";

@Options({
  components: {},
  props: {
    modalData: Object,
  },
  watch: {
    modalData(value) {
      this.thisModalObj.show();
    },
  },
})
export default class InfoModal extends Vue {
  private thisModalObj!: Modal;
  modalData!: InfoModalType;

  data() {
    return {};
  }

  mounted(): void {
    this.thisModalObj = new Modal("#info-modal");
  }

  onOk(): void {
    this.modalData?.ok?.(true);
    this.thisModalObj.hide();
  }

  onClose(): void {
    this.modalData?.ok?.(false);
    this.modalData?.confirm?.(false);
    this.thisModalObj.hide();
    // this.modalData = undefined;
  }

  onSubmit(): void {
    // console.info("onSubmit()");
    this.modalData?.confirm?.(true);
    this.thisModalObj.hide();
    // this.modalData = undefined;

  }
}
</script>
