package com.tickectreservation.data.repositories;

import com.tickectreservation.data.api.ApiService;
import com.tickectreservation.data.models.Train;

import java.io.IOException;
import java.util.List;

import retrofit2.Response;

public class TrainRepository {
    private ApiService apiService;

    public TrainRepository(ApiService apiService) {
        this.apiService = apiService;
    }

    public List<Train> getAllTrains() {
        try {
            Response<List<Train>> response = apiService.getAllTrains().execute();
            if (response.isSuccessful()) {
                return response.body();
            }
        } catch (IOException e) {
            System.out.println("Exception in TrainRepository.getAllTrains: " + e);
        }
        return null;
    }
}
