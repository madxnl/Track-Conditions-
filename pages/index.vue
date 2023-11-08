<template>
    <div>
      <Grid :imageUrl="imageUrl" />
    </div>
  </template>
  
  <script>
  import Grid from '@/components/Grid.vue';
  
  export default {
    components: {
      Grid,
    },
    data() {
  return {
    imageUrl: '/img/Austria.jpg', // Use an absolute path
  };
    },
}
  </script>
  