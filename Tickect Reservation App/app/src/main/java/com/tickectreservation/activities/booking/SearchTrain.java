package com.tickectreservation.activities.booking;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.RelativeLayout;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.gson.Gson;
import com.tickectreservation.R;
import com.tickectreservation.data.api.ApiService;
import com.tickectreservation.data.api.RetrofitClient;
import com.tickectreservation.data.models.Train;

import java.util.Calendar;
import java.util.List;
import java.util.Locale;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SearchTrain extends AppCompatActivity {

    EditText et_from_location, et_to_location, et_no_of_passengers, et_date;
    DatePicker datePicker;
    Button btn_search_trains;
    RelativeLayout blurryScreen;
    ApiService apiService = RetrofitClient.getClient().create(ApiService.class);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.search_train);

        et_from_location = findViewById(R.id.et_from_destination);
        et_to_location = findViewById(R.id.et_to_destination);
        et_no_of_passengers = findViewById(R.id.et_no_of_passengers);
        et_date = findViewById(R.id.et_date);
        datePicker = findViewById(R.id.datePicker);
        blurryScreen = findViewById(R.id.blurryScreen);

        btn_search_trains = findViewById(R.id.btn_search_trains);

        // set default no of passengers to 1
        et_no_of_passengers.setText("1");

        // set date picker
        et_date.setInputType(View.AUTOFILL_TYPE_NONE);

        // set default date to today
        String date = new java.text.SimpleDateFormat("yyyy-MMM-dd, EEEE").format(new java.util.Date());
        et_date.setText(date);

        // set min date to today
        datePicker.setMinDate(System.currentTimeMillis());

        // set max date to 30 days from today
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_MONTH, 30);
        datePicker.setMaxDate(calendar.getTimeInMillis());

        et_date.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                blurryScreen.setVisibility(View.VISIBLE);
                btn_search_trains.setVisibility(View.GONE);
            }
        });
        datePicker.setOnDateChangedListener(new DatePicker.OnDateChangedListener() {
            @Override
            public void onDateChanged(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
                String yearStr = String.valueOf(year);
                String dayStr = String.valueOf(dayOfMonth);

                if (dayOfMonth < 10) {
                    dayStr = "0" + dayStr;
                }

                // format the date
                Calendar calendar = Calendar.getInstance();
                calendar.set(year, monthOfYear, dayOfMonth);
                String monthName = calendar.getDisplayName(Calendar.MONTH, Calendar.SHORT, Locale.getDefault());
                String dayOfWeek = calendar.getDisplayName(Calendar.DAY_OF_WEEK, Calendar.LONG, Locale.getDefault());

                String dateStr = String.format("%s-%s-%s, %s", dayStr, monthName, yearStr, dayOfWeek);

                et_date.setText(dateStr);
                blurryScreen.setVisibility(View.GONE);
                btn_search_trains.setVisibility(View.VISIBLE);
            }
        });


        // Search trains and navigate to SelectTrain activity
        btn_search_trains.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                try {
                    Boolean isValid = true;
                    String fromLocation = et_from_location.getText().toString();
                    String toLocation = et_to_location.getText().toString();
                    String date = et_date.getText().toString();
                    String noOfPassengers = et_no_of_passengers.getText().toString();

                    if (TextUtils.isEmpty(fromLocation)) {
                        et_from_location.setError("Required");
                        isValid = false;
                    }
                    if (TextUtils.isEmpty(toLocation)) {
                        et_to_location.setError("Required");
                        isValid = false;
                    }
                    if (TextUtils.isEmpty(date)) {
                        et_date.setError("Required");
                        isValid = false;
                    }
                    if (TextUtils.isEmpty(noOfPassengers)) {
                        et_no_of_passengers.setError("Required");
                        isValid = false;
                    } else if (Integer.parseInt(noOfPassengers) > 4) {
                        et_no_of_passengers.setError("Maximum 4 passengers");
                        isValid = false;
                    } else if (Integer.parseInt(noOfPassengers) < 1) {
                        et_no_of_passengers.setError("Minimum 1 passenger");
                        isValid = false;
                    }

                    System.out.println("Button clicked");
                    if (isValid) {
                        Call<List<Train>> call = apiService.getAllTrains();
                        call.enqueue(new Callback<List<Train>>() {
                            @Override
                            public void onResponse(Call<List<Train>> call, Response<List<Train>> response) {
                                if (response.isSuccessful()) {
                                    List<Train> trains = response.body();

                                    Gson gson = new Gson();
                                    String serializedTrains = gson.toJson(trains);

                                    // Navigate to SelectTrain activity with the list of trains
                                    Intent intent = new Intent(getApplicationContext(), SelectTrain.class);
                                    intent.putExtra("trainsList", serializedTrains);
                                    intent.putExtra("fromLocation", fromLocation);
                                    intent.putExtra("toLocation", toLocation);
                                    intent.putExtra("date", date);
                                    intent.putExtra("noOfPassengers", noOfPassengers);

                                    startActivity(intent);

                                } else {
                                    System.out.println("Activity:SearchTrain -> Error in response: " + response);
                                }
                            }

                            @Override
                            public void onFailure(Call<List<Train>> call, Throwable t) {
                                // Handle the failure, e.g., network error
                                System.out.println("Activity:SearchTrain -> onFailure: " + t);
                            }
                        });
                    } else {
                        Toast.makeText(SearchTrain.this, "Invalid inputs", Toast.LENGTH_SHORT).show();
                    }


                } catch (Exception e) {
                    System.out.println("Error in searching... :" + e);
                    Toast.makeText(SearchTrain.this, "Error in searching...", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
}
