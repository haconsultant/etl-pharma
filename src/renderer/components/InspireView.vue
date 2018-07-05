<template>
  <v-layout column justify-center>
    <v-flex>
      <v-time-picker
      v-model="time"
      full-width
      landscape
      type="month"
      class="mt-3"
    ></v-time-picker>
      <img src="/static/v.png" alt="Vuetify.js" class="mb-5" />
      <blockquote class="text-xs-center">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-flex>
  </v-layout>
</template>

<style scoped>
  img {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
</style>