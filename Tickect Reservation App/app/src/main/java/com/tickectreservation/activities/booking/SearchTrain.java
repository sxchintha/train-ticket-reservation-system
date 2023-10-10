package com.tickectreservation.activities.booking;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.gson.Gson;
import com.tickectreservation.R;
import com.tickectreservation.data.api.ApiService;
import com.tickectreservation.data.api.RetrofitClient;
import com.tickectreservation.data.models.Train;
import com.tickectreservation.data.repositories.TrainRepository;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SearchTrain extends AppCompatActivity {

    EditText et_from_location, et_to_location, et_no_of_passengers, et_date;
    Button btn_search_trains;
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

        btn_search_trains = findViewById(R.id.btn_search_trains);

        btn_search_trains.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                try {
                    String fromLocation = et_from_location.getText().toString();
                    String toLocation = et_to_location.getText().toString();
                    String date = et_date.getText().toString();
                    String noOfPassengers = et_no_of_passengers.getText().toString();

                    if(TextUtils.isEmpty(fromLocation)) {
                        et_from_location.setError("required");
                    }
                    if(TextUtils.isEmpty(toLocation)) {
                        et_to_location.setError("required");
                    }
                    if(TextUtils.isEmpty(date)) {
                        et_date.setError("required");
                    }
                    if(TextUtils.isEmpty(noOfPassengers)) {
                        et_no_of_passengers.setError("required");
                    }

                    System.out.println("Button clicked");
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

                } catch (Exception e) {
                    System.out.println("Error in searching... :" + e);
                    Toast.makeText(SearchTrain.this, "Error in searching...", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
}
