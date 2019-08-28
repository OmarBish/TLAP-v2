import state from './moduleLevelsState.js'
import mutations from './moduleLevelsMutations.js'
import actions from './moduleLevelsActions.js'
import getters from './moduleLevelsGetters.js'


export default {
	namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}