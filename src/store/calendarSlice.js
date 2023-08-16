import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dietPlan: [[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]]]
}

const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        addPlan: (state, action) => {
            const {day, mealtime, food} = action.payload;
            state.dietPlan[day][mealtime].push(food);
        },
        removePlan: (state, action) => {
            const {day, mealtime, id} = action.payload;
            state.dietPlan[day][mealtime] = state.dietPlan[day][mealtime].filter(item => item.id !== id);
        },
        clearPlans: (state) => {
            state.dietPlan = [[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]]];
        }
    }
});

export const { addPlan, removePlan, clearPlans } = calendarSlice.actions;

export const selectDietPlan = state => state.calendar.dietPlan;

export default calendarSlice.reducer;