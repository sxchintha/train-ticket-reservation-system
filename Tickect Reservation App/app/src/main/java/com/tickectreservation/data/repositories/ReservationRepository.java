package com.tickectreservation.data.repositories;

import com.tickectreservation.data.api.ApiService;
import com.tickectreservation.data.models.Reservation;

import java.io.IOException;

import retrofit2.Response;

public class ReservationRepository {
    private ApiService apiService;

    public ReservationRepository(ApiService apiService) {
        this.apiService = apiService;
    }

    public Reservation createReservation(Reservation reservation) {
        try {
            Response<Reservation> response = apiService.createReservation(reservation).execute();
            if (response.isSuccessful()) {
                return response.body();
            }
        } catch (IOException e) {
            System.out.println("Exception in ReservationRepository.createReservation: " + e);
        }
        return null;
    }
}