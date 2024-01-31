<template>
  <div v-if="historyAvailable" class="fixed inset-0 bg-white bg-opacity-90 flex justify-center items-center">
    <div class="text-center">
      <h2 class="text-2xl font-bold mb-4">Histórico de Consumo</h2>
      <div v-for="(veggies, date) in historicData" :key="date">
        <p class="text-lg font-semibold">{{ date }}</p>
        <ul class="list-disc list-inside">
          <li v-for="veggie in veggies" :key="veggie.id">{{ veggie.name }}</li>
        </ul>
      </div>
    </div>
  </div>
  <div v-else class="fixed inset-0 bg-white bg-opacity-90 flex justify-center items-center">
    <p>No hay datos históricos disponibles.</p>
  </div>
</template>

<script>
import veggiesData from '../assets/veggies.json';

export default {
  name: 'HistoryView',
  data() {
    return {
      historicData: {}
    };
  },
  computed: {
    historyAvailable() {
      return Object.keys(this.historicData).length > 0;
    }
  },
  methods: {
    loadHistory() {
      const historicRaw = localStorage.getItem('clickedVeggies');
      if (historicRaw) {
        const historic = JSON.parse(historicRaw);
        for (const [date, veggieIds] of Object.entries(historic)) {
          this.historicData[date] = veggieIds.map(id => 
            veggiesData.find(veggie => veggie.id === id)
          );
        }
      }
    }
  },
  mounted() {
    this.loadHistory();
  }
};
</script>
