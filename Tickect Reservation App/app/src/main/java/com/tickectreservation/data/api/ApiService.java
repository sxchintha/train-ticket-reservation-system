package com.tickectreservation.data.api;

// ApiService.java
import com.google.gson.JsonObject;
import com.tickectreservation.data.models.LoginRequest;
import com.tickectreservation.data.models.Reservation;
import com.tickectreservation.data.models.Train;
import com.tickectreservation.data.models.User;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface ApiService {
    // User related APIs
    @GET("users/{id}")
    Call<User> getUser(@Path("id") int userId);

    @POST("user/traveler/create")
    Call<Void> createUser(@Body User user);

    @POST("user/traveler/login")
    Call<JsonObject> loginUser(@Body LoginRequest loginRequest);


    // Train related APIs
    @GET("train")
    Call<List<Train>> getAllTrains();

    @GET("train/search")
    Call<List<Train>> searchTrains(@Query("fromStation") String fromLocation, @Query("toStation") String toLocation);


    // Reservation related APIs
    @POST("reservations")
    Call<Reservation> createReservation(Reservation reservation);
}


