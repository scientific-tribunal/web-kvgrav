<template>
  <div class="container header-page  d-flex _align-items-center justify-content-center">
    <div class="" :style="{width: width + 'px'}">
      <div class="position-relative">
        <div class="position-absolute top-0 end-0">
          <div>
          <div class="form-check form-switch mx-2">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="checkedNewton"
                   @change="setNewton">
            <label class="form-check-label _p-1" for="flexSwitchCheckChecked">Ньютон</label>
          </div>
          </div>
        </div>
        <div class="position-absolute bottom-0 start-0">
          <div class="btn-group">
            <button @click="setPlay" type="button" class="btn _btn-outline-secondary">
              <i v-if="play" class="fa-solid fa-pause"></i>
              <i v-else class="fa-solid fa-play"></i>
            </button>
            <button type="button" class="btn _btn-outline-secondary">
              <i class="fa-solid fa-forward-step"></i>
            </button>
          </div>
        </div>
        <Canvas
          v-model:get-data="getData"
          v-model:set-data="dataToCanvas"
          v-model:play="play"
          v-model:newton="newton"
          v-model:kvg-options="kvgOptions"
          v-model:iteration-calc="iterationCalc"
          v-on:state="getState"
        ></Canvas>
        <div class="position-absolute bottom-0 end-0 _translate-middle">
          <div v-on:mouseover="onActiveSetting" class="btn-group">
            <button v-if="activeSetting" @click="openModalIO" type="button" class="btn _btn-outline-secondary">
              <i class="fa-solid fa-file-import"></i>
            </button>
            <button @click="onSetting" type="button" class="btn _btn-outline-secondary">
              <i class="fa-solid fa-gear"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <SettingsModal
    v-model:modal-data="infoModal"
    v-model:kvg-options="kvgOptions"
    v-on:settings="setSettingsKVG"
  ></SettingsModal>
  <IoModal
    v-model:modal-data="ioModalData"
    v-model:io-options="ioOptions"
    v-on:settings="setIo"
  ></IoModal>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Canvas from "@/components/Canvas.vue";
import InfoModal from "@/components/InfoModal.vue";
import InfoModalType from "@/ts/types/InfoModalType";
import SettingsModal from "@/components/SettingsModal.vue";
// import KvgOptionsType from "../../libs/kvgrav/src/types/KvgOptionsType";
// import Coordinate from "../../libs/kvgrav/src/types/Coordinate";
import { Coordinate, KvgOptionsType } from "kvgrav";
import IoModal from "@/components/IoModal.vue";
import IoOptionsType from "@/ts/types/IoOptionsType";
import SettingsModalType from "@/ts/types/SettingsModalType";
import DataType from "@/ts/types/DataType";
import Objects from "@/ts/types/Objects";

// const tuPI = (2 * Math.PI);
// const kVGrav = new KVGrav();
@Options({
  components: { IoModal, SettingsModal, InfoModal, Canvas },
  props: {
    // msg: String,
  }
})
export default class AppInterface extends Vue {
  // private cursorActiveSetting
  private cursorActiveSetting: number | undefined;


  private width!: number;
  private height!: number;
  private iterationCalc!: number;
  private play = false;
  private newton!: boolean;
  private getData!: boolean;
  private dataToCanvas!: DataType;

  private activeSetting!: boolean;
  private checkedNewton: boolean = false;
  private centerCoordinate!: Coordinate;

  private infoModal!: InfoModalType;
  private ioModalData!: SettingsModalType;
  private kvgOptions!: KvgOptionsType;
  private ioOptions!: IoOptionsType;

  data() {
    return {
      // test: "",
      width: 1000,
      height: 800,
      iterationCalc: 100,
      play: this.play,
      infoModal: null,
      ioModalData: null,
      kvgOptions: null,
      ioOptions: null,
      newton: false,
      getData: null,
      dataToCanvas: null,
      activeSetting: false,
      checkedNewton: null,
    };
  }
  setPlay(){

    if (this.play) {
      this.play=false;
    } else {
      this.play=true;
    }
    // console.info(this.play);
  }
  requestDataFromCanvas(){
    this.getData=true;
    setTimeout(() => {
      this.getData=false;
    }, 100);
    // console.info(this.getData);
  }

  setNewton() {
    // console.info(this.checkedNewton);
    this.newton = this.checkedNewton;
  }

  setSettingsKVG(value: KvgOptionsType){
    // console.info(value);
    this.kvgOptions=value;

  }

  importJson(text: string): DataType | null {
    try {
      const json: DataType = JSON.parse(text);
      // console.info(json);
      if (json.data.length>0) return json;
    } catch(e: any){
      console.error(e);
    }
    return null;
  }
  setIo(value: IoOptionsType){
    // console.info(value);
    const data = this.importJson(value.json)
    // console.info(data);
    // this.kvgOptions=value;
    if (data) {
      this.dataToCanvas = data;
      value.callback?.(true);
    }
  }

  getState(state: ReadonlyArray<Objects> ) {
    // console.warn(state);
    const data: DataType = {name: "Name", version: 0.1, data: state };
    const json = JSON.stringify(data, null, 2);
    this.ioOptions = {
      json: json,
      callback: null,
    }
  }
  openModalIO(){
    this.requestDataFromCanvas();
    this.ioModalData = {
      confirm: null,
      close: true
    };

  }
  onSetting(){
    this.infoModal = {
      title: "Error",
      body: "errorMessage",
      html: null,
      ok: (status) => {
        // console.info(`infoModal ok(${status})`);
      },
      confirm: null,
      close: true
    };
  }

  created() {
    window.addEventListener("resize", this.myEventHandler);
    // this.grid = this.getGridCanvas(this.width, this.height);
  }



  mounted(): void {
    document.title = "KVGrav — 2D эмулятор гравитации";

/*    setTimeout(() => {
      console.warn( "cancelAnimationFrame()");
      // cancelAnimationFrame(this.animationFrame);
    }, 600000000);*/

    this.kvgOptions = {
      transferStrength: 1,
      radiusExtGravitation: 600,
      powerExtGravitation: 14400
    }

/*    const _data = new Data();
    const data: DataType = {name: "", version: 0.1, data: _data.list()};
    const json = JSON.stringify(data, null, 2);
    this.ioOptions = {
      json: json,
      callback: null,
    }*/
  }

  onActiveSetting() {
    clearTimeout(this.cursorActiveSetting);
    this.activeSetting = true;
    this.cursorActiveSetting = setTimeout(() => {
      this.activeSetting = false;
    }, 3000);
  }
  recalculateWindowsSize(): void {
    this.centerCoordinate = {x: this.width/2, y: this.height/2} ;
  }



  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  }


  myEventHandler(e: any) {
    // your code for handling resize...
    // console.info(typeof e);
    // console.info(`Width: ${window.innerWidth}, Height:${window.innerHeight} `);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/*#app {
  text-align: center;
}*/
</style>
