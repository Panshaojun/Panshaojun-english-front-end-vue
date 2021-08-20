import {get} from '@/api';

//获取复习单词中最大的id
export const getMaxReviewId=()=>get<number|null>("/db/getMaxReviewId");