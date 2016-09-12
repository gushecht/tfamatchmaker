# TODO
# There's no F300H in bests.csv
# Removed '11:30' and '11:45' from F-Disc in walkons
# Remove '2:07' from F-Triple Jump in walkons
# Removed '    ' from M-3200 in walkons
# Removed '9:40' from M-Disc in walkons
# Replaced '-' in (F)3200 by '#N/A' in bests
# Replaced '"122' 10.5"""' in (F)DT by '#N/A' in bests
# Replaced 'Misericordia' in (F)PV by '#N/A' in bests
# Replaced '"4' 10"""' in (M)HJ by '#N/A' in bests
# Replaced '"8' 6"""' in (M)PV by '#N/A' in bests
# Replaced '"31' 2"""' in (M)TJ by '#N/A' in bests

# Reconcile events in front-end and back-end
# Conversions from event to event

# Verify correct email form submission
# Error handling for email form:
# http://docs.python-requests.org/en/master/user/quickstart/

import pandas as pd
import json
# import requests

time_events = ['F1', 'F2', 'F100', 'F100H', 'F200', 'F300H', 'F400', 'F800',
               'F1500', 'F1600', 'F3000', 'F3200', 'M1', 'M2', 'M100',
               'M110H', 'M200', 'M300H', 'M400', 'M800', 'M1500', 'M1600',
               'M3000', 'M3200']
length_events = ['FDT', 'FHJ', 'FJT', 'FLJ', 'FPV', 'FSP', 'FTJ', 'MDT', 'MHJ',
                 'MJT', 'MLJ', 'MPV', 'MSP', 'MTJ']


def load_and_clean_bests_and_walkons_data(bests_fname, walkons_fname):
    bests = pd.read_csv(bests_fname)
    bests = clean_bests_data(bests)
    walkons = pd.read_csv(walkons_fname)
    walkons = clean_walkons_data(walkons)
    return bests, walkons


def relabel_event(event_name):
    '''
    Standardizes event names.
    '''
    substitutes = {
        'F-1 Mile': 'F1',
        'F-2 Miles': 'F2',
        'F-100 Meter Hurdles': 'F100H',
        'F-100 Meters': 'F100',
        'F-200 Meters': 'F200',
        'F-300 Meter Hurdles': 'F300H',
        'F-400 Meters': 'F400',
        'F-800 Meters': 'F800',
        'F-1500 Meters': 'F1500',
        'F-1600 Meters': 'F1600',
        'F-3000 Meters': 'F3000',
        'F-3200 Meters': 'F3200',
        'F-Disc': 'FDT',
        # Note: Typo in F-HIgh Jump is to match input.
        'F-HIgh Jump': 'FHJ',
        'F-Jav': 'FJT',
        'F-Long Jump': 'FLJ',
        'F-Pole Vault': 'FPV',
        'F-Shot': 'FSP',
        'F-Triple Jump': 'FTJ',
        'M-1 Mile': 'M1',
        'M-2 Miles': 'M2',
        # Note: Typo in M-110 Meter Hurdels is to match input.
        'M-110 Meter Hurdels': 'M110H',
        'M-100 Meters': 'M100',
        'M-200 Meters': 'M200',
        'M-300 Meter Hurdles': 'M300H',
        'M-400 Meters': 'M400',
        'M-800 Meters': 'M800',
        'M-1500 Meters': 'M1500',
        'M-1600 Meters': 'M1600',
        'M-3000 Meters': 'M3000',
        'M-3200 Meters': 'M3200',
        'M-Disc': 'MDT',
        'M-High Jump': 'MHJ',
        'M-Jav': 'MJT',
        'M-Long Jump': 'MLJ',
        'M-Pole Vault': 'MPV',
        'M-Shot': 'MSP',
        'M-Triple Jump': 'MTJ'
    }

    if event_name in substitutes:
        return substitutes[event_name]
    else:
        return event_name


def convert_time(time, category):
    SECONDS_IN_A_MINUTE = 60
    ARBITRARILY_EASY_WALKON = 999
    ARBITRARILY_HARD_BEST = 1
    if type(time) != float and time != 'null':
        if category == 'walkon':
            if time == '999':
                return ARBITRARILY_EASY_WALKON
        time = time.replace(' ', '')
        new = time.split(':')
        if len(new) > 1:
            new[0] = int(new[0]) * SECONDS_IN_A_MINUTE
            return new[0] + float(new[1])
        else:
            return float(new[0])
    else:
        if category == 'walkon':
            return ARBITRARILY_EASY_WALKON
        else:
            return ARBITRARILY_HARD_BEST


def fill_time(time, category):
    ARBITRARILY_EASY_WALKON = 999
    ARBITRARILY_HARD_BEST = 1
    if pd.isnull(time):
        if category == 'walkon':
            return ARBITRARILY_EASY_WALKON
        else:
            return ARBITRARILY_HARD_BEST
    else:
        return time


