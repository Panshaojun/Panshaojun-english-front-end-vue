import Model from '@/api/utils/model';
import { Audios } from '@/api/utils/bingParser/auido';
import { Definition } from '@/api/utils/bingParser/definition';
import { Dictionary } from '@/api/utils/bingParser/english-chinese-dictionary';
import { Examples } from '@/api/utils/bingParser/example';
import { Idioms } from '@/api/utils/bingParser/idiom';
import { KeyWord } from '@/api/utils/bingParser/key-word';
import { Parts } from '@/api/utils/bingParser/sider';
import { WordChange } from '@/api/utils/bingParser/word-change';
import { Long } from '@/api/utils/vocabularyParser/long';
import { Short } from '@/api/utils/vocabularyParser/short';
import { W } from '@/api/utils/vocabularyParser/w';
export type WordView = {
    id: number,
    b_w: KeyWord,
    definition: Definition,
    audio: Audios,
    word_change: WordChange,
    examples: Examples,
    english_chinese: Dictionary,
    idioms: Idioms,
    sider: Parts,
    v_w: W,
    v_short: Short,
    v_long: Long
}

const WordViewModel = new Model('wordview');

export const findByArray = (ids: number[]) => {
    return WordViewModel.findWhere<WordView[]>({
        where: { id: ids }
    })
}