import pandas as pd

def load_data():
    bests = pd.read_csv('best.csv')
    walk_ons = pd.read_csv('school_new.csv')

    m_bests_columns = [
        'school',
        'id_men',
        'url_men',
        'a',
        'b',
        'c',
        'd',
        'm_1_mile_b',
        'm_2_mile_b',
        'm_110_hurdles_b',
        'm_100_m_b',
        'm_200_m_b',
        'm_400_hurdles_b',
        'm_400_m_b',
        'm_800_m_b',
        'm_1500_m_b',
        'm_1600_m_b',
        'm_3000_m_b',
        'm_3200_m_b',
        'm_DT_b',
        'm_HJ_b',
        'm_JT_b',
        'm_LJ_b',
        'm_PV_b',
        'm_SP_b',
        'm_TJ_b'
    ]

    f_bests_columns = [
        'school',
        'id_women',
        'url_women',
        'a',
        'b',
        'c',
        'd',
        'f_1_mile_b',
        'f_2_mile_b',
        'f_100_hurdles_b',
        'f_100_m_b',
        'f_200_m_b',
        'f_400_hurdles_b',
        'f_400_m_b',
        'f_800_m_b',
        'f_1500_m_b',
        'f_1600_m_b',
        'f_3000_m_b',
        'f_3200_m_b',
        'f_DT_b',
        'f_HJ_b',
        'f_JT_b',
        'f_LJ_b',
        'f_PV_b',
        'f_SP_b',
        'f_TJ_b'
    ]

    m_bests = bests[m_bests_columns]
    f_bests = bests[f_bests_columns]

    m_walk_ons_columns = [
        'school',
        'id_men',
        'a',
        'b',
        'c',
        'd',
        'm_1_mile',
        'm_2_miles',
        'm_110_hurdles',
        'm_100_m',
        'm_200_m',
        'm_300_hurdles',
        'm_400_m',
        'm_800_m',
        'm_1500_m',
        'm_1600_m',
        'm_3000_m',
        'm_3200_m',
        'm_disc',
        'm_highjump',
        'm_jav',
        'm_longjump',
        'm_polevault',
        'm_shot',
        'm_triplejump'
    ]

    f_walk_ons_columns = [
        'school',
        'id_women',
        'a',
        'b',
        'c',
        'd',
        'f_1_mile',
        'f_2_miles',
        'f_100_hurdles',
        'f_100_m',
        'f_200_m',
        'f_300_hurdles',
        'f_400_m',
        'f_800_m',
        'f_1500_m',
        'f_1600_m',
        'f_3000_m',
        'f_3200_m',
        'f_disc',
        'f_highjump',
        'f_jav',
        'f_longjump',
        'f_polevault',
        'f_shot',
        'f_triplejump'
    ]

    m_walk_ons = walk_ons[m_walk_ons_columns]
    f_walk_ons = walk_ons[f_walk_ons_columns]

    return m_walk_ons, f_walk_ons