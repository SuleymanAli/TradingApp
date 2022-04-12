// import Stream from "../helpers/stream";
const state = () => ({});

const getters = {
  getCustomer(state) {
    return state.customers;
  },
};

const actions = {
  connectSocket(context, payload) {
    var ws = new WebSocket(payload.url);
    var cb = () => {};
  },
};

const mutations = {
  ADD_CUSTOMER(state, payload) {
    state.customers.push(payload);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
