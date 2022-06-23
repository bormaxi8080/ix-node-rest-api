DELETE FROM users

DELETE FROM agents WHERE id > 36
DELETE FROM insured_persons
DELETE FROM insurance_companies WHERE id > 3
DELETE FROM sdp

DELETE FROM insured_events

DELETE FROM cars
DELETE FROM drivers
DELETE FROM victims
DELETE FROM witnesses
UPDATE places set insurance_case_ids = NULL
DELETE FROM incident_participants
DELETE FROM public.others
DELETE FROM last_users
DELETE FROM theft_time_intervals
DELETE FROM bulgary_details
DELETE FROM estates
DELETE FROM third_persons


DELETE FROM insurance_cases

DELETE FROM insured_events_files
DELETE FROM insured_events WHERE id > 42

DELETE FROM users



