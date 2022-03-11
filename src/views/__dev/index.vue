<template>
  <div></div>
</template>

<script setup lang="ts">
import All from "./words/All";
const data:any = localStorage.getItem('data') || false;
if(data){
  const words=new Set((JSON.parse(data) as {w:string}[]).map(i=>i.w.toLowerCase()));
  const otherWords:string[]=[];
  const orginalLen=words.size;
  let len=orginalLen;
  for(let i of All){
    words.add(i);
    if(words.size>len){
      len++;
      otherWords.push(i)
    }
  }
  let str="insert into word(id,w) values";
  let id=5495
  for(let i of otherWords){
    str+=`(${id},'${i}'),`;
    id++;
  }
  console.log(str+";");
  console.log("二者之和:",[...words].sort((a,b)=>a.localeCompare(b)))
  console.log("all的全部长度:",All.length);
  console.log("数据库的全部长度:",orginalLen);
  console.log("all多出的单词",otherWords);
  console.log("二者都有的单词",All.length-otherWords.length)
}


</script>


