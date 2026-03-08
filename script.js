const container = document.getElementById("array");
const speedSlider = document.getElementById("speedSlider");

let array = [];

function sleep(){
return new Promise(resolve=>setTimeout(resolve, speedSlider.value));
}

function generateArray(){

container.innerHTML="";
array=[];

for(let i=0;i<30;i++){

let value=Math.floor(Math.random()*250)+20;
array.push(value);

const bar=document.createElement("div");
bar.classList.add("bar");
bar.style.height=value+"px";

container.appendChild(bar);

}

}

function getBars(){
return document.getElementsByClassName("bar");
}

async function bubbleSort(){

let bars=getBars();

for(let i=0;i<array.length;i++){

for(let j=0;j<array.length-i-1;j++){

bars[j].style.background="red";
bars[j+1].style.background="red";

await sleep();

if(array[j] > array[j+1]){

[array[j],array[j+1]]=[array[j+1],array[j]];

bars[j].style.height=array[j]+"px";
bars[j+1].style.height=array[j+1]+"px";

}

bars[j].style.background="white";
bars[j+1].style.background="white";

}

bars[array.length-i-1].style.background="green";

}

}

async function selectionSort(){

let bars=getBars();

for(let i=0;i<array.length;i++){

let min=i;

for(let j=i+1;j<array.length;j++){

bars[j].style.background="red";
await sleep();

if(array[j] < array[min]){
min=j;
}

bars[j].style.background="white";

}

[array[i],array[min]]=[array[min],array[i]];

bars[i].style.height=array[i]+"px";
bars[min].style.height=array[min]+"px";

bars[i].style.background="green";

}

}

async function quickSortStart(){
await quickSort(0,array.length-1);
markSorted();
}

async function quickSort(low,high){

if(low<high){

let pi = await partition(low,high);

await quickSort(low,pi-1);
await quickSort(pi+1,high);

}

}

async function partition(low,high){

let bars=getBars();

let pivot=array[high];
let i=low-1;

bars[high].style.background="purple";

for(let j=low;j<high;j++){

bars[j].style.background="red";

await sleep();

if(array[j] < pivot){

i++;

[array[i],array[j]]=[array[j],array[i]];

bars[i].style.height=array[i]+"px";
bars[j].style.height=array[j]+"px";

}

bars[j].style.background="white";

}

[array[i+1],array[high]]=[array[high],array[i+1]];

bars[i+1].style.height=array[i+1]+"px";
bars[high].style.height=array[high]+"px";

bars[high].style.background="white";

return i+1;

}

async function mergeSortStart(){

await mergeSort(0,array.length-1);
markSorted();

}

async function mergeSort(left,right){

if(left>=right) return;

let mid=Math.floor((left+right)/2);

await mergeSort(left,mid);
await mergeSort(mid+1,right);

await merge(left,mid,right);

}

async function merge(left,mid,right){

let bars=getBars();

let leftArr=array.slice(left,mid+1);
let rightArr=array.slice(mid+1,right+1);

let i=0;
let j=0;
let k=left;

while(i<leftArr.length && j<rightArr.length){

bars[k].style.background="red";

await sleep();

if(leftArr[i] <= rightArr[j]){
array[k]=leftArr[i++];
}else{
array[k]=rightArr[j++];
}

bars[k].style.height=array[k]+"px";

bars[k].style.background="white";

k++;

}

while(i<leftArr.length){

array[k]=leftArr[i++];
bars[k].style.height=array[k]+"px";
k++;

}

while(j<rightArr.length){

array[k]=rightArr[j++];
bars[k].style.height=array[k]+"px";
k++;

}

}

function markSorted(){

let bars=getBars();

for(let i=0;i<bars.length;i++){
bars[i].style.background="green";
}

}

generateArray();
