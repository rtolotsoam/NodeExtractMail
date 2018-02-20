--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.10
-- Dumped by pg_dump version 9.5.7

-- Started on 2018-02-20 15:43:16

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2277 (class 1262 OID 16395)
-- Name: mail_bd; Type: DATABASE; Schema: -; Owner: si
--

CREATE DATABASE mail_bd WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'fr_FR.UTF-8' LC_CTYPE = 'fr_FR.UTF-8';


ALTER DATABASE mail_bd OWNER TO si;

\connect mail_bd

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12361)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2280 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 206 (class 1259 OID 16971)
-- Name: acces; Type: TABLE; Schema: public; Owner: si
--

CREATE TABLE acces (
    id_acces integer NOT NULL,
    level_id integer,
    lien_id integer
);


ALTER TABLE acces OWNER TO si;

--
-- TOC entry 205 (class 1259 OID 16969)
-- Name: acces_id_acces_seq; Type: SEQUENCE; Schema: public; Owner: si
--

CREATE SEQUENCE acces_id_acces_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE acces_id_acces_seq OWNER TO si;

--
-- TOC entry 2281 (class 0 OID 0)
-- Dependencies: 205
-- Name: acces_id_acces_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: si
--

ALTER SEQUENCE acces_id_acces_seq OWNED BY acces.id_acces;


--
-- TOC entry 182 (class 1259 OID 16401)
-- Name: attachment_id_attachment_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE attachment_id_attachment_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE attachment_id_attachment_seq OWNER TO postgres;

--
-- TOC entry 184 (class 1259 OID 16413)
-- Name: attachment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE attachment (
    id_attachment integer DEFAULT nextval('attachment_id_attachment_seq'::regclass) NOT NULL,
    filename text,
    inbox_id integer,
    uidmail integer,
    size text
);


ALTER TABLE attachment OWNER TO postgres;

--
-- TOC entry 191 (class 1259 OID 16781)
-- Name: attachment_send_id_attachment_send_seq; Type: SEQUENCE; Schema: public; Owner: si
--

CREATE SEQUENCE attachment_send_id_attachment_send_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE attachment_send_id_attachment_send_seq OWNER TO si;

--
-- TOC entry 192 (class 1259 OID 16783)
-- Name: attachment_send; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE attachment_send (
    id_attachment_send integer DEFAULT nextval('attachment_send_id_attachment_send_seq'::regclass) NOT NULL,
    filename text,
    outbox_id integer,
    uidmail integer
);


ALTER TABLE attachment_send OWNER TO postgres;

--
-- TOC entry 189 (class 1259 OID 16773)
-- Name: file_extension_id_seq; Type: SEQUENCE; Schema: public; Owner: si
--

CREATE SEQUENCE file_extension_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE file_extension_id_seq OWNER TO si;

--
-- TOC entry 190 (class 1259 OID 16775)
-- Name: file_extension; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE file_extension (
    id integer DEFAULT nextval('file_extension_id_seq'::regclass) NOT NULL,
    extension character varying(50),
    description character varying(50)
);


ALTER TABLE file_extension OWNER TO postgres;

--
-- TOC entry 181 (class 1259 OID 16399)
-- Name: inbox_id_inbox_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE inbox_id_inbox_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE inbox_id_inbox_seq OWNER TO postgres;

--
-- TOC entry 183 (class 1259 OID 16403)
-- Name: inbox; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE inbox (
    id_inbox integer DEFAULT nextval('inbox_id_inbox_seq'::regclass) NOT NULL,
    cc character varying(255),
    subject character varying(255),
    frommail character varying(255),
    tomail character varying(255),
    uidmail integer,
    datereceived timestamp with time zone DEFAULT (now())::timestamp without time zone NOT NULL,
    dateservermail text,
    fromname character varying(255),
    dateservermailformat text,
    tomailcc character varying(255),
    flagcc boolean DEFAULT false,
    flag_read integer DEFAULT 0,
    flag_reply integer DEFAULT 0,
    flag_forward integer DEFAULT 0,
    flag_important integer DEFAULT 0,
    flag_traitement integer DEFAULT 0,
    date_debut_traitement timestamp without time zone,
    user_id integer,
    date_fin_traitement timestamp without time zone
);


ALTER TABLE inbox OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 16922)
-- Name: level_id_level_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE level_id_level_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE level_id_level_seq OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16924)
-- Name: level; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE level (
    id_level integer DEFAULT nextval('level_id_level_seq'::regclass) NOT NULL,
    name character varying(255),
    redirect character varying(255)
);


ALTER TABLE level OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16960)
-- Name: lien; Type: TABLE; Schema: public; Owner: si
--

CREATE TABLE lien (
    id_lien integer NOT NULL,
    titre character varying(255),
    path character varying(255),
    icon character varying(255)
);


ALTER TABLE lien OWNER TO si;

--
-- TOC entry 203 (class 1259 OID 16958)
-- Name: lien_id_lien_seq; Type: SEQUENCE; Schema: public; Owner: si
--

CREATE SEQUENCE lien_id_lien_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE lien_id_lien_seq OWNER TO si;

--
-- TOC entry 2285 (class 0 OID 0)
-- Dependencies: 203
-- Name: lien_id_lien_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: si
--

ALTER SEQUENCE lien_id_lien_seq OWNED BY lien.id_lien;


--
-- TOC entry 185 (class 1259 OID 16708)
-- Name: mailclient_id_mailclient_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE mailclient_id_mailclient_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE mailclient_id_mailclient_seq OWNER TO postgres;

--
-- TOC entry 186 (class 1259 OID 16710)
-- Name: mailclient; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE mailclient (
    id_mailclient integer DEFAULT nextval('mailclient_id_mailclient_seq'::regclass) NOT NULL,
    mailclient character varying(255),
    nameclient character varying(255),
    typemail character varying(255),
    passmail text,
    hostmail character varying(255),
    portmail integer
);


