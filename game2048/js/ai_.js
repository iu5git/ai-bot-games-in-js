async function getAction(vars) {
    const p11 = vars[0];
    const p12 = vars[1];
    const p13 = vars[2];
    const p14 = vars[3];
    const p21 = vars[4];
    const p22 = vars[5];
    const p23 = vars[6];
    const p24 = vars[7];
    const p31 = vars[8];
    const p32 = vars[9];
    const p33 = vars[10];
    const p34 = vars[11];
    const p41 = vars[12];
    const p42 = vars[13];
    const p43 = vars[14];
    const p44 = vars[15];
    if (p32 <= 24.0) {
        if (p12 <= 6.0) {
            if (p31 <= 12.0) {
                if (p42 <= 1.0) {
                    if (p13 <= 6.0) {
                        if (p33 <= 12.0) {
                            if (p11 <= 3.0) {
                                if (p43 <= 24.0) {
                                    if (p34 <= 1.0) {
                                        return 37
                                    } else {  // if p34 > 1.0
                                        return 40
                                    }
                                } else {  // if p43 > 24.0
                                    return 38
                                }
                            } else {  // if p11 > 3.0
                                if (p41 <= 3.0) {
                                    if (p22 <= 1.0) {
                                        return 38
                                    } else {  // if p22 > 1.0
                                        return 39
                                    }
                                } else {  // if p41 > 3.0
                                    return 37
                                }
                            }
                        } else {  // if p33 > 12.0
                            if (p24 <= 3.0) {
                                return 37
                            } else {  // if p24 > 3.0
                                if (p31 <= 1.0) {
                                    return 39
                                } else {  // if p31 > 1.0
                                    if (p13 <= 1.0) {
                                        return 40
                                    } else {  // if p13 > 1.0
                                        return 39
                                    }
                                }
                            }
                        }
                    } else {  // if p13 > 6.0
                        if (p41 <= 1.0) {
                            if (p32 <= 1.0) {
                                if (p24 <= 2.0) {
                                    return 39
                                } else {  // if p24 > 2.0
                                    if (p44 <= 1.0) {
                                        return 37
                                    } else {  // if p44 > 1.0
                                        return 40
                                    }
                                }
                            } else {  // if p32 > 1.0
                                if (p11 <= 1.0) {
                                    if (p24 <= 12.0) {
                                        return 40
                                    } else {  // if p24 > 12.0
                                        return 38
                                    }
                                } else {  // if p11 > 1.0
                                    if (p32 <= 3.0) {
                                        return 38
                                    } else {  // if p32 > 3.0
                                        return 39
                                    }
                                }
                            }
                        } else {  // if p41 > 1.0
                            if (p21 <= 192.0) {
                                if (p13 <= 80.0) {
                                    return 37
                                } else {  // if p13 > 80.0
                                    if (p33 <= 3.0) {
                                        return 37
                                    } else {  // if p33 > 3.0
                                        return 40
                                    }
                                }
                            } else {  // if p21 > 192.0
                                return 39
                            }
                        }
                    }
                } else {  // if p42 > 1.0
                    if (p31 <= 1.0) {
                        if (p14 <= 1.0) {
                            if (p43 <= 1.0) {
                                return 40
                            } else {  // if p43 > 1.0
                                if (p44 <= 12.0) {
                                    return 37
                                } else {  // if p44 > 12.0
                                    if (p32 <= 2.0) {
                                        return 38
                                    } else {  // if p32 > 2.0
                                        return 37
                                    }
                                }
                            }
                        } else {  // if p14 > 1.0
                            if (p42 <= 6.0) {
                                if (p21 <= 1.0) {
                                    if (p34 <= 24.0) {
                                        return 37
                                    } else {  // if p34 > 24.0
                                        return 38
                                    }
                                } else {  // if p21 > 1.0
                                    return 37
                                }
                            } else {  // if p42 > 6.0
                                if (p12 <= 1.0) {
                                    return 38
                                } else {  // if p12 > 1.0
                                    if (p12 <= 3.0) {
                                        return 38
                                    } else {  // if p12 > 3.0
                                        return 37
                                    }
                                }
                            }
                        }
                    } else {  // if p31 > 1.0
                        if (p33 <= 96.0) {
                            if (p13 <= 1.0) {
                                if (p43 <= 20.0) {
                                    if (p44 <= 3.0) {
                                        return 38
                                    } else {  // if p44 > 3.0
                                        return 37
                                    }
                                } else {  // if p43 > 20.0
                                    if (p22 <= 10.0) {
                                        return 40
                                    } else {  // if p22 > 10.0
                                        return 38
                                    }
                                }
                            } else {  // if p13 > 1.0
                                if (p22 <= 6.0) {
                                    if (p11 <= 3.0) {
                                        return 40
                                    } else {  // if p11 > 3.0
                                        return 39
                                    }
                                } else {  // if p22 > 6.0
                                    if (p44 <= 3.0) {
                                        return 37
                                    } else {  // if p44 > 3.0
                                        return 39
                                    }
                                }
                            }
                        } else {  // if p33 > 96.0
                            if (p44 <= 12.0) {
                                if (p32 <= 12.0) {
                                    return 39
                                } else {  // if p32 > 12.0
                                    if (p34 <= 3.0) {
                                        return 38
                                    } else {  // if p34 > 3.0
                                        return 39
                                    }
                                }
                            } else {  // if p44 > 12.0
                                return 40
                            }
                        }
                    }
                }
            } else {  // if p31 > 12.0
                if (p32 <= 3.0) {
                    if (p12 <= 3.0) {
                        return 39
                    } else {  // if p12 > 3.0
                        return 37
                    }
                } else {  // if p32 > 3.0
                    if (p22 <= 12.0) {
                        if (p43 <= 12.0) {
                            if (p23 <= 1.0) {
                                if (p32 <= 6.0) {
                                    return 38
                                } else {  // if p32 > 6.0
                                    if (p32 <= 12.0) {
                                        return 40
                                    } else {  // if p32 > 12.0
                                        return 37
                                    }
                                }
                            } else {  // if p23 > 1.0
                                if (p31 <= 24.0) {
                                    if (p42 <= 5.0) {
                                        return 39
                                    } else {  // if p42 > 5.0
                                        return 38
                                    }
                                } else {  // if p31 > 24.0
                                    return 38
                                }
                            }
                        } else {  // if p43 > 12.0
                            if (p33 <= 1.0) {
                                return 39
                            } else {  // if p33 > 1.0
                                if (p31 <= 40.0) {
                                    return 37
                                } else {  // if p31 > 40.0
                                    if (p12 <= 1.0) {
                                        return 40
                                    } else {  // if p12 > 1.0
                                        return 37
                                    }
                                }
                            }
                        }
                    } else {  // if p22 > 12.0
                        if (p24 <= 12.0) {
                            if (p13 <= 1.0) {
                                if (p44 <= 2.0) {
                                    return 38
                                } else {  // if p44 > 2.0
                                    return 39
                                }
                            } else {  // if p13 > 1.0
                                return 39
                            }
                        } else {  // if p24 > 12.0
                            return 40
                        }
                    }
                }
            }
        } else {  // if p12 > 6.0
            if (p12 <= 24.0) {
                if (p34 <= 6.0) {
                    if (p11 <= 6.0) {
                        if (p14 <= 12.0) {
                            if (p22 <= 24.0) {
                                if (p33 <= 96.0) {
                                    if (p43 <= 1.0) {
                                        return 40
                                    } else {  // if p43 > 1.0
                                        return 40
                                    }
                                } else {  // if p33 > 96.0
                                    if (p21 <= 3.0) {
                                        return 39
                                    } else {  // if p21 > 3.0
                                        return 37
                                    }
                                }
                            } else {  // if p22 > 24.0
                                if (p32 <= 6.0) {
                                    if (p23 <= 3.0) {
                                        return 37
                                    } else {  // if p23 > 3.0
                                        return 40
                                    }
                                } else {  // if p32 > 6.0
                                    if (p42 <= 1.0) {
                                        return 39
                                    } else {  // if p42 > 1.0
                                        return 39
                                    }
                                }
                            }
                        } else {  // if p14 > 12.0
                            return 39
                        }
                    } else {  // if p11 > 6.0
                        return 37
                    }
                } else {  // if p34 > 6.0
                    if (p14 <= 12.0) {
                        if (p44 <= 6.0) {
                            if (p34 <= 48.0) {
                                if (p21 <= 1.0) {
                                    if (p41 <= 1.0) {
                                        return 40
                                    } else {  // if p41 > 1.0
                                        return 38
                                    }
                                } else {  // if p21 > 1.0
                                    if (p42 <= 6.0) {
                                        return 37
                                    } else {  // if p42 > 6.0
                                        return 40
                                    }
                                }
                            } else {  // if p34 > 48.0
                                return 38
                            }
                        } else {  // if p44 > 6.0
                            return 39
                        }
                    } else {  // if p14 > 12.0
                        if (p21 <= 9.0) {
                            return 40
                        } else {  // if p21 > 9.0
                            if (p21 <= 24.0) {
                                return 39
                            } else {  // if p21 > 24.0
                                return 40
                            }
                        }
                    }
                }
            } else {  // if p12 > 24.0
                if (p23 <= 3.0) {
                    if (p14 <= 6.0) {
                        if (p13 <= 6.0) {
                            if (p11 <= 3.0) {
                                if (p44 <= 1.0) {
                                    if (p43 <= 1.0) {
                                        return 39
                                    } else {  // if p43 > 1.0
                                        return 40
                                    }
                                } else {  // if p44 > 1.0
                                    if (p22 <= 5.0) {
                                        return 38
                                    } else {  // if p22 > 5.0
                                        return 37
                                    }
                                }
                            } else {  // if p11 > 3.0
                                return 40
                            }
                        } else {  // if p13 > 6.0
                            if (p13 <= 12.0) {
                                if (p31 <= 1.0) {
                                    return 39
                                } else {  // if p31 > 1.0
                                    if (p44 <= 1.0) {
                                        return 38
                                    } else {  // if p44 > 1.0
                                        return 38
                                    }
                                }
                            } else {  // if p13 > 12.0
                                if (p14 <= 1.0) {
                                    return 40
                                } else {  // if p14 > 1.0
                                    if (p22 <= 6.0) {
                                        return 39
                                    } else {  // if p22 > 6.0
                                        return 38
                                    }
                                }
                            }
                        }
                    } else {  // if p14 > 6.0
                        if (p22 <= 12.0) {
                            return 37
                        } else {  // if p22 > 12.0
                            return 39
                        }
                    }
                } else {  // if p23 > 3.0
                    if (p22 <= 12.0) {
                        if (p23 <= 6.0) {
                            return 40
                        } else {  // if p23 > 6.0
                            if (p11 <= 1.0) {
                                return 38
                            } else {  // if p11 > 1.0
                                if (p31 <= 33.0) {
                                    if (p34 <= 3.0) {
                                        return 37
                                    } else {  // if p34 > 3.0
                                        return 37
                                    }
                                } else {  // if p31 > 33.0
                                    return 40
                                }
                            }
                        }
                    } else {  // if p22 > 12.0
                        if (p34 <= 3.0) {
                            if (p32 <= 6.0) {
                                if (p14 <= 3.0) {
                                    if (p24 <= 3.0) {
                                        return 38
                                    } else {  // if p24 > 3.0
                                        return 39
                                    }
                                } else {  // if p14 > 3.0
                                    if (p33 <= 2.0) {
                                        return 38
                                    } else {  // if p33 > 2.0
                                        return 38
                                    }
                                }
                            } else {  // if p32 > 6.0
                                if (p32 <= 12.0) {
                                    return 40
                                } else {  // if p32 > 12.0
                                    if (p33 <= 3.0) {
                                        return 37
                                    } else {  // if p33 > 3.0
                                        return 40
                                    }
                                }
                            }
                        } else {  // if p34 > 3.0
                            return 40
                        }
                    }
                }
            }
        }
    } else {  // if p32 > 24.0
        if (p23 <= 3.0) {
            if (p43 <= 40.0) {
                if (p31 <= 3.0) {
                    if (p23 <= 1.0) {
                        if (p41 <= 6.0) {
                            if (p33 <= 72.0) {
                                if (p12 <= 5.0) {
                                    if (p34 <= 1.0) {
                                        return 37
                                    } else {  // if p34 > 1.0
                                        return 37
                                    }
                                } else {  // if p12 > 5.0
                                    if (p34 <= 1.0) {
                                        return 40
                                    } else {  // if p34 > 1.0
                                        return 39
                                    }
                                }
                            } else {  // if p33 > 72.0
                                return 40
                            }
                        } else {  // if p41 > 6.0
                            if (p44 <= 1.0) {
                                return 38
                            } else {  // if p44 > 1.0
                                return 39
                            }
                        }
                    } else {  // if p23 > 1.0
                        if (p21 <= 5.0) {
                            return 38
                        } else {  // if p21 > 5.0
                            if (p42 <= 3.0) {
                                return 40
                            } else {  // if p42 > 3.0
                                return 38
                            }
                        }
                    }
                } else {  // if p31 > 3.0
                    if (p42 <= 3.0) {
                        return 39
                    } else {  // if p42 > 3.0
                        if (p42 <= 6.0) {
                            if (p41 <= 6.0) {
                                if (p11 <= 6.0) {
                                    return 37
                                } else {  // if p11 > 6.0
                                    if (p23 <= 1.0) {
                                        return 39
                                    } else {  // if p23 > 1.0
                                        return 37
                                    }
                                }
                            } else {  // if p41 > 6.0
                                return 38
                            }
                        } else {  // if p42 > 6.0
                            if (p14 <= 1.0) {
                                if (p11 <= 3.0) {
                                    return 38
                                } else {  // if p11 > 3.0
                                    if (p44 <= 3.0) {
                                        return 40
                                    } else {  // if p44 > 3.0
                                        return 39
                                    }
                                }
                            } else {  // if p14 > 1.0
                                return 39
                            }
                        }
                    }
                }
            } else {  // if p43 > 40.0
                if (p44 <= 12.0) {
                    if (p42 <= 24.0) {
                        if (p42 <= 3.0) {
                            return 39
                        } else {  // if p42 > 3.0
                            if (p12 <= 1.0) {
                                return 38
                            } else {  // if p12 > 1.0
                                if (p44 <= 3.0) {
                                    return 38
                                } else {  // if p44 > 3.0
                                    return 39
                                }
                            }
                        }
                    } else {  // if p42 > 24.0
                        return 39
                    }
                } else {  // if p44 > 12.0
                    if (p22 <= 3.0) {
                        return 40
                    } else {  // if p22 > 3.0
                        return 38
                    }
                }
            }
        } else {  // if p23 > 3.0
            if (p12 <= 3.0) {
                if (p13 <= 6.0) {
                    if (p41 <= 1.0) {
                        if (p22 <= 80.0) {
                            return 38
                        } else {  // if p22 > 80.0
                            return 40
                        }
                    } else {  // if p41 > 1.0
                        if (p11 <= 3.0) {
                            if (p14 <= 3.0) {
                                if (p41 <= 6.0) {
                                    if (p23 <= 6.0) {
                                        return 37
                                    } else {  // if p23 > 6.0
                                        return 37
                                    }
                                } else {  // if p41 > 6.0
                                    if (p22 <= 40.0) {
                                        return 38
                                    } else {  // if p22 > 40.0
                                        return 37
                                    }
                                }
                            } else {  // if p14 > 3.0
                                if (p33 <= 136.0) {
                                    if (p21 <= 3.0) {
                                        return 38
                                    } else {  // if p21 > 3.0
                                        return 37
                                    }
                                } else {  // if p33 > 136.0
                                    return 39
                                }
                            }
                        } else {  // if p11 > 3.0
                            if (p23 <= 48.0) {
                                if (p42 <= 12.0) {
                                    return 38
                                } else {  // if p42 > 12.0
                                    if (p21 <= 3.0) {
                                        return 37
                                    } else {  // if p21 > 3.0
                                        return 39
                                    }
                                }
                            } else {  // if p23 > 48.0
                                return 40
                            }
                        }
                    }
                } else {  // if p13 > 6.0
                    if (p11 <= 1.0) {
                        if (p32 <= 48.0) {
                            return 38
                        } else {  // if p32 > 48.0
                            return 37
                        }
                    } else {  // if p11 > 1.0
                        if (p44 <= 6.0) {
                            if (p41 <= 1.0) {
                                return 38
                            } else {  // if p41 > 1.0
                                if (p14 <= 18.0) {
                                    if (p11 <= 10.0) {
                                        return 40
                                    } else {  // if p11 > 10.0
                                        return 39
                                    }
                                } else {  // if p14 > 18.0
                                    return 37
                                }
                            }
                        } else {  // if p44 > 6.0
                            return 37
                        }
                    }
                }
            } else {  // if p12 > 3.0
                if (p24 <= 6.0) {
                    if (p31 <= 12.0) {
                        if (p14 <= 12.0) {
                            if (p44 <= 1.0) {
                                if (p21 <= 6.0) {
                                    return 38
                                } else {  // if p21 > 6.0
                                    if (p14 <= 6.0) {
                                        return 38
                                    } else {  // if p14 > 6.0
                                        return 39
                                    }
                                }
                            } else {  // if p44 > 1.0
                                return 38
                            }
                        } else {  // if p14 > 12.0
                            return 37
                        }
                    } else {  // if p31 > 12.0
                        if (p11 <= 10.0) {
                            return 40
                        } else {  // if p11 > 10.0
                            return 39
                        }
                    }
                } else {  // if p24 > 6.0
                    if (p41 <= 3.0) {
                        if (p34 <= 1.0) {
                            return 37
                        } else {  // if p34 > 1.0
                            if (p42 <= 5.0) {
                                if (p44 <= 6.0) {
                                    return 39
                                } else {  // if p44 > 6.0
                                    return 37
                                }
                            } else {  // if p42 > 5.0
                                if (p11 <= 12.0) {
                                    return 38
                                } else {  // if p11 > 12.0
                                    return 37
                                }
                            }
                        }
                    } else {  // if p41 > 3.0
                        if (p31 <= 5.0) {
                            return 38
                        } else {  // if p31 > 5.0
                            if (p42 <= 3.0) {
                                if (p42 <= 1.0) {
                                    if (p44 <= 1.0) {
                                        return 38
                                    } else {  // if p44 > 1.0
                                        return 37
                                    }
                                } else {  // if p42 > 1.0
                                    return 38
                                }
                            } else {  // if p42 > 3.0
                                return 37
                            }
                        }
                    }
                }
            }
        }
    }
}
