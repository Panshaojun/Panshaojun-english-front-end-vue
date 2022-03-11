import { post } from '@/api';
import Model from '@/api/utils/model';
import to from "await-to-js";

export type AudioFile = {
    id: number // reviewDate 表字段
    path: string
}


const model = new Model("audioFile");
export const findAll = () => model.findWhere<AudioFile[]>({
    limit: 50000
})



/**
 * 爬取发音文件并存进数据库
 * @param id 
 * @param fileStr 
 * @returns 
 */
const fetchAudio = async (id: number, fileStr: string) => {
    if (fileStr === '') {
        return null;
    }
    const fileUrl = fileStr;
    const temp = fileStr.split('/');
    if (temp.length < 5) {
        return null;
    }
    const fileName = fileStr.split('/').slice(5).join('');
    if (fileUrl && fileName) {
        return await post<string>('upload/aduio', { id, fileName, fileUrl })
    } else {
        return null;
    }
}


const audiosCache = new Map<number, string>();
/**
 * 获取指定id的音频文件信息
 * @param id 
 * @param fileStr  
 * @returns {string|''}
 */
export const getAudioById = async (id: number, fileStr: string) => {
    if (audiosCache.has(id)) {
        return audiosCache.get(id);
    }
    const [err, res] = await to(model.findOne<AudioFile>(id));
    if (err) {
        return "";
    }
    if (!res) {
        // 数据库中找不到音频文件信息，就开始向第三方网站爬取音频文件
        const [err2, res2] = await to(fetchAudio(id, fileStr));
        if (err2) {
            return "";
        }
        if (!res2) {
            return "";
        } else {
            audiosCache.set(id, res2);
            return res2;
        }
    } else {
        audiosCache.set(id, res.path);
        return res.path;
    }
}



/**
 * 获取所有音频文件信息
 * @returns {boolean}
 */
export const initAllAudios = async () => {
    const [err, data] = await to(model.findWhere<AudioFile[]>({
        limit: 50000
    }));
    if (err || !data) {
        return false;
    } else {
        for (let i of data) {
            audiosCache.set(i.id, i.path);
        }
        return true;
    }
}