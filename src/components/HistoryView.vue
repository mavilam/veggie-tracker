<template>
  <div v-if="historyAvailable" class="fixed inset-0 bg-white bg-opacity-90 flex justify-center items-center">
    <div class="text-center">
      <h2 class="text-2xl font-bold mb-4">Histórico de Consumo Por Semanas</h2>
      <div class="flex flex-col justify-center items-center min-h-screen">
      <div v-for="(veggies, date) in historicData" :key="date">
        <p class="text-lg font-semibold">{{ getWeekInterval(date) }}</p>
        <details>
          <summary>Detalles</summary>
          <p>{{ veggies.length }} vegetales diferentes</p>
          <table class="table-auto border-spacing-4 border border-veggie-500">
            <thead>
              <tr>
                <th>Vegetales</th>
                <th>esta</th>
                <th>semana</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border border-veggie-600" v-for="(group, index) in chunkVeggies(veggies)" :key="index">
                <td v-for="veggie in group" :key="veggie.id">{{ veggie.name }}</td>
              </tr>
            </tbody>
          </table>
        </details>
      </div>
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
    getWeekInterval(date) {
      const d = new Date(date);
      const sunday = new Date(d.setDate(d.getDate() + 6));
      return `${date} - ${sunday.toISOString().slice(0, 10)}`;
    },
    chunkVeggies(veggies) {
      const result = [];
      for (let i = 0; i < veggies.length; i += 3) {
        result.push(veggies.slice(i, i + 3));
      }
      return result;
    },
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
