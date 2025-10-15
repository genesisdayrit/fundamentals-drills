# Objective

Design a restaurant table reservation system with the following features:
 - Ability to view available tables for a given date/time
 - Ability to make a reservation
 - Admin can add/remove tables and view all reservations

---

## 1. Core User Flows

#### View Available Tables
- as a user, I can go to the site and can view available tables for the restaurant, so that I can see my options for reserving a table.
- a user should be able to click into a date that they are interested in and select times that they are interested in
- user goes to the website and sees the table availability based on the time that they are searching for


#### Make a reservation
- as a user, I should be able to see on an available table and make a reservation, so that I can reserve a table. 
- after selecting a time and available table, a user will be able to see a UI that reserves the table


#### Admin add or review tables
- as an admin, I can add or review tables to the available tables view, so that potential guests know what tables are available. 
- an admin should be able to click add a table to add a table or click into an existing table to update table details


## 2. Data Models

users
- id
- name
- email
- role
- created_at
- update_at

tables
- id
- name
- description
- number_of_seats
- restaurant_section?
- restaurant_location?
- created_by_user_id
- created_at
- updated_at

bookings
- id
- table_id
- booked_by_user_id
- reservation_time_start
- reservation_time_end
- reservation_duration
- is_active
- created_at
- approved_at?
- cancelled_at?

available_times (table of 30 increment times in a day)
- id
- date
- day_of_week
- start_time (30 min increments)
- end_time (30 min + start_time for each record)
- is_holiday
- is_during_store_hours


Questions to answer?
1. How do I see all of the tables?

viewing all tables
`select * from tables`

see bookings for the table

`select from bookings where table_id = ${userInputTableId} order by reservation_start_time`


2. How do I see the availablity for a specific table?


3. How do I see the availability for a specific time range?

(this is a rough attempt at the SQL - possibly a better way without having a available_times schedule)
```
with 

tables as (select * from tables),

booked_tables as (
    select 
    * 
    from 
        bookings 
    where 
        reservation_start_time >= {userStartTimeRange} 
        and reservation_end_time <= {userEndTimeRange}
),

available_times as (
    select * from available_times
)

select 
distinct {tables and table info}
from tables
cross join available times
left join booked_times
    -- check overlap of booked times and available times
    on (available_times.start_time >= booked_tables.start_time
        and available_times.start_time <= booked_tables.end_time)
    and (available_times.end_time >= booked_tables.start_time
        and available_times.end_time <= booked_tables.end_time)
-- only return tables available
where
    booked_times.start_time is null
    and booked_times.end_time is null
    and is_during_store_hours = true
    and is_holiday = false
order by table_name, available_start_time
```

4. How do I add a table as an admin?
- `insert into tables`

## 3. Architecture Diagram



## 4. API Sketch

- GET /tables
**Input**: none
**Output**: Table

-  GET /bookings/:tableId

**Input**: tableId, userId
**Output**: Booking

- POST /booking/:tableId/create

**Input**: tableId, userId
**Output**: Booking

- POST /availabe-tables
**Input**: userStartRangeTime, userEndRangeTime
**Output**: Table[] (array of available table objects)

- POST /tables/:id/create
**Input**: Table, userId
**Output**: Table

- GET /user-bookings
**Input**: userId
**Output**: Bookings