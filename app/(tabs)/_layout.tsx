import { Redirect, Slot } from 'expo-router'
import React from 'react'

export default function TabsLayout() {
  const isAuthenticated = false // Replace with your authentication logic

  if (!isAuthenticated) return <Redirect href="/sign-in" />

  return <Slot />
}