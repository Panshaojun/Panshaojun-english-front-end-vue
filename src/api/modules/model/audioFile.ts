import Model from '@/api/utils/model';

export type AudioFile={
    id:number // reviewDate 表字段
    path:string
}

const model=new Model("audioFile");

export const findAll=()=>model.findWhere<AudioFile[]>({
    limit:10000
})