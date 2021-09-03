import { Word } from '@/api/modules/model/word';

export type StudyData = Word & { comment: string };//comment是评论

type StudyState = {
    __showStartIndex: number;//开始学习的下标
    __showLength: number;//studyData的length
    studyData: StudyData[];//所有学习数据
    showData: StudyData[];//展示的学习数据
    deletedData: StudyData[];//删除的学习数据
}

export default StudyState;