ALTER TABLE mailclient OWNER TO postgres;

--
-- TOC entry 187 (class 1259 OID 16722)
-- Name: outbox_id_outbox_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE outbox_id_outbox_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE outbox_id_outbox_seq OWNER TO postgres;

--
-- TOC entry 188 (class 1259 OID 16734)
-- Name: outbox; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE outbox (
    id_outbox integer DEFAULT nextval('outbox_id_outbox_seq'::regclass) NOT NULL,
    cc character varying(255),
    subject character varying(255),
    frommail character varying(255),
    tomail character varying(255),
    uidmail integer,
    datesend timestamp with time zone DEFAULT (now())::timestamp without time zone NOT NULL,
    mailclient_id integer,
    flag_type character varying(20),
    inbox_id integer NOT NULL,
    user_id integer
);


ALTER TABLE outbox OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 16813)
-- Name: qualification_id_qualification_seq; Type: SEQUENCE; Schema: public; Owner: si
--

CREATE SEQUENCE qualification_id_qualification_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE qualification_id_qualification_seq OWNER TO si;

--
-- TOC entry 198 (class 1259 OID 16815)
-- Name: qualification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE qualification (
    id_qualification integer DEFAULT nextval('qualification_id_qualification_seq'::regclass) NOT NULL,
    commentaire character varying(255),
    uidmail integer,
    id_presta integer,
    inbox_id integer,
    statut_id integer,
    theme_id integer,
    date_qualification timestamp without time zone DEFAULT now() NOT NULL,
    outbox_id integer,
    user_id integer
);


ALTER TABLE qualification OWNER TO postgres;

--
-- TOC entry 195 (class 1259 OID 16805)
-- Name: statut_id_statut_seq; Type: SEQUENCE; Schema: public; Owner: si
--

CREATE SEQUENCE statut_id_statut_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE statut_id_statut_seq OWNER TO si;

--
-- TOC entry 196 (class 1259 OID 16807)
-- Name: statut; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE statut (
    id_statut integer DEFAULT nextval('statut_id_statut_seq'::regclass) NOT NULL,
    statut character varying(255),
    color character varying(250)
);


ALTER TABLE statut OWNER TO postgres;

--
-- TOC entry 193 (class 1259 OID 16797)
-- Name: theme_id_theme_seq; Type: SEQUENCE; Schema: public; Owner: si
--

CREATE SEQUENCE theme_id_theme_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE theme_id_theme_seq OWNER TO si;

--
-- TOC entry 194 (class 1259 OID 16799)
-- Name: theme; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE theme (
    id_theme integer DEFAULT nextval('theme_id_theme_seq'::regclass) NOT NULL,
    theme character varying(255)
);


ALTER TABLE theme OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16930)
-- Name: users_id_user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE users_id_user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_user_seq OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16932)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE users (
    id_user integer DEFAULT nextval('users_id_user_seq'::regclass) NOT NULL,
    matricule integer NOT NULL,
    mail character varying(255),
    password text,
    prenom character varying(255),
    level_id integer NOT NULL
);


ALTER TABLE users OWNER TO postgres;

--
-- TOC entry 2087 (class 2604 OID 16974)
-- Name: id_acces; Type: DEFAULT; Schema: public; Owner: si
--

ALTER TABLE ONLY acces ALTER COLUMN id_acces SET DEFAULT nextval('acces_id_acces_seq'::regclass);


--
-- TOC entry 2086 (class 2604 OID 16963)
-- Name: id_lien; Type: DEFAULT; Schema: public; Owner: si
--

ALTER TABLE ONLY lien ALTER COLUMN id_lien SET DEFAULT nextval('lien_id_lien_seq'::regclass);


--
-- TOC entry 2272 (class 0 OID 16971)
-- Dependencies: 206
-- Data for Name: acces; Type: TABLE DATA; Schema: public; Owner: si
--

COPY acces (id_acces, level_id, lien_id) FROM stdin;
32	1	6
33	1	7
34	1	9
35	1	8
36	1	10
37	1	11
38	1	12
39	1	13
46	2	12
47	5	6
48	5	7
49	5	10
\.


--
-- TOC entry 2292 (class 0 OID 0)
-- Dependencies: 205
-- Name: acces_id_acces_seq; Type: SEQUENCE SET; Schema: public; Owner: si
--

SELECT pg_catalog.setval('acces_id_acces_seq', 49, true);


--
-- TOC entry 2250 (class 0 OID 16413)
-- Dependencies: 184
-- Data for Name: attachment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY attachment (id_attachment, filename, inbox_id, uidmail, size) FROM stdin;
669	image001.png	680	1	22812
670	image001.png	681	2	22812
671	image001.png	682	3	22812
672	image001.png	684	4	22812
673	image001.png	685	6	22812
674	image001.png	687	7	22812
675	note.txt	687	7	3556
676	image001.png	688	9	22812
677	image001.gif	689	10	15037
678	image001.png	690	11	22812
679	image001.png	691	12	22812
680	image001.png	692	13	22812
681	quiz.sql	692	13	5187
682	image001.png	693	14	22812
689	bootstrap-chosen-master.zip	698	19	33371
690	image001.gif	699	20	2419
691	image001.gif	700	21	2419
692	image001.gif	701	22	2419
693	image001.gif	702	23	2419
694	image001.gif	703	24	2419
695	image001.gif	704	25	2419
696	image001.gif	705	26	2419
697	image001.gif	706	27	2419
698	image001.gif	707	28	2419
699	image001.gif	708	29	2419
683	quiz.sql	693	14	5187
684	image001.png	694	15	22812
685	image001.png	695	16	22812
686	image001.png	696	17	22812
687	image001.png	697	18	22812
688	image001.gif	698	19	15037
700	image001.gif	709	30	2419
701	image001.gif	712	33	2419
702	image001.gif	713	34	2419
703	image001.gif	714	35	2419
704	image001.gif	715	36	2419
705	image001.gif	716	37	2419
\.


