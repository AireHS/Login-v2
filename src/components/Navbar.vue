<script setup lang="ts">
</script>

<template>
  <v-app-bar flat color="transparent" class="px-4 mt-2">
    <v-toolbar-title class="font-weight-bold text-h5 text-white">Logo</v-toolbar-title>
    <v-spacer></v-spacer>
    <slot>
      <div class="d-none d-md-flex">
        <v-btn variant="text" class="text-white text-capitalize">Home</v-btn>
        <v-btn variant="text" class="text-white text-capitalize">About</v-btn>
        <v-btn variant="text" class="text-white text-capitalize">Services</v-btn>
        <v-btn variant="text" class="text-white text-capitalize">Contact</v-btn>
      </div>
    </slot>
  </v-app-bar>
</template>