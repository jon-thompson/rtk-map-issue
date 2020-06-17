import { createSlice } from "@reduxjs/toolkit"

type SliceState = { state: "loading" } | { state: "finished"; data: string }

const initialState = { state: "loading" } as SliceState

const slice = createSlice({
  name: "test1",
  initialState,
  reducers: {
    finished(state) {
      return state
    },
  },
})

console.log(slice)
