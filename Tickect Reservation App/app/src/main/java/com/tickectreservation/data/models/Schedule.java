package com.tickectreservation.data.models;

import java.util.List;

public class Schedule {
    private String departureTime;
    private String arrivalTime;
    private List<Station> stationDistances;

    public Schedule(String departureTime, String arrivalTime, List<Station> stationDistances) {
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.stationDistances = stationDistances;
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

    public List<Station> getStationDistances() {
        return stationDistances;
    }

    public void setStationDistances(List<Station> stationDistances) {
        this.stationDistances = stationDistances;
    }
}
