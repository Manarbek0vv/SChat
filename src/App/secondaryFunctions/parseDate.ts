export const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('-').map(Number);
    // Приведение года к формату YYYY
    const fullYear = year < 100 ? 2000 + year : year; // Для годов после 2000
    return new Date(fullYear, month - 1, day);
};