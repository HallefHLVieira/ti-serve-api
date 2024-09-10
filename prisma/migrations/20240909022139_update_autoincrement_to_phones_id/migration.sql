-- AlterTable
CREATE SEQUENCE phones_id_seq;
ALTER TABLE "phones" ALTER COLUMN "id" SET DEFAULT nextval('phones_id_seq');
ALTER SEQUENCE phones_id_seq OWNED BY "phones"."id";
