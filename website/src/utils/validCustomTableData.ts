export const ValidCustomTableColumns = (data: any[]) => {
    if (!data || data.length === 0) return [];
    const firstRow = data[0];
    return Object.keys(firstRow).map(key => ({
        key: key,
        label: key.charAt(0).toUpperCase() + key.slice(1)
    }));
}

export const ValidCustomTableData = (data: any[]) => {
    if (!data) return [];
    return data.filter(row => row && typeof row === "object");
}