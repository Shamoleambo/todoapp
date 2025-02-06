export const checkIfFormDataIsValid = (
  title: string,
  description: string
): boolean => {
  if (title.trim().length === 0 || !title) return false;
  if (description.trim().length === 0 || !description) return false;
  return true;
};
