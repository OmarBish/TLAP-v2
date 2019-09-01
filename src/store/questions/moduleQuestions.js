import state from './moduleQuestionsState.js'
import mutations from './moduleQuestionsMutations.js'
import actions from './moduleQuestionsActions.js'
import getters from './moduleQuestionsGetters.js'


export default {
	namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}