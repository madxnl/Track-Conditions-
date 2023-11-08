<template>
  <div class="relative">
    <div class="grid" :style="gridStyle">
      <div class="image-container" :style="imageContainerStyle">
        <div class="image" :style="imageStyle"></div>
      </div>
    </div>
    <div class="zoom-container absolute bottom-2 right-2">
      <div class="zoom-controls">
        <button @click="zoomIn" class="text-lg px-2 py-1 mr-2 bg-gray-800 rounded">+</button>
        <button @click="zoomOut" class="text-lg px-2 py-1 bg-gray-800 rounded">-</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageUrl: String,
  },
  data() {
    return {
      zoomLevel: 1,
    };
  },
  computed: {
    gridStyle() {
      return {
        width: '100vw',
        height: '100vh',
      };
    },
    imageContainerStyle() {
      return {
        transform: `scale(${this.zoomLevel})`,
      };
    },
    imageStyle() {
      return {
        backgroundImage: `url(${this.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    },
  },
  methods: {
    zoomIn() {
      if (this.zoomLevel < 2) {
        this.zoomLevel += 0.1;
      }
    },
    zoomOut() {
      if (this.zoomLevel > 0.5) {
        this.zoomLevel -= 0.1;
      }
    },
  },
};
</script>

<style scoped>
.grid {
  @apply bg-cover bg-center relative overflow-hidden m-0 p-0;
  display: grid;
  grid-template-columns: repeat(10, 10%);
  grid-template-rows: repeat(10, 10%);
  z-index: 1;
}

.zoom-container {
  z-index: 2;
}

.zoom-controls button {
  cursor: pointer; /* Set cursor pointer for all buttons */
}

.image-container {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; /* Set the width to 100% */
  height: 100%; /* Set the height to 100% */
  z-index: 0;
}

.image {
  width: 100%; /* Set the width to 100% */
  height: 100%; /* Set the height to 100% */
}
</style>
