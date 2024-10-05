<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link to="/home" class="navbar-brand" href="#"
          >Hotel</router-link
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <router-link to="/addhotel" class="nav-item">
              <a class="nav-link active" aria-current="page" href="#"
                >Add Restaurant</a
              >
            </router-link>
            <router-link to="/updatehotel" class="nav-item">
              <a class="nav-link" href="#">Update Restaurant</a>
            </router-link>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="#">Something else here</a>
                </li>
              </ul>
            </li>
            <li class="nav-item" @click="logout">
              <a class="nav-link disabled" aria-disabled="true">Logout</a>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>

    <form
      class="form-control"
      style="
        margin-left: auto;
        margin-right: auto;
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-top: 50px;
      "
      @submit.prevent="CreateHotel"
    >
      <h3 class="text-center">Add Hotel</h3>

      <div class="mx-auto mt-5 d-flex flex-column">
        <label for="name" class="fw-bold">Name:</label>
        <input
          type="text"
          id="name"
          class="form-control"
          v-model="name"
          @input="handleName"
          required
        />
      </div>

      <div class="mx-auto mt-5 d-flex flex-column">
        <label for="address" class="fw-bold">Address:</label>
        <input
          type="text"
          id="address"
          class="form-control"
          v-model="address"
          @input="handleAddress"
          required
        />
      </div>

      <div class="mx-auto mt-5 d-flex flex-column">
        <label for="contact" class="fw-bold">Contact:</label>
        <input
          type="text"
          id="contact"
          class="form-control"
          v-model="contact"
          @input="handleContact"
          required
        />
      </div>

      <!-- <button class="mt-3 bg-primary form-control">Add Hotel</button> -->

      <div class="w-100 mt-4">
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
          <button
            class="btn btn-primary form-control"
            style="width: 100%"
            type="submit"
          >
            Add Hotel
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Add",
  data() {
    return {
      name: "",
      address: "",
      contact: "",
      loading: false,
    };
  },
  methods: {
    logout() {
      //    let details = localStorage.removeItem('UserInfo')
      //    console.log(details)
      localStorage.clear();

      this.$toast.open({
        message: "Logout Successfull",
        type: "success",
        duration: 5000,
        position: "top",
        dismissible: true,
      });
      setTimeout(() => {
        this.$router.push({ name: "Login" });
      }, 1000);
    },
    handleName() {
      this.name = event.target.value;
    },
    handleAddress() {
      this.address = event.target.value;
    },
    handleContact() {
      this.contact = event.target.value;
    },
    async CreateHotel() {
      if (!this.name || !this.contact || !this.address) {
        this.$toast.open({
          message: "Please fill all fields",
          type: "warning",
          duration: 5000,
          position: "top",
          dismissible: true,
        });
      }

      try {
        const hotelData = {
          name: this.name,
          address: this.address,
          contact: this.contact,
        };

        this.loading = true;
        const response = await axios.post(
          "http://localhost:3000/hotels",
          hotelData
        );
        // console.log(response);

        if (response.status == 201) {
          this.$toast.open({
            message: "Hotel Created Successfully",
            type: "success",
            duration: 5000,
            position: "top",
            dismissible: true,
          });

          setTimeout(() => {
            this.$router.push({ name: "Home" });
          });
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
