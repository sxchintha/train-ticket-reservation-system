package com.tickectreservation.activities.reservation;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.google.gson.Gson;
import com.tickectreservation.R;
import com.tickectreservation.data.models.Reservation;

import java.util.ArrayList;

public class ReservationAdapter extends RecyclerView.Adapter<ReservationAdapter.ReservationViewHolder> {
    Context context;
    ArrayList<Reservation> list;
    String fromLocation, toLocation, date, noOfPassengers;

    public ReservationAdapter(Context context, ArrayList<Reservation> list) {
        this.context = context;
        this.list = list;
    }

    @NonNull
    @Override
    public ReservationViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.my_reservation_item, parent, false);
        return new ReservationViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull ReservationViewHolder holder, int position) {
        Reservation reservation = list.get(position);

        String trainIdName = String.format("%s - %s", reservation.getTrainID(), reservation.getTrainName());
        String bookingFromTo = String.format("%s - %s", reservation.getFromStation(), reservation.getToStation());
        String bookingDate = reservation.getSheduledate();
        String bookingPrice = String.format("LKR %s", reservation.getPrice());

        holder.trainIdName.setText(trainIdName);
        holder.bookingFromTo.setText(bookingFromTo);
        holder.bookingDate.setText(bookingDate);
        holder.bookingPrice.setText(bookingPrice);

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Gson gson = new Gson();
                String reservationJson = gson.toJson(reservation);

                Intent intent = new Intent(context, ViewSelectedReservation.class);
                intent.putExtra("reservation", reservationJson);
                context.startActivity(intent);
            }
        });
    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    public static class ReservationViewHolder extends RecyclerView.ViewHolder {

        TextView bookingPrice, trainIdName, bookingFromTo, bookingDate;
        public ReservationViewHolder(@NonNull View itemView) {
            super(itemView);

            bookingPrice = itemView.findViewById(R.id.tvBookingPrice);
            trainIdName = itemView.findViewById(R.id.tvTrainIdName);
            bookingFromTo = itemView.findViewById(R.id.tvBookingFromTo);
            bookingDate = itemView.findViewById(R.id.tvBookingDate);
        }
    }
}
