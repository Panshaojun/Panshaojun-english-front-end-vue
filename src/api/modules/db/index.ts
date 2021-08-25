import {get, post} from '@/api';
import { ReviewWord } from '../model/reviewWord';
//获取复习单词中最大的id
export const getMaxReviewId=()=>get<number|null>("/db/getMaxReviewId");

/**
 * 
 * @param date "Y-MM-DD"
 * @param data 
 * @returns 
 */
export const saveStudy=(date:string,data:ReviewWord[])=>post("/db/SaveStudy",{date,data});