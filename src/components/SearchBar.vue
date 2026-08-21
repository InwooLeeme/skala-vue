<script setup>
defineProps({ searchQuery: String });
defineEmits(['update-query']);
</script>

<template>
  <div class="search_box">
    <input
      type="text"
      :value="searchQuery"
      @input="$emit('update-query', $event.target.value)"
      placeholder="검색하고 싶은 도시를 입력하세요"
    />
  </div>
</template>

<style scoped>
.search_box{
  position: relative;
}

.search_box input{
  width: 100%;
  padding: 9px 12px;
  box-sizing: border-box;
  border: 1px solid #e3e6ea;
  border-radius: 6px;
  font-size: 14px;
  color: #1f2d3d;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.search_box input:focus{
  box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.15);
}
</style>
