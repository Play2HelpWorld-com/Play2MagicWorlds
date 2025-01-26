import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosReqInstance } from "@/components/accounts/utils/axiosInstance";
import { UserInterface } from "@/types/interface";

interface AuthState {
  isAuthenticated: boolean;
  loogedInUser: UserInterface;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loogedInUser: {} as UserInterface,
};

export const fetchLoggedInUser = createAsyncThunk(
  "auth/fetchLoggedInUser",
  async (_, { rejectWithValue }) => {
    const protectedRoute = AxiosReqInstance();
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return rejectWithValue("No access token found");
    }

    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
    const url = `${baseUrl}/api/users/validateUser/`;
    try {
      const response = await protectedRoute.post(url);
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue("Invalid token");
      }
    } catch (error) {
      console.log(
        "Error while getting loggedIN user at fetchLoggedInUser in authSlice.ts file",
        error,
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchLoggedInUser.pending, (state) => {
      state.isAuthenticated = false;
    });
    builder.addCase(fetchLoggedInUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.loogedInUser = action.payload;
        state.isAuthenticated = true;
      }
    });
    builder.addCase(fetchLoggedInUser.rejected, (state) => {
      state.isAuthenticated = false;
    });
  },
});
export const authReducer = authSlice.reducer;
