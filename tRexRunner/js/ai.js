function getAction(vars) {
    const speed = vars[3];
    const obs1_x = vars[5];
    const obs1_w = vars[8];
    const obs1_y = vars[6];
    const obs2_x = vars[9];
    const obs2_y = vars[10];
    const obs2_w = vars[12];
    const c1 = vars[13];
    const c12 = vars[14];
    const c2 = vars[15];
    const p1 = vars[16];
    const p12 = vars[17];
    const p2 = vars[18];
    if (obs1_x <= 208.5) {
        if (c1 <= 90.5) {
            if (obs1_y <= 82.5) {
                if (obs1_y <= 62.5) {
                    return 0
                } else {  // if obs1_y > 62.5
                    if (obs1_x <= 9.5) {
                        return 0
                    } else {  // if obs1_x > 9.5
                        if (speed <= 11.15) {
                            if (obs1_x <= 116.5) {
                                return 3
                            } else {  // if obs1_x > 116.5
                                return 0
                            }
                        } else {  // if speed > 11.15
                            return 3
                        }
                    }
                }
            } else {  // if obs1_y > 82.5
                if (obs1_x <= 3.5) {
                    if (obs1_x <= -9.5) {
                        return 0
                    } else {  // if obs1_x > -9.5
                        if (obs2_w <= 8.5) {
                            return 1
                        } else {  // if obs2_w > 8.5
                            return 0
                        }
                    }
                } else {  // if obs1_x > 3.5
                    if (speed <= 11.05) {
                        if (c2 <= 649.5) {
                            if (obs1_x <= 15.5) {
                                return 0
                            } else {  // if obs1_x > 15.5
                                return 1
                            }
                        } else {  // if c2 > 649.5
                            if (speed <= 10.15) {
                                return 0
                            } else {  // if speed > 10.15
                                return 0
                            }
                        }
                    } else {  // if speed > 11.05
                        return 1
                    }
                }
            }
        } else {  // if c1 > 90.5
            if (speed <= 10.65) {
                if (obs1_w <= 63.0) {
                    if (c2 <= 90.5) {
                        if (obs2_w <= 8.5) {
                            if (obs1_y <= 95.0) {
                                return 2
                            } else {  // if obs1_y > 95.0
                                return 1
                            }
                        } else {  // if obs2_w > 8.5
                            return 1
                        }
                    } else {  // if c2 > 90.5
                        if (speed <= 7.25) {
                            return 0
                        } else {  // if speed > 7.25
                            if (obs1_y <= 95.0) {
                                return 2
                            } else {  // if obs1_y > 95.0
                                return 1
                            }
                        }
                    }
                } else {  // if obs1_w > 63.0
                    if (obs1_x <= 136.5) {
                        if (speed <= 9.75) {
                            return 2
                        } else {  // if speed > 9.75
                            return 1
                        }
                    } else {  // if obs1_x > 136.5
                        return 0
                    }
                }
            } else {  // if speed > 10.65
                return 1
            }
        }
    } else {  // if obs1_x > 208.5
        if (c2 <= 397.5) {
            return 0
        } else {  // if c2 > 397.5
            if (speed <= 12.35) {
                return 0
            } else {  // if speed > 12.35
                if (obs1_w <= 48.0) {
                    return 1
                } else {  // if obs1_w > 48.0
                    return 0
                }
            }
        }
    }
}
