<template>
  <div class="flex justify-center mt-2">
    <p>Número de verduras ingeridas esta semana: {{ count }}</p>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    count: Number
  }
};
</script>
