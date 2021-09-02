import dayjs from "dayjs";

export default {
  data() {
    return {
      format: {
        day: "YYYY-MM-DD",
        time: "HH:mm"
      }
    };
  },
  computed: {
    rowsGroupByDay() {
      let currentDay = 0;

      const mappedRows = this.transactionRows.map(({ ...row }) => {
        const dateDay = dayjs(
          dayjs.unix(row.timestamp).format(this.format.day),
          this.format.day
        ).unix();

        const showDate = currentDay !== dateDay;

        if (showDate) {
          currentDay = showDate;
        }
        console.info(this.$i18n);
        return {
          ...row,
          date: this.$d(row.timestamp * 1000, "loopShortFirst"),
          showDate,
          time: dayjs.unix(row.timestamp).format(this.format.time)
        };
      });

      return mappedRows;
    }
  }
};
