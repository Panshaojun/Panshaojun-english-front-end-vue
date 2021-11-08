import Model from '@/api/utils/model';

export type ReviewWord = {
    id: number, //单词id
    rid: number, //日期id
    mark: string,  //标记
    comment: string //评论
}

export type ReviewWordShow = ReviewWord & {mark:object}

export type UpdateReviewWordModel={
    id: number, //单词id
    rid?: number, //日期id
    mark?: string,  //标记
    comment?: string //评论
}

const model=new Model('reviewWord');

export const find=(id:number)=>model.findWhere<ReviewWord[]>({where:{rid:id},limit:1000}).then(res=>{
    return res;
});

export const findMark=(days:string[])=>model.findWhere<ReviewWord[]>({where:{mark:days},limit:1000}).then(res=>{
    return res;
});

export const update=(data:UpdateReviewWordModel)=>{
    const id=data.id;
    const newData=Object.assign(data);
    delete newData.id;
    return model.update<ReviewWord>(id,newData);
}
