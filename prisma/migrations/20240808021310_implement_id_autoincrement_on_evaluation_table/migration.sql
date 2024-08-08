-- AlterTable
CREATE SEQUENCE evaluations_id_seq;
ALTER TABLE "evaluations" ALTER COLUMN "id" SET DEFAULT nextval('evaluations_id_seq');
ALTER SEQUENCE evaluations_id_seq OWNED BY "evaluations"."id";
