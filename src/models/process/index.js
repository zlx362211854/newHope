export default {
  state: {},
  namespace: 'process',
  effects: {
    *list({ payload}, { call, put }) {
  
    }
  },
  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    },
  },
};