export const FormatDate = (date) => {
    let dateFormat = new Date(date);
    let day = dateFormat.getDate();
    let month = dateFormat.getMonth() + 1;
    let year = dateFormat.getFullYear();
    return `${day}-${month}-${year}`;
}