<template>
  <article>
    <div class="m-6 has-text-centered py-6">
      <p class="is-size-5 mb-0">No configured service found!</p>
      <p>Please add a service to start building your Homer dashboard.</p>
      <p>
        <router-link class="button is-high mt-5 has-text-weight-bold" to="/add-service">
          Get started
        </router-link>
      </p>
    </div>
  </article>
</template>

<script>
export default {
  name: "GetStarted",
};
</script>

<style lang="scss" scoped>
p {
  color: #4a4a4a;
}

.button.is-high {
  background-color: var(--highlight-primary);
  color: white;
}

.button.is-high:hover {
  background-color: var(--highlight-hover);
  color: white !important;
}

body #app a {
  font-weight: 900;
  color: #ffffff;
  font-family: "Lato", sans-serif;
}

body #app p {
  color: #c0c0c0;
}
</style>
