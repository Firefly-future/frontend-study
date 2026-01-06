import { createContext } from "react"

const userCtx = createContext()

export const UserProvider = userCtx.Provider
export const UserConsumer = userCtx.Consumer

export default userCtx
