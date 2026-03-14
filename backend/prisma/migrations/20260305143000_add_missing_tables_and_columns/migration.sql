-- AlterTable: Add OTP fields to users
ALTER TABLE "users" ADD COLUMN "otp_secret" TEXT;
ALTER TABLE "users" ADD COLUMN "otp_expires_at" TIMESTAMP(3);

-- AlterTable: Add missing columns to vehicles
ALTER TABLE "vehicles" ADD COLUMN "name" TEXT NOT NULL DEFAULT '';
ALTER TABLE "vehicles" ADD COLUMN "vehicle_number" TEXT NOT NULL DEFAULT '';
ALTER TABLE "vehicles" ADD COLUMN "status" TEXT NOT NULL DEFAULT '';
ALTER TABLE "vehicles" ADD COLUMN "model" TEXT NOT NULL DEFAULT '';
ALTER TABLE "vehicles" ADD COLUMN "created_by" TEXT;
ALTER TABLE "vehicles" ADD COLUMN "last_modified_by" TEXT;

-- CreateTable: refresh_tokens
CREATE TABLE "refresh_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "is_revoked" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "refresh_tokens"("token");

-- CreateTable: document_groups
CREATE TABLE "document_groups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT,
    "parent_id" TEXT,
    "group_name" TEXT,
    "order" INTEGER,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "document_groups_pkey" PRIMARY KEY ("id")
);

-- CreateEnum: VehicleDocumentStatus
CREATE TYPE "VehicleDocumentStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'PENDING', 'APPROVED', 'REJECTED', 'EXPIRED');

-- CreateTable: vehicle_documents
CREATE TABLE "vehicle_documents" (
    "id" TEXT NOT NULL,
    "document_group_id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "document_spec" JSONB,
    "status" "VehicleDocumentStatus" NOT NULL DEFAULT 'DRAFT',
    "submitted_by" TEXT,
    "form_field_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicle_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable: form_fields
CREATE TABLE "form_fields" (
    "id" TEXT NOT NULL,
    "document_group_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "field_key" TEXT NOT NULL,
    "placeholder" TEXT,
    "default_value" TEXT,
    "is_required" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "validation" JSONB,
    "options" JSONB,
    "endpoint" TEXT,
    "conditions" JSONB,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "form_fields_pkey" PRIMARY KEY ("id")
);

-- CreateIndex: form_fields unique constraint
CREATE UNIQUE INDEX "form_fields_document_group_id_field_key_key" ON "form_fields"("document_group_id", "field_key");

-- AddForeignKey: vehicles -> users (creator)
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey: vehicles -> users (modifier)
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_last_modified_by_fkey" FOREIGN KEY ("last_modified_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey: refresh_tokens -> users
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: document_groups -> document_groups (self-referencing parent)
ALTER TABLE "document_groups" ADD CONSTRAINT "document_groups_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "document_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey: vehicle_documents -> document_groups
ALTER TABLE "vehicle_documents" ADD CONSTRAINT "vehicle_documents_document_group_id_fkey" FOREIGN KEY ("document_group_id") REFERENCES "document_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey: vehicle_documents -> vehicles
ALTER TABLE "vehicle_documents" ADD CONSTRAINT "vehicle_documents_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey: vehicle_documents -> users (submitter)
ALTER TABLE "vehicle_documents" ADD CONSTRAINT "vehicle_documents_submitted_by_fkey" FOREIGN KEY ("submitted_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey: vehicle_documents -> form_fields
ALTER TABLE "vehicle_documents" ADD CONSTRAINT "vehicle_documents_form_field_id_fkey" FOREIGN KEY ("form_field_id") REFERENCES "form_fields"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey: form_fields -> document_groups
ALTER TABLE "form_fields" ADD CONSTRAINT "form_fields_document_group_id_fkey" FOREIGN KEY ("document_group_id") REFERENCES "document_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
