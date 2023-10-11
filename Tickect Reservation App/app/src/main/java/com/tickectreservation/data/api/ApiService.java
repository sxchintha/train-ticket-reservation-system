package com.tickectreservation.data.api;

// ApiService.java
import com.tickectreservation.data.models.Reservation;
import com.tickectreservation.data.models.Train;
import com.tickectreservation.data.models.User;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface ApiService {
    // User related APIs
    @GET("users/{id}")
    Call<User> getUser(@Path("id") int userId);

    @POST("user/traveler/create")
    Call<Void> createUser(@Body User user);


    // Train related APIs
    @GET("train")
    Call<List<Train>> getAllTrains();


    // Reservation related APIs
    @POST("reservations")
    Call<Reservation> createReservation(Reservation reservation);
}


