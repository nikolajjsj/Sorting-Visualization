import React from "react";
import "./SortingVisualizer.css";
import * as algos from "./sortingAlgorithms/sortingAlgorhitms";

const ANIMATION_SPEED_MS = 2;
const NUMBER_OF_BARS = 200;
const PRIMARY_COLOR = "grey";
const SECONDARY_COLOR = "red";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { array: [] };
  }

  componentDidMount() {
    this.resetArray();
  }

  // merge sort: https://www.geeksforgeeks.org/merge-sort/
  mergeSort() {
    const anims = algos.getMergeSortAnimations(this.state.array);
    for (let i = 0; i < anims.length; i++) {
      const arrBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneId, barTwoId] = anims[i];
        const barOneStyle = arrBars[barOneId].style;
        const barTwoStyle = arrBars[barTwoId].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneId, newHeight] = anims[i];
          const barOneStyle = arrBars[barOneId].style;
          barOneStyle.height = `${newHeight}vh`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  // bubble sort: https://www.geeksforgeeks.org/bubble-sort/
  bubbleSort() {
    let arr = this.state.array;
    const n = arr.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        const arrBars = document.getElementsByClassName("array-bar");
        setTimeout(() => {
          const barOneStyle = arrBars[j].style;
          const barTwoStyle = arrBars[j + 1].style;
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        });
        setTimeout(() => {
          const barOneStyle = arrBars[j].style;
          const barTwoStyle = arrBars[j + 1].style;
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
          if (arr[j] > arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
          this.setState({ array: arr });
        }, ANIMATION_SPEED_MS / 2);
      }
    }
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_BARS; i++) {
      array.push(randomIntFromInterval(1, 90));
    }
    this.setState({ array });
  }

  render() {
    const { array } = this.state;

    return (
      <div className="page-div">
        <div className="array-div">
          {array.map((value, id) => (
            <div
              className="array-bar"
              style={{ height: `${value}vh` }}
              key={id}
            ></div>
          ))}
        </div>
        <div className="buttons">
          <button
            type="button"
            className="btn btn-danger m-2"
            onClick={() => this.resetArray()}
          >
            Reset
          </button>
          <button
            type="button"
            className="btn btn-dark m-2"
            onClick={() => this.mergeSort()}
          >
            Merge Sort!
          </button>
          <button
            type="button"
            className="btn btn-dark m-2"
            onClick={() => this.bubbleSort()}
          >
            Bubble Sort!
          </button>
          <button type="button" className="btn btn-dark m-2">
            Quick Sort!
          </button>
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
