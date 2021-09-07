import dayjs from "dayjs";
import { groupBy, prop, reverse } from "rambda";
import getArrayFromObjectArray from "@/utils/getArrayFromObjectArray";

export default {
  data() {
    return {
      format: {
        day: "YYYY-MM-DD",
        time: "HH:mm",
      },
    };
  },
  computed: {
    addressGroupByDay() {
      const mappedRows = this.addressRows.map(({ ...row }) => ({
        ...row,

        date: row.timestamp * 1000,
        hash: row.hash,
        type: row.type,
        senderRecipient: row.senderRecipient,
        sum: row.sum,
        dateDay: String(
          dayjs(
            dayjs.unix(row.timestamp).format(this.format.day),
            this.format.day
          ).unix()
        ),
        time: dayjs.unix(row.timestamp).format(this.format.time),
      }));
      const rowsObjGroupByDay = groupBy(prop("dateDay"), mappedRows);
      const rowsArrayGroupByDay = getArrayFromObjectArray(rowsObjGroupByDay);

      return reverse(rowsArrayGroupByDay);
    },
  },
}
