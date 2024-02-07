<template>
  <div>
    <VeggiesList v-if="!showHistory" />
    <HistoryView v-if="showHistory" />
    <HistoryBar :toggleHistory="toggleHistoryView" :isHistoryVisible="showHistory" />
  </div>
</template>

<script>
import HistoryBar from './components/HistoryBar.vue';
import VeggiesList from './components/VeggiesList.vue';
import HistoryView from './components/HistoryView.vue';

export default {
  name: 'App',
  components: {
    HistoryBar,
    VeggiesList,
    HistoryView
  },
  data() {
    return {
      showHistory: false
    };
  },
  methods: {
    toggleHistoryView() {
      this.showHistory = !this.showHistory;
    }
  }
};
</script>

<style>
  @font-face {
    font-family: 'switzer';
    src: url('./assets/fonts/Switzer-Regular.ttf');
  }
  body {
    font-family: 'switzer', 'Roboto', sans-serif;
  }
</style>
