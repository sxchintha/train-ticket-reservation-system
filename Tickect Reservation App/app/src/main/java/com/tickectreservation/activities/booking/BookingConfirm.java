package com.tickectreservation.activities.booking;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.tickectreservation.R;
import com.tickectreservation.activities.reservation.MyReservations;
import com.tickectreservation.data.api.ApiService;
import com.tickectreservation.data.api.RetrofitClient;
import com.tickectreservation.data.models.Reservation;
import com.tickectreservation.data.models.Train;
import com.tickectreservation.data.models.User;

import java.lang.reflect.Type;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class BookingConfirm extends AppCompatActivity {

    TextView tvTrainId, tvStartStation, tvEndStation, tvDepartureDate, tvStartEnd, tvNoOfPassengers, tvPricePerPerson, tvTotal;
    ImageView btnGoBack;
    Button btnCancelBooking, btnConfirmBooking;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setStatusBarColor(getResources().getColor(R.color.colorPrimaryDark));
        setContentView(R.layout.booking_confirm);

        String serializedTrain = getIntent().getStringExtra("train");
        Type type = new TypeToken<Train>() {
        }.getType();
        Train train = new Gson().fromJson(serializedTrain, type);

//        String prettyPrintedTrain = new GsonBuilder().setPrettyPrinting().create().toJson(train);
//        System.out.println(prettyPrintedTrain);
//        System.out.println(train.getTrainId());

        String fromLocation = getIntent().getStringExtra("fromLocation");
        String toLocation = getIntent().getStringExtra("toLocation");
        String date = getIntent().getStringExtra("date");
        String noOfPassengers = getIntent().getStringExtra("noOfPassengers");

        tvTrainId = findViewById(R.id.tvTrainId);
        tvStartStation = findViewById(R.id.tvStartStation);
        tvEndStation = findViewById(R.id.tvEndStation);
        tvDepartureDate = findViewById(R.id.tvDepartureDate);
        tvStartEnd = findViewById(R.id.tvStartEnd);
        tvNoOfPassengers = findViewById(R.id.tvNoOfPassengers);
        tvPricePerPerson = findViewById(R.id.tvPricePerPerson);
        tvTotal = findViewById(R.id.tvTotal);

        // get train id and name
        String trainIdName = train.getTrainId() + " - " + train.getTrainName();

        // get time start->end
        String arrivalTime = train.getSchedule().getArrivalTime();
        String departureTime = train.getSchedule().getDepartureTime();
        // String startEnd = arrivalTime.substring(11, 16) + " - " + departureTime.substring(11, 16);
        String startEnd = arrivalTime.substring(11, 16);

        // calculate total price
        double pricePerPerson = train.getPricePerTicket();
        double totalPrice = pricePerPerson * Integer.parseInt(noOfPassengers);

        tvTrainId.setText(trainIdName);
        tvStartStation.setText(fromLocation);
        tvEndStation.setText(toLocation);
        tvDepartureDate.setText(date);
        tvStartEnd.setText(startEnd);
        tvNoOfPassengers.setText(noOfPassengers);
        tvPricePerPerson.setText(String.format("LKR %.2f", pricePerPerson));
        tvTotal.setText(String.format("LKR %.2f", totalPrice));

        // Confirm booking
        btnConfirmBooking = findViewById(R.id.btnConfirmBooking);
        btnConfirmBooking.setOnClickListener(v -> {
            // show alert box to confirm or cancel
            new AlertDialog.Builder(this)
                    .setTitle("Confirm Booking")
                    .setMessage("Are you sure you want to confirm this booking?")
                    .setPositiveButton(android.R.string.yes, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                            ApiService apiService = RetrofitClient.getClient().create(ApiService.class);
                            SharedPreferences sharedPreferences = getSharedPreferences("ticket_reservation", MODE_PRIVATE);
                            String nic = sharedPreferences.getString("user_nic", "");

                            // default
                            String currentDateTime = "2023-10-16T07:35:23.145Z";
                            String id = "id";

                            // get only the hours and minutes
                            String time = departureTime.substring(11, 16);

                            Reservation reservation = new Reservation(String.valueOf(train.getTrainId()), nic, train.getTrainName(), date, time, fromLocation, toLocation, noOfPassengers, String.valueOf(totalPrice), currentDateTime, id);
                            Call<Void> call = apiService.createReservation(reservation);

                            call.enqueue(new Callback<Void>() {
                                @Override
                                public void onResponse(Call<Void> call, Response<Void> response) {
                                    System.out.println("Response: " + response);
                                    if (response.isSuccessful()) {
                                        System.out.println("Reservation created successfully");
                                        Toast.makeText(getApplicationContext(), "Reservation created successfully", Toast.LENGTH_SHORT).show();
                                        Intent intent = new Intent(getApplicationContext(), SearchTrain.class);
                                        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                                        startActivity(intent);
                                    } else {
                                        System.out.println("Error in creating reservation: " + response);
                                    }
                                }

                                @Override
                                public void onFailure(Call<Void> call, Throwable t) {
                                    System.out.println("onFailure creating reservation: " + t);
                                    Toast.makeText(getApplicationContext(), "Error in creating reservation", Toast.LENGTH_SHORT).show();
                                }
                            });
                        }
                    })
                    .setNegativeButton(android.R.string.no, null)
                    .setIcon(android.R.drawable.checkbox_on_background)
                    .show();
        });

        // Cancel booking
        btnCancelBooking = findViewById(R.id.btnCancelBooking);
        btnCancelBooking.setOnClickListener(v -> {
            finish();
        });

        // Go back to previous activity
        btnGoBack = findViewById(R.id.confirmReservationGoBack);
        btnGoBack.setOnClickListener(v -> {
            finish();
        });
    }
}
