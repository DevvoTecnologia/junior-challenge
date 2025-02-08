--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: rings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rings (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    power character varying(100) NOT NULL,
    carrier character varying(100) NOT NULL,
    forger character varying(100) NOT NULL,
    image character varying(255) NOT NULL
);


ALTER TABLE public.rings OWNER TO postgres;

--
-- Name: rings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rings_id_seq OWNER TO postgres;

--
-- Name: rings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rings_id_seq OWNED BY public.rings.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    rings jsonb
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: rings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rings ALTER COLUMN id SET DEFAULT nextval('public.rings_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: rings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rings (id, name, power, carrier, forger, image) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, created_at, rings) FROM stdin;
2	Felipe	felipemaifredo.dev@gmail.com	manecoroa	2025-02-07 05:23:33.915405	[{"id": 1, "name": "Anel dos An├®is", "image": "https://i.ibb.co/xqCcdcNq/1.png", "power": "N├úo faz nada demais", "forjer": "sauron", "carrier": "Frodo"}]
1	Felipe	felipemaifredo@gmail.com	manecoroa	2025-02-07 05:10:34.281695	[{"id": 1, "name": "Anel Podeso", "image": "https://i.ibb.co/xqCcdcNq/1.png", "power": "Te deixa Poderoso", "forjer": "sauron", "carrier": "Felipe"}, {"id": 2, "name": "Anel da Vontade", "image": "https://i.ibb.co/svprFsdW/2.png", "power": "Te deixa com Vontade", "forjer": "elfs", "carrier": "N├úo ├® o Felipe"}, {"id": 3, "name": "Anel do Vazio", "image": "https://i.ibb.co/xqCcdcNq/1.png", "power": "Te permite controlar as formas do vazio", "forjer": "elfs", "carrier": "Felipe"}]
6	Felipe	felipemaifredo.dev2@gmail.com	manecoroa	2025-02-07 15:50:36.310105	\N
\.


--
-- Name: rings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rings_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: rings rings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rings
    ADD CONSTRAINT rings_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

