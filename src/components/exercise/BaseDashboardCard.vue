<script setup>
defineProps({ title: String });
</script>

<template>
  <section class="dashboard_card">
    <h1>{{ title }}</h1>
    <slot></slot>
  </section>
</template>

<style scoped>
.dashboard_card{ 
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

    h1{
        font-size: 15px;
        font-weight: 700;
        color: #1f2d3d;
    }
}
</style>
