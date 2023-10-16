package com.tickectreservation.activities.reservation;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.tickectreservation.R;
import com.tickectreservation.data.models.Reservation;

import java.lang.reflect.Type;

public class ViewSelectedReservation extends AppCompatActivity {

    TextView trainId, startStation, endStation, departureDate, departureTime, noOfPassengers, pricePerPerson, totalPrice;
    ImageView goBack;
    Button btnUpdateReservation, btnCancelReservation;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setStatusBarColor(getResources().getColor(R.color.colorPrimaryDark));
        setContentView(R.layout.view_selected_reservation);

        String serializedReservation = getIntent().getStringExtra("reservation");

        Type type = new TypeToken<Reservation>() {
        }.getType();

        Reservation reservation = new Gson().fromJson(serializedReservation, type);

        trainId = findViewById(R.id.tvTrainId);
        startStation = findViewById(R.id.tvStartStation);
        endStation = findViewById(R.id.tvEndStation);
        departureDate = findViewById(R.id.tvDepartureDate);
        departureTime = findViewById(R.id.tvStartEnd);
        noOfPassengers = findViewById(R.id.tvNoOfPassengers);
        pricePerPerson = findViewById(R.id.tvPricePerPerson);
        totalPrice = findViewById(R.id.tvTotal);

        trainId.setText(reservation.getTrainID());
        startStation.setText(reservation.getFromStation());
        endStation.setText(reservation.getToStation());
        departureDate.setText(reservation.getSheduledate());
        departureTime.setText(reservation.getSheduletime());
        noOfPassengers.setText(reservation.getQuentity());
        double pricePerPersonDouble = Double.parseDouble(reservation.getPrice()) / Double.parseDouble(reservation.getQuentity());
        pricePerPerson.setText(String.valueOf(pricePerPersonDouble));
        totalPrice.setText(reservation.getPrice());

        // update the reservation
        btnUpdateReservation = findViewById(R.id.btnUpdateReservation);
        // open alert box with 2 edit text fields to update the reservation
        btnUpdateReservation.setOnClickListener(v -> {

        });


        // go back to the previous activity
        goBack = findViewById(R.id.goBack);
        goBack.setOnClickListener(v -> {
            finish();
        });
    }
}