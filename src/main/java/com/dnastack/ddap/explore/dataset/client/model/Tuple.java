package com.dnastack.ddap.explore.dataset.client.model;

public class Tuple<X, Y> {

    final X x;
    final Y y;

    public Tuple(X x, Y y) {
        this.x = x;
        this.y = y;
    }

    public X getX() {
        return x;
    }

    public Y getY() {
        return y;
    }
}