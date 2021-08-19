import Model from '@/api/utils/model';
import { Long } from '@/api/utils/vocabularyParser/long';
import { Short } from '@/api/utils/vocabularyParser/short';
import { W } from '@/api/utils/vocabularyParser/w';
const WordVocabularyModel = new Model('wordvocabulary');
export type WordVocabulary={
    w:W,
    short:Short,
    long:Long
}
export type WordVocabularyData=WordVocabulary&{id:number}
export const create=(req:WordVocabularyData)=>{
    return WordVocabularyModel.create<WordVocabularyData>(req);
}
export const findOne=(id:number)=>{
    return WordVocabularyModel.findOne<WordVocabularyData>(id)
}

export const findByArray=(ids:number[])=>{
    return WordVocabularyModel.findWhere<WordVocabularyData[]>({
        where:{id:ids}
    })
}

