package com.tickectreservation.activities.user;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.Window;
import android.widget.Button;
import android.widget.EditText;

import com.tickectreservation.R;

public class EditUserProfile extends AppCompatActivity {

    EditText etFirstName, etLastName, etEmail, etNIC, etPhone, etPassword;
    Button btnUpdate;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        SharedPreferences sharedPreferences = getSharedPreferences("ticket_reservation", Context.MODE_PRIVATE);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setStatusBarColor(getResources().getColor(R.color.colorPrimaryDark));
        setContentView(R.layout.user_edit_profile);

        etFirstName = findViewById(R.id.etFirstName);
        etLastName = findViewById(R.id.etLastName);
        etEmail = findViewById(R.id.etEmail);
        etNIC = findViewById(R.id.etNIC);
        etPhone = findViewById(R.id.etPhone);

        etFirstName.setText(sharedPreferences.getString("user_firstName", ""));
        etLastName.setText(sharedPreferences.getString("user_lastName", ""));
        etNIC.setText(sharedPreferences.getString("user_nic", ""));
        etEmail.setText(sharedPreferences.getString("user_email", ""));
        etPhone.setText(sharedPreferences.getString("user_phone", ""));

        btnUpdate = findViewById(R.id.btnUpdate);

    }
}