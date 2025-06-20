## 2.3. Подходы к загрузке и подготовке набора данных

Для проведения исследования был выбран общедоступный набор данных
**DBLP-v12**, представляющий собой снимок библиографической информации
из области компьютерных наук. Источником датасета является платформа
Kaggle (набор данных \"Citation Network Analysis\"). Выбор этого
датасета обусловлен следующими причинами:

-   **Большой объем:** Исходный файл в формате JSON имеет объем около 12
    ГБ и содержит 4,894,081 записей, что создает достаточную нагрузку на
    дисковую подсистему и механизмы индексирования СУБД.

-   **Реалистичная структура:** Данные являются полуструктурированными,
    содержат как простые поля (год, название), так и вложенные объекты
    (venue) и массивы (authors, fos), что позволяет оценить
    эффективность работы СУБД с комплексными структурами.

-   **Релевантность:** Датасет представляет собой реальный, а не
    синтетический набор данных, что повышает практическую значимость
    результатов тестирования.

**Структура документа**

Каждая запись в датасете представляет собой JSON-документ, описывающий
одну научную публикацию. Ключевые поля документа:

-   \_id (string): Уникальный идентификатор публикации.

-   title (string): Название статьи.

-   authors (array of objects): Список авторов, каждый со своим именем и
    ID.

-   venue (object): Информация о месте публикации (журнал, конференция)
    с полями raw (название) и id.

-   year (integer): Год публикации.

-   n_citation (integer): Количество цитирований.

-   fos (array of objects): Список областей науки (Fields of Study).

-   references (array of strings): Список ID публикаций, на которые
    ссылается данная статья.

-   indexed_abstract (object): Инвертированный индекс аннотации статьи.

**Пример документа из датасета:**

\[

  {

    \"id\": 1091,

    \"authors\": \[

      { \"name\": \"Makoto Satoh\", \"org\": \"Shinshu University\",
\"id\": 2312688602 },

      {

        \"name\": \"Ryo Muramatsu\",

        \"org\": \"Shinshu University\",

        \"id\": 2482909946

      },

      { \"name\": \"Mizue Kayama\", \"org\": \"Shinshu University\",
\"id\": 2128134587 },

      {

        \"name\": \"Kazunori Itoh\",

        \"org\": \"Shinshu University\",

        \"id\": 2101782692

      },

      {

        \"name\": \"Masami Hashimoto\",

        \"org\": \"Shinshu University\",

        \"id\": 2114054191

      },

Специфика каждой из исследуемых СУБД потребовала различных подходов к
загрузке и подготовке этого большого набора данных перед проведением
бенчмаркинга.

### 2.3.1. MongoDB: импорт JSON-датасета

Процесс подготовки данных для MongoDB, как документоориентированной
СУБД, был наиболее прямолинейным по сравнению с другими системами, так
как ее нативная модель данных хорошо соответствует исходному
JSON-формату. Однако для обеспечения валидности и воспроизводимости
тестов потребовалось выполнить ряд ключевых шагов.

**Основные цели этапа подготовки для MongoDB:**

1.  **Прямой импорт:** Загрузить исходный 12 ГБ JSON-датасет в MongoDB с
    минимальными трансформациями, сохранив его сложную вложенную
    структуру.

2.  **Совместимость с YCSB:** Создать эталонную тестовую коллекцию, в
    которой реальные данные сопоставлены с ключами формата user\<N\>,
    используемыми бенчмарком.

Общая схема процесса подготовки данных для MongoDB представлена на
рисунке:

![](media/image7.png){width="6.695833333333334in" height="1.725in"}

Рисунок 6: схема ипорта в MongoDB

**Этап 1: Импорт исходного датасета (Блоки 0 и 1 на схеме)**

-   **Цель:** Создать в MongoDB первичную коллекцию, содержащую полный и
    неизмененный набор реальных данных, которая будет служить источником
    для всех последующих операций.

-   **Методология:** Был выполнен предварительный анализ структуры
    JSON-документов для понимания ключевых полей. После этого исходный
    JSON-файл dblp.v12.json был загружен напрямую в MongoDB с помощью
    стандартной утилиты mongoimport.

-   **Инструменты и реализация:**

    -   **Утилита:** mongoimport.

    -   **Команда:**

mongoimport \--db ycsb \--collection dblp \--file dblp.v12.json
\--jsonArray

-   **Пояснение команды:**

    -   \--db ycsb: Указывает на использование или создание базы данных
        с именем ycsb.

    -   \--collection dblp: Создает коллекцию dblp для хранения данных.

    -   \--jsonArray: Инструктирует mongoimport обработать файл как
        единый JSON-массив, что соответствует структуре исходного
        датасета.

```{=html}
<!-- -->
```
-   **Результат:** Была создана коллекция dblp, содержащая 4,894,081
    документ в их оригинальной, вложенной структуре. Гибкость схемы
    MongoDB позволила выполнить этот шаг без необходимости
    предварительного выравнивания данных.

**Этап 2: Создание и наполнение эталонной тестовой коллекции (Блоки 2 и
3 на схеме)**

-   **Цель:** Решить проблему несовместимости ключей между реальными
    данными и бенчмарком YCSB, создав финальную, готовую к тестированию
    коллекцию.

-   **Методология:** Был применен двухшаговый подход, аналогичный тому,
    что использовался для других СУБД, для обеспечения сопоставимости
    тестов.

    1.  **Создание тестовой коллекции и генерация ключей (Блок 2):**
        Сначала была запущена фаза ycsb load mongodb на пустую,
        несуществующую коллекцию usertable. **Цель этого шага состояла
        не в загрузке реальных данных, а в использовании YCSB как
        механизма для создания коллекции и наполнения ее 4.8 млн записей
        с корректными YCSB-ключами (\_id: \"user\<N\>\")** и временными,
        синтетическими значениями в остальных полях (field0, field1 и
        т.д.).

./bin/ycsb load mongodb -s -P workloads/workloada \\

-p mongodb.url=\"mongodb://localhost:27017/ycsb\" \\

-p recordcount=4894081 -threads 16

2.  **Замещение данных реальными (Блок 3):** После генерации
    YCSB-совместимой структуры был выполнен **специализированный
    Python-скрипт**. Этот скрипт итерировал по документам в исходной
    коллекции dblp, считывая их реальное содержимое, и для каждой записи
    обновлял соответствующий документ в коллекции usertable по ключу
    user\<N\>. Таким образом, синтетические поля field0..field9 были
    перезаписаны реальными данными, **сохраняя при этом сгенерированный
    YCSB-ключ \_id**.

**Этап 3: Создание индексов (Блок 4 на схеме)**

-   **Цель:** Обеспечить высокую производительность операций поиска,
    выполняемых YCSB.

-   **Процесс:** После наполнения коллекции usertable реальными данными
    на ней был явно создан индекс по первичному ключу \_id. Хотя MongoDB
    автоматически создает индекс для поля \_id, этот шаг гарантировал
    его наличие и актуальность перед началом тестов.

-   **Результат:** Была получена эталонная коллекция usertable,
    полностью готовая к тестированию. Перед каждым новым тестовым
    прогоном (Workload A, Workload B и т.д.) с этой коллекции делалась
    полная копия, что обеспечивало изоляцию и чистоту экспериментов.

Гибкость схемы MongoDB позволила сохранить исходную структуру
документов, включая вложенные объекты и массивы, без необходимости
предварительной трансформации. Это является значительным преимуществом
при работе с разнородными или эволюционирующими данными.

### 2.3.2. PostgreSQL: импорт датасета и последующее структурирование

Процесс подготовки данных для PostgreSQL был более многоэтапным по
сравнению с MongoDB. Это обусловлено гибридной природой PostgreSQL,
которая, будучи постреляционной СУБД, также предоставляет мощные
возможности для работы с неструктурированными данными через тип JSONB.

**Ключевые проблемы и цели подготовки:**

1.  **Преодоление разрыва между моделями данных:** Необходимо было
    преобразовать документоориентированные данные из исходного датасета
    в строго типизированную реляционную структуру для максимальной
    производительности SQL-запросов.

2.  **Эффективная загрузка:** Требовалось загрузить большой объем данных
    из внешнего источника (в данном случае, из MongoDB, где датасет был
    изначально размещен) в PostgreSQL.

3.  **Совместимость с YCSB:** требовалось создать финальную тестовую
    таблицу с ключами формата user\<N\>, которые использует бенчмарк
    YCSB.

Для решения этих задач был реализован процесс, схема которого
представлена на Рисунке

![](media/image8.png){width="6.695833333333334in"
height="2.2958333333333334in"}

Рисунок 7: схема ипорта в PostgreSQL

**Этап 1: Первичная загрузка данных в формате JSONB (Блоки 0, 1, 4 на
схеме)**

-   **Цель:** Создать промежуточную \"сырую\" копию всего датасета
    внутри PostgreSQL для дальнейшей обработки. Использование типа JSONB
    на этом этапе позволило отложить трудоемкую задачу разбора схемы и
    выполнить быструю и надежную миграцию.

-   **Методология:** Был разработан Python-скрипт mongo_to_postgres.py,
    который выполнял следующие действия:

    1.  Устанавливал соединения с исходной базой данных MongoDB и
        целевой PostgreSQL.

    2.  В PostgreSQL создавал промежуточную таблицу publications
        (Таблица А на схеме) с двумя колонками: \_id (VARCHAR) для
        хранения оригинального идентификатора и data (JSONB) для
        хранения всего JSON-документа.

    3.  Итерировал по всем документам в коллекции MongoDB, считывая их
        батчами по 100 записей для эффективного использования памяти.

    4.  Для каждого документа выполнял предварительную очистку от
        недопустимых символов (например, null-байт), которые могли бы
        вызвать ошибку при вставке в PostgreSQL.

    5.  Вставлял подготовленные батчи в таблицу publications.

-   **Инструменты:** Python 3, библиотеки pymongo для подключения к
    MongoDB и psycopg2-binary для работы с PostgreSQL.

**Этап 2: Трансформация данных в реляционную структуру (Блоки 3 и 5 на
схеме)**

-   **Цель:** Преобразовать данные из неструктурированного формата JSONB
    в строго типизированную реляционную таблицу для достижения
    максимальной производительности. Реляционная структура позволяет
    СУБД использовать более эффективные планы запросов, статистику по
    колонкам и компактное хранение данных.

-   **Методология:**

    1.  **Проектирование схемы (Блок 0):** На основе анализа полей в
        JSONB была спроектирована и создана целевая реляционная таблица
        publications_structured (Таблица C на схеме) с типизированными
        колонками (title TEXT, year INTEGER и т.д.).

    2.  **Извлечение и заполнение (Блок 5):** Данные из JSONB-колонки
        таблицы publications были извлечены и вставлены в
        publications_structured с помощью одного SQL-запроса. Для этого
        использовались встроенные в PostgreSQL операторы для работы с
        JSON (-\>\> для извлечения поля как текста и -\> для извлечения
        как JSON-объекта) с явным приведением типов (например,
        ::integer).

-   **Инструменты и реализация:** SQL, операторы PostgreSQL для JSON.

INSERT INTO publications_structured (id, title, year, authors, abstract)

SELECT

\_id,

data-\>\>\'title\',

(data-\>\>\'year\')::integer,

data-\>\'authors\', \-- Сохраняем как JSONB для гибкости

data-\>\>\'abstract\'

FROM publications;

**Этап 3: Создание и наполнение финальной тестовой таблицы YCSB (Блоки 2
и 6 на схеме)**

-   **Цель:** Создать финальную, готовую к тестированию таблицу
    usertable, которая содержит реальные данные из
    publications_structured, но имеет первичные ключи, совместимые с
    YCSB.

-   **Методология:** Процесс был аналогичен тому, что применялся для
    Cassandra, и решал ту же проблему сопоставления ключей.

    1.  **Создание таблицы (Блок 2):** Была создана пустая таблица
        usertable (Таблица B на схеме) со структурой, ожидаемой YCSB
        (ycsb_key VARCHAR(255) PRIMARY KEY, field0 TEXT, и т.д.).

    2.  **Генерация ключей:** Была запущена фаза ycsb load jdbc на эту
        пустую таблицу. **Цель этого шага --- использовать YCSB как
        генератор для вставки 4.8 млн записей с корректными ключами
        формата user\<N\>** и временными, синтетическими значениями в
        остальных полях.

    3.  **Замещение данных реальными (Блок 6):** С помощью SQL-запроса
        UPDATE \... FROM \... значения полей field0..field19 в таблице
        usertable были обновлены данными из таблицы
        publications_structured. Сопоставление записей производилось по
        их порядковому номеру, что позволило сохранить YCSB-ключи и
        наполнить строки реальным содержимым.

-   **Результат:** Была получена эталонная таблица usertable, которая
    использовалась как источник для копирования перед каждым тестовым
    прогоном, обеспечивая изоляцию и воспроизводимость тестов. Данный
    многоэтапный процесс, хоть и потребовал значительно больше усилий по
    сравнению с MongoDB, позволил получить строго типизированные данные
    в реляционной структуре, полностью оптимизированной для выполнения
    SQL-запросов, и провести корректное сравнение с другими СУБД.

Данный процесс потребовал значительно больше усилий по сравнению с
MongoDB, но позволил получить строго типизированные данные в реляционной
структуре, оптимизированной для SQL-запросов.

### 2.3.3. Cassandra: импорт датасета, многоэтапная трансформация и загрузка через DSBulk

Загрузка данных в Apache Cassandra стала самой трудоемкой задачей в
рамках данного исследования. Это было продиктовано не выбором, а строгой
необходимостью, вытекающей из фундаментальных различий между исходным
форматом данных, архитектурой Cassandra и требованиями бенчмарка YCSB.

**Ключевые проблемы, которые требовалось решить:**

1.  **Несовместимость структуры данных:** Исходный датасет имел сложную
    иерархическую структуру с вложенными объектами и массивами.
    Архитектура Cassandra, напротив, оптимизирована для \"плоских\",
    денормализованных таблиц, и не поддерживает нативные запросы к полям
    внутри JSON-блоков. Простое сохранение JSON как текста сделало бы
    данные \"непрозрачными\" для СУБД и бессмысленным для тестирования
    производительности.

2.  **Проблема массовой загрузки:** Размер исходного файла (12 ГБ) не
    позволял загрузить его в оперативную память целиком для обработки.
    Требовался потоковый подход к чтению и преобразованию данных.

3.  **Несовместимость ключей с YCSB:** Бенчмарк YCSB генерирует и
    выполняет запросы к записям по собственным ключам формата user\<N\>.
    Исходные данные имели собственные уникальные идентификаторы
    (например, 53e99784b7602d9701f3e131). Для проведения валидного теста
    требовалось сопоставить реальные данные с ключами, которые YCSB
    будет использовать в своих нагрузках.

Для решения этих проблем был разработан многоэтапный процесс, подробно
описанный ниже.

![](media/image9.png){width="6.695833333333334in"
height="3.091666666666667in"}

Рисунок 8: схема ипорта в Cassandra

**Этап 1: Преобразование JSON в потоковый формат NDJSON**

-   **Цель:** Решить проблему обработки большого объема данных,
    преобразовав исходный 12 ГБ файл в формат, пригодный для потоковой
    обработки и совместимый с утилитами массовой загрузки.

-   **Методология:** Исходный файл представлял собой единый JSON-массив,
    который невозможно загрузить в память целиком. Единственным
    практически осуществимым подходом является потоковая обработка. Для
    этого исходный файл был конвертирован в формат NDJSON (Newline
    Delimited JSON), где каждый JSON-объект находится на новой строке.
    Этот формат является отраслевым стандартом для подобных задач и
    поддерживается утилитой DSBulk.

-   **Инструменты и реализация:** Задача была решена с помощью скрипта
    на языке Python. Для эффективной работы с памятью использовалась
    библиотека ijson, которая позволяет итерировать по элементам
    JSON-файла, не загружая его полностью.

> import json
>
> import ijson
>
> from decimal import Decimal
>
> def clean_record(record):
>
> \# Ensure references is always a list of numbers
>
> if \"references\" in record and record\[\"references\"\] is not None:
>
> \# Make sure all elements in references are bigints
>
> try:
>
> record\[\"references\"\] = \[int(ref) for ref in
> record\[\"references\"\]\]
>
> except:
>
> \# If conversion fails, set to empty list
>
> record\[\"references\"\] = \[\]
>
> else:
>
> record\[\"references\"\] = \[\]
>
> \# Ensure other required fields exist
>
> for field in \[\"venue\", \"indexed_abstract\", \"fos\"\]:
>
> if field not in record or record\[field\] is None:
>
> record\[field\] = {}
>
> return record
>
> def decimal_default(obj):
>
> if isinstance(obj, Decimal):
>
> return float(obj)
>
> raise TypeError(f\"Object of type {obj.\_\_class\_\_.\_\_name\_\_} is
> not JSON serializable\")
>
> with open(\"dataset.json\", \"r\", encoding=\"utf-8\") as infile,
> open(
>
> \"dataset_clean.ndjson\", \"w\", encoding=\"utf-8\"
>
> ) as outfile:
>
> \# Iterate over each item in the JSON array
>
> for item in ijson.items(infile, \"item\"):
>
> \# Clean the record
>
> cleaned_item = clean_record(item)
>
> \# Dump each item as a separate line in NDJSON
>
> json.dump(cleaned_item, outfile, ensure_ascii=False,
> default=decimal_default)
>
> outfile.write(\"\\n\")

**Этап 2: Выравнивание (Flattening) структуры данных**

-   **Цель:** Адаптировать иерархическую структуру данных к плоской
    колоночной модели Cassandra, сделав все поля доступными для
    индексирования и запросов.

-   **Методология:** Поскольку Cassandra не поддерживает нативные
    запросы к полям внутри вложенных объектов, была проведена процедура
    \"выравнивания\" структуры. Для этого был разработан скрипт на языке
    python, который построчно обрабатывал NDJSON-файл и выполнял
    следующие действия:

    -   Извлекал значения из вложенных объектов (например, venue.raw
        становилось полем venue_raw).

    -   Сериализовал сложные типы, такие как массивы объектов (authors),
        в их строковое JSON-представление для хранения в текстовых
        колонках.

> import json
>
> import sys
>
> def process_json_streaming(input_file, output_file, batch_size=10000):
>
> \"\"\"Process JSON file in streaming fashion with batching for better
> memory management.\"\"\"
>
> count = 0
>
> with open(input_file, \'r\') as infile, open(output_file, \'w\') as
> outfile:
>
> for line in infile:
>
> try:
>
> record = json.loads(line.strip())
>
> flat_record = flatten_record(record)
>
> json.dump(flat_record, outfile)
>
> outfile.write(\'\\n\')
>
> count += 1
>
> if count % batch_size == 0:
>
> outfile.flush()
>
> print(f\"Processed {count} records\")
>
> except Exception as e:
>
> print(f\"Error processing record: {str(e)}\")
>
> continue
>
> return count
>
> def flatten_record(record):
>
> \"\"\"Flatten nested JSON structures into a top-level structure.\"\"\"
>
> flat_record = record.copy()
>
> \# Handle venue fields
>
> if \'venue\' in record and record\[\'venue\'\]:
>
> if isinstance(record\[\'venue\'\], dict):
>
> if \'raw\' in record\[\'venue\'\]:
>
> flat_record\[\'venue_raw\'\] = record\[\'venue\'\]\[\'raw\'\]
>
> if \'id\' in record\[\'venue\'\]:
>
> try:
>
> flat_record\[\'venue_id\'\] = int(record\[\'venue\'\]\[\'id\'\])
>
> except (ValueError, TypeError):
>
> flat_record\[\'venue_id\'\] = None
>
> if \'type\' in record\[\'venue\'\]:
>
> flat_record\[\'venue_type\'\] = record\[\'venue\'\]\[\'type\'\]
>
> \# Convert complex structures to strings
>
> if \'authors\' in flat_record:
>
> flat_record\[\'authors\'\] = json.dumps(flat_record\[\'authors\'\])
>
> if \'fos\' in flat_record:
>
> flat_record\[\'fos\'\] = json.dumps(flat_record\[\'fos\'\])
>
> if \'indexed_abstract\' in flat_record:
>
> flat_record\[\'indexed_abstract\'\] =
> json.dumps(flat_record\[\'indexed_abstract\'\])
>
> \# Remove the original nested fields
>
> if \'venue\' in flat_record:
>
> del flat_record\[\'venue\'\]
>
> \# Rename references to paper_references to avoid keyword conflict
>
> if \'references\' in flat_record:
>
> flat_record\[\'paper_references\'\] = flat_record\[\'references\'\]
>
> del flat_record\[\'references\'\]
>
> return flat_record
>
> if \_\_name\_\_ == \"\_\_main\_\_\":
>
> if len(sys.argv) \< 3:
>
> print(\"Usage: python script.py input_file output_file\")
>
> sys.exit(1)
>
> input_file = sys.argv\[1\]
>
> output_file = sys.argv\[2\]
>
> total_processed = process_json_streaming(input_file, output_file)
>
> print(f\"Total processed records: {total_processed}\")
>
> print(f\"Flattened data written to {output_file}\")

**Этап 3: Массовая загрузка данных в промежуточную таблицу с помощью
DSBulk**

-   **Цель:** Быстро и надёжно загрузить 4.8 млн подготовленных записей
    в Cassandra.

-   **Процесс и инструменты:**

    1.  **Создание таблицы:** В Cassandra была создана таблица
        ycsb.papers_full со структурой, точно соответствующей
        \"выровненному\" датасету.

    2.  **Настройка DSBulk:** Для управления загрузкой использовался
        конфигурационный файл dsbulk_production.conf. Особое внимание
        было уделено следующим параметрам:

        -   **schema.mapping**: Явно сопоставлял каждое поле из
            NDJSON-файла с соответствующей колонкой таблицы.

        -   **batch.mode = PARTITION_KEY**: Указывал DSBulk группировать
            операции по ключу партиционирования. Это наиболее
            эффективный режим для Cassandra, так как он минимизирует
            количество меж-узловых запросов и нагрузку на координатор.

        -   **executor.maxInFlight и engine.maxConcurrentQueries**: Эти
            параметры были настроены для контроля над нагрузкой, чтобы
            избежать перегрузки кластера Cassandra во время интенсивной
            операции вставки.

dsbulk {

connector {

name = \"json\"

json {

url = \"/home/chillaxin/Desktop/cassandra_ycsb/dataset_flat.ndjson\"

mode = \"MULTI_DOCUMENT\"

}

}

schema {

keyspace = \"ycsb\"

table = \"papers_full\"

allowMissingFields = true

mapping = \"id = id, authors = authors, title = title, year = year,
n_citation = n_citation, page_start = page_start, page_end = page_end,
doc_type = doc_type, publisher = publisher, volume = volume, issue =
issue, doi = doi, paper_references = paper_references, indexed_abstract
= indexed_abstract, fos = fos, venue_raw = venue_raw, venue_id =
venue_id, venue_type = venue_type\"

}

executor {

maxErrors = 1000000

maxInFlight = 1000

}

\# Batch settings for better performance

batch {

mode = PARTITION_KEY

size = 100

}

\# Throttling settings to avoid overloading the system

engine {

maxConcurrentQueries = 500

}

}

**Запуск загрузки:** Загрузка инициировалась с выделением 4 ГБ
оперативной памяти для процесса DSBulk, что было необходимо для
стабильной работы с большим объемом данных.

java -Xmx4G -jar dsbulk-1.11.0.jar load -f dsbulk_production.conf

**Этап 4: Создание финальной тестовой таблицы и сопоставление данных**

-   **Цель:** Решить фундаментальную проблему несовместимости ключей
    YCSB с реальными данными, создав эталонную таблицу для тестирования.

-   **Методология:** Был применен двухшаговый подход:

    1.  **Создание таблицы usertable и генерация ключей:** Сначала была
        создана пустая таблица usertable со структурой, ожидаемой YCSB
        (ycsb_key TEXT PRIMARY KEY, field0 TEXT, и т.д.). Затем на эту
        таблицу была запущена фаза ycsb load. Этот шаг использовался не
        для загрузки данных, а как **механизм для генерации и вставки
        4.8 млн записей с корректными YCSB-ключами (user0, user1,
        \...)** и временными, синтетическими значениями в остальных
        полях.

    2.  **Замещение данных реальными:** После генерации ключей был
        выполнен Python-скрипт, который производил \"трансплантацию\"
        данных: он читал записи из papers_full (реальные данные) и
        обновлял соответствующие записи в usertable, замещая
        синтетические значения в полях field0..field19 реальными, но
        **сохраняя при этом сгенерированный YCSB-ключ**.

-   **Результат:** В результате была получена эталонная таблица
    usertable, идеально подходящая для валидного бенчмаркинга: каждая
    запись имела ключ, понятный YCSB, но содержала данные из реального
    датасета. Перед каждым новым тестом с этой таблицы делалась копия,
    которая использовалась для прогона и удалялась после него,
    обеспечивая изоляцию тестов.

![](media/image10.png){width="6.695833333333334in"
height="4.927777777777778in"}

Рисунок 9: дашборд Apache Superset