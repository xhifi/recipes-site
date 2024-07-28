-----------------------
-- Create Recipes Table
CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    tags TEXT[],
    instructions TEXT,
    cooking_time INTERVAL,
    preparing_time INTERVAL,
    slug TEXT UNIQUE NOT NULL
);
CREATE INDEX idx_recipes_slug ON recipes(slug);

-- Create a function to generate slugs
CREATE OR REPLACE FUNCTION generate_slug() RETURNS TRIGGER AS $$
BEGIN
    NEW.slug := LOWER(REGEXP_REPLACE(NEW.name, '[^a-zA-Z0-9\s]', '', 'g')) || '-' || NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger that calls the generate_slug function before insert or update
CREATE TRIGGER set_slug
BEFORE INSERT ON recipes
FOR EACH ROW
EXECUTE FUNCTION generate_slug();

---------------------------
-- Create Ingredients Table
CREATE TABLE IF NOT EXISTS ingredients (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER NOT NULL REFERENCES recipes(id),
    name VARCHAR(255) NOT NULL,
    quantity VARCHAR(50),
    unit VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_recipe_id ON ingredients(recipe_id);

---------------------------
-- Create Collections Table
CREATE TABLE collections (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);
-- Create Composite Table for collections of recipes
CREATE TABLE collection_recipes (
    collection_id INTEGER NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
    recipe_id INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    PRIMARY KEY (collection_id, recipe_id)
);

--------------------
-- Create Table Tags
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);
-- Create Composite Join Table for Tags of Recipes
CREATE TABLE recipe_tags (
    recipe_id INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (recipe_id, tag_id)
);

--------------------------------------
-- Create recipe_with_ingredients View
CREATE OR REPLACE VIEW recipe_with_ingredients AS
SELECT
    r.id,
    r.name,
    r.slug,
    r.instructions,
    ARRAY_AGG(
        i.name || 
        CASE 
            WHEN i.quantity IS NOT NULL OR i.unit IS NOT NULL THEN
                ' (' || 
                COALESCE(i.quantity, '') || 
                COALESCE(' ' || i.unit, '') || 
                ')'
            ELSE
                ''
        END
    ) AS ingredients
FROM
    recipes r
LEFT JOIN
    ingredients i ON r.id = i.recipe_id
GROUP BY
    r.id, r.name, r.slug, r.instructions;

