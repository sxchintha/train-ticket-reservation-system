package com.tickectreservation.activities.booking;

import android.content.Intent;
import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.tickectreservation.R;
import com.tickectreservation.activities.booking.SelectSeat;
import com.tickectreservation.data.models.Reservation;
import com.tickectreservation.data.models.Schedule;
import com.tickectreservation.data.models.Train;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

public class SelectTrain extends AppCompatActivity {

    TextView tvFromLocation, tvToLocation, tvDate, tvNoOfPassengers;
    RecyclerView recyclerView;
    SelectTrainAdapter trainAdapter;
    ArrayList<Train> list;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.select_train);

        // Show searching details
        String fromLocation = getIntent().getStringExtra("fromLocation");
        String toLocation = getIntent().getStringExtra("toLocation");
        String date = getIntent().getStringExtra("date");
        String noOfPassengers = getIntent().getStringExtra("noOfPassengers");

        tvFromLocation = findViewById(R.id.tvFromLocation);
        tvToLocation = findViewById(R.id.tvToLocation);
        tvDate = findViewById(R.id.tvDate);
        tvNoOfPassengers = findViewById(R.id.tvNoOfPassengers);

        tvFromLocation.setText(fromLocation);
        tvToLocation.setText(toLocation);
        tvDate.setText(date);
        tvNoOfPassengers.setText(noOfPassengers);

        
        // Show train list
        recyclerView = findViewById(R.id.trainListRecyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        String serializedTrains = getIntent().getStringExtra("trainsList");
        Type type = new TypeToken<List<Train>>() {
        }.getType();
        ArrayList<Train> trains = new Gson().fromJson(serializedTrains, type);
//        String prettyPrintedTrains = new GsonBuilder().setPrettyPrinting().create().toJson(trains);
//        System.out.println(prettyPrintedTrains);

        list = new ArrayList<>();
        list.addAll(trains);

        trainAdapter = new SelectTrainAdapter(this, list, fromLocation, toLocation, date, noOfPassengers);
        recyclerView.setAdapter(trainAdapter);

    }
}
