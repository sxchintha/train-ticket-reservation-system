package com.tickectreservation.activities.user;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.tickectreservation.R;

public class UserProfile extends AppCompatActivity {

    TextView tvFirstName, tvLastName, tvNic, tvEmail, tvPhone;
    ImageView btnGoBack;
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.user_profile);

        tvFirstName = findViewById(R.id.tvFirstName);
        tvLastName = findViewById(R.id.tvLastName);
        tvNic = findViewById(R.id.tvNIC);
        tvEmail = findViewById(R.id.tvEmail);
        tvPhone = findViewById(R.id.tvPhoneNumber);

        SharedPreferences sharedPreferences = getSharedPreferences("ticket_reservation", Context.MODE_PRIVATE);
        tvFirstName.setText(sharedPreferences.getString("user_firstName", ""));
        tvLastName.setText(sharedPreferences.getString("user_lastName", ""));
        tvNic.setText(sharedPreferences.getString("user_nic", ""));
        tvEmail.setText(sharedPreferences.getString("user_email", ""));
        tvPhone.setText(sharedPreferences.getString("user_phone", ""));

        // go back
        btnGoBack = findViewById(R.id.userProfileGoBack);
        btnGoBack.setOnClickListener(v -> {
            finish();
        });

    }
}
