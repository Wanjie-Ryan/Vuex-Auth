<template>
  <div>
    <Header />

    <!-- <p class="text-center mt-3 fw-bold">
      Hey <span style="color: gold"> {{ username }} </span> Welcome to the Home
      Page Mate
    </p> -->

    <p class="text-center mt-3 fw-bold">
      Hey <span style="color: gold">{{ user[0]?.name }} </span> Welcome to the
      Home Page Mate
    </p>

    <div class="mt-3 d-flex flex-column justify-content-center mx-auto">
      <div v-if="loading">
        <p class="text-center">Loading.....</p>
      </div>

      <div v-else>
        <h3 class="text-center">Our Hotels</h3>

        <div
          class="d-flex flex-column justify-content-center bg-primary rounded-sm mx-auto rounded-1"
          style="width: 60%; margin-top: 30px"
        >
          <div
            class="d-flex justify-content-center"
            style="margin-top: 10px; gap: 20px"
            v-for="hotel in hotels"
            :key="hotel.id"
          >
            <p class="fw-bold text-center">{{ hotel.name }}</p>
            <p>{{ hotel.contact }}</p>
            <p class="text-underline">{{ hotel.address }}</p>
            <router-link :to="'/updatehotel/' + hotel.id"
              ><button class="btn btn-primary">Update</button></router-link
            >
            <button class="btn btn-danger" @click="DeleteHotel(hotel.id)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./header.vue";
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      username: "",
      hotels: [],
      loading: false,
    };
  },
  components: {
    Header,
  },
  mounted() {
    let loggedUser = localStorage.getItem("UserInfo");
    // console.log(loggedUser);
    if (loggedUser) {
      let userObj = JSON.parse(loggedUser);
      // console.log(userObj[0].name);
      this.username = userObj[0].name;
    }
    if (!loggedUser) {
      this.$router.push({ name: "Register" });
    }

    this.fetchHotels();
  },
  methods: {
    async fetchHotels() {
      try {
        this.loading = true;
        const response = await axios.get("http://localhost:3000/hotels");
        console.log(response.data);
        if (response.status === 200) {
          this.hotels = response.data;
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    async DeleteHotel(id) {
      try {
        this.loading = true;
        const response = await axios.delete(
          "http://localhost:3000/hotels/" + id
        );
        console.log(response);
        if (response.status === 200) {
          this.$toast.open({
            message: "Hotel Deleted Successfull",
            type: "success",
            duration: 5000,
            position: "top",
            dismissible: true,
          });

          this.fetchHotels();
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>
