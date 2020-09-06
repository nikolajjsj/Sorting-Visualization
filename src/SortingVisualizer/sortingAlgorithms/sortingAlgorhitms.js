// function for merge sort
export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxArray, animations);
  return animations;
}

function mergeSortHelper(mainArray, startId, endId, auxArray, animations) {
  if (startId === endId) return;
  const middleId = Math.floor((startId + endId) / 2);
  mergeSortHelper(auxArray, startId, middleId, mainArray, animations);
  mergeSortHelper(auxArray, middleId + 1, endId, mainArray, animations);
  doMerge(mainArray, startId, middleId, endId, auxArray, animations);
}

function doMerge(mainArray, startId, middleId, endId, auxArray, animations) {
  let k = startId;
  let i = startId;
  let j = middleId + 1;
  while (i <= middleId && j <= endId) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxArray[i] <= auxArray[j]) {
      animations.push([k, auxArray[i]]);
      mainArray[k++] = auxArray[i++];
    } else {
      animations.push([k, auxArray[j]]);
      mainArray[k++] = auxArray[j++];
    }
  }
  while (i <= middleId) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxArray[i]]);
    mainArray[k++] = auxArray[i++];
  }
  while (j <= endId) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxArray[j]]);
    mainArray[k++] = auxArray[j++];
  }
}

// functions for quick sort
function partitionQuickSort(array, low, high) {
  const pivot = array[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (array[j] <= pivot) {
      i++;

      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  let temp = array[i + 1];
  array[i + 1] = array[high];
  array[high] = temp;
  return i + 1;
}

export function quickSortHelper(array, low, high) {
  if (low < high) {
    let partion_index = partitionQuickSort(array, low, high);
    quickSortHelper(array, low, partion_index - 1);
    quickSortHelper(array, partion_index + 1, high);
  }
}
