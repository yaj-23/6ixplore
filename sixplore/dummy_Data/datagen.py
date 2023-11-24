import json
from random import randint

dotw = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
start_times = ['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM']
end_times = ['10:00 PM', '11:00 PM', '12:00 AM', '1:00 AM']
with open('./explorationData.json', 'r') as exp:
    data_exp = json.load(exp)
    for exp_item in data_exp:
        exp_item['hours'] = {}
        for day in dotw:
            exp_item['hours'][day] = {
                'start': start_times[randint(0, 3)],
                'end': end_times[randint(0, 3)]
            }
    print(data_exp)
with open('./explorationData.json', 'w') as exp:
    json.dump(data_exp, exp, indent=4)