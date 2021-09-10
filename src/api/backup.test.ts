import axios from 'axios';
import {  saveStudy } from '@/api/modules/db/index';
import { ReviewWord } from './modules/model/reviewWord';
type BackUpData={
    id:number,
    date:string,
    ids:number[]
}[];

//备份数据
export const getBackup=()=>axios.get<BackUpData>("/backup/review").then(({data})=>{
    for(let i of data){
        const date=i.date;
        const data:ReviewWord[]=i.ids.map(id=>{
            return {
                id,
                rid:0,
                comment:"",
                mark:""
            }
        })
        saveStudy(date,data);
    }
    return data;
});


