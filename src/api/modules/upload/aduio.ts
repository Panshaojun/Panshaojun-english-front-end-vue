import { post} from '@/api';

export const fetchAudio = async (id:number,fileStr: string) => {
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
        return await post<string>('upload/aduio', {id, fileName, fileUrl })
    } else {
        return null;
    }
}