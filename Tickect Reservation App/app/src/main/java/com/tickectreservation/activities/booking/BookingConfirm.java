package com.tickectreservation.activities.booking;

import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.tickectreservation.R;
import com.tickectreservation.data.models.Train;

import java.lang.reflect.Type;

public class BookingConfirm extends AppCompatActivity {

    TextView tvTrainId, tvStartStation, tvEndStation, tvDepartureDate, tvStartEnd, tvNoOfPassengers, tvPricePerPerson, tvTotal;
    ImageView btnGoBack;
    Button btnCancelBooking, btnConfirmBooking;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.booking_confirm);

        String serializedTrain = getIntent().getStringExtra("train");
        Type type = new TypeToken<Train>() {
        }.getType();
        Train train = new Gson().fromJson(serializedTrain, type);

        String prettyPrintedTrain = new GsonBuilder().setPrettyPrinting().create().toJson(train);
        System.out.println(prettyPrintedTrain);
        System.out.println(train.getTrainId());

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
        String startEnd = arrivalTime.substring(11, 16) + " - " + departureTime.substring(11, 16);

        // calculate total price
        double pricePerPerson = 600.00;
        double totalPrice = pricePerPerson * Integer.parseInt(noOfPassengers);

        tvTrainId.setText(trainIdName);
        tvStartStation.setText(fromLocation);
        tvEndStation.setText(toLocation);
        tvDepartureDate.setText(date);
        tvStartEnd.setText(startEnd);
        tvNoOfPassengers.setText(noOfPassengers);
        tvPricePerPerson.setText(String.format("LKR %.2f", pricePerPerson));
        tvTotal.setText(String.format("LKR %.2f", totalPrice));

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
