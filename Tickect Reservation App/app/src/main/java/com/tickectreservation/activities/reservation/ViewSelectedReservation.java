package com.tickectreservation.activities.reservation;

import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.material.textfield.TextInputLayout;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import com.tickectreservation.R;
import com.tickectreservation.activities.user.UserLogin;
import com.tickectreservation.data.api.ApiService;
import com.tickectreservation.data.api.RetrofitClient;
import com.tickectreservation.data.models.Reservation;

import java.lang.reflect.Type;
import java.util.Calendar;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ViewSelectedReservation extends AppCompatActivity {

    TextView trainId, startStation, endStation, departureDate, departureTime, noOfPassengers, pricePerPerson, totalPrice;
    ImageView goBack;
    Button btnChangeReservation, btnUpdateReservation, btnConfirmReservation, btnCancelReservation;
    EditText etNoOfPassengers, etDate;
    TextInputLayout vNoOfPassengers, vDate;
    DatePicker datePicker;
    RelativeLayout blurryScreen;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        ApiService apiService = RetrofitClient.getClient().create(ApiService.class);

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
        btnChangeReservation = findViewById(R.id.btnChangeReservation);
        btnUpdateReservation = findViewById(R.id.btnUpdateReservation);
        btnConfirmReservation = findViewById(R.id.btnConfirmReservation);
        btnCancelReservation = findViewById(R.id.btnCancelReservation);
        etNoOfPassengers = findViewById(R.id.et_no_of_passengers);
        etDate = findViewById(R.id.et_date);
        vNoOfPassengers = findViewById(R.id.vNoOfPassengers);
        vDate = findViewById(R.id.vDate);
        datePicker = findViewById(R.id.datePicker);
        blurryScreen = findViewById(R.id.blurryScreen);

        // check if the departureDate is within 5 days.
        String departureDateStr = reservation.getSheduledate();
        String[] departureDateArr = departureDateStr.split("-");
        int year = Integer.parseInt(departureDateArr[0]);
        int month = Integer.parseInt(departureDateArr[1]);
        int day = Integer.parseInt(departureDateArr[2]);

        Calendar calendar1 = Calendar.getInstance();
        calendar1.set(year, month - 1, day);
        long departureDateMillis = calendar1.getTimeInMillis();

        Calendar calendar2 = Calendar.getInstance();
        calendar2.add(Calendar.DAY_OF_MONTH, 5);
        long fiveDaysFromTodayMillis = calendar2.getTimeInMillis();

        if (departureDateMillis < fiveDaysFromTodayMillis) {
            btnChangeReservation.setVisibility(Button.GONE);
            btnCancelReservation.setVisibility(Button.GONE);

            TextView tvInfo = findViewById(R.id.tvInfo);
            tvInfo.setVisibility(TextView.VISIBLE);
        }

        // set min date to today
        datePicker.setMinDate(System.currentTimeMillis());

        // set max date to 30 days from today
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_MONTH, 30);
        datePicker.setMaxDate(calendar.getTimeInMillis());

        btnChangeReservation.setOnClickListener(v -> {
            btnChangeReservation.setVisibility(Button.GONE);
            btnUpdateReservation.setVisibility(Button.VISIBLE);
            btnConfirmReservation.setVisibility(Button.GONE);
            btnCancelReservation.setVisibility(Button.GONE);
            vNoOfPassengers.setVisibility(TextInputLayout.VISIBLE);
            vDate.setVisibility(TextInputLayout.VISIBLE);

            etDate.setInputType(View.AUTOFILL_TYPE_NONE);

            etDate.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    blurryScreen.setVisibility(View.VISIBLE);
                    btnUpdateReservation.setVisibility(Button.GONE);
                }
            });
            datePicker.setOnDateChangedListener(new DatePicker.OnDateChangedListener() {
                @Override
                public void onDateChanged(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
                    String yearStr = String.valueOf(year);
                    String monthStr = String.valueOf(monthOfYear + 1);
                    String dayStr = String.valueOf(dayOfMonth);

                    if (dayOfMonth < 10) {
                        dayStr = "0" + dayStr;
                    }
                    if (monthOfYear < 9) {
                        monthStr = "0" + monthStr;
                    }

                    // format the date
                    String dateStr = String.format("%s-%s-%s", yearStr, monthStr, dayStr);

                    etDate.setText(dateStr);
                    blurryScreen.setVisibility(View.GONE);
                    btnUpdateReservation.setVisibility(Button.VISIBLE);
                }
            });

            etNoOfPassengers.setText(reservation.getQuentity());
            etDate.setText(reservation.getSheduledate());
        });

        btnUpdateReservation.setOnClickListener(v -> {
            String newDate = etDate.getText().toString().trim();
            String newNoOfPassengers = etNoOfPassengers.getText().toString().trim();
            boolean isValid = true;

            if (TextUtils.isEmpty(newDate)) {
                etDate.setError("Date is required");
                isValid = false;
            }
            if (TextUtils.isEmpty(newNoOfPassengers)) {
                etNoOfPassengers.setError("No of passengers is required");
                isValid = false;
            } else if (Integer.parseInt(newNoOfPassengers) < 1) {
                etNoOfPassengers.setError("Minimum 1 passenger");
                isValid = false;
            }

            if (isValid) {
                noOfPassengers.setText(newNoOfPassengers);
                departureDate.setText(newDate);
                double newTotalPrice = Double.parseDouble(newNoOfPassengers) * pricePerPersonDouble;
                totalPrice.setText(String.valueOf(newTotalPrice));

                reservation.setQuentity(newNoOfPassengers);
                reservation.setSheduledate(newDate);
                reservation.setPrice(String.valueOf(newTotalPrice));

                btnUpdateReservation.setVisibility(Button.GONE);
                vNoOfPassengers.setVisibility(TextInputLayout.GONE);
                vDate.setVisibility(TextInputLayout.GONE);
                btnConfirmReservation.setVisibility(Button.VISIBLE);
            }
        });

        btnConfirmReservation.setOnClickListener(v -> {
            Call<JsonObject> call = apiService.updateReservation(reservation.getId(), reservation);

            call.enqueue(new Callback<JsonObject>() {
                @Override
                public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                    try {
                        if (response.isSuccessful()) {
                            Toast.makeText(ViewSelectedReservation.this, "Reservation updated successfully", Toast.LENGTH_SHORT).show();

                            Gson gson = new Gson();
                            String reservationJson = gson.toJson(reservation);

                            Intent intent = new Intent(ViewSelectedReservation.this, MyReservations.class);
                            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                            startActivity(intent);

                            Intent intent2 = getIntent();
                            intent2.putExtra("reservation", reservationJson);
                            intent2.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                            startActivity(intent2);
                            finish();
                        } else {
                            Gson gson = new Gson();
                            JsonObject jsonObject = gson.fromJson(response.errorBody().string(), JsonObject.class);
                            String error = jsonObject.get("error").getAsString();

                            Toast.makeText(ViewSelectedReservation.this, error, Toast.LENGTH_SHORT).show();

                            System.out.println("Error login: " + error);
                        }
                    } catch (Exception e) {
                        System.out.println("Error onResponse: " + e);
                    }
                }

                @Override
                public void onFailure(Call<JsonObject> call, Throwable t) {
                    Toast.makeText(ViewSelectedReservation.this, "Something went wrong", Toast.LENGTH_SHORT).show();
                    System.out.println("Response error body" + t.getMessage());
                }
            });
        });


        // cancel the reservation
        btnCancelReservation = findViewById(R.id.btnCancelReservation);
        btnCancelReservation.setOnClickListener(v -> {
            // show alert box to confirm or cancel
            AlertDialog.Builder builder = new AlertDialog.Builder(this);
            builder.setTitle("Cancel Reservation");
            builder.setMessage("Are you sure you want to cancel this reservation?");
            builder.setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    Call<JsonObject> call = apiService.cancelReservation(reservation.getId());

                    call.enqueue(new Callback<JsonObject>() {
                        @Override
                        public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                            try {
                                if (response.isSuccessful()) {
                                    Toast.makeText(ViewSelectedReservation.this, "Reservation cancelled successfully", Toast.LENGTH_SHORT).show();

                                    Intent intent = new Intent(ViewSelectedReservation.this, MyReservations.class);
                                    intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                                    startActivity(intent);
                                    finish();
                                } else {
                                    Gson gson = new Gson();
                                    JsonObject jsonObject = gson.fromJson(response.errorBody().string(), JsonObject.class);
                                    String error = jsonObject.get("error").getAsString();

                                    Toast.makeText(ViewSelectedReservation.this, error, Toast.LENGTH_SHORT).show();

                                    System.out.println("Error login: " + error);
                                }
                            } catch (Exception e) {
                                Toast.makeText(ViewSelectedReservation.this, "Something went wrong", Toast.LENGTH_SHORT).show();
                                System.out.println("Error onResponse: " + e);
                            }
                        }

                        @Override
                        public void onFailure(Call<JsonObject> call, Throwable t) {
                            Toast.makeText(ViewSelectedReservation.this, "Something went wrong", Toast.LENGTH_SHORT).show();
                            System.out.println("Response error body" + t.getMessage());
                        }
                    });
                }
            });
            builder.setNegativeButton("No", null);
            builder.show();
        });


        // go back to the previous activity
        goBack = findViewById(R.id.goBack);
        goBack.setOnClickListener(v -> {
            finish();
        });
    }
}