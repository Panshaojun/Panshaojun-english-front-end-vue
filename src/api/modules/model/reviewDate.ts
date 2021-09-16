import Model from '@/api/utils/model';

export type ReviewDate={
    id:number // reviewDate 表字段
    date:string // reviewDate 表字段
}

const model=new Model("ReviewDate");


export const changeDate=(id:number,newDate:string)=>model.update(id,{date:newDate});