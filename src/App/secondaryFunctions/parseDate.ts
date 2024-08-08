export const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('-').map(Number);
    // Приведение года к формату YYYY
    const fullYear = year <= new Date().getFullYear() - 2000 ? 2000 + year : 1900 + year; // Для годов после 2000
    return new Date(fullYear, month - 1, day);
};