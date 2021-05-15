import * as numeral from "numeral";
const localeCurrency = "VND";

export const FormatMoney = (value, format) => {
    switch (localeCurrency) {
        case "VND":
            if (format) {
                numeral.locale("vi");
                return numeral(value).format(format);
            } else {
                numeral.locale("vi");
                format = "0,0 $";
                return numeral(value).format(format);
            }
        default:
            if (format) {
                return numeral(value).format(format);
            } else {
                format = "$ 0,0";
                return numeral(value).format(format);
            }
    }
};