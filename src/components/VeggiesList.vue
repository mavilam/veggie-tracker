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
      clickedIds: new Set()
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
      localStorage.setItem('clickedVeggies', JSON.stringify(Array.from(this.clickedIds)));
    }
  },
  mounted() {
    const storedClickedIds = localStorage.getItem('clickedVeggies');
    if (storedClickedIds) {
      this.clickedIds = new Set(JSON.parse(storedClickedIds));
    }
  }
};
</script>
