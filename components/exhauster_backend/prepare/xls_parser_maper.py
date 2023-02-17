import openpyxl

mapper_signals_path = 'mapper_signals.xlsx'
mapper_signals_kafka_path = 'signals_kafka.csv'


wb_obj = openpyxl.load_workbook(mapper_signals_path)

# import ipdb;ipdb.set_trace()
BEARING_CELL = 0


Температура нагрева
    Температура
    Уставки


Вибрация
    Осевая
        Уставки
    Горизонтальная
        Уставки
    Вертикальная
        Уставки





for sheet in wb_obj.worksheets:
    # sheet.title  забрать номер эксгаутсера
    #
    import ipdb;ipdb.set_trace()
    for row in sheet.rows:
        # import ipdb;ipdb.set_trace()
        if row[4].value.startswith('SM_Exgauster'):
            pass
