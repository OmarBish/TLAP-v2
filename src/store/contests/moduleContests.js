import state from './moduleContestsState.js'
import mutations from './moduleContestsMutations.js'
import actions from './moduleContestsActions.js'
import getters from './moduleContestsGetters.js'


export default {
	namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}