--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 15.1

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: customer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customer (
    id uuid NOT NULL,
    customer_name character(50) NOT NULL
);


ALTER TABLE public.customer OWNER TO postgres;

--
-- Name: customer_address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customer_address (
    id uuid NOT NULL,
    customer_id uuid NOT NULL,
    address character(255) NOT NULL
);


ALTER TABLE public.customer_address OWNER TO postgres;

--
-- Name: customer_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customer_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customer_id OWNER TO postgres;

--
-- Name: payment_method; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment_method (
    id uuid NOT NULL,
    name character(255) NOT NULL,
    is_active boolean NOT NULL
);


ALTER TABLE public.payment_method OWNER TO postgres;

--
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id uuid NOT NULL,
    name character(255) NOT NULL,
    price double precision NOT NULL
);


ALTER TABLE public.product OWNER TO postgres;

--
-- Name: transaction_payment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction_payment (
    id uuid NOT NULL,
    transaction_id uuid NOT NULL,
    payment_method_id uuid NOT NULL,
    status boolean NOT NULL
);


ALTER TABLE public.transaction_payment OWNER TO postgres;

--
-- Name: transaction_product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction_product (
    id uuid NOT NULL,
    transaction_id uuid NOT NULL,
    products_id uuid NOT NULL,
    qty integer NOT NULL,
    product_price double precision NOT NULL,
    total double precision NOT NULL
);


ALTER TABLE public.transaction_product OWNER TO postgres;

--
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    id uuid NOT NULL,
    transaction_code character varying(255) NOT NULL,
    customer_id uuid NOT NULL,
    employer_name character varying(255) NOT NULL,
    status boolean NOT NULL,
    customer_address_id uuid
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- Name: customer_address customer_address_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer_address
    ADD CONSTRAINT customer_address_pkey PRIMARY KEY (id);


--
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (id);


--
-- Name: payment_method payment_method_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_method
    ADD CONSTRAINT payment_method_pkey PRIMARY KEY (id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: transaction_payment transaction_payment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_payment
    ADD CONSTRAINT transaction_payment_pkey PRIMARY KEY (id);


--
-- Name: transaction_product transaction_product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_product
    ADD CONSTRAINT transaction_product_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: customer_address customer_address_customer_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer_address
    ADD CONSTRAINT customer_address_customer_id_foreign FOREIGN KEY (customer_id) REFERENCES public.customer(id);


--
-- Name: transaction_payment transaction_payment_payment_method_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_payment
    ADD CONSTRAINT transaction_payment_payment_method_id_foreign FOREIGN KEY (payment_method_id) REFERENCES public.payment_method(id);


--
-- Name: transaction_payment transaction_payment_transaction_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_payment
    ADD CONSTRAINT transaction_payment_transaction_id_foreign FOREIGN KEY (transaction_id) REFERENCES public.transactions(id);


--
-- Name: transaction_product transaction_product_products_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_product
    ADD CONSTRAINT transaction_product_products_id_foreign FOREIGN KEY (products_id) REFERENCES public.product(id);


--
-- Name: transaction_product transaction_product_transaction_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_product
    ADD CONSTRAINT transaction_product_transaction_id_foreign FOREIGN KEY (transaction_id) REFERENCES public.transactions(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

