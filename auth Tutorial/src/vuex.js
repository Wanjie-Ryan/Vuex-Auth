import { createStore } from "vuex";

// User object which will be updated upon login

const state = {
  user: null,
};

const store = createStore({
  // state holds the current state
  // holds the global data shared across components. It contains a user object which will store information about logged in user.
  // the current state for the user is null, which after successful login, it will store the logged in user's data
  state,

  getters: {
    // gets the current value of the user which is null
    // getters allow you to access specific parts of the state in a more controlled way. In this case, I can use the getter user to retrieve the user object from the state.
    // returns the user stored in the state whenever you need it in your components.
    user: (state) => {
      return state.user;
    },
  }, // get the current state value

  actions: {
    // used to handle asyncgronous ops like API calls and then commit mutations based on the result.
    // user action is called when a user logs in and it commits the user mutation to update the state.
    // the user action is  a function that receives the user data and commits it to the state by calling the mutation user.
    user(context, user) {
        console.log('yoww:', user)
      context.commit("user", user);
      // calls mutation user to update state
    },
  }, // change the value of state on mutations

  mutations: {
    // mutation to change the value of user in the state
    user(state, user) {
        console.log('yoww-mutation:', user)

      state.user = user; // updates user in the state
    },
  }, // methods to change the value of state
});

export default store;
