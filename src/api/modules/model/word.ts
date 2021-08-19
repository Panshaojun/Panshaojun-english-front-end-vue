import Model from '@/api/utils/model';
export type Word={
    id:number,
    w:string,
    e:string
}
const WordModel=new Model('word');

export const findAll=()=>{
    return WordModel.findWhere<Word[]>({
        limit:10000
    });
}