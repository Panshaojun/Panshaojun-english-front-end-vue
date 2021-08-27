import Model from '@/api/utils/model';

export type ReviewWord = {
    id: number, //单词id
    rid: number, //日期id
    mark: string,  //标记
    comment: string //评论
}

const model=new Model('reviewWord');

export const find=(id:number)=>model.findWhere<ReviewWord[]>({where:{rid:id}})
