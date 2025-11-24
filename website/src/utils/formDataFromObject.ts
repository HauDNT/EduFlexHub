export function formDataFromObject(obj: Record<string, any>) {
  const fd = new FormData();
  Object.entries(obj).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
      fd.append(k, v);
    }
  });
  return fd;
}
