<template>
  <div class="transactionsTableHead">
    <span v-for="title in titles" :key="title.name" class="transactionsTableHead__cell">
      <span v-if="title.text">
        {{ $t(title.text) }}
      </span></span>
  </div>
</template>
    </span>
  </div>
</template>

<script>
export default {
  name: 'TransactionsTableHead',
  components: {},
  props: {},
  data () {
    return {
      titles: [
        { name: 'date', text: 'Date' },
        { name: 'time, UTC', text: 'Time, UTC' },
        { name: 'hash', text: 'Hash' },
        { name: 'type', text: 'Type' },
        { name: 'from', text: '' },
        { name: 'arrow', text: '' },
        { name: 'to', text: '' },
        { name: 'sum', text: 'Sum' }
      ]
    }
  },
  computed: {},
  methods: {}
}
</script>

<style lang="stylus" scoped>
.transactionsTableHead {
  &__cell {
    getFont();
    color: $colorFontBase;
    opacity: 0.4;
  }
}
</style>
