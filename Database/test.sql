CREATE TABLE "transactions"(
    "id" INTEGER NOT NULL,
    "transaction_code" VARCHAR(255) NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "customer_address_id" INTEGER NOT NULL,
    "employer_name" VARCHAR(255) NOT NULL,
    "quality" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "status" BOOLEAN NOT NULL
);
ALTER TABLE
    "transactions" ADD PRIMARY KEY("id");
CREATE TABLE "customer"(
    "id" BIGINT NOT NULL,
    "customer_name" CHAR(50) NOT NULL
);
ALTER TABLE
    "customer" ADD PRIMARY KEY("id");
CREATE TABLE "product"(
    "id" INTEGER NOT NULL,
    "name" CHAR(255) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL
);
ALTER TABLE
    "product" ADD PRIMARY KEY("id");
CREATE TABLE "customer_address"(
    "id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "address" CHAR(255) NOT NULL
);
ALTER TABLE
    "customer_address" ADD PRIMARY KEY("id");
CREATE TABLE "transaction_payment"(
    "id" INTEGER NOT NULL,
    "transaction_id" BIGINT NOT NULL,
    "payment_method_id" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "date" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "transaction_payment" ADD PRIMARY KEY("id");
CREATE TABLE "transaction_product"(
    "id" INTEGER NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "products_id" INTEGER NOT NULL,
    "quality" INTEGER NOT NULL,
    "product_price" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL
);
ALTER TABLE
    "transaction_product" ADD PRIMARY KEY("id");
CREATE TABLE "payment_method"(
    "id" INTEGER NOT NULL,
    "name" CHAR(255) NOT NULL,
    "is_active" BOOLEAN NOT NULL
);
ALTER TABLE
    "payment_method" ADD PRIMARY KEY("id");
ALTER TABLE
    "transaction_payment" ADD CONSTRAINT "transaction_payment_payment_method_id_foreign" FOREIGN KEY("payment_method_id") REFERENCES "payment_method"("id");
ALTER TABLE
    "transaction_product" ADD CONSTRAINT "transaction_product_transaction_id_foreign" FOREIGN KEY("transaction_id") REFERENCES "transactions"("id");
ALTER TABLE
    "transaction_payment" ADD CONSTRAINT "transaction_payment_transaction_id_foreign" FOREIGN KEY("transaction_id") REFERENCES "transactions"("id");
ALTER TABLE
    "transaction_product" ADD CONSTRAINT "transaction_product_products_id_foreign" FOREIGN KEY("products_id") REFERENCES "product"("id");
ALTER TABLE
    "customer_address" ADD CONSTRAINT "customer_address_customer_id_foreign" FOREIGN KEY("customer_id") REFERENCES "customer"("id");