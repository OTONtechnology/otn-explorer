<template>
  <div class="address">
    <CopyHash hash="0x47830ff838e5659d48b5658b636617651011f00" />
    <div class="addressInfo">
      <span
        v-for="title in infoTitles"
        :key="title.name"
        class="addressInfo__cell addressInfo__title"
      >
        {{ $t(title.text) }}
      </span>
      <template v-for="headRow in headRows">
        <span :key="headRow.received" class="address__cell">
          {{ headRow.received }}
        </span>
        <span :key="headRow.sent" class="address__cell">
          {{ headRow.sent }}
        </span>
        <div :key="headRow.currName" class="address__cell address__cellSum">
          <div class="addressBody__text address__cellSumInner">
            <span>{{ headRow.received - headRow.sent }}</span>
            <span>{{ headRow.currName }}</span>
          </div>
        </div>
      </template>
    </div>
    <div class="addressBody">
      <div class="addressButtonGroups">
        <RadioGroup :buttons="btns" @pick="radioPick" />
        <RadioGroup
          :buttons="btnsCurrNames"
          :uppercase="true"
          @pick="radioPick"
        />
      </div>
      <div class="addressTable">
        <TableHead
          class="addressTable__box"
          :titles="tableTitles"
          :lastCellMR="true"
        />
        <div
          v-for="day in rows"
          :key="day[0].dateDay"
          class="addressTable__bodyDay"
        >
          <AddressTableItem
            v-for="(row, index) in day"
            :key="row.id"
            :row="row"
            :index="index"
            class="addressTable__box"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutAddress",
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
        name: "btns",
        array: [
          { name: "all", text: "All" },
          { name: "received", text: "Received" },
          { name: "sent", text: "Sent" },
        ],
      },
      btnsCurrNames: {
        name: "btnsCurrNames",
        array: [
          { name: "currsAll", text: "All" },
          { name: "ebp", text: "EBP" },
          { name: "rank", text: "RANK" },
          { name: "cp", text: "CP" },
          { name: "pct", text: "PCT" },
        ],
      },
    };
  },
  methods: {
    radioPick(name) {
      console.log(`radio: ${name}`);
    },
  },
};
</script>

<style lang="stylus" scoped>
.addressInfo {
  display: grid;
  grid-template-columns: repeat(3, max-content);
  grid-column-gap: 30px;
  margin-bottom: 12px;

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
    max-height: 18px;
    overflow: hidden;
    display: flex;
    justify-content: flex-end;

    span:first-of-type {
      display: inline-block;
      width: calc(100% - 44px);
      overflow: hidden;
      text-overflow: ellipsis;
    }

    span:last-of-type {
      display: inline-block;
      margin-left: 4px;
      width: 40px;
      opacity: 0.4;
      text-transform: uppercase;
      text-align: left;
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
  grid-column-gap: 10px;
  padding: 6px 0;
  adressGrid();
}
</style>
