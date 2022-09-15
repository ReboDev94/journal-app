import moment from "moment";
moment.locale('es');

export const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY')
}