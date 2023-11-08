<template>
  <div class="flex h-screen">
    <div class="w-2/3 bg-#715b5f rounded-tl-3xl rounded-bl-3xl h-screen">
      <Grid image-url="/img/suzuka2.jpg"/>
    </div>
   
    <div class="Dashboardlayout"> 
      <div class="w-1/3 rounded-l-3xl bg-#715b5f p-4">
        <Header @collapse-dashboard="collapseDashboard" /> <!-- Listen for the event here -->
        <Dashboard :isCollapsed="isDashboardCollapsed" /> <!-- Pass the prop here -->
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header.vue';
import Dashboard from '~/components/Dashboard.vue';
import Footer from '~/components/Footer.vue';
import Grid from '~/components/Grid.vue';


export default {
  components: {
    Header,
    Dashboard,
    Footer,
    Grid,
  },
  data() {
    return {
      isDashboardCollapsed: false, // Initialize to false (not collapsed)
    };
  },
  methods: {
    collapseDashboard() {
      this.isDashboardCollapsed = !this.isDashboardCollapsed; // Toggle the dashboard collapse state
    },
  },
};
</script>


<style>
.Dashboardlayout {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Change to flex-start to align items at the top */
  align-items: flex-end;
}
.collapsed {
  display: none;
  overflow: hidden;
}
</style>
