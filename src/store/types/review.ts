import {ReviewView} from '@/api/modules/model/reviewView';
import {ReviewWord} from '@/api/modules/model/reviewWord'
type ReviewState={
    data:ReviewView[],
    reviewData:ReviewWord[],
    markData:{
        [key in string]:ReviewWord[]
    }
}

export default ReviewState;