import Model from '@/api/utils/model';

export type ReviewView={
    id:number // reviewDate 表字段
    date:string // reviewDate 表字段
    words:number // 对应的单词个数
}

const model=new Model("reviewView");

export const findAll=()=>model.findWhere<ReviewView[]>({
    limit:10000
})