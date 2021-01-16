const { _, performance } = require('perf_hooks');

function insertionsort(arr, arr_sz) {

    for(let i=0; i<arr_sz; i++) {
        var cur =arr[i];
        for(var j=i-1; j>=0 && arr[j] > cur; j--) {
            arr[j+1] = arr[j];
        }
        arr[j+1] = cur;
    }

}

function merge (left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;
  
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        resultArray.push(left[leftIndex]);
        leftIndex++; // move left array cursor
      } else {
        resultArray.push(right[rightIndex]);
        rightIndex++; // move right array cursor
      }
    }
  
    return resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
  }

function mergeSort (unsortedArray, thresh) {
    if(unsortedArray.length <= thresh) {
        insertionsort (unsortedArray, unsortedArray.length);
        return unsortedArray;
    }
    
    if (unsortedArray.length <= 1) {
      return unsortedArray;
    }

    const middle = Math.floor(unsortedArray.length / 2);
  
    const left = unsortedArray.slice(0, middle);
    const right = unsortedArray.slice(middle);
  
    return merge(
      mergeSort(left), mergeSort(right)
    );
  }

function isSorted(arr, arr_sz) {
    for(let i=1; i<arr_sz; i++) {
        if (arr[i] < arr[i-1]) return false;
    }

    return true;
}

const generateAndSort = (arr_sz, thresh) => {
    arr = [...Array(arr_sz)].map(e=>Math.random()*arr_sz|0);
    res = 'initial sorted? ' + isSorted(arr, arr_sz) + '\n';
    var t0 = performance.now();
    arr = mergeSort(arr, thresh);
    var t1 = performance.now();
    res += 'final sorted? ' + isSorted(arr, arr_sz) + '\n';
    res += 'Time taken to sort: ' + (t1 - t0)*0.001 + ' seconds';
    console.log(res);
    return res;
}
// generateAndSort(100, 32);
module.exports = generateAndSort;