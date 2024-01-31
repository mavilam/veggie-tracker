<template>
  <nav class="fixed inset-x-0 bottom-0 bg-opacity-90 bg-veggie-200 z-50" @click="toggleAndChangeText">
    <div class="max-w-screen-xl mx-auto px-4">
      <div class="flex justify-center items-center h-16">
        <span class="text-lg font-bold text-veggie-800 rounded px-4 py-2" >
          {{ buttonText }}
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'HistoryBar',
  props: {
    isHistoryVisible: {
      type: Boolean,
      required: true
    },
    toggleHistory: {
      type: Function,
      required: true
    }
  },
  computed: {
    buttonText() {
      return this.isHistoryVisible ? "Volver" : "Histórico";
    }
  },
  methods: {
    toggleAndChangeText() {
      this.toggleHistory();
    }
  }
};
</script>
