import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the chargesPaid state
interface Charge {
  name: string;
  amount: number;
}

// Define a type for the dashboard state
interface DashboardSlice {
  profitFactor: {
    data: number;
    status: string;
  };
  profitAndLoss: {
    data: number[];
    total: number;
    growthRatio: number;
  };
  maxDrawdown: {
    data: number;
  };
  tradingFrequency: {
    data: number;
  };
  chargesPaid: Charge[];
}

// Define the initial state using that type
const initialState: DashboardSlice = {
  profitFactor: { data: 0, status: 'idle' },
  profitAndLoss: { data: [], total: 0, growthRatio: 0 },
  maxDrawdown: { data: 0 },
  tradingFrequency: { data: 0 },
  chargesPaid: [ { name: '', amount: 0 } ],
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardData: (state, action) => ({
      ...state,
      ...action.payload
    })
  }
})

export const { setDashboardData } = dashboardSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default dashboardSlice.reducer