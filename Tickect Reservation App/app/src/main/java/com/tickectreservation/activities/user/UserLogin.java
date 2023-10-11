package com.tickectreservation.activities.user;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.gson.JsonObject;
import com.tickectreservation.R;
import com.tickectreservation.activities.booking.SearchTrain;
import com.tickectreservation.data.api.ApiService;
import com.tickectreservation.data.api.RetrofitClient;
import com.tickectreservation.data.models.LoginRequest;

import java.util.regex.Pattern;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UserLogin extends AppCompatActivity {
    EditText etNic, etPassword;
    TextView tvRegister;
    Button btnLogin;

    static final Pattern VALID_NIC_REGEX =
            Pattern.compile("^([0-9]{9}[vVxX]|[0-9]{12})$", Pattern.CASE_INSENSITIVE);

    ApiService apiService = RetrofitClient.getClient().create(ApiService.class);

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.user_login);

        etNic = findViewById(R.id.etNic);
        etPassword = findViewById(R.id.etPassword);
        btnLogin = findViewById(R.id.btnLogin);

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
//                                        Intent intent = new Intent(UserLogin.this, SearchTrain.class);
//                                        intent.putExtra("userId", jsonObject.get("userId").getAsInt());
//                                        startActivity(intent);
//                                        finish();
                                            System.out.println("Login success");
                                            System.out.println("Message " + jsonObject.get("message").getAsString());
                                            System.out.println("User id: " + jsonObject.get("userDetails").getAsJsonObject().get("nic").getAsString());

                                        } else {
                                            Toast.makeText(UserLogin.this, "Login failed", Toast.LENGTH_SHORT).show();
                                        }
                                    } else {
                                        Toast.makeText(UserLogin.this, "Login failed", Toast.LENGTH_SHORT).show();
                                    }
                                } catch (Exception e) {
                                    System.out.println("Error: " + e);
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
