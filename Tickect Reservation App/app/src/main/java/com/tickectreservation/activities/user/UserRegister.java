package com.tickectreservation.activities.user;

import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.tickectreservation.R;
import com.tickectreservation.data.api.ApiService;
import com.tickectreservation.data.api.RetrofitClient;
import com.tickectreservation.data.models.User;

import java.util.regex.Pattern;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UserRegister extends AppCompatActivity {

    EditText etFirstName, etLastName, etEmail, etNIC, etPhone, etPassword;
    Button btnRegister;
    TextView tvLogin;
    static final Pattern VALID_EMAIL_ADDRESS_REGEX =
            Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);
    static final Pattern VALID_NIC_REGEX =
            Pattern.compile("^([0-9]{9}[vVxX]|[0-9]{12})$", Pattern.CASE_INSENSITIVE);
    static final Pattern VALID_PHONE_REGEX =
            Pattern.compile("^[0-9]{10}$", Pattern.CASE_INSENSITIVE);

    ApiService apiService = RetrofitClient.getClient().create(ApiService.class);

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setStatusBarColor(getResources().getColor(R.color.colorPrimaryDark));
        setContentView(R.layout.user_register);

        etFirstName = findViewById(R.id.etFirstName);
        etLastName = findViewById(R.id.etLastName);
        etEmail = findViewById(R.id.etEmail);
        etNIC = findViewById(R.id.etNIC);
        etPhone = findViewById(R.id.etPhone);
        etPassword = findViewById(R.id.etPassword);

        btnRegister = findViewById(R.id.btnRegister);
        tvLogin = findViewById(R.id.tvLogin);

        // register user
        btnRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                boolean isValid = true;
                boolean isFocusRequested = false;
                String firstName = etFirstName.getText().toString().trim();
                String lastName = etLastName.getText().toString().trim();
                String email = etEmail.getText().toString().trim();
                String nic = etNIC.getText().toString().trim();
                String phone = etPhone.getText().toString().trim();
                String password = etPassword.getText().toString().trim();

                if (firstName.isEmpty()) {
                    etFirstName.setError("First name is required");
                    etFirstName.requestFocus();
                    isFocusRequested = true;
                    isValid = false;
                }
                if (lastName.isEmpty()) {
                    etLastName.setError("Last name is required");
                    if (!isFocusRequested) {
                        etLastName.requestFocus();
                        isFocusRequested = true;
                    }
                    isValid = false;
                }
                if (email.isEmpty()) {
                    etEmail.setError("Email is required");
                    if (!isFocusRequested) {
                        etEmail.requestFocus();
                        isFocusRequested = true;
                    }
                    isValid = false;
                } else if (!VALID_EMAIL_ADDRESS_REGEX.matcher(email).find()) {
                    etEmail.setError("Invalid email");
                    if (!isFocusRequested) {
                        etEmail.requestFocus();
                        isFocusRequested = true;
                    }
                    isValid = false;
                }
                if (nic.isEmpty()) {
                    etNIC.setError("NIC is required");
                    if (!isFocusRequested) {
                        etNIC.requestFocus();
                        isFocusRequested = true;
                    }
                    isValid = false;
                } else if (!VALID_NIC_REGEX.matcher(nic).find()) {
                    etNIC.setError("Invalid NIC");
                    if (!isFocusRequested) {
                        etNIC.requestFocus();
                        isFocusRequested = true;
                    }
                    isValid = false;
                }
                if (phone.isEmpty()) {
                    etPhone.setError("Phone number is required");
                    if (!isFocusRequested) {
                        etPhone.requestFocus();
                        isFocusRequested = true;
                    }
                    isValid = false;
                } else if (!VALID_PHONE_REGEX.matcher(phone).find()) {
                    etPhone.setError("Invalid phone number");
                    if (!isFocusRequested) {
                        etPhone.requestFocus();
                        isFocusRequested = true;
                    }
                    isValid = false;
                }
                if (password.isEmpty()) {
                    etPassword.setError("Password is required");
                    if (!isFocusRequested) {
                        etPassword.requestFocus();
                        isFocusRequested = true;
                    }
                    isValid = false;
                } else if (password.length() < 8) {
                    etPassword.setError("Password should be at least 8 characters");
                    if (!isFocusRequested) {
                        etPassword.requestFocus();
                        isFocusRequested = true;
                    }
                    isValid = false;
                }

                if (isValid) {
                    User newUser = new User(firstName, lastName, email, nic, phone, password);

                    try {
                        Call<Void> call = apiService.createUser(newUser);

                        call.enqueue(new Callback<Void>() {
                            @Override
                            public void onResponse(Call<Void> call, Response<Void> response) {
                                if (response.isSuccessful()) {
                                    Toast.makeText(getApplicationContext(), "User created successfully", Toast.LENGTH_SHORT).show();
                                    finish();
                                } else {
                                    System.out.println("Error in creating user: " + response);
                                    Toast.makeText(getApplicationContext(), "Error in creating user", Toast.LENGTH_SHORT).show();
                                }
                            }

                            @Override
                            public void onFailure(Call call, Throwable t) {
                                Toast.makeText(getApplicationContext(), "Error in creating user", Toast.LENGTH_SHORT).show();
                                System.out.println("Error in creating user: " + t);
                            }
                        });
                    } catch (Exception e) {
                        System.out.println("Error in creating user: " + e);
                    }
                }
            }
        });

        tvLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
    }
}
