import WordState from './word';
import StudyState from './study';
import ThirdPartyState from './third-party';
type rootState={
    word:WordState;
    study:StudyState;
    thirdParty:ThirdPartyState
}

export default rootState;