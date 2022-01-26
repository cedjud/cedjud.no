import create from 'zustand'

const useStore = create((set) => {
  return {
    router: {},
    dom: null,
    cursor: {
      x: 0,
      y: 0
    }
  }
})

export default useStore
