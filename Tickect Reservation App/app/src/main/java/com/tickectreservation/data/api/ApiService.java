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
import retrofit2.http.PATCH;
import retrofit2.http.POST;
import retrofit2.http.PUT;
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

    @PATCH("user/deactivate/{nic}")
    Call<User> deactivateAccount(@Path("nic") String nic);

    @PUT("user/{nic}")
    Call<User> updateUser(@Path("nic") String nic, @Body User user);



    // Train related APIs
    @GET("train")
    Call<List<Train>> getAllTrains();

    @GET("train/search")
    Call<List<Train>> searchTrains(@Query("fromStation") String fromLocation, @Query("toStation") String toLocation);



    // Reservation related APIs
    @POST("booking/create")
    Call<Void> createReservation(@Body Reservation reservation);

    @GET("booking/my/{nic}")
    Call<List<Reservation>> getReservations(@Path("nic") String nic);

    @PATCH("booking/cancel/{id}")
    Call<JsonObject> cancelReservation(@Path("id") String reservationId);

    @PUT("booking/{id}")
    Call<JsonObject> updateReservation(@Path("id") String reservationId, @Body Reservation reservation);
}


