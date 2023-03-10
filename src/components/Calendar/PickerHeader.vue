<template>
  <div :style="'text-align:'+ align">
    <span
      style="font-size: 24px; font-weight: bold;display: inline-block; margin-left: -24px;min-width: 150px !important;"
      role="button"
      class="el-date-picker__header-label mr-1"
    >{{ getMonth()+' '+ yearLabel }}</span>
    <el-button
      v-if="today"
      type="primary"
      size="large"
      class="mr-1"
      @click="$emit('click-today')"
    >
      {{ $t('today') }}
    </el-button>

    <el-button
      class="input-common prev-month"
      type="button"
      size="large"
      icon="el-icon-arrow-left"
      @click="$emit('prev-month')"
    />
    <el-button
      class="input-common"
      type="button"
      size="large"
      icon="el-icon-arrow-right"
      @click="$emit('next-month')"
    />
  </div>
</template>

<script>
export default {
  name: 'PickHeader',
  // eslint-disable-next-line vue/require-prop-types
  props: ['month', 'yearLabel', 'align', 'today'],
  methods: {
    getMonth() {
      switch (this.month) {
        case 1: return 'Jan'
          // eslint-disable-next-line no-unreachable
          break
        case 2: return 'Feb'
          // eslint-disable-next-line no-unreachable
          break
        case 3: return 'Mar'
        // eslint-disable-next-line no-unreachable
          break
        case 4: return 'Apr'
        // eslint-disable-next-line no-unreachable
          break
        case 5: return 'May'
        // eslint-disable-next-line no-unreachable
          break
        case 6: return 'Jun'
        // eslint-disable-next-line no-unreachable
          break
        case 7: return 'Jul'
        // eslint-disable-next-line no-unreachable
          break
        case 8: return 'Aug'
        // eslint-disable-next-line no-unreachable
          break
        case 9: return 'Sep'
        // eslint-disable-next-line no-unreachable
          break
        case 10: return 'Oct'
        // eslint-disable-next-line no-unreachable
          break
        case 11: return 'Nov'
        // eslint-disable-next-line no-unreachable
          break
        default: return 'Dec'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-import  {
  width: 116px !important;
  height: 40px;
  color: white;
}
.mr-1 {
  margin-right: 15px;
}
</style>
