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

const audiosCache = new Map<number, string>();

/**
 * 获取指定id的音频文件信息
 * @param id 
 * @returns {string|''}
 */
export const getAudioById = async (id: number) => {
    if (audiosCache.has(id)) {
        return audiosCache.get(id);
    } else {
        const [err, data] = await to(model.findOne<AudioFile>(id));
        if (err || !data) {
            return "";
        } else {
            audiosCache.set(data.id, data.path);
            return data.path;
        }
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