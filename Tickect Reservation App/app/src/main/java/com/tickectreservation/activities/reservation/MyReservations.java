package com.tickectreservation.activities.reservation;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

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
    ImageView goBack;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setStatusBarColor(getResources().getColor(R.color.colorPrimaryDark));

        SharedPreferences sharedPreferences = getSharedPreferences("ticket_reservation", Context.MODE_PRIVATE);
        String nic = sharedPreferences.getString("user_nic", "");
        setContentView(R.layout.my_reservations);

        recyclerView = findViewById(R.id.recervationsListRecyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        Call<List<Reservation>> call = apiService.getReservations(nic);

        call.enqueue(new Callback<List<Reservation>>() {
            @Override
            public void onResponse(Call<List<Reservation>> call, Response<List<Reservation>> response) {

                list = new ArrayList<>(response.body());
                ReservationAdapter reservationAdapter = new ReservationAdapter(MyReservations.this, list);
                recyclerView.setAdapter(reservationAdapter);

                TextView tvNoReservations = findViewById(R.id.tvNoReservationsAvailable);
                if (reservationAdapter.getItemCount() == 0) {
                    tvNoReservations.setVisibility(TextView.VISIBLE);
                } else {
                    tvNoReservations.setVisibility(TextView.GONE);
                }
            }

            @Override
            public void onFailure(Call<List<Reservation>> call, Throwable t) {
                System.out.println("Error: " + t.getMessage());
                Toast.makeText(MyReservations.this, "Error fetching reservations", Toast.LENGTH_LONG).show();
            }
        });


        // go back to previous activity
        goBack = findViewById(R.id.goBack);
        goBack.setOnClickListener(v -> {
            finish();
        });
    }
}