--
-- TOC entry 2293 (class 0 OID 0)
-- Dependencies: 182
-- Name: attachment_id_attachment_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('attachment_id_attachment_seq', 709, true);


--
-- TOC entry 2258 (class 0 OID 16783)
-- Dependencies: 192
-- Data for Name: attachment_send; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY attachment_send (id_attachment_send, filename, outbox_id, uidmail) FROM stdin;
38	Logo TELETHON 2017.png	111	0
39	validationHeure.xls	111	0
45	Logo TELETHON 2017.png	119	1
46	diagramme fonctionnel br_fd.png	121	0
47	Logo TELETHON 2017.png	126	5
48	Demande codes Sogec.msg	131	34
49	image001.gif	132	34
\.


--
-- TOC entry 2294 (class 0 OID 0)
-- Dependencies: 191
-- Name: attachment_send_id_attachment_send_seq; Type: SEQUENCE SET; Schema: public; Owner: si
--

SELECT pg_catalog.setval('attachment_send_id_attachment_send_seq', 49, true);


--
-- TOC entry 2256 (class 0 OID 16775)
-- Dependencies: 190
-- Data for Name: file_extension; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY file_extension (id, extension, description) FROM stdin;
1	zip	fa fa-file-zip-o
2	rar	fa fa-file-zip-o
3	tar	fa fa-file-zip-o
4	gzip	fa fa-file-zip-o
5	mp3	fa fa-file-audio-o
6	mpeg	fa fa-file-audio-o
7	wav	fa fa-file-audio-o
8	ogg	fa fa-file-audio-o
9	wmv	fa fa-file-movie-o
10	webm	fa fa-file-movie-o
11	mpeg4	fa fa-file-movie-o
12	3gpp	fa fa-file-movie-o
13	mov	fa fa-file-movie-o
14	avi	fa fa-file-movie-o
15	mpegps	fa fa-file-movie-o
16	txt	fa fa-file-text
17	jpeg	fa fa-file-photo-o
18	jpg	fa fa-file-photo-o
19	png	fa fa-file-photo-o
20	gif	fa fa-file-photo-o
21	bmp	fa fa-file-photo-o
22	tif	fa fa-file-photo-o
23	tiff	fa fa-file-photo-o
24	doc	fa fa-file-word-o
25	docx	fa fa-file-word-o
26	xls	fa fa-file-excel-o
27	xlsx	fa fa-file-excel-o
28	ppt	fa fa-file-powerpoint-o
29	pptx	fa fa-file-powerpoint-o
30	pdf	fa fa-file-pdf-o
\.


--
-- TOC entry 2295 (class 0 OID 0)
-- Dependencies: 189
-- Name: file_extension_id_seq; Type: SEQUENCE SET; Schema: public; Owner: si
--

SELECT pg_catalog.setval('file_extension_id_seq', 30, true);


