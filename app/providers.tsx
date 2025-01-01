'use client'

import React, { createContext, useContext, ReactNode } from 'react'

interface SellerContextProps {
  seller: string
}

const SellerContext = createContext<SellerContextProps | undefined>(undefined)

interface SellerContextProviderProps {
  children: ReactNode
  seller: string
}

export const SellerContextProvider: React.FC<SellerContextProviderProps> = ({
  children,
  seller
}) => {
  return (
    <SellerContext.Provider value={{ seller }}>
      {children}
    </SellerContext.Provider>
  )
}

export const useSellerContext = () => {
  const context = useContext(SellerContext)
  if (!context) {
    throw new Error(
      'useSellerContext must be used within a SellerContextProvider'
    )
  }
  return context
}
