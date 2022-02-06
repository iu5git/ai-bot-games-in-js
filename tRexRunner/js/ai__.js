function getAction(vars) {
    const speed = vars[3];
    const obs1_x = vars[5];
    const obs1_y = vars[6];
    const obs2_x = vars[8];
    const obs2_y = vars[9];
    const c1 = vars[11];
    const c12 = vars[12];
    const c2 = vars[13];
    const p1 = vars[14];
    const p12 = vars[15];
    const p2 = vars[16];
    if (obs1_x <= 194.5) {
        if (c1 <= 90.5) {
            if (obs1_y <= 82.5) {
                if (obs1_y <= 62.5) {
                    return 0
                } else {  // if obs1_y > 62.5
                    if (obs1_x <= 4.5) {
                        return 0
                    } else {  // if obs1_x > 4.5
                        return 2
                    }
                }
            } else {  // if obs1_y > 82.5
                if (obs1_x <= -9.5) {
                    return 0
                } else {  // if obs1_x > -9.5
                    if (speed <= 9.01) {
                        if (c2 <= 216.5) {
                            if (obs1_x <= 11.5) {
                                if (obs2_x <= 378.0) {
                                    return 0
                                } else {  // if obs2_x > 378.0
                                    return 1
                                }
                            } else {  // if obs1_x > 11.5
                                return 1
                            }
                        } else {  // if c2 > 216.5
                            return 0
                        }
                    } else {  // if speed > 9.01
                        return 1
                    }
                }
            }
        } else {  // if c1 > 90.5
            if (obs1_x <= 139.5) {
                return 1
            } else {  // if obs1_x > 139.5
                if (speed <= 8.35) {
                    return 0
                } else {  // if speed > 8.35
                    return 1
                }
            }
        }
    } else {  // if obs1_x > 194.5
        if (obs1_x <= 254.5) {
            if (speed <= 11.24) {
                return 0
            } else {  // if speed > 11.24
                if (obs1_y <= 82.5) {
                    return 0
                } else {  // if obs1_y > 82.5
                    return 1
                }
            }
        } else {  // if obs1_x > 254.5
            return 0
        }
    }
}
