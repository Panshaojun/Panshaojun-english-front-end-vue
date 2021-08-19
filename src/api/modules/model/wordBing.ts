import Model from '@/api/utils/model';
import { Audios } from '@/api/utils/bingParser/auido';
import { Definition } from '@/api/utils/bingParser/definition';
import { Dictionary } from '@/api/utils/bingParser/english-chinese-dictionary';
import { Examples } from '@/api/utils/bingParser/example';
import { Idioms } from '@/api/utils/bingParser/idiom';
import { KeyWord } from '@/api/utils/bingParser/key-word';
import { Parts } from '@/api/utils/bingParser/sider';
import { WordChange } from '@/api/utils/bingParser/word-change';

const WordBingModel = new Model('WordBing');
export type WordBing = {
    key: KeyWord,
    definition: Definition,
    audio: Audios,
    word_change: WordChange,
    examples: Examples,
    english_chinese: Dictionary,
    idioms: Idioms,
    sider: Parts,
}
export type WordBingData = WordBing&{id:number};

export const create = (data: WordBing) => {
    return WordBingModel.create<WordBingData>(data)
}

export const findByArray=(ids:number[])=>{
    return WordBingModel.findWhere<WordBingData[]>({
        where:{id:ids}
    })
}

export const findOne=(id:number)=>{
    return WordBingModel.findOne<WordBingData>(id);
}