<template>
  <div
    class="w-100 min-vh-100 d-flex justify-content-center align-items-center"
  >
    <div
      class="w-50 min-vh-60 bg-primary d-flex flex-column justify-content-center align-items-center pt-3 pb-3"
    >
      <form @submit.prevent="handleLogin">
        <h2>Hotel Login</h2>

        <div>
          <label class="mb-1 fw-bold">Email</label>
          <input
            type="email"
            placeholder="Email Address"
            class="form-control"
            v-model="email"
            @input="handleEmail"
          />
        </div>

        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label fw-bold"
            >Password</label
          >
          <div class="d-flex">
            <input
              :type="isVisible ? 'text' : 'password'"
              class="form-control"
              id="exampleFormControlInput3"
              placeholder="Enter your password"
              v-model="password"
              @input="handlePassword"
            />
            <i
              class="bi bi-flower3"
              style="margin-left: -20px; margin-top: 5px; cursor: pointer"
              @click="toggleVisibility"
            ></i>
          </div>
        </div>
        <div class="w-100">
          <div v-if="loading">
            <!-- <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Loading... -->
            <div class="spinner-grow text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <div v-else class="w-100 d-flex justify-content-center mx-auto">
            <button class="btn btn-secondary" style="width: 100%" type="submit">
              Login
            </button>
          </div>
        </div>
        <p>Not Registered? <router-link to="/">Register</router-link></p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex"; // import vuex helpers for actions
// mapActions is imported from vuex to help your Vuex action USER to the component method
export default {
  name: "LoginComponent",
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      isVisible: false,
    };
  },
  methods: {

    //connect vuex user action to login method. allows you to call the this.user(response.data) withing your component to update the global user state after successful login
    ...mapActions(['user']),
    // maps the user action from vuex

    handleEmail(e) {
      this.email = e.target.value;
    },
    handlePassword(e) {
      this.password = e.target.value;
    },
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
    async handleLogin() {
      if (!this.password || !this.email) {
        this.$toast.open({
          message: "Please fill all fields",
          type: "warning",
          duration: 5000,
          position: "top",
          dismissible: true,
        });
        return;
      }

      const data = {
        email: this.email,
        password: this.password,
      };

      try {
        this.loading = true;

        const response = await axios.get(
          `http://localhost:3000/user?email=${this.email}&password=${this.password}`,
          data
        );
        console.log(response);

        if (response.status == 200) {
          this.$toast.open({
            message: "Login Successful",
            type: "success",
            duration: 5000,
            position: "top",
            dismissible: true,
          });

          // use vuex to update the user state globally
          // after successful login, call the user action. This commits the mutation that updates the global user state in vuex, making it accessible across other components.
          this.user(response.data)
          // this.$store.dispatch('user', response.data)
          localStorage.setItem("UserInfo", JSON.stringify(response.data));

          setTimeout(() => {
            this.$router.push({ name: "Home" });
          }, 1000);
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    let loggedUser = localStorage.getItem("UserInfo");
    console.log(loggedUser);
    if (loggedUser) {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>
