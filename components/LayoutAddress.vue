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
          v-for="(row, index) in filteredRows"
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
      btns: {
        name: 'btns',
        active: 'all',
        array: [
          { name: 'all', text: 'All' },
          { name: 'received', text: 'Received' },
          { name: 'sent', text: 'Sent' },
        ],
      },
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
    filteredRows() {
      if (this.btns.active === 'all') {
        return this.rows
      }
      return this.rows.filter(({ isSender }) => {
        if (this.btns.active === 'received') {
          return !isSender
        }

        return isSender
      });
    }
  },
  methods: {
    radioPick(name) {
      this.btns.active = name;
    },
  }
};
</script>

<style lang="stylus" scoped>
.addressInfo {
  display: grid;
  grid-template-columns: max-content max-content minmax(65px, max-content);
  grid-column-gap: 4px;
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
      margin-right: 50px;
      text-align: right;

      +mediaDesktop() {
        margin-right: 65px;
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
    overflow: hidden;
    display: flex;

    +mediaDesktop() {
      justify-content: flex-end;
      width: 160px;
      max-height: 18px;
    }

    span:first-of-type {
      display: inline-block;
      width: 70px;
      overflow: hidden;
      text-overflow: ellipsis;

      +mediaDesktop() {
        width: calc(100% - 65px);
      }
    }

    span:last-of-type {
      position: relative;
      display: inline-block;
      margin-left: 4px;
      width: 45px;
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
      }

      +mediaDesktop() {
        width: 60px;
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
