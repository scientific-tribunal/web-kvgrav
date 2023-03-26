<template>
  <canvas class="_position-absolute _top-50 _start-50 _translate-middle"
          id="my-canvas"
          :width="width"
          :height="height"
          tabindex="0"
  ></canvas>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Data from "@/ts/data/Data";
// import KVGrav, { CoordiMass, Coordinate, KvgOptionsType } from "../../libs/kvgrav/src";
import KVGrav, { CoordiMass , Coordinate, KvgOptionsType } from "kvgrav";
import Objects from "@/ts/types/Objects";
import DataType from "@/ts/types/DataType";

const tuPI = (2 * Math.PI);
const kVGrav = new KVGrav();
@Options({
  props: {
    params: Object,
    play: Boolean,
    newton: Boolean,
    getData: Boolean,
    size: Object,
    iterationCalc: Number,
    kvgOptions: Object,
    setData: Object,
  },
  watch: {
    size(value: Coordinate) {
      // console.log(`watch: size: ${value}`);
      this.width= value.x;
      this.height= value.y;
    },
    play(value: boolean) {
      // console.log(`watch: play: ${value}`);
      this.setPlay(value);
    },
    newton(value: boolean) {
      // console.log(`watch: newton: ${value}`);
      kVGrav.newton=value;
    },
    params(value: KvgOptionsType) {
      // console.log(`watch: params: ${value}`);
      kVGrav.setOptions(value);
    },
    getData(value: boolean) {
      // console.log(`watch: getData: ${value}`);
      if (value) {
        const data = this.exportData(this.dataList, this.state);
        this.$emit("state", data);
      }
    },
    kvgOptions(value: KvgOptionsType) {
      this.setByKvgOptions(value);
    },
    setData(value: DataType) {
      // console.log(`watch: setData: ${value}`, value);
      this.importData(value.data);
      this.recalculateSituations();
      this.animateOne();
    },
  },
})
export default class Canvas extends Vue {
  private width!: number;
  private height!: number;
  private iterationCalc!: number;
  private play!: boolean;
  private newton!: boolean;
  private getData!: boolean;
  private cellWidth = 100;
  private cellHeight = 100;
  private canvasCWidth!: number;
  private canvasCHeight!: number;
  // private canvas!: HTMLElement;
  // private canvas!: any;
  // private ctx!: HTMLCanvasElement;
  private canvas!: HTMLCanvasElement;
  private grid!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private dataList: Array<Objects> = [];
  private state: Array<CoordiMass> = [];
  private centerCoordinate!: Coordinate;

  private animationFrame;
  private size!: Coordinate;
  kvgOptions!: KvgOptionsType;
  setData!: DataType;

  setPlay(play: boolean){

    if (play) {
      this.animate();
    } else {
      // console.warn( "cancelAnimationFrame()");
      cancelAnimationFrame(this.animationFrame);
    }
  }
  setByKvgOptions(value: KvgOptionsType) {
    // console.info(value);
    kVGrav.setOptions(value);
  }
  data() {
    return {
      width: 1000,
      height: 800,
      // iterationCalc: 1,
    };
  }

  created() {
    // window.addEventListener("resize", this.myEventHandler);
    this.grid = this.getGridCanvas(this.width, this.height);
  }

  getGridCanvas(width: number, height: number, cellWidth: number = 100, cellHeight: number = 100): HTMLCanvasElement {
    const canvasCWidth = width / cellWidth;
    const canvasCHeight = height / cellHeight;
    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = width;
    offscreenCanvas.height = height;
    const ctx = offscreenCanvas.getContext("2d", { alpha: true }) as CanvasRenderingContext2D;
    ctx.beginPath();
    //ctx.lineWidth = 1;
    //ctx.globalAlpha = 0.5;
    ctx.strokeStyle = "rgba(0,0,0,0.1)";
    for (let i = 0; i <= canvasCWidth; i++) {
      for (let j = 0; j <= canvasCHeight; j++) {
        ctx.strokeRect(cellWidth * i, cellHeight * j, cellWidth, cellHeight);
      }
    }
    //ctx.fill();
    ctx.stroke();
    ctx.closePath();
    return offscreenCanvas;
  }

  mounted(): void {
    this.canvasCWidth = this.width / this.cellWidth;
    this.canvasCHeight = this.height / this.cellHeight;
    // console.info("mounted()");
    this.canvas = document.getElementById("my-canvas") as HTMLCanvasElement;
    this.canvas.addEventListener("click", function(event) {
      const x = event.offsetX;
      const y = event.offsetY;
      // console.log(`x ${x}, y ${y}`);
      /*      elements.forEach(function(element) {
              if (y > element.top && y < element.top + element.height
                && x > element.left && x < element.left + element.width) {
                alert('clicked an element');
              }
            });*/

    }, false);
    this.ctx = this.canvas.getContext("2d", { alpha: true }) as CanvasRenderingContext2D;

    const data = new Data();
    this.importData(data.list());
/*    data.list().forEach((item)=>{
      this.dataList.push(item);
    })*/
    this.recalculateWindowsSize();
    this.recalculateSituations();
    this.animateOne();
/*    setTimeout(() => {
      console.warn( "cancelAnimationFrame()");
      cancelAnimationFrame(this.animationFrame);
    }, 600000000);*/
  }

