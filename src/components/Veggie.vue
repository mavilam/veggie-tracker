<template>
  <div 
    class="border border-veggie-700 bg-veggie-200 p-4 cursor-pointer rounded-md shadow-md"
    :class="{ 'bg-veggie-600': isClicked, 'text-veggie-200': isClicked }"
    @click="handleClick"
  >
    {{ name }}
  </div>
</template>

<script>
export default {
  name: 'Veggie',
  props: {
    name: String,
    id: Number,
    isClicked: Boolean
  },
  methods: {
    handleClick() {
      this.$emit('clicked', this.id, !this.isClicked);
    }
  }
};
</script>
