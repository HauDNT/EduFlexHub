export const createFieldChangeHandler = <T extends object> (
  setter: React.Dispatch<React.SetStateAction<T>>
) => {
  return (field: keyof T, value: T[keyof T]) => {
    setter(prev => ({...prev, [field]: value}))
  }
}