def convert_length(length, category):
    INCHES_IN_A_FOOT = 12
    CENTIMETERS_IN_A_METER = 100
    INCHES_IN_A_METER = 39.3701
    ARBITRARILY_EASY_WALKON = 1
    ARBITRARILY_HARD_BEST = 999
    if type(length) != float and length != 'null':
        # Branch on walkon versus best because bests are in meters.
        if category == 'walkon':
            if length == '1':
                return ARBITRARILY_EASY_WALKON
            length = length.replace(' ', '')
            length = length.split('\'')
            feet = length[0]
            feet = feet.replace('"', '')
            feet = int(feet)
            if len(length) > 1:
                if len(length[1]) > 0:
                    inches = length[1]
                    inches = inches.replace('"', '')
                    inches = float(inches)
                    length = feet * INCHES_IN_A_FOOT + inches
                else:
                    length = feet * INCHES_IN_A_FOOT
            else:
                length = feet * INCHES_IN_A_FOOT
            return length
        else:
            length = length.replace(' ', '')
            length = length.split('.')
            meters = length[0]
            meters = int(meters)
            if len(length) > 1:
                if len(length[1]) > 0:
                    centimeters = length[1]
                    centimeters = centimeters.replace('m', '')
                    centimeters = float(centimeters)
                    length = (meters + centimeters / CENTIMETERS_IN_A_METER) \
                        * INCHES_IN_A_METER
                else:
                    length = meters * INCHES_IN_A_METER
            else:
                length = meters * INCHES_IN_A_METER
            return length
    else:
        if category == 'walkon':
            return ARBITRARILY_EASY_WALKON
        else:
            return ARBITRARILY_HARD_BEST


def fill_length(length, category):
    ARBITRARILY_EASY_WALKON = 1
    ARBITRARILY_HARD_BEST = 999
    if pd.isnull(length):
        if category == 'walkon':
            return ARBITRARILY_EASY_WALKON
        else:
            return ARBITRARILY_HARD_BEST
    else:
        return length


def clean_bests_data(bests):
    '''
    Takes raw dataframe.
    Standardizes event names.
    Adds F and M prefixes to events that don't indicate gender.
    Adds Women's URL and Men's URL values to first column.
    Sets index to first column.
    Transposes dataframe.
    Converts times and lengths.
    Adds F300H and M300H with -9999 for bests.
    Drops extra columns.
    Sanitizes school names.
    Returns clean dataframe.
    '''
    bests.iloc[:, 0] = bests.iloc[:, 0].apply(lambda x: relabel_event(x))

    bests.iloc[10:27, 0] = bests.iloc[10:27, 0].apply(lambda x: 'F' + x)
    bests.iloc[29:46, 0] = bests.iloc[29:46, 0].apply(lambda x: 'M' + x)

    bests.iloc[3, 0] = 'Women\'s URL'
    bests.iloc[1, 0] = 'Men\'s URL'

    bests.set_index(bests.columns[0], drop=True, inplace=True,
                    verify_integrity=True)

    bests = bests.transpose()

    for event in time_events:
        if not (event == 'F300H' or event == 'M300H'):
            bests[event] = bests[event].apply(
                lambda x: convert_time(x, 'best'))
    for event in length_events:
        if not (event == 'F300H' or event == 'M300H'):
            bests[event] = bests[event].apply(
                lambda x: convert_length(x, 'best'))

    bests['F300M'] = 1
    bests['M300H'] = 1

    drop_columns = ['Do they Have an CU account', 'Internally imported?',
                    'Marked Off In Salesforce',
                    'FR/JF/ACS Imported? -These are ACCTS.']
    for column in drop_columns:
        del bests[column]

    bests.index = bests.index.map(lambda x: ' '.join(word.capitalize()
                                  for word in [word.replace(' ', '')
                                  for word in x.split('-')]))

    return bests


def clean_walkons_data(walkons):
    '''
    Takes raw dataframe.
    Standardizes event names.
    Sets index to first column.
    Sets labels to school names.
    Transposes dataframe.
    Converts times and lengths.
    Creates is pro female and is pro male columns.
    Drops extra columns.
    Sanitizes school names.
    Returns clean dataframe.
    '''
    walkons.iloc[:, 0] = walkons.iloc[:, 0].apply(lambda x: relabel_event(x))

    walkons.set_index(walkons.columns[0], drop=True, inplace=True,
                      verify_integrity=True)

    walkons.columns = walkons.ix['School'].values

    walkons = walkons.transpose()

    for event in time_events:
        walkons[event] = walkons[event].apply(
            lambda x: convert_time(x, 'walkon'))
    for event in length_events:
        walkons[event] = walkons[event].apply(
            lambda x: convert_length(x, 'walkon'))

    walkons['Is Pro Female?'] = map(lambda x: 1 if x in ['F', 'B']
                                    else 0, walkons['Is Pro?'])

    walkons['Is Pro Male?'] = map(lambda x: 1 if x in ['M', 'B']
                                  else 0, walkons['Is Pro?'])

    drop_columns = ['School', 'Camps or Meets?', 'Do they Have an CU account',
                    'Internally imported?', 'Marked Off In Salesforce',
                    'Is Pro?']
    for column in drop_columns:
        del walkons[column]

    walkons.index = walkons.index.map(lambda x: ' '.join(word.capitalize()
                                      for word in [word.replace(' ', '')
                                      for word in x.split('-')]))

    return walkons


