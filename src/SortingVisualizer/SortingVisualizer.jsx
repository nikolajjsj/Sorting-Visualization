import React from "react";
import { getMergeSortAnimations } from "./sortingAlgorithms/sortingAlgorhitms";
import "./SortingVisualizer.css";

const ANIMATION_SPEED_MS = 3;
const NUMBER_OF_BARS = 300;
const PRIMARY_COLOR = "blueviolet";
const SECONDARY_COLOR = "red";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  // merge sort: https://www.geeksforgeeks.org/merge-sort/
  mergeSort() {
    const anims = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < anims.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneId, barTwoId] = anims[i];
        const barOneStyle = arrayBars[barOneId].style;
        const barTwoStyle = arrayBars[barTwoId].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneId, newHeight] = anims[i];
          const barOneStyle = arrayBars[barOneId].style;
          barOneStyle.height = `${newHeight}vh`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  // bubble sort: https://www.geeksforgeeks.org/bubble-sort/
  // bubbleSort() {}
  // quickSort() {}
  // heapSort() {}

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
      <div className="arra-div">
        {array.map((value, id) => (
          <div
            className="array-bar"
            style={{ height: `${value}vh` }}
            key={id}
          ></div>
        ))}
        <div className="buttons">
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => this.resetArray()}
          >
            Reset
          </button>
          <button
            type="button"
            class="btn btn-dark"
            onClick={() => this.mergeSort()}
          >
            Merge Sort!
          </button>
          {/*<button type="button" class="btn btn-dark">
            Bubble Sort!
          </button>
           <button type="button" class="btn btn-dark">
            Merge Sort!
          </button>
          <button type="button" class="btn btn-dark">
            Merge Sort!
          </button> */}
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
