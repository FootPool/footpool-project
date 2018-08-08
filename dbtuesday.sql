CREATE TABLE public.bet (
    id integer NOT NULL,
    user_id integer NOT NULL,
    bet character varying(72),
    match_id integer,
    pool_id integer
);

CREATE SEQUENCE public.bet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.fpuser (
    id integer NOT NULL,
    username character varying(72),
    password character varying(72),
    email character varying(100),
    score integer
);

CREATE SEQUENCE public.fpuser_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


CREATE TABLE public.game (
    id integer NOT NULL,
    pool_id integer NOT NULL,
    home_team character varying(72),
    away_team character varying(72),
    match_id integer,
    winner character varying(72)
);


CREATE SEQUENCE public.game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- TOC entry 199 (class 1259 OID 24639)
-- Name: pool; Type: TABLE; Schema: public; Owner: olliecrook
--

CREATE TABLE public.pool (
    id integer NOT NULL,
    poolname character varying(72),
    date_created timestamp without time zone,
    match_week smallint
);



CREATE SEQUENCE public.pool_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- TOC entry 3019 (class 2604 OID 24695)
-- Name: bet id; Type: DEFAULT; Schema: public; Owner: olliecrook
--

ALTER TABLE ONLY public.bet ALTER COLUMN id SET DEFAULT nextval('public.bet_id_seq'::regclass);


--
-- TOC entry 3016 (class 2604 OID 24598)
-- Name: fpuser id; Type: DEFAULT; Schema: public; Owner: olliecrook
--

ALTER TABLE ONLY public.fpuser ALTER COLUMN id SET DEFAULT nextval('public.fpuser_id_seq'::regclass);


--
-- TOC entry 3018 (class 2604 OID 24658)
-- Name: game id; Type: DEFAULT; Schema: public; Owner: olliecrook
--

ALTER TABLE ONLY public.game ALTER COLUMN id SET DEFAULT nextval('public.game_id_seq'::regclass);


--
-- TOC entry 3017 (class 2604 OID 24642)
-- Name: pool id; Type: DEFAULT; Schema: public; Owner: olliecrook
--

ALTER TABLE ONLY public.pool ALTER COLUMN id SET DEFAULT nextval('public.pool_id_seq'::regclass);




INSERT INTO fpuser (id, username, password, email, score) VALUES
(2, 'bob', '$2b$12$ATU/M9XqnD3eJEVfOlGC2.0egXDMgnigmb70RKXqx6LPYiXCPUxlW', 'bob@bob.com',	0),
(3,	'ollie','$2b$12$uhb2zt6.4FiFG8Jh/tUoV.M0uPbipsaeLhvIvEUOAts1uv6O0j4ja',	'ollie@ollie.com', 	0);


ALTER SEQUENCE fpuser_id_seq RESTART WITH 4 INCREMENT BY 1;


--
-- TOC entry 3177 (class 0 OID 0)
-- Dependencies: 200
-- Name: game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: olliecrook
--



--
-- TOC entry 3178 (class 0 OID 0)
-- Dependencies: 198
-- Name: pool_id_seq; Type: SEQUENCE SET; Schema: public; Owner: olliecrook
--



--
-- TOC entry 3031 (class 2606 OID 24697)
-- Name: bet bet_pkey; Type: CONSTRAINT; Schema: public; Owner: olliecrook
--

ALTER TABLE ONLY public.bet
    ADD CONSTRAINT bet_pkey PRIMARY KEY (id);


--
-- TOC entry 3021 (class 2606 OID 24604)
-- Name: fpuser fpuser_email_key; Type: CONSTRAINT; Schema: public; Owner: olliecrook
--

ALTER TABLE ONLY public.fpuser
    ADD CONSTRAINT fpuser_email_key UNIQUE (email);


--
-- TOC entry 3023 (class 2606 OID 24600)
-- Name: fpuser fpuser_pkey; Type: CONSTRAINT; Schema: public; Owner: olliecrook
--

ALTER TABLE ONLY public.fpuser
    ADD CONSTRAINT fpuser_pkey PRIMARY KEY (id);


--
-- TOC entry 3025 (class 2606 OID 24602)
-- Name: fpuser fpuser_username_key; Type: CONSTRAINT; Schema: public; Owner: olliecrook
--

ALTER TABLE ONLY public.fpuser
    ADD CONSTRAINT fpuser_username_key UNIQUE (username);


--
-- TOC entry 3029 (class 2606 OID 24660)
-- Name: game game_pkey; Type: CONSTRAINT; Schema: public; Owner: olliecrook
--

ALTER TABLE ONLY public.game
    ADD CONSTRAINT game_pkey PRIMARY KEY (id);


--
-- TOC entry 3027 (class 2606 OID 24644)
-- Name: pool pool_pkey; Type: CONSTRAINT; Schema: public; Owner: olliecrook
--

ALTER TABLE ONLY public.pool
    ADD CONSTRAINT pool_pkey PRIMARY KEY (id);


--
-- TOC entry 3033 (class 2606 OID 24698)
-- Name: bet bet_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: olliecrook
--

ALTER TABLE ONLY public.bet
    ADD CONSTRAINT bet_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.fpuser(id);


--
-- TOC entry 3032 (class 2606 OID 24661)
-- Name: game game_pool_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: olliecrook
--

ALTER TABLE ONLY public.game
    ADD CONSTRAINT game_pool_id_fkey FOREIGN KEY (pool_id) REFERENCES public.pool(id);


-- Completed on 2018-08-07 17:20:02 BST

--
-- PostgreSQL database dump complete
--