--
-- TOC entry 2249 (class 0 OID 16403)
-- Dependencies: 183
-- Data for Name: inbox; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY inbox (id_inbox, cc, subject, frommail, tomail, uidmail, datereceived, dateservermail, fromname, dateservermailformat, tomailcc, flagcc, flag_read, flag_reply, flag_forward, flag_important, flag_traitement, date_debut_traitement, user_id, date_fin_traitement) FROM stdin;
0	\N	\N	\N	\N	\N	2018-02-08 10:23:52.715093+03	\N	\N	\N	\N	f	0	0	0	0	0	\N	\N	\N
693		un nouveau mail	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	14	2018-02-12 13:08:35.799163+03	2017-11-09T05:15:12.000Z	Tolotsoa RANDRIANANTOANDRO	09-11-2017 08:15:12	\N	f	0	0	0	0	0	\N	\N	\N
695		yyyyyyyyyyyyyyyyy	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	16	2018-02-12 13:08:37.819745+03	2017-11-09T12:13:21.000Z	Tolotsoa RANDRIANANTOANDRO	09-11-2017 15:13:21	\N	f	0	0	0	0	0	\N	\N	\N
696		nouvel mail	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	17	2018-02-12 13:08:37.976857+03	2017-11-09T12:21:55.000Z	Tolotsoa RANDRIANANTOANDRO	09-11-2017 15:21:55	\N	f	0	0	0	0	0	\N	\N	\N
698		xxxxxxx	benjamin.randriamoramanana@vivetic.mg	si.presta1@vivetic.com	19	2018-02-12 13:08:38.341395+03	2017-11-10T07:36:12.000Z	Mahefarivo Benjamin RANDRIAMORAMANANA	10-11-2017 10:36:12	\N	f	0	0	0	0	0	\N	\N	\N
699		test1	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	20	2018-02-12 13:08:40.046422+03	2017-11-10T10:38:53.000Z	Tolotsoa RANDRIANANTOANDRO	10-11-2017 13:38:53	\N	f	0	0	0	0	0	\N	\N	\N
700	benjamin.randriamoramanana@vivetic.mg	test cc	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	21	2018-02-12 13:08:40.081411+03	2017-11-16T08:53:35.000Z	Tolotsoa RANDRIANANTOANDRO	16-11-2017 11:53:35	\N	f	0	0	0	0	0	\N	\N	\N
701	benjamin.randriamoramanana@vivetic.mg;mahery.rakotoson@vivetic.mg	test	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	22	2018-02-12 13:08:40.118442+03	2017-11-16T12:19:24.000Z	Tolotsoa RANDRIANANTOANDRO	16-11-2017 15:19:24	\N	f	0	0	0	0	0	\N	\N	\N
702		test notifier nouveau mail	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	23	2018-02-12 13:08:40.148559+03	2017-11-20T08:21:47.000Z	Tolotsoa RANDRIANANTOANDRO	20-11-2017 11:21:47	\N	f	0	0	0	0	0	\N	\N	\N
703		notifier extract	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	24	2018-02-12 13:08:40.20177+03	2017-11-20T08:47:34.000Z	Tolotsoa RANDRIANANTOANDRO	20-11-2017 11:47:34	\N	f	0	0	0	0	0	\N	\N	\N
704		notifier	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	25	2018-02-12 13:08:40.237246+03	2017-11-20T09:01:14.000Z	Tolotsoa RANDRIANANTOANDRO	20-11-2017 12:01:14	\N	f	0	0	0	0	0	\N	\N	\N
705		notifier test test	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	26	2018-02-12 13:08:40.275307+03	2017-11-20T09:08:15.000Z	Tolotsoa RANDRIANANTOANDRO	20-11-2017 12:08:15	\N	f	0	0	0	0	0	\N	\N	\N
681		test	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	2	2018-02-12 13:08:25.616383+03	2017-11-02T11:24:11.000Z	Tolotsoa RANDRIANANTOANDRO	02-11-2017 14:24:11	\N	f	1	1	0	0	4	2018-02-12 14:47:01.771163	2	\N
690		test	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	11	2018-02-12 13:08:33.406057+03	2017-11-08T12:42:37.000Z	Tolotsoa RANDRIANANTOANDRO	08-11-2017 15:42:37	\N	f	1	0	0	0	1	\N	2	\N
685		test	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	6	2018-02-12 13:08:28.33632+03	2017-11-06T07:43:00.000Z	Tolotsoa RANDRIANANTOANDRO	06-11-2017 10:43:00	\N	f	1	1	0	0	4	2018-02-13 15:29:10.506327	2	\N
687		test	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	7	2018-02-12 13:08:29.860621+03	2017-11-06T12:26:07.000Z	Tolotsoa RANDRIANANTOANDRO	06-11-2017 15:26:07	\N	f	0	0	0	0	2	\N	7	\N
689	tolotsoa.randrianatoandro@vivetic.mg	XXXXXXXXXXXXXX	benjamin.randriamoramanana@vivetic.mg	si.presta1@vivetic.com	10	2018-02-12 13:08:31.603814+03	2017-11-08T10:54:58.000Z	Mahefarivo Benjamin RANDRIAMORAMANANA	08-11-2017 13:54:58	\N	f	0	0	0	0	0	\N	\N	\N
686		test	rtolotsoam@gmail.com	si.presta1@vivetic.com	8	2018-02-12 13:08:29.850276+03	2017-11-07T06:59:27.000Z	randrianatoandro tolotsoa	07-11-2017 09:59:27	\N	f	0	0	0	0	0	\N	\N	\N
682		xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	3	2018-02-12 13:08:26.886931+03	2017-11-03T05:40:08.000Z	Tolotsoa RANDRIANANTOANDRO	03-11-2017 08:40:08	\N	f	1	1	0	0	6	2018-02-12 14:55:07.981722	2	\N
683		bonjour	rtolotsoam@gmail.com	si.presta1@vivetic.com	5	2018-02-12 13:08:28.233185+03	2017-11-03T05:54:37.000Z	randrianatoandro tolotsoa	03-11-2017 08:54:37	\N	f	1	1	0	0	2	2018-02-12 18:04:02.676705	2	\N
697		test	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	18	2018-02-12 13:08:38.093901+03	2017-11-09T07:14:18.000Z	Tolotsoa RANDRIANANTOANDRO	09-11-2017 10:14:18	\N	f	0	0	0	0	0	\N	\N	\N
688		xxxxxxxxxxxxxxxxxxxxxxxxxxxx	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	9	2018-02-12 13:08:31.488917+03	2017-11-08T10:51:05.000Z	Tolotsoa RANDRIANANTOANDRO	08-11-2017 13:51:05	\N	f	0	0	0	0	0	\N	\N	\N
691		test	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	12	2018-02-12 13:08:33.569402+03	2017-11-08T12:44:13.000Z	Tolotsoa RANDRIANANTOANDRO	08-11-2017 15:44:13	\N	f	0	0	0	0	0	\N	\N	\N
692		mail	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	13	2018-02-12 13:08:33.741021+03	2017-11-09T05:12:44.000Z	Tolotsoa RANDRIANANTOANDRO	09-11-2017 08:12:44	\N	f	0	0	0	0	0	\N	\N	\N
706		1	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	27	2018-02-12 13:08:40.307177+03	2017-11-20T10:52:53.000Z	Tolotsoa RANDRIANANTOANDRO	20-11-2017 13:52:53	\N	f	0	0	0	0	0	\N	\N	\N
707		2	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	28	2018-02-12 13:08:40.362017+03	2017-11-20T10:53:01.000Z	Tolotsoa RANDRIANANTOANDRO	20-11-2017 13:53:01	\N	f	0	0	0	0	0	\N	\N	\N
708	si.presta2@vivetic.com;si.presta3@vivetic.com	test mail copie	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	29	2018-02-12 13:08:40.406373+03	2017-11-20T13:06:28.000Z	Tolotsoa RANDRIANANTOANDRO	20-11-2017 16:06:28	\N	f	0	0	0	0	0	\N	\N	\N
709	si.presta2@vivetic.com;si.presta3@vivetic.com	copie multiple	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	30	2018-02-12 13:08:40.440221+03	2017-11-20T13:49:43.000Z	Tolotsoa RANDRIANANTOANDRO	20-11-2017 16:49:43	\N	f	0	0	0	0	0	\N	\N	\N
710		gmail test	rtolotsoam@gmail.com	si.presta1@vivetic.com	31	2018-02-12 13:08:40.447857+03	2017-11-21T05:23:30.000Z	randrianatoandro tolotsoa	21-11-2017 08:23:30	\N	f	0	0	0	0	0	\N	\N	\N
711		envoi_21-11-2017-09-37	rtolotsoam@gmail.com	si.presta1@vivetic.com	32	2018-02-12 13:08:40.452602+03	2017-11-21T06:37:38.000Z	randrianatoandro tolotsoa	21-11-2017 09:37:38	\N	f	0	0	0	0	0	\N	\N	\N
712		envoi_21-11-2017-09-41	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	33	2018-02-12 13:08:40.490651+03	2017-11-21T06:41:39.000Z	Tolotsoa RANDRIANANTOANDRO	21-11-2017 09:41:39	\N	f	0	0	0	0	0	\N	\N	\N
714		test log 22-11-2017	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	35	2018-02-12 13:08:40.558456+03	2017-11-22T06:54:47.000Z	Tolotsoa RANDRIANANTOANDRO	22-11-2017 09:54:47	\N	f	0	0	0	0	0	\N	\N	\N
716		test server 23-11-2017 15:42	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	37	2018-02-12 13:08:42.527285+03	2017-11-23T12:41:33.000Z	Tolotsoa RANDRIANANTOANDRO	23-11-2017 15:41:33	\N	f	0	0	0	0	0	\N	\N	\N
713		envoi_21-11-2017-09-42	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	34	2018-02-12 13:08:40.5269+03	2017-11-21T06:42:03.000Z	Tolotsoa RANDRIANANTOANDRO	21-11-2017 09:42:03	\N	f	1	1	1	1	4	2018-02-14 09:48:49	2	\N
694		test	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	15	2018-02-12 13:08:35.916463+03	2017-11-09T06:05:00.000Z	Tolotsoa RANDRIANANTOANDRO	09-11-2017 09:05:00	\N	f	0	0	0	0	0	\N	\N	\N
684		test yyyyyyyyyyyyyyyy	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	4	2018-02-12 13:08:28.241839+03	2017-11-03T05:43:34.000Z	Tolotsoa RANDRIANANTOANDRO	03-11-2017 08:43:34	\N	f	1	1	0	0	3	2018-02-12 14:59:03.111207	2	\N
680		test	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	1	2018-02-12 13:08:23.461488+03	2017-11-02T08:53:03.000Z	Tolotsoa RANDRIANANTOANDRO	02-11-2017 11:53:03	\N	f	1	1	0	0	6	2018-02-12 14:46:16.397582	2	\N
715		test notifier 23-11-2017	tolotsoa.randrianatoandro@vivetic.mg	si.presta1@vivetic.com	36	2018-02-12 13:08:40.596908+03	2017-11-23T08:57:08.000Z	Tolotsoa RANDRIANANTOANDRO	23-11-2017 11:57:08	\N	f	0	0	0	1	0	\N	7	\N
\.


