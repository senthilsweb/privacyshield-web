---
title: Getting Started with DuckDB SQL IDE
slug: "getting-started-duckdb-sql-ide"
imageUrl: "/images/coding.jpeg"
coverImage: "/images/coding.jpeg"
description: The "Tickit" database typically contains tables related to a fictional ticket-selling company, including data about events, venues, ticket sales, and customer information. It's designed to showcase various SQL operations and query scenarios.
date: 2023-09-15T12:00:00.000Z
tags: ["JDBC", "DuckDB", "SQL"]
---

## Introduction

The ***Tickit*** database typically contains tables related to a fictional ticket-selling company, including data about events, venues, ticket sales, and customer information. It's designed to showcase various SQL operations and query scenarios.

---

## Duckdb Practice SQL Queries from tickitdb

### Most Popular States

```sql
SELECT venuestate, count(venueid) as total
FROM venues 
GROUP BY venuestate
ORDER BY total desc, venuestate limit 5
```
### Least Popular Events

```sql
SELECT events.eventname, categories.catname, sum(sales.qtysold) as total_tickets
FROM events,sales,categories
where events.eventid=sales.eventid and events.catid=categories.catid
GROUP BY events.eventname, categories.catname
ORDER BY total_tickets desc
LIMIT 10
```

### Inventory Aging

```sql
SELECT venues.venuename, categories.catname, events.eventname,listings.listtime, (sales.saletime- listings.listtime) as sale_age
FROM sales,listings, venues,events,categories
WHERE 
events.eventid=sales.eventid 
and 
events.catid=categories.catid
and sales.listid=listings.listid
and venues.venueid=events.venueid
ORDER BY sale_age desc, sales.saletime desc,  listings.listtime desc, venues.venuename,  categories.catname,  events.eventname
LIMIT 20
```

### event_location_and_time

```sql
SELECT  events.eventname, events.starttime, venues.venuename
FROM events, venues 
where events.venueid=venues.venueid 
order by events.eventname asc
```

### people_sold_tickets_to_events

```sql
SELECT  events.eventname, users.email as seller
FROM events, users, sales
where
sales.eventid=events.eventid
and
users.userid=sales.sellerid
```

### big_spenders

```sql
SELECT users.firstname, sum(pricepaid) as total_spent
FROM users, sales
WHERE users.userid=sales.buyerid
GROUP BY users.firstname
ORDER BY total_spent desc
LIMIT 100
```

### sellers who made more than 1 sale in a holiday

```sql
select d.caldate, u.firstname, u.lastname, count(*) as sale_count from dates d
 inner join sales s on s.dateid  = d.dateid
 inner join users u on u.userid = s.sellerid
where d.holiday = true
group by 1,2,3having count(*)>1
```

### top 10 sellers made most on holidays or weekends in 2008

```sql
select u.firstname, u.lastname, sum(s.commission) as holiday_weekend_commission
 from dates d
 inner join sales s on s.dateid  = d.dateid 
 inner join users u on s.sellerid = u.userid
 where (d.holiday = true or d.day in ('SU','SA')) and d.YEAR = 2008 group by 1,2order by  holiday_weekend_commission desc limit 10
 ```
 
### Shares of Amount Paid by Music Category among Buyers who like musicals

```sql
select c.catname, sum(s.pricepaid) pricepaid, sum(s.qtysold) as qtysold
 from categories  c
 inner join events e on e.catid = c.catid
 inner join sales s on s.eventid = e.eventid
 inner join users u on u.userid = s.buyerid
where  u.likemusicals = true
group by 1
```
