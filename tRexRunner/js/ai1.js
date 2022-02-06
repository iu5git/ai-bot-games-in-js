function getAction(vars) {
    const speed = vars[3];
    const obs1_x = vars[5];
    const obs1_y = vars[6];
    const obs1_type = vars[7];
    const obs2_x = vars[8];
    const obs2_y = vars[9];
    const obs2_type = vars[10];
    if (obs1_x <= 176.5) {
        if (obs1_x <= 132.5) {
            if (obs1_y <= 82.5) {
                if (obs1_x <= 52.5) {
                    if (obs1_x <= 32.5) {
                        return 0
                    } else {  // if obs1_x > 32.5
                        if (obs1_y <= 62.5) {
                            if (speed <= 9.16) {
                                if (speed <= 8.73) {
                                    return 0
                                } else {  // if speed > 8.73
                                    return 2
                                }
                            } else {  // if speed > 9.16
                                if (speed <= 10.4) {
                                    return 0
                                } else {  // if speed > 10.4
                                    if (obs1_x <= 42.5) {
                                        return 0
                                    } else {  // if obs1_x > 42.5
                                        return 2
                                    }
                                }
                            }
                        } else {  // if obs1_y > 62.5
                            return 0
                        }
                    }
                } else {  // if obs1_x > 52.5
                    if (obs1_x <= 113.5) {
                        if (obs1_y <= 62.5) {
                            if (obs1_x <= 101.5) {
                                if (speed <= 9.44) {
                                    if (speed <= 8.72) {
                                        return 2
                                    } else {  // if speed > 8.72
                                        if (obs1_x <= 68.5) {
                                            if (speed <= 9.16) {
                                                return 2
                                            } else {  // if speed > 9.16
                                                return 0
                                            }
                                        } else {  // if obs1_x > 68.5
                                            return 0
                                        }
                                    }
                                } else {  // if speed > 9.44
                                    if (speed <= 11.16) {
                                        if (speed <= 10.19) {
                                            if (speed <= 9.99) {
                                                if (speed <= 9.78) {
                                                    if (obs1_x <= 60.5) {
                                                        return 0
                                                    } else {  // if obs1_x > 60.5
                                                        if (obs1_x <= 77.5) {
                                                            return 2
                                                        } else {  // if obs1_x > 77.5
                                                            return 2
                                                        }
                                                    }
                                                } else {  // if speed > 9.78
                                                    return 2
                                                }
                                            } else {  // if speed > 9.99
                                                return 0
                                            }
                                        } else {  // if speed > 10.19
                                            if (obs1_x <= 59.5) {
                                                return 2
                                            } else {  // if obs1_x > 59.5
                                                if (obs1_x <= 91.0) {
                                                    return 2
                                                } else {  // if obs1_x > 91.0
                                                    if (speed <= 11.03) {
                                                        return 2
                                                    } else {  // if speed > 11.03
                                                        return 0
                                                    }
                                                }
                                            }
                                        }
                                    } else {  // if speed > 11.16
                                        if (obs1_x <= 85.5) {
                                            if (obs1_x <= 83.5) {
                                                return 0
                                            } else {  // if obs1_x > 83.5
                                                return 2
                                            }
                                        } else {  // if obs1_x > 85.5
                                            return 0
                                        }
                                    }
                                }
                            } else {  // if obs1_x > 101.5
                                return 0
                            }
                        } else {  // if obs1_y > 62.5
                            if (obs1_x <= 69.5) {
                                if (speed <= 11.47) {
                                    if (speed <= 10.02) {
                                        return 0
                                    } else {  // if speed > 10.02
                                        if (obs1_x <= 62.5) {
                                            return 0
                                        } else {  // if obs1_x > 62.5
                                            return 2
                                        }
                                    }
                                } else {  // if speed > 11.47
                                    if (obs1_x <= 55.5) {
                                        return 0
                                    } else {  // if obs1_x > 55.5
                                        return 2
                                    }
                                }
                            } else {  // if obs1_x > 69.5
                                if (obs1_x <= 71.5) {
                                    if (speed <= 9.25) {
                                        return 0
                                    } else {  // if speed > 9.25
                                        return 2
                                    }
                                } else {  // if obs1_x > 71.5
                                    if (obs1_x <= 112.5) {
                                        return 2
                                    } else {  // if obs1_x > 112.5
                                        if (speed <= 10.45) {
                                            return 2
                                        } else {  // if speed > 10.45
                                            return 0
                                        }
                                    }
                                }
                            }
                        }
                    } else {  // if obs1_x > 113.5
                        if (obs1_x <= 114.5) {
                            if (obs1_y <= 62.5) {
                                return 0
                            } else {  // if obs1_y > 62.5
                                if (speed <= 10.22) {
                                    return 2
                                } else {  // if speed > 10.22
                                    return 0
                                }
                            }
                        } else {  // if obs1_x > 114.5
                            return 0
                        }
                    }
                }
            } else {  // if obs1_y > 82.5
                if (obs1_x <= 125.5) {
                    if (obs1_x <= 117.5) {
                        return 0
                    } else {  // if obs1_x > 117.5
                        if (speed <= 11.76) {
                            if (speed <= 10.39) {
                                return 0
                            } else {  // if speed > 10.39
                                if (obs1_x <= 122.5) {
                                    return 0
                                } else {  // if obs1_x > 122.5
                                    if (obs2_x <= 549.0) {
                                        return 0
                                    } else {  // if obs2_x > 549.0
                                        if (obs1_type <= 0.5) {
                                            return 0
                                        } else {  // if obs1_type > 0.5
                                            return 1
                                        }
                                    }
                                }
                            }
                        } else {  // if speed > 11.76
                            if (obs1_x <= 118.5) {
                                if (obs1_y <= 95.0) {
                                    return 1
                                } else {  // if obs1_y > 95.0
                                    return 0
                                }
                            } else {  // if obs1_x > 118.5
                                if (speed <= 12.71) {
                                    return 1
                                } else {  // if speed > 12.71
                                    return 0
                                }
                            }
                        }
                    }
                } else {  // if obs1_x > 125.5
                    if (speed <= 9.65) {
                        if (speed <= 9.43) {
                            return 0
                        } else {  // if speed > 9.43
                            if (obs1_x <= 128.5) {
                                return 0
                            } else {  // if obs1_x > 128.5
                                if (speed <= 9.49) {
                                    return 1
                                } else {  // if speed > 9.49
                                    return 0
                                }
                            }
                        }
                    } else {  // if speed > 9.65
                        if (obs1_x <= 128.5) {
                            if (speed <= 10.44) {
                                return 0
                            } else {  // if speed > 10.44
                                return 1
                            }
                        } else {  // if obs1_x > 128.5
                            if (obs1_type <= 1.5) {
                                return 1
                            } else {  // if obs1_type > 1.5
                                if (speed <= 10.15) {
                                    return 0
                                } else {  // if speed > 10.15
                                    return 1
                                }
                            }
                        }
                    }
                }
            }
        } else {  // if obs1_x > 132.5
            if (obs1_y <= 82.5) {
                return 0
            } else {  // if obs1_y > 82.5
                if (obs1_x <= 171.5) {
                    if (obs1_x <= 140.5) {
                        if (speed <= 7.78) {
                            if (obs1_x <= 137.5) {
                                if (speed <= 7.28) {
                                    return 0
                                } else {  // if speed > 7.28
                                    if (obs1_x <= 136.5) {
                                        return 0
                                    } else {  // if obs1_x > 136.5
                                        if (speed <= 7.58) {
                                            return 1
                                        } else {  // if speed > 7.58
                                            if (speed <= 7.65) {
                                                return 0
                                            } else {  // if speed > 7.65
                                                return 1
                                            }
                                        }
                                    }
                                }
                            } else {  // if obs1_x > 137.5
                                if (speed <= 6.87) {
                                    return 0
                                } else {  // if speed > 6.87
                                    if (obs1_x <= 138.5) {
                                        if (speed <= 7.12) {
                                            return 0
                                        } else {  // if speed > 7.12
                                            return 1
                                        }
                                    } else {  // if obs1_x > 138.5
                                        return 1
                                    }
                                }
                            }
                        } else {  // if speed > 7.78
                            if (speed <= 8.11) {
                                if (obs1_x <= 135.5) {
                                    if (obs1_x <= 134.5) {
                                        return 0
                                    } else {  // if obs1_x > 134.5
                                        if (obs1_y <= 97.5) {
                                            return 1
                                        } else {  // if obs1_y > 97.5
                                            if (speed <= 7.97) {
                                                if (speed <= 7.86) {
                                                    return 0
                                                } else {  // if speed > 7.86
                                                    return 1
                                                }
                                            } else {  // if speed > 7.97
                                                return 0
                                            }
                                        }
                                    }
                                } else {  // if obs1_x > 135.5
                                    if (obs1_x <= 136.5) {
                                        if (speed <= 7.85) {
                                            return 0
                                        } else {  // if speed > 7.85
                                            return 1
                                        }
                                    } else {  // if obs1_x > 136.5
                                        return 1
                                    }
                                }
                            } else {  // if speed > 8.11
                                if (obs2_x <= 382.0) {
                                    if (obs1_x <= 136.5) {
                                        return 0
                                    } else {  // if obs1_x > 136.5
                                        return 1
                                    }
                                } else {  // if obs2_x > 382.0
                                    return 1
                                }
                            }
                        }
                    } else {  // if obs1_x > 140.5
                        if (obs1_x <= 170.5) {
                            return 1
                        } else {  // if obs1_x > 170.5
                            if (speed <= 6.85) {
                                return 0
                            } else {  // if speed > 6.85
                                return 1
                            }
                        }
                    }
                } else {  // if obs1_x > 171.5
                    if (speed <= 8.86) {
                        if (obs1_x <= 172.5) {
                            if (speed <= 7.9) {
                                return 0
                            } else {  // if speed > 7.9
                                if (speed <= 8.23) {
                                    if (speed <= 8.11) {
                                        return 1
                                    } else {  // if speed > 8.11
                                        return 0
                                    }
                                } else {  // if speed > 8.23
                                    return 1
                                }
                            }
                        } else {  // if obs1_x > 172.5
                            return 0
                        }
                    } else {  // if speed > 8.86
                        if (obs1_x <= 174.5) {
                            if (obs1_x <= 173.5) {
                                return 1
                            } else {  // if obs1_x > 173.5
                                if (speed <= 10.78) {
                                    if (speed <= 9.07) {
                                        return 1
                                    } else {  // if speed > 9.07
                                        return 0
                                    }
                                } else {  // if speed > 10.78
                                    return 1
                                }
                            }
                        } else {  // if obs1_x > 174.5
                            if (speed <= 11.04) {
                                if (speed <= 8.95) {
                                    return 1
                                } else {  // if speed > 8.95
                                    return 0
                                }
                            } else {  // if speed > 11.04
                                if (obs1_y <= 102.5) {
                                    if (obs1_x <= 175.5) {
                                        return 1
                                    } else {  // if obs1_x > 175.5
                                        return 0
                                    }
                                } else {  // if obs1_y > 102.5
                                    return 1
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {  // if obs1_x > 176.5
        return 0
    }
}


function getAction(cactus, pterodactyl) {
    if (cactus) {
        return 'jump';
    } else if (pterodactyl) {
        return 'duck';
    }
    return 'nothing';
}