--
-- TOC entry 2296 (class 0 OID 0)
-- Dependencies: 181
-- Name: inbox_id_inbox_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('inbox_id_inbox_seq', 718, true);


--
-- TOC entry 2266 (class 0 OID 16924)
-- Dependencies: 200
-- Data for Name: level; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY level (id_level, name, redirect) FROM stdin;
1	admin	user
5	manager	inbox
2	op	inbox_op
\.


--
-- TOC entry 2297 (class 0 OID 0)
-- Dependencies: 199
-- Name: level_id_level_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('level_id_level_seq', 8, true);


--
-- TOC entry 2270 (class 0 OID 16960)
-- Dependencies: 204
-- Data for Name: lien; Type: TABLE DATA; Schema: public; Owner: si
--

COPY lien (id_lien, titre, path, icon) FROM stdin;
7	GESTION UTILISATEURS	user	fa fa-group
8	GESTION D'ACCÈS	acces	fa fa-gears
6	MAIL	inbox	fa fa-envelope
11	GESTION DES LIENS	lien	fa fa-link
10	HISTORIQUE MAIL	history	fa fa-area-chart
9	GESTION MAIL CLIENTS	client	fa fa-pie-chart
12	BOITE DE RÉCEPTION	inbox_op	fa fa-envelope
13	GESTION LEVEL	level	fa fa-sort-amount-desc
\.


--
-- TOC entry 2298 (class 0 OID 0)
-- Dependencies: 203
-- Name: lien_id_lien_seq; Type: SEQUENCE SET; Schema: public; Owner: si
--

SELECT pg_catalog.setval('lien_id_lien_seq', 15, true);


--
-- TOC entry 2252 (class 0 OID 16710)
-- Dependencies: 186
-- Data for Name: mailclient; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY mailclient (id_mailclient, mailclient, nameclient, typemail, passmail, hostmail, portmail) FROM stdin;
4	autre	Autre	\N	\N	\N	\N
1	si.presta1@vivetic.com	test1	imap	bf91fc9704cef3a4c365	mail.vivetic.com	143
2	si.presta2@vivetic.com	test2	imap	bf91fc9704cef3a4c365	mail.vivetic.com	143
12	si.presta3@vivetic.com	test3	imap	bf91fc9704cef3a4c365	mail.vivetic.com	143
14	tolotsoa.randrianatoandro@vivetic.mg	test4	pop	dba3eab32fb4f2ce	192.168.10.4	110
16	mahery.rakotoson@vivetic.mg	test5	pop	86ccdaa916c6bba4	192.168.10.4	110
\.


