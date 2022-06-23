--
-- PostgreSQL database dump
--

-- Dumped from database version 10.19 (Ubuntu 10.19-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.19 (Ubuntu 10.19-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: sdp; Type: TABLE; Schema: public; Owner: insurex
--

CREATE TABLE public.sdp (
    id integer NOT NULL,
    name character varying(256) NOT NULL,
    phone character varying(256) NOT NULL,
    email character varying(256) NOT NULL,
    region_id integer NOT NULL,
    address character varying(256) NOT NULL,
    login_id character varying(512) NOT NULL,
    insurance_company_ids integer[]
);


ALTER TABLE public.sdp OWNER TO insurex;

--
-- Name: SDP_id_seq; Type: SEQUENCE; Schema: public; Owner: insurex
--

CREATE SEQUENCE public."SDP_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."SDP_id_seq" OWNER TO insurex;

--
-- Name: SDP_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: insurex
--

ALTER SEQUENCE public."SDP_id_seq" OWNED BY public.sdp.id;


--
-- Name: agents; Type: TABLE; Schema: public; Owner: insurex
--

CREATE TABLE public.agents (
    id integer NOT NULL,
    first_name character varying(256) NOT NULL,
    second_name character varying(256) NOT NULL,
    employee_number bigint NOT NULL,
    phone character varying(256) NOT NULL,
    email character varying(256) NOT NULL,
    region_id integer NOT NULL,
    address character varying(256) NOT NULL,
    login_id character varying(512) NOT NULL,
    insurance_company_ids integer[] NOT NULL
);


ALTER TABLE public.agents OWNER TO insurex;

--
-- Name: agents_id_seq; Type: SEQUENCE; Schema: public; Owner: insurex
--

CREATE SEQUENCE public.agents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.agents_id_seq OWNER TO insurex;

--
-- Name: agents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: insurex
--

ALTER SEQUENCE public.agents_id_seq OWNED BY public.agents.id;


--
-- Name: appraisal_companies; Type: TABLE; Schema: public; Owner: insurex
--

CREATE TABLE public.appraisal_companies (
    id integer NOT NULL,
    phone character varying(256) NOT NULL,
    email character varying(256) NOT NULL,
    office_address character varying(256) NOT NULL,
    appraisal_company_name character varying(256) NOT NULL,
    oao_ie_number integer NOT NULL,
    insurance_company_ids integer[],
    region_id integer NOT NULL
);


ALTER TABLE public.appraisal_companies OWNER TO insurex;

--
-- Name: appraisal_companies_id_seq; Type: SEQUENCE; Schema: public; Owner: insurex
--

CREATE SEQUENCE public.appraisal_companies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.appraisal_companies_id_seq OWNER TO insurex;

--
-- Name: appraisal_companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: insurex
--

ALTER SEQUENCE public.appraisal_companies_id_seq OWNED BY public.appraisal_companies.id;


--
-- Name: appraisers; Type: TABLE; Schema: public; Owner: insurex
--

CREATE TABLE public.appraisers (
    id integer NOT NULL,
    insurance_company_id integer,
    first_name character varying(256) NOT NULL,
    second_name character varying(256) NOT NULL,
    employee_number bigint NOT NULL,
    phone character varying(256) NOT NULL,
    email character varying(256) NOT NULL,
    region_id integer NOT NULL,
    address character varying(256) NOT NULL,
    login_id character varying(512) NOT NULL,
    appraisal_company_id integer,
    ooo_number integer NOT NULL,
    ie_number integer NOT NULL
);


ALTER TABLE public.appraisers OWNER TO insurex;

--
-- Name: appraisers_id_seq; Type: SEQUENCE; Schema: public; Owner: insurex
--

CREATE SEQUENCE public.appraisers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.appraisers_id_seq OWNER TO insurex;

--
-- Name: appraisers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: insurex
--

ALTER SEQUENCE public.appraisers_id_seq OWNED BY public.appraisers.id;


--
-- Name: insurance_companies; Type: TABLE; Schema: public; Owner: insurex
--

CREATE TABLE public.insurance_companies (
    title character varying(255) NOT NULL,
    ie_number integer NOT NULL,
    address character varying(255) NOT NULL,
    phone integer NOT NULL,
    email character varying(255) NOT NULL,
    id integer NOT NULL,
    account_id integer NOT NULL
);


ALTER TABLE public.insurance_companies OWNER TO insurex;

--
-- Name: insurance_companies_id_seq; Type: SEQUENCE; Schema: public; Owner: insurex
--

CREATE SEQUENCE public.insurance_companies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.insurance_companies_id_seq OWNER TO insurex;

--
-- Name: insurance_companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: insurex
--

ALTER SEQUENCE public.insurance_companies_id_seq OWNED BY public.insurance_companies.id;


--
-- Name: insured_events; Type: TABLE; Schema: public; Owner: insurex
--

CREATE TABLE public.insured_events (
    id integer NOT NULL,
    insurance_company_id integer,
    insured_person_id integer,
    event_type character varying(256) NOT NULL,
    region_id integer NOT NULL,
    address character varying(256) NOT NULL,
    date date NOT NULL,
    agent_id integer,
    appraisal_company_id integer,
    appraiser_id integer,
    garage_name character varying(256) NOT NULL,
    insured_event_number integer NOT NULL
);


ALTER TABLE public.insured_events OWNER TO insurex;

--
-- Name: insured_events_files; Type: TABLE; Schema: public; Owner: insurex
--

CREATE TABLE public.insured_events_files (
    id integer NOT NULL,
    insured_event_id integer NOT NULL,
    link character varying(512) NOT NULL,
    file_google_drive_id character varying(512) NOT NULL,
    file_type character varying(256) NOT NULL
);


ALTER TABLE public.insured_events_files OWNER TO insurex;

--
-- Name: insured_events_id_seq; Type: SEQUENCE; Schema: public; Owner: insurex
--

CREATE SEQUENCE public.insured_events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.insured_events_id_seq OWNER TO insurex;

--
-- Name: insured_events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: insurex
--

ALTER SEQUENCE public.insured_events_id_seq OWNED BY public.insured_events.id;


--
-- Name: insured_events_images_id_seq; Type: SEQUENCE; Schema: public; Owner: insurex
--

CREATE SEQUENCE public.insured_events_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.insured_events_images_id_seq OWNER TO insurex;

--
-- Name: insured_events_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: insurex
--

ALTER SEQUENCE public.insured_events_images_id_seq OWNED BY public.insured_events_files.id;


--
-- Name: insured_persons; Type: TABLE; Schema: public; Owner: insurex
--

CREATE TABLE public.insured_persons (
    id integer NOT NULL,
    agent_id bigint NOT NULL,
    first_name character varying(256) NOT NULL,
    second_name character varying(256) NOT NULL,
    passport_id bigint NOT NULL,
    phone character varying(256) NOT NULL,
    email character varying(256) NOT NULL,
    region_id integer NOT NULL,
    address character varying(256) NOT NULL,
    login_id character varying(512) NOT NULL,
    insurance_company_id integer NOT NULL
);


ALTER TABLE public.insured_persons OWNER TO insurex;

--
-- Name: insured_persons_id_seq; Type: SEQUENCE; Schema: public; Owner: insurex
--

CREATE SEQUENCE public.insured_persons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.insured_persons_id_seq OWNER TO insurex;

--
-- Name: insured_persons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: insurex
--

ALTER SEQUENCE public.insured_persons_id_seq OWNED BY public.insured_persons.id;


--
-- Name: regions; Type: TABLE; Schema: public; Owner: insurex
--

CREATE TABLE public.regions (
    id integer NOT NULL,
    region_name character varying(256) NOT NULL
);


ALTER TABLE public.regions OWNER TO insurex;

--
-- Name: regions_id_seq; Type: SEQUENCE; Schema: public; Owner: insurex
--

CREATE SEQUENCE public.regions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.regions_id_seq OWNER TO insurex;

--
-- Name: regions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: insurex
--

ALTER SEQUENCE public.regions_id_seq OWNED BY public.regions.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: insurex
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(256) NOT NULL
);


ALTER TABLE public.roles OWNER TO insurex;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: insurex
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO insurex;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: insurex
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: insurex
--

CREATE TABLE public.users (
    id integer NOT NULL,
    role character varying(256) NOT NULL,
    login character varying(256) NOT NULL,
    password character varying(256) NOT NULL
);


ALTER TABLE public.users OWNER TO insurex;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: insurex
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO insurex;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: insurex
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: agents id; Type: DEFAULT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.agents ALTER COLUMN id SET DEFAULT nextval('public.agents_id_seq'::regclass);


--
-- Name: appraisal_companies id; Type: DEFAULT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.appraisal_companies ALTER COLUMN id SET DEFAULT nextval('public.appraisal_companies_id_seq'::regclass);


--
-- Name: appraisers id; Type: DEFAULT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.appraisers ALTER COLUMN id SET DEFAULT nextval('public.appraisers_id_seq'::regclass);


--
-- Name: insurance_companies id; Type: DEFAULT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.insurance_companies ALTER COLUMN id SET DEFAULT nextval('public.insurance_companies_id_seq'::regclass);


--
-- Name: insured_events id; Type: DEFAULT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.insured_events ALTER COLUMN id SET DEFAULT nextval('public.insured_events_id_seq'::regclass);


--
-- Name: insured_events_files id; Type: DEFAULT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.insured_events_files ALTER COLUMN id SET DEFAULT nextval('public.insured_events_images_id_seq'::regclass);


--
-- Name: insured_persons id; Type: DEFAULT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.insured_persons ALTER COLUMN id SET DEFAULT nextval('public.insured_persons_id_seq'::regclass);


--
-- Name: regions id; Type: DEFAULT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.regions ALTER COLUMN id SET DEFAULT nextval('public.regions_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: sdp id; Type: DEFAULT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.sdp ALTER COLUMN id SET DEFAULT nextval('public."SDP_id_seq"'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: agents; Type: TABLE DATA; Schema: public; Owner: insurex
--

COPY public.agents (id, first_name, second_name, employee_number, phone, email, region_id, address, login_id, insurance_company_ids) FROM stdin;
33	יובל	בן נון	666666	0543334444	y@g.com	2	רמת השרון	1234	{53,54,55}
34	מקסים	דיקטוביץ	7777777	0543337777	M@g.com	4	קרית אתא	1234	{53,54,55}
36	שי	יגאל	6576576565	0543333333	z@g.com	2	תל אביב	1234	{53,54,55}
32	צביקה	הרשקו	555555	0543333333	z@g.com	2	כפר סבא	1234	{53,54,55}
\.


--
-- Data for Name: appraisal_companies; Type: TABLE DATA; Schema: public; Owner: insurex
--

COPY public.appraisal_companies (id, phone, email, office_address, appraisal_company_name, oao_ie_number, insurance_company_ids, region_id) FROM stdin;
36	0543333333	z@g.com	כפר סבא	חברת שמאות מגדל1	1010101	{53}	2
37	0543333333	z@g.com	תל אביב	חברת שמאות מגדל2	45464647	{53}	2
38	0543366666	z@g.com	תל אביב	חברת שמאות מגדל3	7878786	{53}	2
39	05488888	z@g.com	תל אביב	חברת שמאות מגדל4	898987665	{53}	2
40	0543333333	z@g.com	כפר סבא	חברת שמאות מגדל1	56555	{53}	2
41	0543333333	z@g.com	תל אביב	חברת שמאות זקצר	6777888	{53}	2
42	0543333333	z@g.com	תל אביב	חברת שמאות גליקמן	976575564	{53}	3
43	0543333333	z@g.com	תל אביב	חברת שמאות הקנטורים	876867544	{53}	2
44	054000000	z@g.com	בני ברק	חברת שמאות הפניקס	353535	{55}	2
45	0543333333	z@g.com	תל אביב	חברת שמאות הפניקס 2	876878778	{55}	2
47	54000000	z@g.com	בני ברק	 חברת שמאות הפניקס 3	9898787	{55}	2
\.


--
-- Data for Name: appraisers; Type: TABLE DATA; Schema: public; Owner: insurex
--

COPY public.appraisers (id, insurance_company_id, first_name, second_name, employee_number, phone, email, region_id, address, login_id, appraisal_company_id, ooo_number, ie_number) FROM stdin;
23	53	שמאי1	שמאי1	0	0543346788	z@g.com	2	כפר סבא	1234	36	99876	2
24	53	שמאי2	שמאי2	0	054333458	GHHJ@g.com	2	תל אביב	1234	37	768565	3
25	53	שמאי3	שמאי3	0	0543334676	GHHJ@g.com	2	תל אביב	1234	38	678543	4
26	53	שמאי4	שמאי4	0	0543334676	KLKKJ@g.com	2	רמת גן	1234	39	88899999	5
27	53	שמאי5	שמאי5	0	0543000076	KVVVJ@g.com	2	רמת גן	1234	36	88899999	6
28	53	שמאי6	שמאי6	0	054222222	KUUUVJ@g.com	2	הרצליה	1234	37	77666676	7
30	53	שמאי8	שמאי8	0	1111111	m@g.com	2	מגדל תל אביב	1234	42	666775	55
31	53	שמאי9	שמאי9	0	1111111	m@g.com	2	מגדל תל אביב	1234	43	666775	55
32	53	שמאי10	שמאי10	0	1111111	m@g.com	2	מגדל תל אביב	1234	41	666775	55
29	53	שמאי7	שמאי7	0	1111111	m@g.com	2	מגדל תל אביב	1234	41	666775	55
33	55	שמאי 1 הפניקס	שמאי 1 הפניקס	0	0543666677	z@g.com	2	תל אביב	1234	44	58575867	6757768
35	55	שמאי הפניקס 5	שמאי הפניקס 5	8786567	1111111	m@g.com	1	מגדל תל אביב	1234	47	98776876	576567
\.


--
-- Data for Name: insurance_companies; Type: TABLE DATA; Schema: public; Owner: insurex
--

COPY public.insurance_companies (title, ie_number, address, phone, email, id, account_id) FROM stdin;
מגדל	111111	מגדל תל אביב	1111111	m@g.com	53	59
מנורה	222222	מנורה תל אביב	222222	m@g.com	54	60
הפניקס	333333	הפניקס בני ברק	333333	m@g.com	55	61
title	321312	address	213123	email	57	63
SK	123	Lenina 102	123456	yigyug!@ikbh.ru	60	66
SK1	1234	lrklrjbt34	1234567	kjbhb@okjnibh.ru	61	67
\.


--
-- Data for Name: insured_events; Type: TABLE DATA; Schema: public; Owner: insurex
--

COPY public.insured_events (id, insurance_company_id, insured_person_id, event_type, region_id, address, date, agent_id, appraisal_company_id, appraiser_id, garage_name, insured_event_number) FROM stdin;
38	53	58	crash	3	קרית אתא	2022-03-14	32	42	23	מוסך משה	5636377
42	55	63	crash	2	תל אביב	2022-03-10	33	39	33	מוסך הסדר הפניקס	757567576
41	53	61	crash	2	פתח תיקווה	2022-03-13	33	40	25	מוסך הגנבים	563633333
\.


--
-- Data for Name: insured_events_files; Type: TABLE DATA; Schema: public; Owner: insurex
--

COPY public.insured_events_files (id, insured_event_id, link, file_google_drive_id, file_type) FROM stdin;
39	38	https://drive.google.com/uc?id=1JQ3wFjweHGuQD62ZdEFf9OrHKJARPM1W&export=download	1JQ3wFjweHGuQD62ZdEFf9OrHKJARPM1W	image/jpeg
42	41	https://drive.google.com/uc?id=10onP3nzKjDL4JTV0H34EwPygVkQkfbvZ&export=download	10onP3nzKjDL4JTV0H34EwPygVkQkfbvZ	image/jpeg
43	42	https://drive.google.com/uc?id=1CFB6tTxN_vbpy8LDS7gQRAyCyG7FBqqM&export=download	1CFB6tTxN_vbpy8LDS7gQRAyCyG7FBqqM	image/jpeg
44	42	https://drive.google.com/uc?id=1XzJ5CrF4P_X6HFzc8OcFjTd2TCWXB3ZG&export=download	1XzJ5CrF4P_X6HFzc8OcFjTd2TCWXB3ZG	image/jpeg
45	42	https://drive.google.com/uc?id=1fEuY16VRbpM0t9obIh6yC5pt3JHoGTdW&export=download	1fEuY16VRbpM0t9obIh6yC5pt3JHoGTdW	image/jpeg
47	41	https://drive.google.com/uc?id=16vgzgqxklMgzSTiVaniOHxMEKmyR9qQv&export=download	16vgzgqxklMgzSTiVaniOHxMEKmyR9qQv	video/mp4
\.


--
-- Data for Name: insured_persons; Type: TABLE DATA; Schema: public; Owner: insurex
--

COPY public.insured_persons (id, agent_id, first_name, second_name, passport_id, phone, email, region_id, address, login_id, insurance_company_id) FROM stdin;
53	32	מבוטח1	מבוטח1	1212121	1111111	m@g.com	1	מגדל תל אביב	1234	53
54	33	מבוטח2	מבוטח2	21212133	222222	m@g.com	1	מגדל תל אביב	1234	53
55	34	מבוטח3	מבוטח3	31313131	333333	m@g.com	3	מבוטח3 תל אביב	1234	53
56	32	מבוטח4	מבוטח4	4141414	444444	h@g.com	4	מבוטח4 חיפה	1234	53
57	32	מבוטח5	מבוטח5	5252525	555555	h@g.com	1	מבוטח5 באר שבע	1234	53
58	32	אריה	קנטור	8766744	0543346788	z@g.com	2	כפר סבא	1234	53
61	34	ישראל	ישראלי	8766744	054787676	z@g.com	2	כפר סבא	1234	53
60	34	עדן	קנטור	8766744	054787676	z@g.com	2	כפר סבא	1234	53
59	33	אילנית	קנטור	8766744	054787676	z@g.com	2	כפר סבא	1234	53
52	34	מבוטח6	מבוטח6	3123	324234	email	1	address	32131	53
63	34	רותי	כהן	86756565	054332111	z@g.com	5	תל אביב	1234	55
64	36	יצחק	לוי	233533544	0543333333	z@g.com	2	תל אביב	1234	55
62	34	1	1	23435456	12345	hbg@kjbhb.ru	4	khgjcfdxgfc	435465767	53
66	36	5	5	234567	123456	vugjhb@hbb.ru	3	Lenin1	kjnkhbjgvh	60
67	36	נילי	ונילי	353535	0543333333	z@g.com	2	תל אביב	1234	55
\.


--
-- Data for Name: regions; Type: TABLE DATA; Schema: public; Owner: insurex
--

COPY public.regions (id, region_name) FROM stdin;
1	HaDarom
2	HaMerkaz
3	HaTsafon
4	Hefa
5	Tel Aviv
6	Yerushalayim
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: insurex
--

COPY public.roles (id, name) FROM stdin;
1	superadmin
2	insurance_company
\.


--
-- Data for Name: sdp; Type: TABLE DATA; Schema: public; Owner: insurex
--

COPY public.sdp (id, name, phone, email, region_id, address, login_id, insurance_company_ids) FROM stdin;
10	nane	0321	email	1	addres	3213	{45}
11	name	32321	email	1	address	321312	{}
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: insurex
--

COPY public.users (id, role, login, password) FROM stdin;
23	superadmin	admin	1234567
56	insurance_company	titlee	1234
59	insurance_company	מגדל	1234
60	insurance_company	מנורה	1234
61	insurance_company	הפניקס	1234
63	insurance_company	title	123
66	insurance_company	SK	Qwerty123
67	insurance_company	SK1	Qwerty123
\.


--
-- Name: SDP_id_seq; Type: SEQUENCE SET; Schema: public; Owner: insurex
--

SELECT pg_catalog.setval('public."SDP_id_seq"', 12, true);


--
-- Name: agents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: insurex
--

SELECT pg_catalog.setval('public.agents_id_seq', 37, true);


--
-- Name: appraisal_companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: insurex
--

SELECT pg_catalog.setval('public.appraisal_companies_id_seq', 47, true);


--
-- Name: appraisers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: insurex
--

SELECT pg_catalog.setval('public.appraisers_id_seq', 35, true);


--
-- Name: insurance_companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: insurex
--

SELECT pg_catalog.setval('public.insurance_companies_id_seq', 61, true);


--
-- Name: insured_events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: insurex
--

SELECT pg_catalog.setval('public.insured_events_id_seq', 45, true);


--
-- Name: insured_events_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: insurex
--

SELECT pg_catalog.setval('public.insured_events_images_id_seq', 47, true);


--
-- Name: insured_persons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: insurex
--

SELECT pg_catalog.setval('public.insured_persons_id_seq', 67, true);


--
-- Name: regions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: insurex
--

SELECT pg_catalog.setval('public.regions_id_seq', 6, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: insurex
--

SELECT pg_catalog.setval('public.roles_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: insurex
--

SELECT pg_catalog.setval('public.users_id_seq', 67, true);


--
-- Name: sdp SDP_pkey; Type: CONSTRAINT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.sdp
    ADD CONSTRAINT "SDP_pkey" PRIMARY KEY (id);


--
-- Name: insurance_companies adding_primary_key; Type: CONSTRAINT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.insurance_companies
    ADD CONSTRAINT adding_primary_key PRIMARY KEY (id);


--
-- Name: agents agents_pkey; Type: CONSTRAINT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.agents
    ADD CONSTRAINT agents_pkey PRIMARY KEY (id);


--
-- Name: appraisal_companies appraisal_companies_pkey; Type: CONSTRAINT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.appraisal_companies
    ADD CONSTRAINT appraisal_companies_pkey PRIMARY KEY (id);


--
-- Name: appraisers appraisers_pkey; Type: CONSTRAINT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.appraisers
    ADD CONSTRAINT appraisers_pkey PRIMARY KEY (id);


--
-- Name: insured_events_files insured_events_images_pkey; Type: CONSTRAINT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.insured_events_files
    ADD CONSTRAINT insured_events_images_pkey PRIMARY KEY (id);


--
-- Name: insured_events insured_events_pkey; Type: CONSTRAINT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.insured_events
    ADD CONSTRAINT insured_events_pkey PRIMARY KEY (id);


--
-- Name: insured_persons insured_persons_pkey; Type: CONSTRAINT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.insured_persons
    ADD CONSTRAINT insured_persons_pkey PRIMARY KEY (id);


--
-- Name: regions regions_adding_primary_key; Type: CONSTRAINT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.regions
    ADD CONSTRAINT regions_adding_primary_key PRIMARY KEY (id);


--
-- Name: roles roles_name_key; Type: CONSTRAINT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: insured_persons adding_foreign_key_region; Type: FK CONSTRAINT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.insured_persons
    ADD CONSTRAINT adding_foreign_key_region FOREIGN KEY (region_id) REFERENCES public.regions(id);


--
-- Name: agents agents_region_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.agents
    ADD CONSTRAINT agents_region_id_fkey FOREIGN KEY (region_id) REFERENCES public.regions(id) ON DELETE CASCADE;


--
-- Name: appraisers appraisers_appraisal_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.appraisers
    ADD CONSTRAINT appraisers_appraisal_company_id_fkey FOREIGN KEY (appraisal_company_id) REFERENCES public.appraisal_companies(id) ON DELETE SET NULL;


--
-- Name: appraisers appraisers_insurance_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.appraisers
    ADD CONSTRAINT appraisers_insurance_company_id_fkey FOREIGN KEY (insurance_company_id) REFERENCES public.insurance_companies(id) ON DELETE SET NULL;


--
-- Name: insured_events insured_events_agent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.insured_events
    ADD CONSTRAINT insured_events_agent_id_fkey FOREIGN KEY (agent_id) REFERENCES public.agents(id) ON DELETE SET NULL;


--
-- Name: insured_events insured_events_appraisal_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.insured_events
    ADD CONSTRAINT insured_events_appraisal_company_id_fkey FOREIGN KEY (appraisal_company_id) REFERENCES public.appraisal_companies(id) ON DELETE SET NULL;


--
-- Name: insured_events insured_events_appraiser_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.insured_events
    ADD CONSTRAINT insured_events_appraiser_id_fkey FOREIGN KEY (appraiser_id) REFERENCES public.appraisers(id) ON DELETE SET NULL;


--
-- Name: insured_events_files insured_events_images_insured_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.insured_events_files
    ADD CONSTRAINT insured_events_images_insured_event_id_fkey FOREIGN KEY (insured_event_id) REFERENCES public.insured_events(id) ON DELETE CASCADE;


--
-- Name: insured_events insured_events_insurance_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.insured_events
    ADD CONSTRAINT insured_events_insurance_company_id_fkey FOREIGN KEY (insurance_company_id) REFERENCES public.insurance_companies(id) ON DELETE SET NULL;


--
-- Name: insured_events insured_events_insured_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.insured_events
    ADD CONSTRAINT insured_events_insured_person_id_fkey FOREIGN KEY (insured_person_id) REFERENCES public.insured_persons(id) ON DELETE SET NULL;


--
-- Name: insured_persons insured_persons_insurance_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: insurex
--

ALTER TABLE ONLY public.insured_persons
    ADD CONSTRAINT insured_persons_insurance_company_id_fkey FOREIGN KEY (insurance_company_id) REFERENCES public.insurance_companies(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

