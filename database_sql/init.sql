-- Primero, creamos una función que se usará en los triggers para actualizar el campo 'updated_at'.
-- Esta función se puede reutilizar en todas las tablas que necesiten esta funcionalidad.
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW(); -- Establece el campo updated_at a la hora actual
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Creación de la tabla de roles
CREATE TABLE roles (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL
);

-- Creación de la tabla de usuarios
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name VARCHAR(200) NOT NULL,
	last_name VARCHAR(200) NOT NULL,
	email VARCHAR(200) NOT NULL UNIQUE,
	password VARCHAR(200) NOT NULL,
	active BOOLEAN NOT NULL DEFAULT true,
	created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users_roles (
	id SERIAL PRIMARY KEY,
	role_id INTEGER not null,
	user_id INTEGER not null,
	FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);	

-- Trigger para actualizar 'updated_at' en la tabla 'users'
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Creación de la tabla de ventas
CREATE TABLE sales (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	unit_price INTEGER NOT NULL,
	cost_price INTEGER NOT NULL,
	date DATE DEFAULT CURRENT_DATE,
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Creación de la tabla de extras
CREATE TABLE extra (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	unit_price INTEGER
);

-- Creación de la tabla de productos
CREATE TABLE products (
	id SERIAL PRIMARY KEY,
	name VARCHAR(200) NOT NULL,
	unit_price INTEGER NOT NULL,
	cost_price INTEGER NOT NULL,
	status BOOLEAN NOT NULL DEFAULT true,
	stock INTEGER NOT NULL DEFAULT 1,
	created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Trigger para actualizar 'updated_at' en la tabla 'products'
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Creación de la tabla de historial de precios
CREATE TABLE prices_histories (
	id SERIAL PRIMARY KEY,
	product_id INTEGER NOT NULL,
	cost_price INTEGER NOT NULL,
	unit_price INTEGER NOT NULL,
	date DATE DEFAULT CURRENT_DATE
);

-- Creación de la tabla de productos por venta (tabla intermedia)
CREATE TABLE sales_products (
	id SERIAL PRIMARY KEY,
	sale_id INTEGER NOT NULL,
	product_id INTEGER NOT NULL,
	unit_price INTEGER NOT NULL,
	cost_price INTEGER NOT NULL,
	quantity INTEGER NOT NULL,
	date DATE DEFAULT CURRENT_DATE,
	extra_id INTEGER NOT NULL,
	FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE,
	FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
	FOREIGN KEY (extra_id) REFERENCES extra(id) ON DELETE CASCADE
);

-- Creación de la tabla de materiales
CREATE TABLE materials (
	id SERIAL PRIMARY KEY,
	name VARCHAR(200) NOT NULL,
	unit_price INTEGER NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Trigger para actualizar 'updated_at' en la tabla 'materials'
CREATE TRIGGER update_materials_updated_at
BEFORE UPDATE ON materials
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


-- Creación de la tabla de materiales por producto (tabla intermedia)
CREATE TABLE products_materials (
	id SERIAL PRIMARY KEY,
	product_id INTEGER NOT NULL,
	material_id INTEGER NOT NULL,
	quantity INTEGER NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
	FOREIGN KEY (material_id) REFERENCES materials(id) ON DELETE CASCADE
);

-- Trigger para actualizar 'updated_at' en la tabla 'products_materials'
CREATE TRIGGER update_products_materials_updated_at
BEFORE UPDATE ON products_materials
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Creación de la tabla de presupuestos
CREATE TABLE budgets (
	id SERIAL PRIMARY KEY,
	product_name VARCHAR(200) NOT NULL,
	cost_price INTEGER NOT NULL,
	unit_price INTEGER NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Trigger para actualizar 'updated_at' en la tabla 'budgets'
CREATE TRIGGER update_budgets_updated_at
BEFORE UPDATE ON budgets
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Creación de la tabla de materiales por presupuesto (tabla intermedia)
CREATE TABLE materials_budgets (
	id SERIAL PRIMARY KEY,
	budget_id INTEGER NOT NULL,
	material_id INTEGER NOT NULL,
	quantity INTEGER NOT NULL,
	unit_price INTEGER NOT NULL,
	FOREIGN KEY (budget_id) REFERENCES budgets(id) ON DELETE CASCADE,
	FOREIGN KEY (material_id) REFERENCES materials(id) ON DELETE CASCADE
);

-- --------------------------------------------------------------------
-- INSERCIÓN DE DATOS INICIALES
-- --------------------------------------------------------------------

-- Insertamos los roles que usará la aplicación
-- Puedes añadir o quitar los que necesites.
INSERT INTO roles (name) VALUES ('admin'), ('vendedor');

-- Creamos un usuario administrador por defecto
-- IMPORTANTE: La contraseña es un HASH de ejemplo generado con bcrypt.
-- La contraseña en texto plano para este hash es "admin123".
-- Deberías generar tu propio hash para mayor seguridad.
INSERT INTO users (name, last_name, email, password, role_id) VALUES
('Usuario', 'Admin', 'admin@muebles.cl', '$2b$10$nOUIs5kJ7naTuufkzvBvAuaRZAnX2pW2hJJoA.gL3k.T/R2h.FLg0', 1);