--
-- TOC entry 2299 (class 0 OID 0)
-- Dependencies: 185
-- Name: mailclient_id_mailclient_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('mailclient_id_mailclient_seq', 19, true);


--
-- TOC entry 2254 (class 0 OID 16734)
-- Dependencies: 188
-- Data for Name: outbox; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY outbox (id_outbox, cc, subject, frommail, tomail, uidmail, datesend, mailclient_id, flag_type, inbox_id, user_id) FROM stdin;
111		Test d'envoi de mail	tolotsoa.randrianatoandro@vivetic.mg	haingo.randrianarisoa@vivetic.mg	0	2018-02-08 10:24:38.877738+03	4	new_msg	0	1
119		RE: test	si.presta1@vivetic.com	tolotsoa.randrianatoandro@vivetic.mg	1	2018-02-12 14:46:16.376101+03	1	reply	680	2
120		RE: test	si.presta1@vivetic.com	tolotsoa.randrianatoandro@vivetic.mg	2	2018-02-12 14:47:01.739844+03	1	reply	681	2
121		sujet test	tolotsoa.randrianatoandro@vivetic.mg	haingo.randrianarisoa@vivetic.mg	0	2018-02-12 14:50:58.798183+03	4	new_msg	0	1
122	haingo.randrianarisoa@vivetic.mg	RE: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx	si.presta1@vivetic.com	tolotsoa.randrianatoandro@vivetic.mg	3	2018-02-12 14:55:07.954865+03	1	reply	682	2
123	haingo.randrianarisoa@vivetic.mg	RE: test yyyyyyyyyyyyyyyy	si.presta1@vivetic.com	tolotsoa.randrianatoandro@vivetic.mg	4	2018-02-12 14:59:03.082456+03	1	reply	684	2
126	haingo.randrianarisoa@vivetic.mg	RE: bonjour	si.presta1@vivetic.com	rtolotsoam@gmail.com	5	2018-02-12 18:04:02.648857+03	1	reply	683	2
128		RE: test	si.presta1@vivetic.com	tolotsoa.randrianatoandro@vivetic.mg	6	2018-02-13 15:29:07.520008+03	1	reply	685	2
129		RE: test	si.presta1@vivetic.com	tolotsoa.randrianatoandro@vivetic.mg	6	2018-02-13 15:29:10.490807+03	1	reply	685	2
130		RE: xxxxxxxxxxxxxxxxxxxxxxxxxxxx	si.presta1@vivetic.com	tolotsoa.randrianatoandro@vivetic.mg	9	2018-02-13 15:33:39.07661+03	1	reply	688	2
131		RE: envoi_21-11-2017-09-42	si.presta1@vivetic.com	haingo.randrianarisoa@vivetic.mg	34	2018-02-14 09:33:22.357358+03	1	reply	713	2
132		TR: envoi_21-11-2017-09-42	si.presta1@vivetic.com	haingo.randrianarisoa@vivetic.mg	34	2018-02-14 09:48:49.756827+03	1	forward	713	2
\.


--
-- TOC entry 2300 (class 0 OID 0)
-- Dependencies: 187
-- Name: outbox_id_outbox_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('outbox_id_outbox_seq', 132, true);


--
-- TOC entry 2264 (class 0 OID 16815)
-- Dependencies: 198
-- Data for Name: qualification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY qualification (id_qualification, commentaire, uidmail, id_presta, inbox_id, statut_id, theme_id, date_qualification, outbox_id, user_id) FROM stdin;
109	Commentaire	1	1	680	2	1	2018-02-12 14:46:16.392766	119	2
110	Commentaire	2	1	681	1	2	2018-02-12 14:47:01.750158	120	2
114	commentaires	4	1	684	2	1	2018-02-12 14:59:03.095275	123	2
115	mail traité	4	1	684	3	1	2018-02-12 14:59:23.652989	0	2
117	Commentaire	5	1	683	1	2	2018-02-12 18:04:02.667468	126	2
120	Rejet mail	7	1	687	2	\N	2018-02-16 09:39:16.769767	0	2
122	dezfaq	7	1	687	1	\N	2018-02-16 12:01:51.138329	0	2
111	Commentaire 2	2	1	681	3	2	2018-02-12 14:47:15.234573	0	2
113	Commentaire	3	1	682	3	2	2018-02-12 14:55:07.967247	122	2
119	reqy	34	1	713	3	1	2018-02-14 09:33:22.370434	131	2
\.


--
-- TOC entry 2301 (class 0 OID 0)
-- Dependencies: 197
-- Name: qualification_id_qualification_seq; Type: SEQUENCE SET; Schema: public; Owner: si
--

SELECT pg_catalog.setval('qualification_id_qualification_seq', 133, true);


--
-- TOC entry 2262 (class 0 OID 16807)
-- Dependencies: 196
-- Data for Name: statut; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY statut (id_statut, statut, color) FROM stdin;
1	A suivre	#4caf50
2	Rejeté	#9c27b0
3	Traité	#ff80ab
\.


--
-- TOC entry 2302 (class 0 OID 0)
-- Dependencies: 195
-- Name: statut_id_statut_seq; Type: SEQUENCE SET; Schema: public; Owner: si
--

SELECT pg_catalog.setval('statut_id_statut_seq', 3, true);


--
-- TOC entry 2260 (class 0 OID 16799)
-- Dependencies: 194
-- Data for Name: theme; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY theme (id_theme, theme) FROM stdin;
1	Thème 1
2	Thème 2
\.


--
-- TOC entry 2303 (class 0 OID 0)
-- Dependencies: 193
-- Name: theme_id_theme_seq; Type: SEQUENCE SET; Schema: public; Owner: si
--

SELECT pg_catalog.setval('theme_id_theme_seq', 2, true);


