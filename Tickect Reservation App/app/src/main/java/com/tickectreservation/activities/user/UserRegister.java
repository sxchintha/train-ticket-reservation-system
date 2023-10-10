package com.tickectreservation.activities.user;

import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.tickectreservation.R;
import com.tickectreservation.data.models.User;
import com.tickectreservation.data.repositories.UserRepository;

public class UserRegister extends AppCompatActivity {

    EditText etFirstName, etLastName, etEmail, etNIC, etPhone, etPassword;
    Button btnRegister;
    UserRepository userRepository = new UserRepository();
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.user_register);

        etFirstName = findViewById(R.id.etFirstName);
        etLastName = findViewById(R.id.etLastName);
        etEmail = findViewById(R.id.etEmail);
        etNIC = findViewById(R.id.etNIC);
        etPhone = findViewById(R.id.etPhone);
        etPassword = findViewById(R.id.etPassword);

        btnRegister = findViewById(R.id.btnRegister);

        // register user
        btnRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String firstName = etFirstName.getText().toString().trim();
                String lastName = etLastName.getText().toString().trim();
                String email = etEmail.getText().toString().trim();
                String nic = etNIC.getText().toString().trim();
                String phone = etPhone.getText().toString().trim();
                String password = etPassword.getText().toString().trim();

                if(firstName.isEmpty()) {
                    etFirstName.setError("First name is required");
                    etFirstName.requestFocus();
                    return;
                }
                if(lastName.isEmpty()) {
                    etLastName.setError("Last name is required");
                    etLastName.requestFocus();
                    return;
                }
                if(email.isEmpty()) {
                    etEmail.setError("Email is required");
                    etEmail.requestFocus();
                    return;
                }
                if(nic.isEmpty()) {
                    etNIC.setError("NIC is required");
                    etNIC.requestFocus();
                    return;
                }
                if(phone.isEmpty()) {
                    etPhone.setError("Phone number is required");
                    etPhone.requestFocus();
                    return;
                }
                if(password.isEmpty()) {
                    etPassword.setError("Password is required");
                    etPassword.requestFocus();
                    return;
                }

                // create user
                User newUser = new User(firstName, lastName, email, nic, phone);
                newUser.setPassword(password);
                boolean isCreated = userRepository.createUser(newUser);
                if(isCreated) {
                    // user created successfully
                    // redirect to login page
                    Toast.makeText(getApplicationContext(), "User created successfully", Toast.LENGTH_SHORT).show();
                    finish();
                } else {
                    // user creation failed
                    Toast.makeText(getApplicationContext(), "User creation failed", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
}
