import Model from '@/api/utils/model';

export type ReviewWord = {
    id: number, //单词id
    rid: number, //日期id
    mark: string,  //标记
    comment: string //评论
}

const model=new Model('reviewWord');

export const find=(id:number)=>model.findWhere<ReviewWord[]>({where:{rid:id},limit:1000});

export const update=(data:ReviewWord)=>{
    const id=data.id;
    const newData=Object.assign(data);
    delete newData.id;
    return model.update(id,newData).then(()=>true).catch(()=>false);
}
