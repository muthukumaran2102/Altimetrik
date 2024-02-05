import {createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Car {
    id: string;
    name: string;
    location: string;
    bodyType: string;
    modelName: string;
    owner: string;
    insurance: string;
    kilometer: string;
    fuelType: string;
    transmission: string;
    image: string | null;
    color: string;
  }

  export interface CarFilter {
    id: string;
    name: string;
    location: string;
    bodyType: string;
    modelName: [];
    owner: string;
    insurance: string;
    kilometer: string;
    fuelType: string;
    transmission: string;
    image: string | null;
    color: string;
  }

  export interface addCar {
    name: string,
    value: string| []
  }

  export const initialState = {
    formFields: <Car>{
        id: '',
        name: '',
        location: '',
        bodyType: '',
        modelName: '',
        owner: '',
        insurance: '',
        kilometer: '',
        fuelType: '',
        transmission: '',
        image: '',
        color: ''
    },
    cardData: [] as Car[],
    filterValue: <CarFilter>{
        id: '',
        name: '',
        location: '',
        bodyType: '',
        modelName: [],
        owner: '',
        insurance: '',
        kilometer: '',
        fuelType: '',
        transmission: '',
        image: '',
        color: ''
    },
    editformFields: <Car>{
        id: '',
        name: '',
        location: '',
        bodyType: '',
        modelName: '',
        owner: '',
        insurance: '',
        kilometer: '',
        fuelType: '',
        transmission: '',
        image: '',
        color: ''
    },
    editFlag: false
  }

  export const carsSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {
        addCars: (state, action: PayloadAction<Car>) => {
            state.cardData.push(action.payload);
          },
          updateCars: (state, action) => {
            state.cardData = [...action.payload];
          },
          setFieldValue: (state , action: PayloadAction<addCar>) => {
            const newValue = {
                ...state.formFields,
                [action.payload.name] : action.payload.value
            } 
            state.formFields = newValue;
          },
          clearFields: (state) => {
            state.formFields = {
                id: '',
                name: '',
                location: '',
                bodyType: '',
                modelName: '',
                owner: '',
                insurance: '',
                kilometer: '',
                fuelType: '',
                transmission: '',
                image: '',
                color: ''
            }
          },
          setFilterValue: (state , action: PayloadAction<addCar>) => {
            const newValue = {
                ...state.filterValue,
                [action.payload.name] : action.payload.value
            }             
            state.filterValue = newValue;
          },
          clearFilter: (state) => {
            state.filterValue = {
                id: '',
                name: '',
                location: '',
                bodyType: '',
                modelName: [],
                owner: '',
                insurance: '',
                kilometer: '',
                fuelType: '',
                transmission: '',
                image: '',
                color: ''
            }
          },
          setEditFieldValue: (state , action: PayloadAction<addCar>) => {
            const newValue = {
                ...state.editformFields,
                [action.payload.name] : action.payload.value
            } 
            state.editformFields = newValue;
          },
          clearEditFilter: (state) => {
            state.editformFields = {
                id: '',
                name: '',
                location: '',
                bodyType: '',
                modelName: '',
                owner: '',
                insurance: '',
                kilometer: '',
                fuelType: '',
                transmission: '',
                image: '',
                color: ''
            }
          },
          setEditValue: (state, action: PayloadAction<Car>) => {
            state.editformFields = action.payload;
          },
          setEditFlag: (state, action) => {
            state.editFlag = action.payload;
          }
    }
  })

  export const { addCars, setFieldValue, clearFields, clearFilter, setFilterValue, 
    setEditFieldValue, setEditValue, clearEditFilter, setEditFlag, updateCars} =
  carsSlice.actions;
  export default carsSlice.reducer;