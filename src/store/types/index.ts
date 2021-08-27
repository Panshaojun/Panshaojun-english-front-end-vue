import WordState from './word';
import StudyState from './study';
import ThirdPartyState from './third-party';
import ReviewState from './review';
type rootState={
    word:WordState;
    study:StudyState;
    thirdParty:ThirdPartyState;
    review:ReviewState;
}

export default rootState;