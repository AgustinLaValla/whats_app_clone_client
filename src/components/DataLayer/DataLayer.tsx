import React from 'react'
import { reducer, initalState, DataLayerState } from './reducer'

interface DataLayerProps {
  children: JSX.Element
}

const DataLayerContext = React.createContext<{
  state: DataLayerState
  dispatch: React.Dispatch<any>
}>({
  state: initalState,
  dispatch: () => null
})

export default function DataLayer ({ children }: DataLayerProps): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initalState)
  return (
    <DataLayerContext.Provider value={{ state, dispatch }}>
      {children}
    </DataLayerContext.Provider>
  )
}

export const useDataLayer = () => React.useContext(DataLayerContext)
