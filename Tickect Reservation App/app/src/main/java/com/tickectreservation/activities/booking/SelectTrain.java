package com.tickectreservation.activities.booking;

import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.tickectreservation.R;
import com.tickectreservation.data.models.Train;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

public class SelectTrain extends AppCompatActivity {

    TextView tvFromLocation, tvToLocation, tvDate, tvNoOfPassengers, tvNoTrainAvailable;
    ImageView btnGoBack;
    RecyclerView recyclerView;
    SelectTrainAdapter trainAdapter;
    ArrayList<Train> list;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setStatusBarColor(getResources().getColor(R.color.colorPrimaryDark));
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
        tvNoTrainAvailable = findViewById(R.id.tvNoTrainAvailable);

        tvFromLocation.setText(fromLocation);
        tvToLocation.setText(toLocation);
        tvDate.setText(date);
        if (noOfPassengers.equals("1"))
            tvNoOfPassengers.setText(noOfPassengers + " Passenger");
        else
            tvNoOfPassengers.setText(noOfPassengers + " Passengers");


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

        if(trainAdapter.getItemCount() == 0) {
            tvNoTrainAvailable.setVisibility(TextView.VISIBLE);
        } else {
            tvNoTrainAvailable.setVisibility(TextView.GONE);
        }

        // Go back to previous activity
        btnGoBack = findViewById(R.id.trainSelectBackButton);
        btnGoBack.setOnClickListener(v -> {
            finish();
        });

    }
}
