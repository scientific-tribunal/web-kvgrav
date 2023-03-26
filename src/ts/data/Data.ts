import Objects from "@/ts/types/Objects";

class Data {

  private data: Array<Objects> = [];

  constructor() {
    const startData: ReadonlyArray<Objects> = [
      // { name: "Солнце", color: "#ffe389", state: { coordinate: {x: 500, y: 400}, mass: 60* 100 }, scale: 0.02 },
      // { name: "Юпитер", color: "#47404d", state: { coordinate: {x: 100, y: 600}, mass: 60 * 317.8 }, scale: 0.02 },
      // { name: "Сатурн", color: "#9d9871", state: { coordinate: {x: 200, y: 100}, mass: 600 * 95.2 }, scale: 0.02 },
      // { name: "Уран", color: "#a1b7c5", state: { coordinate: {x: 900, y: 150}, mass: 600 * 14.54 }, scale: 0.02 },
      // { name: "Плутон", color: "#8aaade", state: { coordinate: {x: 850, y: 700}, mass: 600 * 17.147 }, scale: null },
      // { name: "Земля", color: "#0C5DA5", state: { coordinate: {x: 59, y: 374}, mass: 600 }, scale: null },
      // { name: "Марс", color: "#f86464", state: { coordinate: {x: 114, y: 446}, mass: 600 * 0.107 }, scale: null },
      // { name: "Меркурий", color: "#ff9500", state: { coordinate: {x: 100, y: 400}, mass: 600 * 0.055274 }, scale: null },
      // { name: "Венера", color: "#47404d", state: { coordinate: {x: 163, y: 483}, mass: 600 * 0.815 }, scale: null },

      { name: "Ядро", color: "#ffe389", state: { coordinate: {x: 500, y: 400}, mass: 5000 }, scale: null },
      { name: "Объект 1", color: "#ff1818", state: { coordinate: {x: 600, y: 400}, mass: 200 }, scale: null },
      { name: "Объект 2", color: "#00be08", state: { coordinate: {x: 500, y: 500}, mass: 200 }, scale: null },
      { name: "Объект 3", color: "#00ffd1", state: { coordinate: {x: 400, y: 400}, mass: 200 }, scale: null },
      { name: "Объект 4", color: "#0028c4", state: { coordinate: {x: 500, y: 300}, mass: 200 }, scale: null },
      //
      { name: "Объект 5", color: "#a20000", state: { coordinate: {x: 700, y: 400}, mass: 500 }, scale: null },
      { name: "Объект 6", color: "#006c06", state: { coordinate: {x: 500, y: 600}, mass: 500 }, scale: null },
      { name: "Объект 7", color: "#00856f", state: { coordinate: {x: 300, y: 400}, mass: 500 }, scale: null },
      { name: "Объект 8", color: "#001972", state: { coordinate: {x: 500, y: 200}, mass: 500 }, scale: null },

      { name: "Объект 9", color: "#bd36ff", state: { coordinate: {x: 600, y: 300}, mass: 200 }, scale: null },
      { name: "Объект 10", color: "#cfff00", state: { coordinate: {x: 600, y: 500}, mass: 200 }, scale: null },
      { name: "Объект 11", color: "#3eff00", state: { coordinate: {x: 400, y: 500}, mass: 200 }, scale: null },
      { name: "Объект 12", color: "#0cc7ff", state: { coordinate: {x: 400, y: 300}, mass: 200 }, scale: null },

      { name: "Объект 9", color: "#e1e1e1", state: { coordinate: {x: 700, y: 200}, mass: 1000 }, scale: null },
      { name: "Объект 10", color: "#000000", state: { coordinate: {x: 700, y: 600}, mass: 1000 }, scale: null },
      { name: "Объект 11", color: "#9d9871", state: { coordinate: {x: 300, y: 600}, mass: 1000 }, scale: null },
      { name: "Объект 12", color: "#deba85", state: { coordinate: {x: 300, y: 200}, mass: 1000 }, scale: null },

    ];
    startData.forEach((data)=>{
      this.data.push(data);
    })

  }

  public list(): ReadonlyArray<Objects> {
    return this.data;
  }

}

export default Data;
