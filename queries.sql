-- List all found items
Select * from foundformdata;

-- Get Found item by particular userID 
Select * from foundformdata where userid = 2;

-- Get item by title with keyword wallet
select * from foundformdata where title ilike '%wallet%';

-- get item by title, should have 9 results
Select * from foundformdata where title ilike '%00000%';

-- Deletes a row/particular item
delete from foundFormData where userid = 3;

-- Updates all form fields
UPDATE foundformdata
set title = 'iphone 6', 
	itemdescription = 'iphone 6 silver 16gb', 
	datefound = '06/25/2018',
	timefound = '2 pm', 
	locationfound = '1800 special avenue, atlanta, ga, 30013',
	imageurl = 'whitegirl.com',
	email = 'chrissybobbie@gmail.com'
Where userid = 1
;
	