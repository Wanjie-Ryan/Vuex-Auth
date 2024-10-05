<template>
  <div>
    <div class="d-flex justify-content-center bg-primary">
      <div class="">
        <img src="../assets/logo.png" class="w-50 h-auto" />
      </div>
      <div class="d-flex align-items-center">
        <h2 class="text-light text-center">Register</h2>
      </div>
    </div>

    <form
      class="container d-flex flex-column mt-3 justify-content-center"
      style="min-height: 90vh; width: 60%"
      @submit.prevent="RegisterData"
    >
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label"
          >Username</label
        >
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Username"
          v-model="username"
          @input="handleUsername"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label"
          >Email address</label
        >
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput2"
          placeholder="name@example.com"
          v-model="email"
          @input="handleEmail"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label"
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

      <!-- <button class="btn btn-primary">Register</button> -->

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
          <button class="btn btn-primary" style="width: 100%" type="submit">
            Register
          </button>
        </div>
      </div>
      <p>Already Registered? <router-link to="/login">Login</router-link></p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterComponent",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      isVisible: false,
      loading: false,
    };
  },
  methods: {
    handleUsername: function () {
      this.username = event.target.value;
      // console.log(this.username);
    },
    handleEmail: function () {
      this.email = event.target.value;
    },
    handlePassword: function () {
      this.password = event.target.value;
    },
    toggleVisibility: function () {
      this.isVisible = !this.isVisible;
    },

    async RegisterData() {
      try {
        this.loading = true;

        if (!this.username || !this.email || !this.password) {
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
          name: this.username,
          email: this.email,
          password: this.password,
        };

        const response = await axios.post("http://localhost:3000/user", data);
        console.log(response);

        if (response.status == 201) {
          this.$toast.open({
            message: "Registration Successfull",
            type: "success",
            duration: 5000,
            position: "top",
            dismissible: true,
          });
          // localStorage.setItem("UserInfo", JSON.stringify(response.data));

          setTimeout(() => {
            this.$router.push({ name: "Login" });
          }, 1000);
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
  },

  // mounted() {
  //   let loggedUser = localStorage.getItem("UserInfo");
  //   console.log(loggedUser);
  //   if (loggedUser) {
  //     this.$router.push({ name: "Home" });
  //   }
  // },
};
</script>

<style scoped></style>
