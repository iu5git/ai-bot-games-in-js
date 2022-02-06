function getAction(vars) {
    const speed = vars[3];
    const obs1_x = vars[5];
    const obs1_y = vars[6];
    const obs2_x = vars[9];
    const obs2_y = vars[10];
    const c1 = vars[13];
    const c12 = vars[14];
    const c2 = vars[15];
    const p1 = vars[16];
    const p12 = vars[17];
    const p2 = vars[18];
    if (c1 <= 90.5) {
        if (obs1_x <= 206.5) {
            if (obs1_y <= 82.5) {
                if (obs1_y <= 62.5) {
                    return 0
                } else {  // if obs1_y > 62.5
                    if (obs1_x <= -6.5) {
                        return 0
                    } else {  // if obs1_x > -6.5
                        if (obs1_x <= 137.5) {
                            return 2
                        } else {  // if obs1_x > 137.5
                            return 0
                        }
                    }
                }
            } else {  // if obs1_y > 82.5
                if (speed <= 9.72) {
                    if (c2 <= 850.0) {
                        if (obs1_x <= 9.5) {
                            return 0
                        } else {  // if obs1_x > 9.5
                            return 1
                        }
                    } else {  // if c2 > 850.0
                        return 0
                    }
                } else {  // if speed > 9.72
                    if (obs1_x <= -8.5) {
                        return 0
                    } else {  // if obs1_x > -8.5
                        return 1
                    }
                }
            }
        } else {  // if obs1_x > 206.5
            return 0
        }
    } else {  // if c1 > 90.5
        if (obs1_x <= 138.5) {
            return 1
        } else {  // if obs1_x > 138.5
            return 1
        }
    }
}
