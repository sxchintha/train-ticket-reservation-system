package com.tickectreservation.activities.booking;

import android.content.Intent;
import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.tickectreservation.R;
import com.tickectreservation.activities.booking.SelectSeat;
import com.tickectreservation.data.models.Train;

import java.lang.reflect.Type;
import java.util.List;

public class SelectTrain extends AppCompatActivity {

    CardView cardView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.select_train);
        cardView = findViewById(R.id.cardView);
        cardView.setOnClickListener(view -> {
            Intent intent = new Intent(getApplicationContext(), SelectSeat.class);
            startActivity(intent);

        });

        String serializedTrains = getIntent().getStringExtra("trainsList");
        Type type = new TypeToken<List<Train>>(){}.getType();
        List<Train> trains = new Gson().fromJson(serializedTrains, type);

        String prettyPrintedTrains = new GsonBuilder().setPrettyPrinting().create().toJson(trains);
        System.out.println(prettyPrintedTrains);

    }
}
