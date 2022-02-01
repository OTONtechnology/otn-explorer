<template>
  <div class="address">
    <CopyHash :hash="$route.params.id" />
    <div class="addressInfo">
      <template v-if="headRows.length > 0">
        <span
          v-for="(title, i) in infoTitles"
          :key="title.name + i"
          class="addressInfo__cell addressInfo__title"
        >
          {{ $t(title.text) }}
        </span>
      </template>
      <template v-for="(headRow, i) in headRows">
        <span
          v-if="/number|string/.test(typeof headRow.received)"
          :key="headRow.received + i"
          class="address__cell"
        >
          {{ headRow.received }}
        </span>
        <span
          v-if="/number|string/.test(typeof headRow.sent)"
          :key="headRow.sent + i + 1"
          class="address__cell"
        >
          {{ headRow.sent }}
        </span>
        <div :key="headRow.currName" class="address__cell address__cellSum">
          <div class="addressBody__text address__cellSumInner">
            <span>{{ headRow.balance }}</span>
            <span>{{ headRow.currName }}</span>
          </div>
        </div>
      </template>
    </div>
    <div class="addressBody">
      <div class="addressButtonGroups">
        <RadioGroup :buttons="btns" @pick="radioPick" />
        <!-- <RadioGroup
          :buttons="btnsCurrNames"
          :uppercase="true"
          @pick="radioPick"
        /> -->
      </div>
      <div class="addressTable">
        <TableHead
          class="addressTable__box addressTable__box_head"
          :titles="tableTitles"
          :lastCellMR="true"
        />

        <AddressTableItem
          v-for="(row, index) in rows"
          :key="row.id"
          :row="row"
          :index="index"
          class="addressTable__box"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: 'LayoutAddress',
  props: {
    infoTitles: {
      type: Array,
      required: true,
    },
    tableTitles: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
    headRows: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      btnsCurrNames: {
        name: 'btnsCurrNames',
        active: 'currsAll',
        array: [
          { name: 'currsAll', text: 'All' },
          { name: 'ebp', text: 'EBP' },
          { name: 'rank', text: 'RANK' },
          { name: 'cp', text: 'CP' },
          { name: 'pct', text: 'PCT' },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      btns: state => ({
        name: 'btns',
        active: state.addressTransactions.filters,
        array: [
          { name: '', text: 'All' },
          { name: 'refill', text: 'Received' },
          { name: 'withdraw', text: 'Sent' },
        ],
      }),
    })
  },
  methods: {
    ...mapActions({
      updateFilters: 'addressTransactions/updateFilters',
    }),
    radioPick(name) {
      this.updateFilters({
        filters: name,
        address: this.$route.params.id,
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
.addressInfo {
  display: grid;
  grid-template-columns: max-content max-content auto;
  grid-column-gap: 6px;
  margin-bottom: 12px;

  +mediaDesktop() {
    grid-column-gap: 30px;
    grid-template-columns: repeat(3, max-content);
  }

  &__head {
    margin-bottom: 4px;
  }

  &__box {
    display: grid;
    grid-gap: 4px 30px;
    grid-template-columns: 155px 80px 78px;
  }

  &__cell {
    margin-bottom: 4px;
  }

  &__title {
    opacity: 0.4;

    &:nth-of-type(3) {
      +mediaDesktop() {
      }
    }
  }
}

.address {
  getFont();
  color: $colorFontBase;

  &__cell {
    margin-bottom: 4px;
  }

  &__cellSum {
    text-align: right;
    font-weight: 700;
  }

  &__cellSumInner {
    display: grid;
    grid-template-columns: max-content auto;
    overflow: hidden;

    +mediaDesktop() {
      display: flex;
      justify-content: flex-end;
      max-height: 18px;
    }

    span:first-of-type {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;

      +mediaDesktop() {
        width: auto;
      }
    }

    span:last-of-type {
      position: relative;
      display: inline-block;
      margin-left: 4px;
      opacity: 0.4;
      text-transform: uppercase;
      text-align: left;
      overflow: hidden;

      &::after {
        position: absolute;
        z-index: 2;
        top: 0;
        right: 0;
        content: '';
        display: block;
        width: 12px;
        height: 100%;
        background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, #ffffff 100%);

        +mediaDesktop() {
          display: none;
        }
      }

      +mediaDesktop() {
        width: auto;
      }
    }
  }
}

.addressBody {
  margin-bottom: 16px;
  padding-top: 16px;
  border-top: 4px solid $colorBg;

  &:not(:last-child) {
    margin-bottom: 12px;
  }

  &__box {
    display: grid;
    grid-gap: 4px 30px;
    grid-template-columns: 265px 78px;

    &_sender {
      .address__cellSumInner {
        span:first-of-type {
          color: $colorDanger;
        }
      }
    }

    &_recipient {
      .address__cellSumInner {
        span:first-of-type {
          color: $colorSuccess;
        }
      }
    }
  }

  &__title {
    opacity: 0.4;

    &_sum {
      text-align: right;
      margin-right: 44px;
    }
  }

  &__link {
    width: fit-content;
    color: $colorLink;

    &:hover {
      color: $colorDanger;
    }
  }
}

.addressButtonGroups {
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 12px;
  margin-bottom: 12px;
}

.addressTable__box {
  display: grid;
  grid-gap: 4px 8px;
  padding: 6px 0;
  adressGrid();

  +mediaDesktop() {
    grid-gap: 0 10px;
  }

  &_head {
    display: none;

    +mediaDesktop() {
      display: grid;
    }
  }
}
</style>
