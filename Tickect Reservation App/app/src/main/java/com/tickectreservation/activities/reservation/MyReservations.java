package com.tickectreservation.activities.reservation;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.tickectreservation.R;
import com.tickectreservation.data.api.ApiService;
import com.tickectreservation.data.api.RetrofitClient;
import com.tickectreservation.data.models.Reservation;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MyReservations extends AppCompatActivity {

    RecyclerView recyclerView;
    ArrayList<Reservation> list;
    ApiService apiService = RetrofitClient.getClient().create(ApiService.class);


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.my_reservations);

        recyclerView = findViewById(R.id.recervationsListRecyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        Call<List<Reservation>> call = apiService.getAllReservations();

        call.enqueue(new Callback<List<Reservation>>() {
            @Override
            public void onResponse(Call<List<Reservation>> call, Response<List<Reservation>> response) {

                    list = new ArrayList<>(response.body());
                    ReservationAdapter reservationAdapter = new ReservationAdapter(MyReservations.this, list);
                    recyclerView.setAdapter(reservationAdapter);
            }

            @Override
            public void onFailure(Call<List<Reservation>> call, Throwable t) {

            }
        });
    }
}
