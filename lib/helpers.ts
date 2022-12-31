export const removeFalsy = (obj: Record<string, any>): Record<string, any> => {
  Object.keys(obj).forEach(key => {
    if (!obj[key]) {
      delete obj[key]
    }
  })

  return obj
}