  private importData(data: ReadonlyArray<Objects>): void {
    this.dataList = [];
    data.forEach((item)=>{
      // console.info( item );
      this.dataList.push(item);
    })
  }

  private exportData(dataList: ReadonlyArray<Objects>, state: Array<CoordiMass>): ReadonlyArray<Objects> {
    let data: Array<Objects> = [];
    dataList.forEach((value, index)=>{
      let item = value;
      item.state = state[index];
      data.push(item);
    })
    return data;
  }

  recalculateSituations(): void {
    // const data = new Data();
    // console.info( data.list() );
    this.state =[];
    this.dataList.forEach((item)=>{
      this.state.push(item.state)
    })
  }
  recalculateWindowsSize(): void {
    this.centerCoordinate = {x: this.width/2, y: this.height/2} ;
  }

  drawObjects(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.drawImage(this.grid, 0, 0);

    this.state.forEach((item, index)=>{
      let obj = this.dataList[index];
      obj.state.coordinate = {x: item.coordinate.x, y: item.coordinate.y};
      this.drawObject(obj);
    })

  }
  drawCenter(): void {
    this.ctx.beginPath();
    this.ctx.arc(this.centerCoordinate.x, this.centerCoordinate.y, 1, 0, tuPI, false);
    this.ctx.strokeStyle = '#ff0000';
    this.ctx.stroke();
  }
  drawObject(data: Objects): void {
    if (data.state.coordinate.x>this.width || data.state.coordinate.y>this.height ) return
    // let radius = data.scale?data.state.mass* data.scale: data.state.mass;
    let radius = data.scale?Math.sqrt(data.state.mass* data.scale): Math.sqrt(data.state.mass);
    if (radius<1) radius=1;
    this.ctx.beginPath();
    this.ctx.arc(data.state.coordinate.x, data.state.coordinate.y, radius, 0, tuPI, false);
    this.ctx.fillStyle = data.color;
    this.ctx.fill();
    this.ctx.lineWidth = 1;
    // this.ctx.strokeStyle = '#003300';
    if (radius>1) {
      this.ctx.strokeStyle = "black";
    } else {
      this.ctx.strokeStyle = data.color;
    }
    this.ctx.stroke();
  }

  checkConflict(state: Array<CoordiMass>) {
    let destroyIndex: Array<number>=[];
    state.forEach((current, index) => {
      if (destroyIndex.some(e => e === index)) return;
      let radius = Math.sqrt(current.mass);
      // const x = current;
      state.forEach((source, sIndex) => {
        if (index==sIndex) return;
        if (destroyIndex.some(e => e === sIndex)) return;
        let sRadius = Math.sqrt(source.mass);
        const vectorX = current.coordinate.x - source.coordinate.x;
        const vectorY = current.coordinate.y - source.coordinate.y;
        const distance = Math.sqrt(Math.pow(vectorX, 2) + Math.pow(vectorY, 2));
        // console.info(`${this.dataList[index].name} (${radius}) - ${this.dataList[sIndex].name} (${sRadius}): distance ${distance}`);
        if ( (radius+sRadius) >distance) {
          if (current.mass> source.mass) {
            destroyIndex.push(sIndex);
          } else {
            destroyIndex.push(index);
          }
        }
      });
    });
   if ( destroyIndex.length>0) {
     // console.warn("destroyIndex", destroyIndex);
     const filteredDataList = this.dataList.filter(function(value, index) {
       return !destroyIndex.some(e => e === index);
     });
     this.importData(filteredDataList);
     this.recalculateSituations();
   }
  }

  animate() {
    this.drawObjects();
    // this.drawCenter();
    // console.info( this.situations);
    for (let i = 0; i < this.iterationCalc; i++) {
      kVGrav.calculates(this.state);
    }

    this.checkConflict(this.state);
/*    this.situations.forEach((item, index)=>{
      // console.info( this.dataList[index].name, item);
      kVGrav.calculate(this.situations, item, index);
      // console.info( this.dataList[index].name, this.situations[index]);
    })*/
    // console.info("animate()");
    // console.info( this.situations);
    if (this.play) this.animationFrame = requestAnimationFrame(this.animate);
  }
  animateOne() {
    this.drawObjects();
    this.drawCenter();
/*    for (let i = 0; i < this.iterationCalc; i++) {
      kVGrav.calculates(this.state);
    }*/
  }

  destroyed() {
    // window.removeEventListener("resize", this.myEventHandler);
  }

/* myEventHandler(e: any) {
    // your code for handling resize...
    // console.info(typeof e);
    console.info(`Width: ${window.innerWidth}, Height:${window.innerHeight} `);
  }*/
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/*#app {
  text-align: center;
}*/
</style>
