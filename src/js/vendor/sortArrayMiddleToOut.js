function sortArrayMiddleToOut(array) {
    var startIndex = Math.ceil(array.length / 2),
        newArray = [],
        i = startIndex,
        j = i + 1;
    while (j < array.length || i >= 0) {
        if (i >= 0) newArray.push(array[i]);
        if (j < array.length) newArray.push(array[j]);
        i--;
        j++;
    };
    return newArray;
}