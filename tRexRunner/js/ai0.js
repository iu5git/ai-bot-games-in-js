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
    if (c1 <= 90.5) {
        if (c12 <= 90.5) {
            if (obs1_x <= 233.5) {
                if (obs1_x <= 3.5) {
                    return 0
                } else {  // if obs1_x > 3.5
                    if (speed <= 10.55) {
                        if (p1 <= 90.5) {
                            if (obs1_x <= 198.5) {
                                if (speed <= 8.05) {
                                    return 0
                                } else {  // if speed > 8.05
                                    return 0
                                }
                            } else {  // if obs1_x > 198.5
                                return 0
                            }
                        } else {  // if p1 > 90.5
                            if (obs1_y <= 62.5) {
                                return 0
                            } else {  // if obs1_y > 62.5
                                return 2
                            }
                        }
                    } else {  // if speed > 10.55
                        if (obs1_y <= 82.5) {
                            if (obs1_y <= 62.5) {
                                return 0
                            } else {  // if obs1_y > 62.5
                                if (obs1_x <= 195.5) {
                                    return 2
                                } else {  // if obs1_x > 195.5
                                    return 0
                                }
                            }
                        } else {  // if obs1_y > 82.5
                            if (speed <= 11.55) {
                                if (obs1_x <= 197.5) {
                                    return 1
                                } else {  // if obs1_x > 197.5
                                    return 0
                                }
                            } else {  // if speed > 11.55
                                return 1
                            }
                        }
                    }
                }
            } else {  // if obs1_x > 233.5
                return 0
            }
        } else {  // if c12 > 90.5
            if (speed <= 9.75) {
                if (c2 <= 850.0) {
                    return 1
                } else {  // if c2 > 850.0
                    return 0
                }
            } else {  // if speed > 9.75
                return 1
            }
        }
    } else {  // if c1 > 90.5
        if (obs1_x <= 35.5) {
            if (speed <= 8.05) {
                return 0
            } else {  // if speed > 8.05
                return 1
            }
        } else {  // if obs1_x > 35.5
            return 1
        }
    }
}
