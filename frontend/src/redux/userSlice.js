import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Firestore } from "../firebaseConfig";

// Async thunk to fetch user data from Firebase
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (uid, { rejectWithValue }) => {
    try {
      const usersRef = collection(Firestore, "users");
      const q = query(usersRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].data();
        return { uid, ...userDoc }; // Return the user data
      } else {
        throw new Error("User document not found");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice definition
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null, // User data
    loading: false, // Loading state
    error: null, // Error state
  },
  reducers: {
    clearUserState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload; // Store fetched user data
        state.loading = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.payload; // Store any error
        state.loading = false;
      });
  },
});

export const { clearUserState } = userSlice.actions; // Export actions
export default userSlice.reducer; // Export reducer
