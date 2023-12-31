package com.tickectreservation.activities.user;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceDataStore;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.tickectreservation.R;
import com.tickectreservation.activities.booking.SearchTrain;
import com.tickectreservation.data.api.ApiService;
import com.tickectreservation.data.api.RetrofitClient;
import com.tickectreservation.data.models.LoginRequest;

import java.util.regex.Pattern;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UserLogin extends AppCompatActivity {
    EditText etNic, etPassword;
    TextView tvRegister;
    Button btnLogin;

    static final Pattern VALID_NIC_REGEX =
            Pattern.compile("^([0-9]{9}[vVxX]|[0-9]{12})$", Pattern.CASE_INSENSITIVE);

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        ApiService apiService = RetrofitClient.getClient().create(ApiService.class);
        SharedPreferences sharedPreferences = getSharedPreferences("ticket_reservation", Context.MODE_PRIVATE);

        // check if user is already logged in
        if (sharedPreferences.contains("user_nic")) {
            startActivity(new Intent(UserLogin.this, SearchTrain.class));
            finish();
        }
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setStatusBarColor(getResources().getColor(R.color.colorPrimaryDark));
        setContentView(R.layout.user_login);

        etNic = findViewById(R.id.etNic);
        etPassword = findViewById(R.id.etPassword);
        btnLogin = findViewById(R.id.btnLogin);

//        etNic.setText("999999999v");
//        etPassword.setText("12341234");

        // login user
        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                boolean isValid = true;
                boolean isFocusRequested = false;
                String nic = etNic.getText().toString().trim();
                String password = etPassword.getText().toString().trim();

                if (nic.isEmpty()) {
                    etNic.setError("NIC is required");
                    isValid = false;
                    etNic.requestFocus();
                    isFocusRequested = true;
                } else if (!VALID_NIC_REGEX.matcher(nic).find()) {
                    etNic.setError("Invalid NIC");
                    isValid = false;
                    etNic.requestFocus();
                    isFocusRequested = true;
                }

                if (password.isEmpty()) {
                    etPassword.setError("Password is required");
                    isValid = false;
                    if (!isFocusRequested) {
                        etPassword.requestFocus();
                    }
                }

                if (isValid) {
                    try {
                        LoginRequest loginRequest = new LoginRequest(nic, password);
                        Call<JsonObject> call = apiService.loginUser(loginRequest);

                        call.enqueue(new Callback<JsonObject>() {
                            @Override
                            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                                try {
                                    if (response.isSuccessful()) {
                                        JsonObject jsonObject = response.body();

                                        if (jsonObject != null) {
                                            try {
                                                // store user details locally
                                                JsonObject jsonUserDetails = jsonObject.get("userDetails").getAsJsonObject();

                                                String firstName = jsonUserDetails.get("firstName").getAsString();
                                                String lastName = jsonUserDetails.get("lastName").getAsString();
                                                String email = jsonUserDetails.get("email").getAsString();
                                                String nic = jsonUserDetails.get("nic").getAsString();
                                                String phone = jsonUserDetails.get("phone").getAsString();

                                                SharedPreferences.Editor editor = sharedPreferences.edit();
                                                editor.putString("user_firstName", firstName);
                                                editor.putString("user_lastName", lastName);
                                                editor.putString("user_email", email);
                                                editor.putString("user_nic", nic);
                                                editor.putString("user_phone", phone);
                                                editor.apply();

                                                Intent intent = new Intent(UserLogin.this, SearchTrain.class);
                                                startActivity(intent);
                                                finish();

                                            } catch (Exception e) {
                                                Toast.makeText(UserLogin.this, "Login failed", Toast.LENGTH_SHORT).show();
                                                System.out.println("Error in storing data locally: " + e);
                                            }
                                        } else {
                                            Toast.makeText(UserLogin.this, "Login failed", Toast.LENGTH_SHORT).show();
                                            System.out.println("jsonObject is null: " + response);
                                        }
                                    } else {
                                        Gson gson = new Gson();
                                        JsonObject jsonObject = gson.fromJson(response.errorBody().string(), JsonObject.class);
                                        String error = jsonObject.get("error").getAsString();

                                        Toast.makeText(UserLogin.this, error, Toast.LENGTH_SHORT).show();

                                        System.out.println("Error login: " + error);
                                    }
                                } catch (Exception e) {
                                    System.out.println("Error onResponse: " + e);
                                }

                            }

                            @Override
                            public void onFailure(Call<JsonObject> call, Throwable t) {
                                Toast.makeText(UserLogin.this, "Login error", Toast.LENGTH_SHORT).show();
                                System.out.println("Error login: " + t.getMessage());
                            }
                        });
                    } catch (Exception e) {
                        System.out.println("Error login: " + e);
                    }
                }
            }
        });

        // navigate to register page
        tvRegister = findViewById(R.id.tvRegister);
        tvRegister.setOnClickListener(v -> {
            startActivity(new Intent(UserLogin.this, UserRegister.class));
        });
    }
}
