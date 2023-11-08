<template>
  <header class="flex justify-center bg-slate-900 text-white pt-0 rounded-tl-3xl rounded-tr-3xl focus:outline-none font-mono">
    <button @click="collapseDashboard" class="text-white">|||</button>
    <h1 class="text-2xl font-semibold justify-center py-9">TrackConditions</h1>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    collapseDashboard() {
      this.$emit('collapse-dashboard'); // Emit an event to request collapsing the dashboard
    },
  },
};
</script>