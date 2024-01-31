<template>
  <div class="text-veggie-800">
    <SearchBar @search="filterVeggies" />
    <Counter :count="clickedIds.size" />
    <div class="m-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
      <Veggie 
        v-for="veggie in filteredVeggies" 
        :key="veggie.id" 
        :name="veggie.name"
        :id="veggie.id"
        :is-clicked="clickedIds.has(veggie.id)"
        @clicked="handleVeggieClick"
      />
    </div>
  </div>
</template>

<script>
import Veggie from './Veggie.vue';
import SearchBar from './SearchBar.vue';
import Counter from './Counter.vue';
import veggiesData from '../assets/veggies.json';

import {
		getMonday,
	} from '../composables/utils'

export default {
  name: 'VeggiesList',
  components: {
    Veggie,
    SearchBar,
    Counter
  },
  data() {
    return {
      veggies: veggiesData,
      searchQuery: '',
      clickedIds: new Set(),
      historic: {},
      currentWeek: getMonday(new Date()),
    };
  },
  computed: {
    filteredVeggies() {
      return this.veggies.filter(veggie =>
        veggie.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    filterVeggies(query) {
      this.searchQuery = query;
    },
    handleVeggieClick(id, isClicked) {
      if (isClicked) {
        this.clickedIds.add(id);
      } else {
        if (this.clickedIds.has(id)) {
          this.clickedIds.delete(id);
        }
      }
      this.historic[this.currentWeek] = Array.from(this.clickedIds);
      localStorage.setItem('clickedVeggies', JSON.stringify(this.historic));
    }
  },
  mounted() {
    this.historic = JSON.parse(localStorage.getItem('clickedVeggies') || "{}") ;
    if (this.historic[this.currentWeek]) {
      this.clickedIds = new Set(this.historic[this.currentWeek]);
    }
  }
};
</script>
