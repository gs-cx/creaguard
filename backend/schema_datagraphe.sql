-- ==============================================================================
-- DATAGRAPHE : SCHEMA INITIAL DE LA BASE DE DONNEES POSTGIS
-- ==============================================================================

-- 1. Activation du moteur spatial (PostGIS)
CREATE EXTENSION IF NOT EXISTS postgis;

-- 2. Création de la table principale des bâtiments (Croisement IGN / Cadastre)
CREATE TABLE IF NOT EXISTS batiments_france (
    id_batiment SERIAL PRIMARY KEY,
    id_parcelle VARCHAR(20) NOT NULL, -- Référence cadastrale
    commune VARCHAR(100),
    code_postal VARCHAR(5),
    -- La géométrie en Lambert 93 (SRID 2154), standard français parfait pour calculer des mètres carrés
    geom geometry(Polygon, 2154), 
    surface_m2 NUMERIC,
    orientation_principale VARCHAR(20), -- Ex: 'Sud', 'Sud-Ouest'
    annee_construction INTEGER
);

-- 3. Création de la table des entreprises (Croisement SIRENE / Contacts)
CREATE TABLE IF NOT EXISTS entreprises_prospects (
    siret VARCHAR(14) PRIMARY KEY,
    id_batiment INTEGER REFERENCES batiments_france(id_batiment),
    nom_entreprise VARCHAR(255) NOT NULL,
    code_naf VARCHAR(6),
    dirigeant_nom VARCHAR(150),
    dirigeant_fonction VARCHAR(100),
    email_contact VARCHAR(255),
    telephone_contact VARCHAR(20),
    etiquette_dpe VARCHAR(1) -- Pour le scoring énergétique
);

-- 4. Création des Index Spatiaux et Classiques (CRUCIAL POUR LA PERFORMANCE)
-- Index spatial (GIST) pour rendre les requêtes géographiques foudroyantes
CREATE INDEX IF NOT EXISTS idx_batiments_geom ON batiments_france USING GIST (geom);

-- Index pour accélérer la recherche par secteur d'activité
CREATE INDEX IF NOT EXISTS idx_entreprises_naf ON entreprises_prospects(code_naf);

-- Index pour accélérer la recherche par commune
CREATE INDEX IF NOT EXISTS idx_batiments_commune ON batiments_france(commune);

-- ==============================================================================
-- VUE SÉCURISÉE (Pour l'API et la démo du site web)
-- ==============================================================================
CREATE OR REPLACE VIEW vue_recherche_live AS
SELECT 
    e.nom_entreprise,
    e.code_naf,
    b.commune AS ville,
    e.dirigeant_fonction AS fonction,
    -- Floutage cryptographique pour le site vitrine
    CONCAT(SUBSTRING(e.dirigeant_nom, 1, 1), '***') AS nom_floute,
    CONCAT('contact@', SUBSTRING(e.email_contact FROM POSITION('@' IN e.email_contact) + 1)) AS email_floute,
    CONCAT(SUBSTRING(e.telephone_contact, 1, 4), ' ** ** **') AS telephone_floute
FROM 
    entreprises_prospects e
JOIN 
    batiments_france b ON e.id_batiment = b.id_batiment;
