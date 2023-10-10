package com.tickectreservation.activities.booking;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.google.gson.Gson;
import com.tickectreservation.R;
import com.tickectreservation.data.models.Train;

import java.util.ArrayList;

public class SelectTrainAdapter extends RecyclerView.Adapter<SelectTrainAdapter.TrainViewHolder> {

    Context context;
    ArrayList<Train> list;

    String fromLocation, toLocation, date, noOfPassengers;

    public SelectTrainAdapter(Context context, ArrayList<Train> list, String fromLocation, String toLocation, String date, String noOfPassengers) {
        this.context = context;
        this.list = list;
        this.fromLocation = fromLocation;
        this.toLocation = toLocation;
        this.date = date;
        this.noOfPassengers = noOfPassengers;
    }

    @NonNull
    @Override
    public TrainViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.select_train_item, parent, false);
        return new TrainViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull TrainViewHolder holder, int position) {
//        holder.progressBar.setVisibility(View.VISIBLE);
        Train train = list.get(position);

        // format arrival and departure times
        String arrivalTime = train.getSchedule().getArrivalTime().substring(11, 16);
        String departureTime = train.getSchedule().getDepartureTime().substring(11, 16);

        // trainTimes, trainIdName, trainStartEnd, ticketPrice, noOfSeats
        String trainTimes = String.format("%s - %s", arrivalTime, departureTime);
        String trainIdName = String.format("%s - %s", train.getTrainId(), train.getTrainName());
        // String ticketPrice = String.format("LKR %s", train.getPrice());
        // String noOfSeats = String.format("%s seats available", train.getNoOfSeats());

        // get first and last stations of the stations list
        String trainStartEnd = String.format("%s - %s",
                train.getSchedule().getStations().get(0),
                train.getSchedule().getStations().get(train.getSchedule().getStations().size() - 1));


        holder.trainTimes.setText(trainTimes);
        holder.trainIdName.setText(trainIdName);
        holder.trainStartEnd.setText(trainStartEnd); // get first station of the stations list
        // holder.ticketPrice.setText(ticketPrice);
        // holder.noOfSeats.setText(noOfSeats);

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Gson gson = new Gson();
                String serializedTrain = gson.toJson(train);

                Intent intent = new Intent(context, SelectSeat.class);
                intent.putExtra("train", serializedTrain);
                intent.putExtra("fromLocation", fromLocation);
                intent.putExtra("toLocation", toLocation);
                intent.putExtra("date", date);
                intent.putExtra("noOfPassengers", noOfPassengers);
                context.startActivity(intent);
            }
        });
    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    public static class TrainViewHolder extends RecyclerView.ViewHolder {

        TextView trainTimes, trainIdName, trainStartEnd, ticketPrice, noOfSeats;
        ProgressBar progressBar;

        public TrainViewHolder(@NonNull View trainView) {
            super(trainView);

            trainTimes = trainView.findViewById(R.id.tvTrainTimes);
            trainIdName = trainView.findViewById(R.id.tvTrainIdName);
            trainStartEnd = trainView.findViewById(R.id.tvTrainStartEndStations);
            ticketPrice = trainView.findViewById(R.id.tvTrainTicketPrice);
            noOfSeats = trainView.findViewById(R.id.tvSeatsAvailable);

//            progressBar = trainView.findViewById(R.id.progressBar2);
        }
    }
}
