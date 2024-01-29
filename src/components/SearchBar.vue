<template>
  <div class="m-4">
    <input
      type="text"
      class="border border-veggie-700 bg-veggie-200 p-2 w-full rounded-sm"
      placeholder="Buscar verduras"
      v-model="searchTerm"
      @input="emitSearch"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchTerm: ''
    };
  },
  methods: {
    emitSearch() {
      this.$emit('search', this.searchTerm);
    }
  }
};
</script>
