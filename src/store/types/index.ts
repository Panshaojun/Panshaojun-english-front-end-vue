import WordState from './word';
import StudyState from './study';
import ThirdPartyState from './third-party';
import ReviewState from './review';
import CacheState from './cache';
type rootState={
    word:WordState;
    study:StudyState;
    thirdParty:ThirdPartyState;
    review:ReviewState;
    cache:CacheState;
}

export default rootState;