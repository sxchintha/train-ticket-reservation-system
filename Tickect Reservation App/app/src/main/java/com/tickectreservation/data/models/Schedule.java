package com.tickectreservation.data.models;

import java.util.List;

public class Schedule {
    private String departureTime;
    private String arrivalTime;
    private List<String> stations;

    public Schedule(String departureTime, String arrivalTime, List<String> stations) {
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.stations = stations;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public List<String> getStations() {
        return stations;
    }

    public void setStations(List<String> stations) {
        this.stations = stations;
    }
}
