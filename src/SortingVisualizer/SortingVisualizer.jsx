import React from "react";
import "./SortingVisualizer.css";

const ANIMATION_SPEED_MS = 2;
const NUMBER_OF_BARS = 300;

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { array: [] };
  }

  componentDidMount() {
    this.resetArray();
  }

  async mergeSort(arr, left, right) {
    if (right - left > 1) {
      let middle = left + ((right - left) >> 1);
      Promise.all([
        await this.mergeSort(arr, left, middle),
        await this.mergeSort(arr, middle, right),
      ]);
      await this.merge(arr, left, middle, right);
      this.setState({ array: arr });
    }
  }

  async merge(arr, left, middle, right) {
    let temp = [];
    let len = middle - left;
    let i, j, k;
    for (i = 0; i < len; i++) {
      temp[i] = arr[left + i];
    }
    i = 0;
    j = middle;
    k = left;
    while (i < len && j < right) {
      if (temp[i] <= arr[j]) {
        arr[k++] = temp[i++];
      } else {
        arr[k++] = arr[j++];
      }
      this.setState({ array: arr });
      await sleep(ANIMATION_SPEED_MS);
    }
    while (i < len) {
      arr[k++] = temp[i++];
      this.setState({ array: arr });
      await sleep(ANIMATION_SPEED_MS);
    }
  }

  async quickSort(arr, start, end) {
    if (start >= end) return;
    let index = await this.partition(arr, start, end);
    Promise.all([
      await this.quickSort(arr, start, index - 1),
      await this.quickSort(arr, index + 1, end),
    ]);
  }

  async partition(arr, start, end) {
    let pivotIndex = start;
    let pivotValue = arr[end];
    for (let i = start; i < end; i++) {
      if (arr[i] < pivotValue) {
        await swap(arr, i, pivotIndex);
        this.setState({ array: arr });
        pivotIndex++;
      }
    }
    await swap(arr, pivotIndex, end);
    this.setState({ array: arr });
    return pivotIndex;
  }

  async pigeonHoleSort(arr) {
    const len = arr.length;
    let min = arr[0];
    let min_index = 0;
    let max = arr[0];
    let max_index = 0;
    const array_bars = document.getElementsByClassName("array-bar");
    
    for (let i = 0; i < len; i++) {
      await sleep(ANIMATION_SPEED_MS);
      if (arr[i] > max) {
        array_bars[max_index].style.backgroundColor = "grey";
        max = arr[i];
        max_index = i;
        array_bars[i].style.backgroundColor = "red";
      } else if (arr[i] < min) {
        array_bars[min_index].style.backgroundColor = "grey";
        min = arr[i];
        min_index = i;
        array_bars[i].style.backgroundColor = "black";
      } else {
        array_bars[i].style.backgroundColor = "grey";
      }
    }
    for (let i = 0; i < array_bars.length; i++) {
      array_bars[i].style.backgroundColor = "grey";
    }
    let range = max - min + 1;
    let phole = Array(len).fill(0);
    for (let i = 0; i < len; i++) phole[arr[i] - min]++;
    let index = 0;
    for (let j = 0; j < range; j++) {
      while (phole[j]-- > 0) {
        arr[index++] = j + min;
        this.setState({ array: arr });
        await sleep(ANIMATION_SPEED_MS);
      }
    }
  }

  async bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          await swap(arr, j, j + 1);
          this.setState({ array: arr });
        }
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
            onClick={() =>
              this.mergeSort(this.state.array, 0, this.state.array.length - 1)
            }
          >
            Merge Sort!
          </button>
          <button
            type="button"
            className="btn btn-dark m-2"
            onClick={() =>
              this.quickSort(this.state.array, 0, this.state.array.length - 1)
            }
          >
            Quick Sort!
          </button>
          <button
            type="button"
            className="btn btn-dark m-2"
            onClick={() => this.pigeonHoleSort(this.state.array)}
          >
            Pigeonhole Sort!
          </button>
          <button
            type="button"
            className="btn btn-dark m-2"
            onClick={() => this.bubbleSort(this.state.array)}
          >
            Bubble Sort!
          </button>
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function swap(arr, first, last) {
  await sleep(ANIMATION_SPEED_MS);

  let temp = arr[first];
  arr[first] = arr[last];
  arr[last] = temp;
}
