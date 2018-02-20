-- User: fmode_user
-- DROP USER fmode_user;

CREATE USER fmode_user WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  NOCREATEDB
  NOCREATEROLE
  NOREPLICATION;

-- SCHEMA: fmode

-- DROP SCHEMA fmode ;
CREATE SCHEMA fmode
    AUTHORIZATION fmode_user;



-- Table: fmode.failure_modes

-- DROP TABLE fmode.failure_modes;

CREATE TABLE fmode.failure_modes
(
    id uuid,
    functional_state character varying(20) COLLATE pg_catalog."default" DEFAULT 'running'::character varying,
    service_effect text COLLATE pg_catalog."default",
    platform_effect text COLLATE pg_catalog."default",
    potential_cause text COLLATE pg_catalog."default",
    probability smallint DEFAULT 1,
    detect_failures text COLLATE pg_catalog."default",
    response_action text COLLATE pg_catalog."default",
    mitigation text COLLATE pg_catalog."default",
    detectability smallint DEFAULT 1,
    safety_concern character varying COLLATE pg_catalog."default" DEFAULT 5,
    creator text COLLATE pg_catalog."default",
    version bigint DEFAULT 0,
    lastupdated bigint
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE fmode.failure_modes
    OWNER to fmode_user;
