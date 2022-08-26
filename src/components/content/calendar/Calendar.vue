<template>
  <div class="Calendar">
    <Calendar v-model="value" hide-type cell-height="30">
      <template #month="{ date, data }">
        <div class="badge"></div>
      </template>
    </Calendar>
  </div>
</template>

<script lang = 'ts' setup>
</script>

<style lang='less' scoped>
.Calendar {
  margin-top: 10px;
  padding: 13px;
  border: 1px solid #fff;
  border-radius: 30px;
  font-family: "yuan";
  color: #fff;
  background-color: rgba(255, 255, 255, 0.3);
  .badge {
    line-height: 18px;
  }
}
</style>