--
-- TOC entry 2268 (class 0 OID 16932)
-- Dependencies: 202
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY users (id_user, matricule, mail, password, prenom, level_id) FROM stdin;
7	6833	haingo.randianarisoa@vivetic.mg	dac6bcd762b1f6ac	Haingo	2
11	9092	tolotsoa.randrianatoandro@vivetic.mg	9f9be38c23f4aef5	Tolotsoa	1
\.


--
-- TOC entry 2304 (class 0 OID 0)
-- Dependencies: 201
-- Name: users_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('users_id_user_seq', 15, true);


--
-- TOC entry 2124 (class 2606 OID 16976)
-- Name: acces_pkey; Type: CONSTRAINT; Schema: public; Owner: si
--

ALTER TABLE ONLY acces
    ADD CONSTRAINT acces_pkey PRIMARY KEY (id_acces);


--
-- TOC entry 2095 (class 2606 OID 16421)
-- Name: attachment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY attachment
    ADD CONSTRAINT attachment_pkey PRIMARY KEY (id_attachment);


--
-- TOC entry 2106 (class 2606 OID 16791)
-- Name: attachment_send_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY attachment_send
    ADD CONSTRAINT attachment_send_pkey PRIMARY KEY (id_attachment_send);


--
-- TOC entry 2104 (class 2606 OID 16780)
-- Name: file_extension_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY file_extension
    ADD CONSTRAINT file_extension_pkey PRIMARY KEY (id);


--
-- TOC entry 2092 (class 2606 OID 16412)
-- Name: inbox_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY inbox
    ADD CONSTRAINT inbox_pkey PRIMARY KEY (id_inbox);


--
-- TOC entry 2118 (class 2606 OID 16929)
-- Name: level_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY level
    ADD CONSTRAINT level_pkey PRIMARY KEY (id_level);


--
-- TOC entry 2122 (class 2606 OID 16968)
-- Name: lien_pkey; Type: CONSTRAINT; Schema: public; Owner: si
--

ALTER TABLE ONLY lien
    ADD CONSTRAINT lien_pkey PRIMARY KEY (id_lien);


--
-- TOC entry 2097 (class 2606 OID 16718)
-- Name: mailclient_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY mailclient
    ADD CONSTRAINT mailclient_pkey PRIMARY KEY (id_mailclient);


--
-- TOC entry 2101 (class 2606 OID 16743)
-- Name: outbox_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY outbox
    ADD CONSTRAINT outbox_pkey PRIMARY KEY (id_outbox);


--
-- TOC entry 2115 (class 2606 OID 16823)
-- Name: qualification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY qualification
    ADD CONSTRAINT qualification_pkey PRIMARY KEY (id_qualification);


--
-- TOC entry 2110 (class 2606 OID 16812)
-- Name: statut_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY statut
    ADD CONSTRAINT statut_pkey PRIMARY KEY (id_statut);


--
-- TOC entry 2108 (class 2606 OID 16804)
-- Name: theme_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY theme
    ADD CONSTRAINT theme_pkey PRIMARY KEY (id_theme);


--
-- TOC entry 2120 (class 2606 OID 16940)
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);


--
-- TOC entry 2098 (class 1259 OID 16880)
-- Name: fki_outbox_inbox_id_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_outbox_inbox_id_fkey ON outbox USING btree (inbox_id);


--
-- TOC entry 2111 (class 1259 OID 16886)
-- Name: fki_qualification_inbox_id_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_qualification_inbox_id_fk ON qualification USING btree (inbox_id);


--
-- TOC entry 2112 (class 1259 OID 16898)
-- Name: fki_qualification_outbox_id_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_qualification_outbox_id_fk ON qualification USING btree (outbox_id);


--
-- TOC entry 2088 (class 1259 OID 16905)
-- Name: inbox_flag_reply_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX inbox_flag_reply_idx ON inbox USING btree (flag_reply);


--
-- TOC entry 2089 (class 1259 OID 16903)
-- Name: inbox_id_inbox_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX inbox_id_inbox_idx ON inbox USING btree (id_inbox);


--
-- TOC entry 2090 (class 1259 OID 16904)
-- Name: inbox_id_inbox_uidmail_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX inbox_id_inbox_uidmail_idx ON inbox USING btree (id_inbox, uidmail);


--
-- TOC entry 2093 (class 1259 OID 16906)
-- Name: inbox_tomail_uidmail_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX inbox_tomail_uidmail_idx ON inbox USING btree (tomail, uidmail);


--
-- TOC entry 2099 (class 1259 OID 16899)
-- Name: outbox_id_outbox_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX outbox_id_outbox_idx ON outbox USING btree (id_outbox);


--
-- TOC entry 2102 (class 1259 OID 16900)
-- Name: outbox_uidmail_inbox_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX outbox_uidmail_inbox_id_idx ON outbox USING btree (uidmail, inbox_id);


--
-- TOC entry 2113 (class 1259 OID 16901)
-- Name: qualification_id_qualification_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX qualification_id_qualification_idx ON qualification USING btree (id_qualification);


--
-- TOC entry 2116 (class 1259 OID 16902)
-- Name: qualification_uidmail_inbox_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX qualification_uidmail_inbox_id_idx ON qualification USING btree (uidmail, inbox_id);


--
-- TOC entry 2131 (class 2606 OID 16977)
-- Name: acces_level_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: si
--

ALTER TABLE ONLY acces
    ADD CONSTRAINT acces_level_id_fkey FOREIGN KEY (level_id) REFERENCES level(id_level) ON DELETE CASCADE;


--
-- TOC entry 2132 (class 2606 OID 16982)
-- Name: acces_lien_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: si
--

