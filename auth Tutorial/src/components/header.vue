<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link to="/home" class="navbar-brand" href="#">Hotel</router-link>
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
          <!-- <router-link to="/updatehotel" class="nav-item">
            <a class="nav-link" href="#">Update Restaurant</a>
          </router-link> -->
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
              <li><a class="dropdown-item" href="#">Something else here</a></li>
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
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
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
  },
};
</script>
