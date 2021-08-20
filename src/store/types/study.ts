import { Word } from '@/api/modules/model/word';

type StudyState = {
    __showStartIndex: number;//开始学习的下标
    __showLength: number;//studyData的length
    studyData: Word[];//所有学习数据
    showData: Word[];//展示的学习数据
    deletedData: Word[];//删除的学习数据
}
export default StudyState;