ALTER TABLE ONLY acces
    ADD CONSTRAINT acces_lien_id_fkey FOREIGN KEY (lien_id) REFERENCES lien(id_lien) ON DELETE CASCADE;


--
-- TOC entry 2125 (class 2606 OID 16422)
-- Name: attachment_inbox_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY attachment
    ADD CONSTRAINT attachment_inbox_id_fkey FOREIGN KEY (inbox_id) REFERENCES inbox(id_inbox) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2128 (class 2606 OID 16792)
-- Name: attachment_send_outbox_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY attachment_send
    ADD CONSTRAINT attachment_send_outbox_id_fkey FOREIGN KEY (outbox_id) REFERENCES outbox(id_outbox) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2127 (class 2606 OID 16875)
-- Name: outbox_inbox_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY outbox
    ADD CONSTRAINT outbox_inbox_id_fkey FOREIGN KEY (inbox_id) REFERENCES inbox(id_inbox) ON DELETE CASCADE;


--
-- TOC entry 2126 (class 2606 OID 16744)
-- Name: outbox_mailclient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY outbox
    ADD CONSTRAINT outbox_mailclient_id_fkey FOREIGN KEY (mailclient_id) REFERENCES mailclient(id_mailclient) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2129 (class 2606 OID 16881)
-- Name: qualification_inbox_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY qualification
    ADD CONSTRAINT qualification_inbox_id_fk FOREIGN KEY (inbox_id) REFERENCES inbox(id_inbox) ON DELETE CASCADE;


--
-- TOC entry 2130 (class 2606 OID 16990)
-- Name: users_level_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_level_id_fkey FOREIGN KEY (level_id) REFERENCES level(id_level) ON DELETE CASCADE;


--
-- TOC entry 2279 (class 0 OID 0)
-- Dependencies: 6
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- TOC entry 2282 (class 0 OID 0)
-- Dependencies: 191
-- Name: attachment_send_id_attachment_send_seq; Type: ACL; Schema: public; Owner: si
--

REVOKE ALL ON SEQUENCE attachment_send_id_attachment_send_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE attachment_send_id_attachment_send_seq FROM si;
GRANT ALL ON SEQUENCE attachment_send_id_attachment_send_seq TO si;
GRANT ALL ON SEQUENCE attachment_send_id_attachment_send_seq TO PUBLIC;


--
-- TOC entry 2283 (class 0 OID 0)
-- Dependencies: 189
-- Name: file_extension_id_seq; Type: ACL; Schema: public; Owner: si
--

REVOKE ALL ON SEQUENCE file_extension_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE file_extension_id_seq FROM si;
GRANT ALL ON SEQUENCE file_extension_id_seq TO si;
GRANT ALL ON SEQUENCE file_extension_id_seq TO PUBLIC;


--
-- TOC entry 2284 (class 0 OID 0)
-- Dependencies: 181
-- Name: inbox_id_inbox_seq; Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON SEQUENCE inbox_id_inbox_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE inbox_id_inbox_seq FROM postgres;
GRANT ALL ON SEQUENCE inbox_id_inbox_seq TO postgres;
GRANT ALL ON SEQUENCE inbox_id_inbox_seq TO PUBLIC;


--
-- TOC entry 2286 (class 0 OID 0)
-- Dependencies: 187
-- Name: outbox_id_outbox_seq; Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON SEQUENCE outbox_id_outbox_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE outbox_id_outbox_seq FROM postgres;
GRANT ALL ON SEQUENCE outbox_id_outbox_seq TO postgres;
GRANT ALL ON SEQUENCE outbox_id_outbox_seq TO PUBLIC;


--
-- TOC entry 2287 (class 0 OID 0)
-- Dependencies: 188
-- Name: outbox; Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON TABLE outbox FROM PUBLIC;
REVOKE ALL ON TABLE outbox FROM postgres;
GRANT ALL ON TABLE outbox TO postgres;
GRANT ALL ON TABLE outbox TO PUBLIC;


--
-- TOC entry 2288 (class 0 OID 0)
-- Dependencies: 197
-- Name: qualification_id_qualification_seq; Type: ACL; Schema: public; Owner: si
--

REVOKE ALL ON SEQUENCE qualification_id_qualification_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE qualification_id_qualification_seq FROM si;
GRANT ALL ON SEQUENCE qualification_id_qualification_seq TO si;
GRANT ALL ON SEQUENCE qualification_id_qualification_seq TO PUBLIC;


--
-- TOC entry 2289 (class 0 OID 0)
-- Dependencies: 195
-- Name: statut_id_statut_seq; Type: ACL; Schema: public; Owner: si
--

REVOKE ALL ON SEQUENCE statut_id_statut_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE statut_id_statut_seq FROM si;
GRANT ALL ON SEQUENCE statut_id_statut_seq TO si;
GRANT ALL ON SEQUENCE statut_id_statut_seq TO PUBLIC;


--
-- TOC entry 2290 (class 0 OID 0)
-- Dependencies: 193
-- Name: theme_id_theme_seq; Type: ACL; Schema: public; Owner: si
--

REVOKE ALL ON SEQUENCE theme_id_theme_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE theme_id_theme_seq FROM si;
GRANT ALL ON SEQUENCE theme_id_theme_seq TO si;
GRANT ALL ON SEQUENCE theme_id_theme_seq TO PUBLIC;


--
-- TOC entry 2291 (class 0 OID 0)
-- Dependencies: 202
-- Name: users; Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON TABLE users FROM PUBLIC;
REVOKE ALL ON TABLE users FROM postgres;
GRANT ALL ON TABLE users TO postgres;
GRANT ALL ON TABLE users TO PUBLIC;


-- Completed on 2018-02-20 15:43:16

--
-- PostgreSQL database dump complete
--

