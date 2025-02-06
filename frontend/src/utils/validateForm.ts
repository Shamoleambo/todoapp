export const checkIfFormDataIsValid = (
  id: string,
  title: string,
  description: string
): boolean => {
  if (id.trim().length === 0 || !id) return false;
  if (title.trim().length === 0 || !title) return false;
  if (description.trim().length === 0 || !description) return false;
  return true;
};
