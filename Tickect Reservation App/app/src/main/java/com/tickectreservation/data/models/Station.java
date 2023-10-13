package com.tickectreservation.data.models;

public class Station {
    private String station;
    private double DistanceFromStart;

    public Station(String station, double DistanceFromStart) {
        this.station = station;
        this.DistanceFromStart = DistanceFromStart;
    }

    public String getStation() {
        return station;
    }

    public void setStation(String station) {
        this.station = station;
    }

    public double getDistanceFromStart() {
        return DistanceFromStart;
    }

    public void setDistanceFromStart(double DistanceFromStart) {
        this.DistanceFromStart = DistanceFromStart;
    }
}