def find_matches(bests, walkons, sex, event, pr):
    '''
    Takes bests, walkons, and pr information.
    Retrieves matches from bests and walkons, removing arbitrarily easy walkons
    matches.
    Right joins bests_matches and walkons_matches.
    Reformats results.
    Returns results.
    '''
    event = sex + event
    eventType = 'time' if event in time_events else 'length'

    # JOIN TABLES
    results = bests.join(walkons, how='right', lsuffix='_best',
                         rsuffix='_walkon')

    event_best = event + '_best'
    event_walkon = event + '_walkon'

    # KEEP WHERE PR IS WORSE THAN BEST
    results = results[results[event_best] < pr] if eventType == 'time' \
        else results[results[event_best] > pr]

    # KEEP WHERE PR IS BETTER THAN WALKON
    results = results[results[event_walkon] > pr] if eventType == 'time' \
        else results[results[event_walkon] < pr]

    if len(results) == 0:
        return None

    results['Core ID# Women'] = map(lambda x, y: x if not type(x) == float
                                    else y, results['Core ID# Women_walkon'],
                                    results['Core ID# Women_best'])
    results['Core ID# Men'] = map(lambda x, y: x if not type(x) == float
                                  else y, results['Core ID# Men_walkon'],
                                  results['Core ID# Men_best'])

    pro_column = 'Is Pro Female?' if sex == 'F' else 'Is Pro Male?'

    columns_to_keep = ['Core ID# Women'] if sex == 'F' else ['Core ID# Men']
    columns_to_keep.append(event_best)
    columns_to_keep.append(event_walkon)
    columns_to_keep.append(pro_column)
    results = results[columns_to_keep]

    if eventType == 'time':
        results[event_best] = \
            results[event_best].apply(lambda x: fill_time(x, 'best'))
        results[event_walkon] = \
            results[event_walkon].apply(lambda x:
                                        fill_time(x, 'walkon'))
        results['both_times'] = map(lambda x, y: x != 1 and y != 999,
                                    results[event_best], results[event_walkon])
        results['neither_times'] = map(lambda x, y: x == 1 and y == 999,
                                       results[event_best],
                                       results[event_walkon])
        results.sort_values(by=[pro_column, 'both_times', event_walkon,
                                event_best],
                            ascending=[False, False, True, True], inplace=True)
        results = results[results['neither_times'] != 1]
    else:
        results[event_best] = \
            results[event_best].apply(lambda x: fill_length(x, 'best'))
        results[event_walkon] = \
            results[event_walkon].apply(lambda x:
                                        fill_length(x, 'walkon'))
        results['both_lengths'] = map(lambda x, y: x != 999 and y != 1,
                                      results[event_best],
                                      results[event_walkon])
        results['neither_lengths'] = map(lambda x, y: x == 999 and y == 1,
                                         results[event_best],
                                         results[event_walkon])
        results.sort_values(by=[pro_column, 'both_lengths', event_walkon,
                                event_best],
                            ascending=False, inplace=True)
        results = results[results['neither_lengths'] != 1]

    results.to_csv('temp.csv')

    num_results = 30 if len(results) >= 30 else len(results)

    results = results.head(num_results)

    return results


def results_to_json(results):
    '''
    Takes results dataframe.
    Returns results JSON.
    '''
    results_dict_list = []
    for school_name in results.index:
        try:
            school = results.ix[school_name]
            results_dict = {}
            results_dict['name'] = school_name
            results_dict['coreID'] = school[0] if type(
                school[0]) == str else 'null'
            results_dict['teamBest'] = round(school[1], 2)
            results_dict['walkOn'] = round(school[2], 2)
            # results_dict['isPro'] = 'true'
            results_dict_list.append(results_dict)
        except KeyError:
            pass
    results_json = json.dumps(results_dict_list)
    return results_json


# def send_email(sender, sender_name, recipients, subject, body):
#     MANDRILL_SEND_URL = 'https://mandrillapp.com/api/1.0/messages/send.json'
#     # convert recipients to list of dictionaries, key 'email', value is
#     # recipient address
#     payload = {
#         'key': 'u0SrDNc9pNDKM7pmROs6Xw',
#         'message': {
#             'from_email': sender,
#             'from_name': sender_name,
#             'to': recipients,
#             'subject': subject,
#             'text': body
#         }
#     }
#     r = requests.post(MANDRILL_SEND_URL, data=payload)
