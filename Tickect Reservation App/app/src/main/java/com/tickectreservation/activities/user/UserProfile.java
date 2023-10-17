package com.tickectreservation.activities.user;

import android.app.AlertDialog;
import android.content.Context;
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

import com.tickectreservation.R;
import com.tickectreservation.activities.reservation.MyReservations;
import com.tickectreservation.data.api.ApiService;
import com.tickectreservation.data.api.RetrofitClient;
import com.tickectreservation.data.models.User;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UserProfile extends AppCompatActivity {

    TextView tvFirstName, tvLastName, tvNic, tvEmail, tvPhone, btnDeactivateAccount;
    ImageView btnGoBack, btnLogout;
    Button btnEditProfile, btnViewReservations;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        ApiService apiService = RetrofitClient.getClient().create(ApiService.class);
        SharedPreferences sharedPreferences = getSharedPreferences("ticket_reservation", Context.MODE_PRIVATE);

        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setStatusBarColor(getResources().getColor(R.color.colorPrimaryDark));
        setContentView(R.layout.user_profile);

        tvFirstName = findViewById(R.id.tvFirstName);
        tvLastName = findViewById(R.id.tvLastName);
        tvNic = findViewById(R.id.tvNIC);
        tvEmail = findViewById(R.id.tvEmail);
        tvPhone = findViewById(R.id.tvPhoneNumber);

        tvFirstName.setText(sharedPreferences.getString("user_firstName", ""));
        tvLastName.setText(sharedPreferences.getString("user_lastName", ""));
        tvNic.setText(sharedPreferences.getString("user_nic", ""));
        tvEmail.setText(sharedPreferences.getString("user_email", ""));
        tvPhone.setText(sharedPreferences.getString("user_phone", ""));


        // edit profile
        btnEditProfile = findViewById(R.id.btnEditProfile);
        btnEditProfile.setOnClickListener(v -> {
            Intent intent = new Intent(this, EditUserProfile.class);
            startActivity(intent);
        });

        // deactivate account
        btnDeactivateAccount = findViewById(R.id.btnDeactivateAccount);
        btnDeactivateAccount.setOnClickListener(v -> {
            // show alert box to confirm or cancel
            new AlertDialog.Builder(this)
                    .setTitle("Deactivate account")
                    .setMessage("Are you sure you want to deactivate you account?")
                    .setPositiveButton(android.R.string.yes, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                            Call<User> call = apiService.deactivateAccount(sharedPreferences.getString("user_nic", ""));
                            call.enqueue(new Callback<User>() {
                                @Override
                                public void onResponse(Call<User> call, Response<User> response) {
                                    if (response.isSuccessful()) {
                                        SharedPreferences.Editor editor = sharedPreferences.edit();
                                        editor.clear();
                                        editor.apply();
                                        Toast.makeText(getApplicationContext(), "Deactivated successfully", Toast.LENGTH_SHORT).show();

                                        // clear all activities
                                        finishAffinity();
                                    } else {
                                        Toast.makeText(getApplicationContext(), "Something went wrong", Toast.LENGTH_SHORT).show();
                                    }
                                }

                                @Override
                                public void onFailure(Call<User> call, Throwable t) {
                                    Toast.makeText(getApplicationContext(), "Something went wrong", Toast.LENGTH_SHORT).show();
                                }
                            });
                        }
                    })
                    .setNegativeButton(android.R.string.no, null)
                    .setIcon(android.R.drawable.ic_dialog_alert)
                    .show();
        });


        // view reservations
//        btnViewReservations = findViewById(R.id.btnViewReservations);
//        btnViewReservations.setOnClickListener(v -> {
//            Intent intent = new Intent(this, MyReservations.class);
//            startActivity(intent);
//        });

        // go back
        btnGoBack = findViewById(R.id.userProfileGoBack);
        btnGoBack.setOnClickListener(v -> {
            finish();
        });

        // logout
        btnLogout = findViewById(R.id.btnLogout);
        btnLogout.setOnClickListener(v -> {
            new AlertDialog.Builder(this)
                    .setTitle("Logout")
                    .setMessage("Are you sure you want to logout?")
                    .setPositiveButton(android.R.string.yes, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                            SharedPreferences.Editor editor = sharedPreferences.edit();
                            editor.clear();
                            editor.apply();
                            Toast.makeText(getApplicationContext(), "Logged out successfully", Toast.LENGTH_SHORT).show();

                            // clear all activities
                            finishAffinity();
                        }
                    })
                    .setNegativeButton(android.R.string.no, null)
                    .setIcon(android.R.drawable.ic_dialog_alert)
                    .show();
        });
    }
}
