import signals

mapper = signals.signal_mapper

arr = []
for key, params in mapper.items():
    # print(params)
    tags_ = params['tags']
    info_ = params['info']


    # tags_['breading']
    field_name = params['field_name']


    result = f'exhauster__{tags_["exhauster"]}___'
    tags_.pop('exhauster')

    if tags_.get('breading'):.
        breading = tags_.pop('breading')
        result += f'breading__{breading}___'

    result +=
    for key, value in tags_.items():
        result += f'{key}__{value}___'


    arr.append(result)

print(len(arr))