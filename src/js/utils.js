export const lStorage = (name, value) => {
  if (!value) {
    return JSON.parse(localStorage.getItem(name))
  } else {
    // 如果用户关闭存储或者存储达到上限 会报错
    try {
      if (typeof value !== 'string') {
        value = JSON.stringify(value)
      }
      localStorage.setItem(name, value)
    } catch (err) {
      console.log(err)
    }
  }
}

export const removeLStorage = (name) => {
  if (name) {
    localStorage.removeItem(name)
  }
}

export const SStorage = (name, value) => {
  if (!value) {
    return sessionStorage[name]
  } else {
    // 如果用户关闭存储或者存储达到上限 会报错
    try {
      if (typeof value !== 'string') {
        value = JSON.stringify(value)
      }
      localStorage[name] = value
    } catch (err) {
      console.log(err)
    }
  }
}
